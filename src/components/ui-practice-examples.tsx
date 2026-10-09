"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CaseStudySection } from "@/lib/case-studies";

export function PracticeExamples({ examples }: { examples: NonNullable<CaseStudySection["items"]> }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const enlarge = useRef<HTMLButtonElement>(null);
  const example = examples[selected];
  const media = example.media!;

  return (
    <>
      <div className="craft-tabs" role="tablist" aria-label="Explore design decisions">
        {examples.map((item, index) => (
          <button key={item.id} ref={(element) => { tabs.current[index] = element; }}
            id={`craft-tab-${item.id}`} type="button" role="tab"
            aria-selected={index === selected} aria-controls="craft-example-panel"
            tabIndex={index === selected ? 0 : -1} onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % examples.length;
              else if (event.key === "ArrowLeft") next = (index + examples.length - 1) % examples.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = examples.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              tabs.current[next]?.focus();
            }}>
            <span aria-hidden="true">0{index + 1}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="craft-example" id="craft-example-panel" role="tabpanel" aria-labelledby={`craft-tab-${example.id}`}>
        <figure className="craft-artwork">
          <button ref={enlarge} type="button" aria-label="Enlarge the selected illustration" onClick={() => dialog.current?.showModal()}>
            <Image src={media.src} alt={media.alt} width={media.width} height={media.height}
              sizes="(max-width: 800px) 90vw, 50vw" loading="eager" />
          </button>
          <figcaption><span>{media.caption}</span><span>Click image to inspect ↗</span></figcaption>
        </figure>
        <div className="craft-example-copy">
          <p className="craft-label">{example.category}</p>
          <h3>{example.title}</h3><p>{example.summary}</p>
          <div className="craft-detail"><h4>What the example shows</h4><p>{example.detail}</p></div>
        </div>
      </div>
      <dialog ref={dialog} className="craft-dialog" aria-labelledby="craft-dialog-title"
        onClose={() => enlarge.current?.focus()}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
        }}>
        <div className="craft-dialog-bar"><strong id="craft-dialog-title">{example.category}</strong>
          <button type="button" onClick={() => dialog.current?.close()}>Close ×</button></div>
        <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="94vw" />
        <p>{media.caption}</p>
      </dialog>
    </>
  );
}
