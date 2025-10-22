import { PrismaClient } from "@prisma/client";

// Use a safe global variable to preserve the PrismaClient across module reloads in development
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
