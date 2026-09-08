import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";

import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://comparison-psi.vercel.app"),
	title: {
		default: "Ring Ledger",
		template: "%s | Ring Ledger",
	},
	description:
		"Compare South African engagement-ring and wedding-band quotes in one transparent research ledger.",
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		title: "Ring Ledger",
		description:
			"A transparent comparison of South African ring quotes and their trade-offs.",
		url: "/",
		siteName: "Ring Ledger",
	},
	twitter: {
		card: "summary",
		title: "Ring Ledger",
		description:
			"A transparent comparison of South African ring quotes and their trade-offs.",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en-ZA">
			<body>
				<a className="skip-link" href="#results">
					Skip to results
				</a>
				<Navbar />
				{children}
				<footer className="site-footer">
					<p>Built as a transparent decision log, not retail advice.</p>
					<p>Quotes last updated December 2025.</p>
				</footer>
			</body>
		</html>
	);
}
