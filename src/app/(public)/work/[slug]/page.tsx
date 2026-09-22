import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyTemplate } from "@/components/case-study-template";
import { getApprovedCaseStudyBySlug } from "@/lib/case-studies";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getApprovedCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case study not found | Rick Vang",
      description: "The requested case study is not published.",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/work/${caseStudy.slug}`;

  return {
    title: `${caseStudy.title} | Rick Vang`,
    description: caseStudy.summary,
    alternates: { canonical },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      type: "article",
      url: canonical,
    },
    twitter: {
      card: "summary",
      title: caseStudy.title,
      description: caseStudy.summary,
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const caseStudy = getApprovedCaseStudyBySlug(slug);

  if (!caseStudy) notFound();

  return (
    <div className="public-page">
      <CaseStudyTemplate caseStudy={caseStudy} />
    </div>
  );
}
