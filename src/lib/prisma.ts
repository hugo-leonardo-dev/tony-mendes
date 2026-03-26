import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

function createPool() {
  if (!connectionString) return new Pool();
  
  try {
    const url = new URL(connectionString);
    const config = {
      user: url.username,
      password: url.password,
      host: url.hostname,
      port: parseInt(url.port),
      database: url.pathname.slice(1),
      ssl: connectionString.includes('supabase') ? { rejectUnauthorized: false } : undefined,
    };
    
    console.log(`Connecting to Postgres as ${config.user} on ${config.host}:${config.port}`);
    return new Pool(config);
  } catch (e) {
    console.error("Failed to parse connection string, falling back to string-based pool");
    return new Pool({ connectionString });
  }
}

const pool = createPool();
const adapter = new PrismaPg(pool as any);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
