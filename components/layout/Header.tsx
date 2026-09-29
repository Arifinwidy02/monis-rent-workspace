import Link from "next/link";
import { Leaf, MapPin } from "lucide-react";

export default function Header({ step }: { step: 1 | 2 }) {
  return (
    <header className="border-b border-[#DDDAD2] bg-[#F5F3EE]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/workspace" className="flex items-center gap-2" aria-label="Monis.rent home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5F705B] text-white">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-serif text-xl font-bold text-[#252525]">Monis.rent</span>
        </Link>

        <nav aria-label="Progress" className="hidden items-center gap-3 text-[13px] font-medium sm:flex">
          <span className={`flex items-center gap-1.5 ${step >= 1 ? "text-[#252525]" : "text-[#A8A69E]"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${step >= 1 ? "bg-[#5F705B] text-white" : "border border-[#DDDAD2]"}`}>1</span>
            Build
          </span>
          <span className="h-px w-10 bg-[#DDDAD2]" />
          <span className={`flex items-center gap-1.5 ${step >= 2 ? "text-[#252525]" : "text-[#A8A69E]"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${step >= 2 ? "bg-[#5F705B] text-white" : "border border-[#DDDAD2]"}`}>2</span>
            Review and Request
          </span>
        </nav>

        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6F6F68]">
          <MapPin className="h-3.5 w-3.5" /> Bali, Indonesia
        </span>
      </div>
    </header>
  );
}
