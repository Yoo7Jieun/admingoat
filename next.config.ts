import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Explicitly include Prisma engine binaries in the deployment bundle
	outputFileTracingIncludes: {
		"/**": ["./node_modules/.prisma/client/**/*", "./node_modules/@prisma/client/**/*"],
	},
};

export default nextConfig;
