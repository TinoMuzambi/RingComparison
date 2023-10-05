import type { Metadata } from "next";
import Navbar from "../components/layout/navbar";

import "./globals.css";

export const metadata: Metadata = {
	title: "Comparisons",
	description: "Ring comparisons",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="container mx-auto py-4 px-8">
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
