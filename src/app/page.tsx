import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectGallery } from "@/components/project-gallery";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailUrl: true,
      tags: true,
      year: true,
    },
  });

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />
      <ProjectGallery projects={projects} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
