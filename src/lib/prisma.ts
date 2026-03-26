import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

// Prefer DATABASE_URL for Vercel/Production as it often uses the pooler (IPv4 compatible)
const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

function createPool() {
  if (!connectionString) {
    console.error("No database URL defined in environment variables");
    return new Pool();
  }
  
  const isSupabase = connectionString.includes('supabase');
  
  // Use explicit config for Supabase to avoid IPv6/IPv4 and SSL issues
  if (isSupabase) {
    try {
      const url = new URL(connectionString);
      return new Pool({
        user: url.username,
        password: url.password,
        host: url.hostname,
        port: parseInt(url.port || "5432"),
        database: url.pathname.slice(1),
        ssl: { rejectUnauthorized: false },
        // Connection timeout to avoid hanging build
        connectionTimeoutMillis: 10000,
      });
    } catch (e) {
      return new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
    }
  }

  return new Pool({ connectionString });
}

console.log(`Connecting to database...`);
const pool = createPool();
const adapter = new PrismaPg(pool as any);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
