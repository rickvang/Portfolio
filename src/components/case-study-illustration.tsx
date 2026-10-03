import Image from "next/image";

import type { CaseStudyIllustration as Illustration } from "@/lib/case-studies";

export function CaseStudyIllustration({ illustration }: { illustration: Illustration }) {
  return (
    <figure className="case-study-illustration">
      <picture>
        {illustration.mobileSrc && (
          <source media="(max-width: 620px)" srcSet={illustration.mobileSrc} width={360} height={560} />
        )}
        <Image src={illustration.src} alt={illustration.alt} width={720} height={340} unoptimized />
      </picture>
      <figcaption>{illustration.caption}</figcaption>
    </figure>
  );
}
