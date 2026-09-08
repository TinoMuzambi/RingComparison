import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: "https://comparison-psi.vercel.app/sitemap.xml",
	};
}
