"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useEffect, useRef } from "react";

export type PracticeWorkVisualKind =
  | "integrations"
  | "ai-systems"
  | "design-systems"
  | "ui-practice";

type PracticeCanvasVariant = "hero" | PracticeWorkVisualKind;

type Point = {
  x: number;
  y: number;
};

type PointerState = Point & {
  active: boolean;
};

const colors = {
  accent: "#f24c27",
  blue: "#7892c9",
  cream: "#f5efe5",
  ink: "#171715",
  lilac: "#b1a8d8",
  muted: "#7f7a70",
  paper: "#fffefc",
  plum: "#332636",
  sand: "#c6a989",
};

type PracticeCanvasProps = {
  variant: PracticeCanvasVariant;
};

type PracticeWorkMedia = {
  alt: string;
  src: string;
};

const sourceMedia: Partial<Record<PracticeWorkVisualKind, PracticeWorkMedia>> = {
  integrations: {
    alt: "Interface work from the Multi Product Integrations case study",
    src: "/work-media/multi-product-integrations.png",
  },
  "design-systems": {
    alt: "Design-system work from the Design Systems case study",
    src: "/work-media/design-systems.png",
  },
};

export function PersonalPracticeHeroGraphic() {
  return (
    <PracticeCanvasFrame
      className="practice-hero-graphic"
      variant="hero"
    />
  );
}

type PracticeCanvasFrameProps = PracticeCanvasProps & {
  className: string;
};

function PracticeCanvasFrame({
  className,
  variant,
}: PracticeCanvasFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerState>({ active: false, x: 0.5, y: 0.5 });
  const pointerMotionRef = useRef<PointerState>({ active: false, x: 0.5, y: 0.5 });

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = frame?.querySelector<HTMLCanvasElement>("canvas");
    const context = canvas?.getContext("2d");

    if (!frame || !canvas || !context) {
      return undefined;
    }

    const frameElement = frame;
    const canvasElement = canvas;
    const context2d = context;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function resize() {
      const bounds = frameElement.getBoundingClientRect();
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvasElement.width = Math.round(width * pixelRatio);
      canvasElement.height = Math.round(height * pixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      context2d.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function render(milliseconds: number) {
      const targetPointer = pointerRef.current;
      const pointerMotion = pointerMotionRef.current;

      pointerMotion.x += (targetPointer.x - pointerMotion.x) * 0.14;
      pointerMotion.y += (targetPointer.y - pointerMotion.y) * 0.14;
      pointerMotion.active = targetPointer.active;

      drawScene(
        context2d,
        width,
        height,
        milliseconds / 1000,
        variant,
        pointerMotion,
      );

      if (!reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(frameElement);
    frameElement.dataset.canvasReady = "true";
    render(0);

    function handleMotionChange() {
      window.cancelAnimationFrame(animationFrame);
      render(0);
    }

    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      delete frameElement.dataset.canvasReady;
      reducedMotion.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, [variant]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const bounds = frame.getBoundingClientRect();
    pointerRef.current = {
      active: true,
      x: Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1),
      y: Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1),
    };
  }

  function resetPointer() {
    pointerRef.current = { active: false, x: 0.5, y: 0.5 };
  }

  return (
    <div
      aria-hidden="true"
      className={className}
      data-practice-canvas={variant}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      ref={frameRef}
    >
      {variant === "hero" && <PracticeHeroFallback />}
      <canvas className="practice-canvas-art" />
    </div>
  );
}

function PracticeHeroFallback() {
  return (
    <svg
      aria-hidden="true"
      className="practice-hero-fallback"
      preserveAspectRatio="none"
      viewBox="0 0 1200 720"
    >
      <g fill="none" strokeLinecap="round">
        <path d="M-40 390C180 150 350 160 570 360s370 250 670-80" stroke="var(--accent)" strokeOpacity=".16" />
        <path d="M-40 430C190 210 350 200 570 360s390 230 670-100" stroke="var(--blue)" strokeOpacity=".14" />
        <path d="M-40 350C180 110 360 130 570 360s360 270 670-60" stroke="var(--sand)" strokeOpacity=".18" />
        <path d="M-40 470C210 260 370 250 570 360s350 190 670-120" stroke="var(--blue)" strokeOpacity=".12" />
        <path d="M-40 300C200 70 370 110 570 360s360 280 670-30" stroke="var(--sand)" strokeOpacity=".12" />
        <circle cx="670" cy="360" r="132" stroke="var(--foreground)" strokeOpacity=".12" />
        <circle cx="670" cy="360" r="136" stroke="var(--accent)" strokeOpacity=".25" />
      </g>
      <g fill="var(--foreground)" fillOpacity=".24">
        <circle cx="558" cy="270" r="3" />
        <circle cx="612" cy="445" r="2.5" />
        <circle cx="748" cy="278" r="3" />
        <circle cx="820" cy="425" r="2.5" />
        <circle cx="900" cy="316" r="2" />
      </g>
      <circle cx="670" cy="360" fill="var(--accent)" fillOpacity=".52" r="9" />
    </svg>
  );
}

export function PersonalPracticeWorkVisual({
  kind,
  showHomepagePreviewMedia = false,
}: {
  kind: PracticeWorkVisualKind;
  showHomepagePreviewMedia?: boolean;
}) {
  const media = showHomepagePreviewMedia ? sourceMedia[kind] : undefined;

  if (media) {
    return (
      <figure
        className={`practice-work-visual practice-work-visual-image practice-work-visual-${kind}`}
      >
        <Image
          alt={media.alt}
          className="practice-work-image"
          fill
          priority={kind === "integrations"}
          sizes="(max-width: 620px) calc(100vw - 3rem), 42vw"
          src={media.src}
        />
      </figure>
    );
  }

  return (
    <figure className={`practice-work-visual practice-work-visual-${kind}`}>
      <PracticeCanvasFrame
        className={`practice-work-visual-canvas practice-work-visual-${kind}`}
        variant={kind}
      />
      <figcaption>Illustrative diagram</figcaption>
    </figure>
  );
}

function drawScene(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  variant: PracticeCanvasVariant,
  pointer: PointerState,
) {
  context.clearRect(0, 0, width, height);

  if (variant === "hero") {
    drawHero(context, width, height, time, pointer);
    return;
  }

  if (variant === "integrations") {
    drawIntegrations(context, width, height, time, pointer);
    return;
  }

  if (variant === "ai-systems") {
    drawAiSystems(context, width, height, time, pointer);
    return;
  }

  if (variant === "design-systems") {
    drawDesignSystems(context, width, height, time, pointer);
    return;
  }

  drawUiPractice(context, width, height, time, pointer);
}

function drawHero(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerState,
) {
  const pointerOffsetX = (pointer.x - 0.5) * width * 0.55;
  const pointerOffsetY = (pointer.y - 0.5) * height * 0.5;
  const centerX = width * (0.5 + (pointer.x - 0.5) * 0.16);
  const centerY = height * (0.5 + (pointer.y - 0.5) * 0.11);

  for (let ribbon = 0; ribbon < 12; ribbon += 1) {
    const color = ribbon % 3 === 0 ? colors.accent : ribbon % 3 === 1 ? colors.blue : colors.sand;
    const alpha = 0.1 + (ribbon % 4) * 0.02;
    context.beginPath();

    for (let step = 0; step <= 48; step += 1) {
      const progress = step / 48;
      const x = -width * 0.22 + progress * width * 1.44;
      const wave = Math.sin(progress * 8 + time * 0.2 + ribbon * 0.45) * height * 0.09;
      const pull = Math.sin(progress * Math.PI) * (ribbon - 5.5) * height * 0.045;
      const y = centerY + wave + pull + pointerOffsetY * Math.sin(progress * Math.PI) * 0.05;

      if (step === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    context.strokeStyle = withAlpha(color, alpha);
    context.lineWidth = 1 + (ribbon % 3) * 0.7;
    context.stroke();
  }

  for (let particle = 0; particle < 112; particle += 1) {
    const lane = particle % 14;
    const progress = ((particle * 0.073 + time * (0.009 + (lane % 3) * 0.002)) % 1 + 1) % 1;
    const x = width * (0.01 + progress * 0.98);
    const wave = Math.sin(progress * 8 + time * 0.2 + lane * 0.45) * height * 0.09;
    const pull = Math.sin(progress * Math.PI) * (lane - 6.5) * height * 0.045;
    const y = centerY + wave + pull + pointerOffsetY * Math.sin(progress * Math.PI) * 0.05;
    const radius = 0.7 + (Math.sin(time * 1.1 + particle) + 1) * 0.55;

    context.fillStyle = withAlpha(particle % 4 === 0 ? colors.accent : colors.ink, 0.28);
    context.beginPath();
    context.arc(x + pointerOffsetX * 0.025, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.strokeStyle = withAlpha(colors.ink, 0.16);
  context.lineWidth = 1;
  context.beginPath();
  context.arc(centerX, centerY, Math.min(width, height) * 0.19, 0, Math.PI * 2);
  context.stroke();
  context.strokeStyle = withAlpha(colors.accent, 0.5);
  context.beginPath();
  context.arc(
    centerX,
    centerY,
    Math.min(width, height) * (0.19 + Math.sin(time * 0.8) * 0.018),
    0,
    Math.PI * 1.65,
  );
  context.stroke();
  context.fillStyle = withAlpha(colors.accent, 0.58);
  context.beginPath();
  context.arc(centerX, centerY, 7 + Math.sin(time * 1.1) * 1.6, 0, Math.PI * 2);
  context.fill();
}

function drawIntegrations(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerState,
) {
  context.fillStyle = colors.plum;
  context.fillRect(0, 0, width, height);
  const centerX = width * (0.5 + (pointer.x - 0.5) * 0.035);
  const centerY = height * (0.5 + (pointer.y - 0.5) * 0.035);
  const moduleWidth = Math.min(width * 0.2, 68);
  const moduleHeight = Math.min(height * 0.17, 32);
  const leftX = width * 0.06;
  const rightX = width * 0.74;
  const sourceYs = [0.2, 0.42, 0.64].map((value) => height * value);
  const outputYs = [0.2, 0.42, 0.64].map((value) => height * value);

  sourceYs.forEach((sourceY, index) => {
    const sourceCenterY = sourceY + moduleHeight / 2;
    const targetY = centerY + (index - 1) * height * 0.13;
    drawFlow(
      context,
      leftX + moduleWidth,
      sourceCenterY,
      width * 0.34,
      sourceCenterY + (targetY - sourceCenterY) * 0.32,
      centerX - 30,
      targetY,
      index === 1 ? colors.accent : colors.sand,
      (time * 0.12 + index * 0.2) % 1,
    );
  });

  outputYs.forEach((outputY, index) => {
    const outputCenterY = outputY + moduleHeight / 2;
    const sourceY = centerY + (index - 1) * height * 0.13;
    drawFlow(
      context,
      centerX + 30,
      sourceY,
      width * 0.66,
      outputCenterY + (sourceY - outputCenterY) * 0.32,
      rightX,
      outputCenterY,
      index === 1 ? colors.accent : colors.blue,
      (time * 0.12 + index * 0.2 + 0.5) % 1,
    );
  });

  sourceYs.forEach((sourceY, index) => {
    drawModule(
      context,
      leftX,
      sourceY,
      moduleWidth,
      moduleHeight,
      index === 1 ? colors.accent : colors.sand,
      time,
      index,
    );
  });

  outputYs.forEach((outputY, index) => {
    drawModule(
      context,
      rightX,
      outputY,
      moduleWidth,
      moduleHeight,
      index === 1 ? colors.accent : colors.blue,
      time,
      index + 3,
    );
  });

  const hubWidth = Math.min(width * 0.2, 64);
  const hubHeight = Math.min(height * 0.48, 86);
  drawPanel(
    context,
    centerX - hubWidth / 2,
    centerY - hubHeight / 2,
    hubWidth,
    hubHeight,
    withAlpha(colors.ink, 0.5),
    withAlpha(colors.cream, 0.66),
    12,
  );
  context.strokeStyle = withAlpha(colors.accent, 0.9);
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(centerX - hubWidth * 0.22, centerY - hubHeight * 0.22);
  context.lineTo(centerX + hubWidth * 0.22, centerY - hubHeight * 0.22);
  context.moveTo(centerX - hubWidth * 0.22, centerY);
  context.lineTo(centerX + hubWidth * 0.22, centerY);
  context.moveTo(centerX - hubWidth * 0.22, centerY + hubHeight * 0.22);
  context.lineTo(centerX + hubWidth * 0.22, centerY + hubHeight * 0.22);
  context.stroke();
  context.fillStyle = colors.accent;
  context.beginPath();
  context.arc(centerX, centerY, 7 + Math.sin(time * 1.5) * 1.4, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = withAlpha(colors.accent, 0.38);
  context.lineWidth = 1;
  context.beginPath();
  context.arc(centerX, centerY, hubWidth * 0.72, 0, Math.PI * 2);
  context.stroke();
}

function drawAiSystems(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Point,
) {
  context.fillStyle = colors.ink;
  context.fillRect(0, 0, width, height);
  const shiftX = (pointer.x - 0.5) * 10;
  const coreX = width * 0.29 + shiftX;
  const coreY = height * 0.12;
  const coreWidth = width * 0.42;
  const coreHeight = height * 0.76;
  const agentWidth = Math.min(width * 0.16, 54);
  const agentHeight = Math.min(height * 0.15, 28);
  const agentYs = [0.17, 0.42, 0.67].map((value) => height * value);

  agentYs.forEach((agentY, index) => {
    const targetY = coreY + coreHeight * (0.2 + index * 0.3);
    drawFlow(
      context,
      width * 0.12 + agentWidth,
      agentY + agentHeight / 2,
      width * 0.23,
      agentY + (targetY - agentY) * 0.45,
      coreX,
      targetY,
      index === 1 ? colors.accent : colors.lilac,
      (time * 0.1 + index * 0.26) % 1,
      true,
    );
    drawModule(context, width * 0.12, agentY, agentWidth, agentHeight, index === 1 ? colors.accent : colors.lilac, time, index + 1);
  });

  agentYs.forEach((agentY, index) => {
    const targetY = coreY + coreHeight * (0.2 + index * 0.3);
    drawFlow(
      context,
      coreX + coreWidth,
      targetY,
      width * 0.76,
      agentY + (targetY - agentY) * 0.45,
      width * 0.78,
      agentY + agentHeight / 2,
      index === 1 ? colors.accent : colors.blue,
      (time * 0.1 + index * 0.26 + 0.5) % 1,
      true,
    );
    drawModule(context, width * 0.78, agentY, agentWidth, agentHeight, index === 1 ? colors.accent : colors.blue, time, index + 4);
  });

  drawPanel(
    context,
    coreX,
    coreY,
    coreWidth,
    coreHeight,
    withAlpha(colors.blue, 0.09),
    withAlpha(colors.lilac, 0.7),
    16,
  );
  context.strokeStyle = withAlpha(colors.cream, 0.25);
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(coreX + coreWidth * 0.16, coreY + coreHeight * 0.12);
  context.lineTo(coreX + coreWidth * 0.16, coreY + coreHeight * 0.88);
  context.moveTo(coreX + coreWidth * 0.84, coreY + coreHeight * 0.12);
  context.lineTo(coreX + coreWidth * 0.84, coreY + coreHeight * 0.88);
  context.stroke();

  const layers = [
    { color: colors.lilac, width: 0.54, y: 0.18 },
    { color: colors.blue, width: 0.7, y: 0.43 },
    { color: colors.accent, width: 0.84, y: 0.68 },
  ];

  layers.forEach((layer, index) => {
    const layerWidth = coreWidth * layer.width;
    const x = coreX + (coreWidth - layerWidth) / 2;
    const y = coreY + coreHeight * layer.y;
    drawPanel(
      context,
      x,
      y,
      layerWidth,
      Math.min(height * 0.13, 28),
      withAlpha(layer.color, 0.18),
      withAlpha(layer.color, 0.76),
      10,
    );

    for (let dot = 0; dot < 10 - index * 2; dot += 1) {
      const dotX = x + layerWidth * (0.12 + ((dot * 0.19 + time * (0.018 + index * 0.006)) % 0.76));
      const dotY = y + height * (0.045 + ((dot * 0.17 + index * 0.1) % 0.045));
      context.fillStyle = withAlpha(layer.color, 0.5);
      context.beginPath();
      context.arc(dotX, dotY, 1.3 + (dot % 2), 0, Math.PI * 2);
      context.fill();
    }
  });

  context.fillStyle = colors.accent;
  context.beginPath();
  context.arc(coreX + coreWidth / 2, coreY + coreHeight / 2, 5 + Math.sin(time * 1.8) * 1.2, 0, Math.PI * 2);
  context.fill();
}

function drawDesignSystems(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Point,
) {
  context.fillStyle = colors.cream;
  context.fillRect(0, 0, width, height);
  const foundationX = width * 0.14;
  const foundationY = height * 0.08;
  const foundationWidth = width * 0.72;
  const foundationHeight = height * 0.22;
  const columnWidth = width * 0.2;
  const columnY = height * 0.57;
  const columnHeight = height * 0.3;
  const columns = [
    { accent: colors.ink, x: 0.16 },
    { accent: colors.accent, x: 0.5 },
    { accent: colors.blue, x: 0.84 },
  ];

  drawPanel(
    context,
    foundationX,
    foundationY,
    foundationWidth,
    foundationHeight,
    withAlpha(colors.paper, 0.42),
    withAlpha(colors.ink, 0.52),
    12,
  );
  context.fillStyle = withAlpha(colors.ink, 0.7);
  context.fillRect(foundationX + foundationWidth * 0.08, foundationY + foundationHeight * 0.24, foundationWidth * 0.25, 3);
  context.fillStyle = withAlpha(colors.muted, 0.52);
  context.fillRect(foundationX + foundationWidth * 0.08, foundationY + foundationHeight * 0.48, foundationWidth * 0.48, 2);
  context.fillRect(foundationX + foundationWidth * 0.08, foundationY + foundationHeight * 0.67, foundationWidth * 0.35, 2);

  for (let token = 0; token < 7; token += 1) {
    const x = foundationX + foundationWidth * (0.63 + token * 0.045);
    const y = foundationY + foundationHeight * (0.28 + (token % 2) * 0.25);
    const size = 4 + (token % 3) * 2;
    context.fillStyle = withAlpha(token % 3 === 1 ? colors.accent : colors.blue, 0.45 + (Math.sin(time * 1.2 + token) + 1) * 0.12);
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  }

  columns.forEach((column, columnIndex) => {
    const centerX = width * column.x + (pointer.x - 0.5) * 6 * (columnIndex - 1);
    context.strokeStyle = withAlpha(column.accent, 0.32);
    context.lineWidth = 1;
    context.setLineDash([2, 4]);
    context.beginPath();
    context.moveTo(foundationX + foundationWidth * (0.17 + columnIndex * 0.33), foundationY + foundationHeight);
    context.lineTo(centerX, columnY);
    context.stroke();
    context.setLineDash([]);

    drawPanel(
      context,
      centerX - columnWidth / 2,
      columnY,
      columnWidth,
      columnHeight,
      withAlpha(colors.paper, 0.2),
      withAlpha(column.accent, 0.5),
      12,
    );

    for (let row = 0; row < 5; row += 1) {
      const rowY = columnY + columnHeight * (0.18 + row * 0.15);
      context.strokeStyle = withAlpha(column.accent, 0.18);
      context.beginPath();
      context.moveTo(centerX - columnWidth * 0.3, rowY);
      context.lineTo(centerX + columnWidth * 0.3, rowY);
      context.stroke();
      for (let dot = 0; dot < 4; dot += 1) {
        context.fillStyle = withAlpha(column.accent, 0.3 + ((Math.sin(time * 1.1 + row + dot + columnIndex) + 1) / 2) * 0.35);
        context.beginPath();
        context.arc(centerX - columnWidth * 0.22 + dot * columnWidth * 0.14, rowY - 5, 2 + ((row + dot + columnIndex) % 2), 0, Math.PI * 2);
        context.fill();
      }
    }

    context.fillStyle = withAlpha(column.accent, 0.75);
    context.beginPath();
    context.arc(centerX, columnY + columnHeight * (0.78 + (pointer.y - 0.5) * 0.04), 4 + Math.sin(time * 1.6 + columnIndex) * 1.1, 0, Math.PI * 2);
    context.fill();
  });
}

function drawUiPractice(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Point,
) {
  context.fillStyle = colors.plum;
  context.fillRect(0, 0, width, height);
  const offsetX = (pointer.x - 0.5) * 8;
  const offsetY = (pointer.y - 0.5) * 8;
  const stageY = height * 0.16 + offsetY;
  const stageWidth = width * 0.22;
  const stageHeight = height * 0.68;
  const stageXs = [width * 0.09, width * 0.39 + offsetX, width * 0.69 + offsetX];
  const stageColors = [colors.cream, colors.blue, colors.accent];

  for (let index = 0; index < stageXs.length - 1; index += 1) {
    drawFlow(
      context,
      stageXs[index] + stageWidth,
      stageY + stageHeight * 0.5,
      stageXs[index] + stageWidth + width * 0.08,
      stageY + stageHeight * (0.5 + (index === 0 ? -0.12 : 0.12)),
      stageXs[index + 1],
      stageY + stageHeight * 0.5,
      colors.accent,
      (time * 0.13 + index * 0.42) % 1,
    );
  }

  stageXs.forEach((stageX, stageIndex) => {
    drawPanel(
      context,
      stageX,
      stageY,
      stageWidth,
      stageHeight,
      withAlpha(stageColors[stageIndex], 0.08),
      withAlpha(stageColors[stageIndex], 0.62),
      12,
    );
    context.fillStyle = withAlpha(stageColors[stageIndex], 0.75);
    context.fillRect(stageX + stageWidth * 0.16, stageY + stageHeight * 0.12, stageWidth * (stageIndex === 1 ? 0.52 : 0.38), 3);

    if (stageIndex === 0) {
      for (let row = 0; row < 5; row += 1) {
        context.strokeStyle = withAlpha(colors.cream, 0.35);
        context.strokeRect(stageX + stageWidth * 0.16, stageY + stageHeight * (0.25 + row * 0.11), stageWidth * (0.68 - (row % 2) * 0.14), stageHeight * 0.06);
      }
    } else if (stageIndex === 1) {
      for (let row = 0; row < 3; row += 1) {
        const y = stageY + stageHeight * (0.29 + row * 0.18);
        drawPanel(context, stageX + stageWidth * 0.15, y, stageWidth * 0.7, stageHeight * 0.1, withAlpha(colors.blue, 0.18), withAlpha(colors.blue, 0.7), 6);
        context.fillStyle = withAlpha(colors.cream, 0.58);
        context.fillRect(stageX + stageWidth * 0.24, y + stageHeight * 0.04, stageWidth * (0.22 + row * 0.08), 2);
      }
      context.strokeStyle = withAlpha(colors.accent, 0.9);
      context.beginPath();
      context.arc(stageX + stageWidth * 0.72, stageY + stageHeight * 0.58, 7 + Math.sin(time * 1.6) * 1.2, 0, Math.PI * 2);
      context.stroke();
    } else {
      for (let row = 0; row < 4; row += 1) {
        const y = stageY + stageHeight * (0.3 + row * 0.13);
        context.strokeStyle = withAlpha(colors.cream, 0.35);
        context.beginPath();
        context.moveTo(stageX + stageWidth * 0.16, y);
        context.lineTo(stageX + stageWidth * 0.5, y);
        context.stroke();
        context.fillStyle = row < 3 ? colors.accent : colors.cream;
        context.beginPath();
        context.arc(stageX + stageWidth * 0.68, y, 3 + (row === 3 ? 1 : 0), 0, Math.PI * 2);
        context.fill();
      }
      context.strokeStyle = withAlpha(colors.accent, 0.9);
      context.lineWidth = 1.6;
      context.beginPath();
      context.moveTo(stageX + stageWidth * 0.18, stageY + stageHeight * 0.78);
      context.lineTo(stageX + stageWidth * 0.38, stageY + stageHeight * 0.88);
      context.lineTo(stageX + stageWidth * 0.78, stageY + stageHeight * 0.7);
      context.stroke();
    }
  });
}

function drawFlow(
  context: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  controlX: number,
  controlY: number,
  toX: number,
  toY: number,
  color: string,
  progress: number,
  dashed = false,
) {
  context.strokeStyle = withAlpha(color, dashed ? 0.36 : 0.48);
  context.lineWidth = dashed ? 1 : 1.2;
  context.setLineDash(dashed ? [2, 5] : []);
  context.beginPath();
  context.moveTo(fromX, fromY);
  context.quadraticCurveTo(controlX, controlY, toX, toY);
  context.stroke();
  context.setLineDash([]);

  const point = quadraticPoint(
    Math.max(0, Math.min(progress, 1)),
    { x: fromX, y: fromY },
    { x: controlX, y: controlY },
    { x: toX, y: toY },
  );
  context.fillStyle = color;
  context.beginPath();
  context.arc(point.x, point.y, dashed ? 2 : 2.4, 0, Math.PI * 2);
  context.fill();
}

function drawModule(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  accent: string,
  time: number,
  seed: number,
) {
  drawPanel(context, x, y, width, height, withAlpha(accent, 0.12), withAlpha(accent, 0.62), 7);
  context.fillStyle = withAlpha(accent, 0.8);
  context.fillRect(x + width * 0.14, y + height * 0.2, width * (0.28 + (seed % 3) * 0.08), 2);
  context.strokeStyle = withAlpha(accent, 0.28);
  context.beginPath();
  context.moveTo(x + width * 0.14, y + height * 0.54);
  context.lineTo(x + width * 0.86, y + height * 0.54);
  context.moveTo(x + width * 0.14, y + height * 0.75);
  context.lineTo(x + width * 0.62, y + height * 0.75);
  context.stroke();
  context.fillStyle = withAlpha(accent, 0.48 + (Math.sin(time * 1.4 + seed) + 1) * 0.12);
  context.beginPath();
  context.arc(x + width * 0.8, y + height * 0.76, 2.2, 0, Math.PI * 2);
  context.fill();
}

function drawPanel(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  stroke: string,
  radius: number,
) {
  roundedRect(context, x, y, width, height, radius);
  context.fillStyle = fill;
  context.fill();
  context.strokeStyle = stroke;
  context.lineWidth = 1;
  context.stroke();
}

function quadraticPoint(progress: number, start: Point, control: Point, end: Point) {
  const inverse = 1 - progress;
  return {
    x: inverse * inverse * start.x + 2 * inverse * progress * control.x + progress * progress * end.x,
    y: inverse * inverse * start.y + 2 * inverse * progress * control.y + progress * progress * end.y,
  };
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function withAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
