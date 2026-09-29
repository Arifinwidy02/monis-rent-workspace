"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Check, Clock, Home, Leaf, Truck } from "lucide-react";
import Header from "@/components/layout/Header";
import WorkspaceScene from "@/components/workspace/WorkspaceScene";
import { CatalogThumb } from "@/components/workspace/scene-art";
import { useMonthlyTotal, useSelectedProducts } from "@/store/workspaceStore";

export default function SuccessPage() {
  const products = useSelectedProducts();
  const total = useMonthlyTotal();
  const [rental] = useState<{ startDate: string; period: string; notes: string } | null>(() => {
    try {
      const raw = sessionStorage.getItem("monis-rental");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  return (
    <div className="min-h-full bg-[#F5F3EE]">
      <Header step={3} />
      <main className="mx-auto w-full max-w-[1280px] px-5 py-8 md:px-8 md:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E3E9E1]">
              <Check className="h-7 w-7 text-[#5F705B]" strokeWidth={2.5} />
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#252525] md:text-5xl">
              Your workspace
              <br />
              is on its way!
            </h1>
            <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-[#6F6F68]">
              We have received your request and our team will get in touch shortly. Get ready
              to work, create, and enjoy your new space in Bali!
            </p>
            <div className="mt-6 flex max-w-[340px] flex-col gap-2.5">
              <Link
                href="/workspace"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#5F705B] px-6 text-[14px] font-semibold text-white transition hover:bg-[#4E5D4B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5F705B]"
              >
                Back to Workspace <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/checkout"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#DDDAD2] bg-white px-6 text-[14px] font-semibold text-[#252525] transition hover:border-[#5F705B] focus-visible:outline-2 focus-visible:outline-[#5F705B]"
              >
                <Home className="h-4 w-4" /> Review rental again
              </Link>
            </div>
          </div>
          <WorkspaceScene compact />
        </div>

        <section aria-label="Request summary" className="mt-8 grid gap-6 rounded-2xl border border-[#DDDAD2] bg-white p-5 md:p-7 lg:grid-cols-[1fr_1fr_220px]">
          <div>
            <h2 className="text-[14px] font-bold text-[#252525]">Your Workspace</h2>
            <p className="mb-3 text-[12px] text-[#6F6F68]">A focused setup for deep work.</p>
            <ul className="flex flex-col gap-2">
              {products.map((p) => (
                <li key={p.id} className="flex items-center gap-2.5">
                  <span className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#F5F3EE]">
                    <CatalogThumb id={p.id} category={p.category} />
                  </span>
                  <span className="flex-1 text-[12px] font-semibold text-[#252525]">{p.name}</span>
                  <span className="text-[12px] text-[#6F6F68]">
                    €{p.priceMonthly} <span className="text-[#A8A69E]">/ month</span>
                  </span>
                </li>
              ))}
              {products.length === 0 && (
                <li className="text-[13px] text-[#6F6F68]">No items recorded.</li>
              )}
            </ul>
          </div>
          <div className="border-t border-[#DDDAD2] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h2 className="mb-3 text-[14px] font-bold text-[#252525]">Rental Details</h2>
            <dl className="flex flex-col gap-3 text-[13px]">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-[#6F6F68]" />
                <div>
                  <dt className="text-[11px] text-[#A8A69E]">Start date</dt>
                  <dd className="font-semibold text-[#252525]">{rental?.startDate ?? "To be confirmed"}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[#6F6F68]" />
                <div>
                  <dt className="text-[11px] text-[#A8A69E]">Rental period</dt>
                  <dd className="font-semibold text-[#252525]">{rental?.period ?? "1 month"}</dd>
                </div>
              </div>
              {rental?.notes && (
                <div className="rounded-xl bg-[#F5F3EE] p-3 text-[12px] text-[#6F6F68]">
                  <span className="font-semibold text-[#252525]">Notes: </span>
                  {rental.notes}
                </div>
              )}
              <div className="flex gap-2 rounded-xl bg-[#F2F4F0] p-3 text-[12px] text-[#6F6F68]">
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[#5F705B]" />
                <p><span className="font-semibold text-[#252525]">Flexible rental.</span> We will confirm delivery after your request.</p>
              </div>
            </dl>
          </div>
          <div className="border-t border-[#DDDAD2] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-[12px] text-[#6F6F68]">Monthly total</p>
            <p className="text-3xl font-bold text-[#252525]">
              €{total} <span className="text-sm font-normal text-[#6F6F68]">/ month</span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-[12px] text-[#6F6F68]">
              <Truck className="h-4 w-4" /> Delivery and setup included
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
