import { PrismaClient } from "./src/generated/prisma";
import { config } from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

config();

async function main() {
  const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
  console.log("Using URL:", url?.split('@')[1]);
  
  const pool = new Pool({ 
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  });
  const adapter = new PrismaPg(pool as any);
  const prisma = new PrismaClient({ adapter });

  try {
    const total = await prisma.project.count();
    const published = await prisma.project.count({ where: { published: true } });
    const unpublished = await prisma.project.count({ where: { published: false } });
    
    console.log("Total projects:", total);
    console.log("Published projects:", published);
    console.log("Unpublished projects:", unpublished);
    
    if (total > 0) {
      const first = await prisma.project.findFirst();
      console.log("First project found:", first?.title);
    }
  } catch (error: any) {
    console.error("Query failed:", error.message || error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
