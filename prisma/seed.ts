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
  // Projects seeding removed as requested
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
