import { spawn, spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const root = resolve(import.meta.dirname, "..");
const baseUrl = "http://127.0.0.1:3000";
const healthUrl = `${baseUrl}/api/health`;
const nextCli = resolve(root, "node_modules", "next", "dist", "bin", "next");
const playwrightCli = resolve(root, "node_modules", "@playwright", "test", "cli.js");

async function serverIsReady() {
  try {
    const response = await fetch(healthUrl);
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await serverIsReady()) return;
    await delay(250);
  }

  throw new Error(`Timed out waiting for ${healthUrl}`);
}

function stopServer(server) {
  if (!server?.pid) return;

  if (process.platform === "win32") {
    const pids = new Set([server.pid]);
    const netstat = spawnSync("netstat", ["-ano"], { encoding: "utf8" });
    const listener = netstat.stdout
      .split(/\r?\n/)
      .find((line) => line.includes("127.0.0.1:3000") && line.includes("LISTENING"));
    const listenerPid = listener?.trim().split(/\s+/).at(-1);

    if (listenerPid) pids.add(Number(listenerPid));

    for (const pid of pids) {
      spawnSync(
        "powershell.exe",
        [
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          `Stop-Process -Id ${pid} -Force -ErrorAction SilentlyContinue`,
        ],
        { stdio: "ignore" },
      );
    }
    return;
  }

  server.kill("SIGTERM");
}

async function runPlaywright() {
  let server;
  let ownsServer = false;

  try {
    if (!(await serverIsReady())) {
      ownsServer = true;
      server = spawn(process.execPath, [nextCli, "dev", "--hostname", "127.0.0.1"], {
        cwd: root,
        env: { ...process.env, NODE_ENV: "development" },
        detached: true,
        stdio: "ignore",
        windowsHide: true,
      });
      server.unref();
      await waitForServer();
    }

    const result = spawnSync(process.execPath, [playwrightCli, "test", ...process.argv.slice(2)], {
      cwd: root,
      env: { ...process.env, PW_REUSE_SERVER: "true" },
      stdio: "inherit",
      windowsHide: true,
    });

    return result.status ?? (result.signal ? 1 : 0);
  } finally {
    if (ownsServer) stopServer(server);
  }
}

process.exitCode = await runPlaywright();
