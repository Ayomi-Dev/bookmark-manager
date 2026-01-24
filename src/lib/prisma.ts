import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as { //creates a prisma singleton
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ["error", "warn"]
});


if(process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma
}