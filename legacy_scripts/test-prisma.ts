import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as dotenv from 'dotenv';
dotenv.config();

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.client.count();
  console.log("Count:", count);
}
main().catch(console.error);
