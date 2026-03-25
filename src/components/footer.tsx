import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="py-8 px-4">
      <Separator className="bg-zinc-800 mb-8" />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Tony Mendes. All rights reserved.
        </p>
        <p className="text-zinc-600 text-sm">
          Motion Designer &amp; 3D Artist
        </p>
      </div>
    </footer>
  );
}
