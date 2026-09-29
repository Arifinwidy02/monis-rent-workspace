import Header from "@/components/layout/Header";
import WorkspaceBuilder from "@/components/workspace/WorkspaceBuilder";

export const metadata = {
  title: "Build your workspace | Monis.rent",
  description: "Design a workspace around how you work, then rent everything together in Bali.",
};

export default function WorkspacePage() {
  return (
    <div className="min-h-full bg-[#F5F3EE]">
      <Header step={1} />
      <main className="mx-auto w-full max-w-[1280px] px-5 py-6 md:px-8 md:py-8">
        <WorkspaceBuilder />
      </main>
    </div>
  );
}
