import { Pool, types } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

// Handle BigInt for JSON serialization if needed
types.setTypeParser(20, (val) => parseInt(val, 10));

const isBuild =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

// Debug env keys
const envKeys = Object.keys(process.env).filter(k => k.includes("URL"));
console.log(`[Prisma] Env check: Vercel=${isVercel}, Build=${isBuild}, keys=[${envKeys.join(", ")}]`);

// Environment-specific connection string selection
let connectionString = isVercel 
  ? process.env.DATABASE_URL 
  : (process.env.DIRECT_URL || process.env.DATABASE_URL);

// On Vercel, force Session Mode (port 5432) for build stability
if (isVercel && connectionString?.includes(":6543")) {
  console.log("[Prisma] Vercel detected: Forcing Session Mode (port 5432) for build stability");
  try {
    const url = new URL(connectionString);
    url.port = "5432";
    url.searchParams.delete("pgbouncer");
    url.searchParams.delete("connection_limit");
    connectionString = url.toString();
  } catch (e) {
    connectionString = connectionString.replace(":6543", ":5432").replace("pgbouncer=true", "pgbouncer=false");
  }
}





function createPool() {
  if (!connectionString) {
    console.error("No database URL defined in environment variables");
    return new Pool();
  }

  try {
    const urlObj = new URL(connectionString);
    const host = urlObj.hostname;
    const port = urlObj.port || "5432";
    const isDirect = host.includes("db.fkwdzlfliskjhenbskvm.supabase.co");
    console.log(`[Prisma] Selected: ${host}:${port} (Direct: ${isDirect}, Build: ${isBuild}, Vercel: ${isVercel})`);
  } catch (e) {
    console.log(`[Prisma] Selected: (raw) (Build: ${isBuild}, Vercel: ${isVercel})`);
  }


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



