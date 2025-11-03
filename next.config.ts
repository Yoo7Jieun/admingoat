import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		// Ensure Prisma native engines are handled correctly in RSC/server functions
		serverComponentsExternalPackages: ["@prisma/client", "prisma"],
	},
};

export default nextConfig;
