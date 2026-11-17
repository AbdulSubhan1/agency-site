import { currentBrand } from "@/lib/brand";

// A placeholder until the content (phase 2) and the design (phase 3) land.
export default function Home() {
  const brand = currentBrand();
  return (
    <main className="mx-auto grid w-full max-w-3xl flex-1 content-center gap-3 px-4 py-16 md:px-8">
      <p className="text-sm text-muted">Brand: {brand}</p>
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
        We help businesses streamline their processes with AI.
      </h1>
    </main>
  );
}
