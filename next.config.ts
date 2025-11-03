import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Ensure Prisma native engines are bundled correctly in server functions
	serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
