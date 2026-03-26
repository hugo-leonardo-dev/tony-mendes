import { Pool, types } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

// Handle BigInt for JSON serialization if needed
types.setTypeParser(20, (val) => parseInt(val, 10));

const isBuild =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.NODE_ENV === "production";

// Debug env keys
const envKeys = Object.keys(process.env).filter(k => k.includes("URL"));
console.log(`[Prisma] Available URL env keys: ${envKeys.join(", ")}`);

// Prioritize DIRECT_URL
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;


function createPool() {
  if (!connectionString) {
    console.error("No database URL defined in environment variables");
    return new Pool();
  }

  const host = connectionString.split("@")[1]?.split(":")[0];
  const isDirect = connectionString.includes("db.fkwdzlfliskjhenbskvm.supabase.co");
  console.log(`[Prisma] Selected connection: ${host} (IsDirect: ${isDirect}, Build: ${isBuild})`);

  return new Pool({
    connectionString,
    ssl: connectionString.includes("supabase") ? { rejectUnauthorized: false } : false,
    max: isBuild ? 1 : 10,
    connectionTimeoutMillis: 60000,
    idleTimeoutMillis: 60000,
  });
}



const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  adapter: PrismaPg | undefined;
};

if (!globalForPrisma.pool) {
  globalForPrisma.pool = createPool();
}

if (!globalForPrisma.adapter) {
  globalForPrisma.adapter = new PrismaPg(globalForPrisma.pool as any);
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: globalForPrisma.adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}



