import { notFound } from "next/navigation";

import { HarnessPlayground } from "@/components/harness-playground";
import { isHarnessState, type HarnessState } from "@/lib/fixtures";

export const dynamic = "force-dynamic";

type HarnessPageProps = {
  searchParams: Promise<{ state?: string | string[] }>;
};

export default async function HarnessPage({ searchParams }: HarnessPageProps) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const params = await searchParams;
  const requestedState = Array.isArray(params.state) ? params.state[0] : params.state;
  const initialState: HarnessState = isHarnessState(requestedState) ? requestedState : "success";

  return <HarnessPlayground initialState={initialState} />;
}
