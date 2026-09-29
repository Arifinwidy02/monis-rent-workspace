"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Eye, Loader2 } from "lucide-react";
import { monthsFromPeriod } from "@/lib/rental";

export default function SuccessModal({
  total,
  startDate,
  period,
  onBackToWorkspace,
  onViewRental,
}: {
  total: number;
  startDate: string;
  period: string;
  onBackToWorkspace: () => void;
  onViewRental: () => void;
}) {
  const [stage, setStage] = useState<"loading" | "success">("loading");

  useEffect(() => {
    const t = window.setTimeout(() => setStage("success"), 2600);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (stage !== "success") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onViewRental();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, onViewRental]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-label={stage === "loading" ? "Processing request" : "Request received"}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" aria-hidden />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 text-center shadow-[0_8px_30px_rgba(37,37,37,0.18)]">
        {stage === "loading" ? (
          <div className="flex flex-col items-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF0EA]">
              <Loader2 className="h-8 w-8 animate-spin text-[#5F705B]" />
            </span>
            <h2 className="mt-5 font-serif text-2xl font-bold text-[#252525]">
              Requesting your workspace...
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6F6F68]">
              Confirming availability and delivery in Bali. This takes a moment.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E3E9E1]"
            >
              <Check className="h-8 w-8 text-[#5F705B]" strokeWidth={2.5} />
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-[#252525]">
                Your workspace
                <br />
                is on its way!
              </h2>
              <p className="mt-2 max-w-[320px] text-[14px] leading-relaxed text-[#6F6F68]">
                We have received your request and our team will get in touch
                shortly.
              </p>
              <dl className="mt-5 grid w-full grid-cols-3 gap-2 rounded-xl bg-[#F5F3EE] p-4 text-left">
                <div>
                  <dt className="text-[11px] text-[#A8A69E]">Monthly</dt>
                  <dd className="text-[15px] font-bold text-[#252525]">€{total}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#A8A69E]">Starts</dt>
                  <dd className="text-[13px] font-semibold text-[#252525]">{startDate}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-[#A8A69E]">Period</dt>
                  <dd className="text-[13px] font-semibold text-[#252525]">{period}</dd>
                </div>
              </dl>
              <p className="mt-2.5 flex w-full items-baseline justify-between rounded-xl bg-[#EDF0EA] px-4 py-3">
                <span className="text-[13px] font-semibold text-[#252525]">
                  Total for {period}
                </span>
                <span className="text-xl font-bold text-[#3E5C3F]">
                  €{total * monthsFromPeriod(period)}
                </span>
              </p>
              <div className="mt-5 flex w-full flex-col gap-2.5">
                <button
                  type="button"
                  autoFocus
                  onClick={onBackToWorkspace}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#5F705B] px-6 text-[14px] font-semibold text-white transition hover:bg-[#4E5D4B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5F705B] active:translate-y-[1px]"
                >
                  Back to Workspace <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onViewRental}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#DDDAD2] bg-white px-6 text-[14px] font-semibold text-[#252525] transition hover:border-[#5F705B] focus-visible:outline-2 focus-visible:outline-[#5F705B]"
                >
                  <Eye className="h-4 w-4" /> View Rental Again
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
