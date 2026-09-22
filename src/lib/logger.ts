type LogContext = Record<string, boolean | number | string | undefined>;

function write(level: "error" | "info", event: string, context: LogContext) {
  const entry = JSON.stringify({
    level,
    event,
    ...context,
    timestamp: new Date().toISOString(),
  });

  if (level === "error") {
    console.error(entry);
  } else {
    console.info(entry);
  }
}

export const logger = {
  error(event: string, context: LogContext = {}) {
    write("error", event, context);
  },
  info(event: string, context: LogContext = {}) {
    write("info", event, context);
  },
};
