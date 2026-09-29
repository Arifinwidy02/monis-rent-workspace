"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Leaf, Lock } from "lucide-react";
import Header from "@/components/layout/Header";
import WorkspaceScene from "@/components/workspace/WorkspaceScene";
import SuccessModal from "@/components/checkout/SuccessModal";
import { CatalogThumb } from "@/components/workspace/scene-art";
import { productById } from "@/data/products";
import { RENTAL_PERIODS, monthsFromPeriod } from "@/lib/rental";
import { useMonthlyTotal, useSelectedProducts, useWorkspaceStore } from "@/store/workspaceStore";

export default function CheckoutPage() {
  const router = useRouter();
  const products = useSelectedProducts();
  const total = useMonthlyTotal();
  const { deskId } = useWorkspaceStore();
  const [startDate, setStartDate] = useState("2026-10-15");
  const [period, setPeriod] = useState("1 month");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (products.length === 0) {
      setError("Your workspace is empty. Go back and pick at least a desk.");
      return;
    }
    if (!startDate) {
      setError("Please choose a start date.");
      return;
    }
    setError(null);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-full bg-[#F5F3EE]">
      <Header step={2} />
      <main className="mx-auto w-full max-w-[1280px] px-5 py-6 md:px-8 md:py-8">
        <Link
          href="/workspace"
          className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#DDDAD2] bg-white px-4 text-[13px] font-semibold text-[#252525] hover:border-[#5F705B]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to builder
        </Link>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <WorkspaceScene compact />
            <section aria-label="Selected items" className="mt-5 rounded-2xl border border-[#DDDAD2] bg-white p-5">
              <h2 className="text-[15px] font-bold text-[#252525]">Selected Items</h2>
              <p className="mb-4 text-[12px] text-[#6F6F68]">Here is everything in your workspace.</p>
              {products.length === 0 ? (
                <p className="rounded-xl bg-[#F5F3EE] p-4 text-[13px] text-[#6F6F68]">
                  Nothing selected yet.{" "}
                  <Link href="/workspace" className="font-semibold text-[#5F705B] underline">
                    Choose a desk
                  </Link>
                  .
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {products.map((p) => (
                    <li key={p.id} className="relative overflow-hidden rounded-xl border border-[#F0EEE8]">
                      <span className="block h-[86px] bg-[#F5F3EE]">
                        <CatalogThumb id={p.id} category={p.category} />
                      </span>
                      <span className="block p-2">
                        <span className="block truncate text-[12px] font-semibold text-[#252525]">{p.name}</span>
                        <span className="text-[11px] text-[#6F6F68]">
                          €{p.priceMonthly} <span className="text-[#A8A69E]">/ month</span>
                        </span>
                      </span>
                      <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5F705B] text-white">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F5F3EE] p-4">
                <div>
                  <p className="text-[13px] font-bold text-[#252525]">Your workspace</p>
                  <p className="text-[12px] text-[#6F6F68]">
                    {deskId ? productById(deskId)?.name : "No desk yet"} setup for deep work.
                  </p>
                </div>
                <p className="text-xl font-bold text-[#252525]">
                  €{total} <span className="text-sm font-normal text-[#6F6F68]">/ month</span>
                </p>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-[#DDDAD2] bg-white p-5 lg:sticky lg:top-5">
            <h1 className="text-lg font-bold text-[#252525]">Rental Details</h1>
            <p className="mb-5 text-[12px] text-[#6F6F68]">
              Choose when you would like to start and for how long.
            </p>
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="start" className="mb-1.5 block text-[13px] font-semibold text-[#252525]">
                  Start date
                </label>
                <input
                  id="start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="min-h-[44px] w-full rounded-xl border border-[#DDDAD2] bg-white px-3 text-[13px] text-[#252525] focus:border-[#5F705B] focus:outline-none"
                />
              </div>
              <fieldset>
                <legend className="mb-1.5 text-[13px] font-semibold text-[#252525]">Rental period</legend>
                <div className="grid grid-cols-2 gap-2">
                  {RENTAL_PERIODS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      aria-pressed={period === p.label}
                      onClick={() => setPeriod(p.label)}
                      className={`min-h-[44px] rounded-xl border px-3 text-[12px] font-semibold transition focus-visible:outline-2 focus-visible:outline-[#5F705B] ${
                        period === p.label
                          ? "border-[#5F705B] bg-[#EDF0EA] text-[#252525]"
                          : "border-[#DDDAD2] text-[#6F6F68] hover:border-[#A8A69E]"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="flex gap-2 rounded-xl bg-[#F2F4F0] p-3 text-[12px] text-[#6F6F68]">
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[#5F705B]" />
                <p>
                  <span className="font-semibold text-[#252525]">Flexible rental.</span> Need a
                  different period? Just let us know after your request.
                </p>
              </div>
              <div>
                <label htmlFor="notes" className="mb-1.5 block text-[13px] font-semibold text-[#252525]">
                  Additional Notes <span className="font-normal text-[#A8A69E]">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, 200))}
                  rows={4}
                  placeholder="Any special requests? e.g. delivery time, setup preferences..."
                  className="w-full resize-y rounded-xl border border-[#DDDAD2] px-3 py-2.5 text-[13px] text-[#252525] placeholder:text-[#A8A69E] focus:border-[#5F705B] focus:outline-none"
                />
                <p className="mt-1 text-right text-[11px] text-[#A8A69E]">{notes.length}/200</p>
              </div>

              <div className="flex items-baseline justify-between border-t border-[#DDDAD2] pt-4">
                <span className="text-[13px] font-semibold text-[#252525]">Total Monthly Cost</span>
                <span className="text-2xl font-bold text-[#252525]">
                  €{total} <span className="text-sm font-normal text-[#6F6F68]">/ month</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between rounded-xl bg-[#EDF0EA] px-4 py-3">
                <span className="text-[13px] font-semibold text-[#252525]">
                  Total for {period}
                </span>
                <span className="text-2xl font-bold text-[#3E5C3F]">
                  €{total * monthsFromPeriod(period)}
                </span>
              </div>

              {error && (
                <p role="alert" className="rounded-xl bg-red-50 p-3 text-[12px] font-medium text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#3E5C3F] px-6 text-[14px] font-semibold text-white transition hover:bg-[#334E34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5F705B] active:translate-y-[1px]"
              >
                Request this workspace <ArrowRight className="h-4 w-4" />
              </button>
              <p className="flex items-start gap-1.5 text-[11px] leading-snug text-[#A8A69E]">
                <Lock className="mt-0.5 h-3 w-3 shrink-0" />
                Your information is secure and will only be used to process your request.
              </p>
            </form>
          </aside>
        </div>
      </main>
      {showSuccess && (
        <SuccessModal
          total={total}
          startDate={startDate}
          period={period}
          onBackToWorkspace={() => router.push("/workspace")}
          onViewRental={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
