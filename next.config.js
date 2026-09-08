/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	async headers() {
		return [
			{
				source: "/:path*",
					headers: [
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'none'",
							"img-src 'self' data: blob:",
							"media-src 'self'",
							"object-src 'none'",
							"script-src 'self' 'unsafe-inline'",
							"style-src 'self' 'unsafe-inline'",
							"upgrade-insecure-requests",
						].join("; "),
					},
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{ key: "Strict-Transport-Security", value: "max-age=63072000" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
					{ key: "Cross-Origin-Resource-Policy", value: "same-origin" },
					{
						key: "Permissions-Policy",
						value: "camera=(), geolocation=(), microphone=()",
					},
				],
			},
			{
				source: "/media/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=604800",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
