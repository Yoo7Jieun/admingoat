import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Ensure Prisma native engines are bundled correctly in server functions
	serverExternalPackages: ["@prisma/client", "prisma"],

	// Ensure Prisma engine files are included in output tracing for deployment
	outputFileTracingIncludes: {
		"/api/**/*": ["./node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node"],
		"/responses": ["./node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node"],
	},
};

export default nextConfig;
