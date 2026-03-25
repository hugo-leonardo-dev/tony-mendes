import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";
import path from "path";

// In Prisma 7, the adapter takes an options object with the url
const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || "tony@tonymendes.com";
  const password = process.env.ADMIN_PASSWORD || "Tony@2024!";
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Tony Mendes",
      password: hashedPassword,
    },
  });

  console.log(`Admin user created/found: ${user.email}`);

  // Seed some example projects
  const projects = [
    {
      title: "Neon Dreams",
      description:
        "A vibrant 3D animation exploring futuristic cityscapes with neon-lit environments. This project combines procedural generation with hand-crafted details to create an immersive cyberpunk world.",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      tags: "3D, Animation, Cyberpunk",
      tools: "Blender, After Effects",
      year: "2024",
      client: "Personal Project",
      published: true,
    },
    {
      title: "Liquid Motion",
      description:
        "Fluid simulation meets abstract art in this experimental piece. Using advanced particle systems and custom shaders, every frame is a unique composition of color and movement.",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      tags: "VFX, Simulation, Abstract",
      tools: "Houdini, Redshift",
      year: "2024",
      client: "Studio Flux",
      published: true,
    },
    {
      title: "Geometric Bloom",
      description:
        "An exploration of sacred geometry through motion design. Intricate patterns unfold and transform in a meditative loop, combining mathematical precision with organic growth.",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      tags: "Motion Design, 3D, Loop",
      tools: "Cinema 4D, Octane",
      year: "2023",
      client: "ArtStation Challenge",
      published: true,
    },
    {
      title: "Chrome Reflections",
      description:
        "A study in reflective materials and lighting. Chrome surfaces interact with colorful environments, creating mesmerizing visual effects through real-time ray tracing.",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      tags: "3D, Materials, Lighting",
      tools: "Blender, EEVEE",
      year: "2023",
      published: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log(`Seeded ${projects.length} projects`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
