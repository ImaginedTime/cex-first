import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "CEX FIRST | The Ultimate Party Experience",
	description: "Join us for the most epic gathering of legends at CEX FIRST. March 29th, 2025 • 7PM Onwards • C-Extension First Floor, RP Hall",
	openGraph: {
		title: "CEX FIRST | The Ultimate Party Experience",
		description: "Join us for the most epic gathering of legends at CEX FIRST. March 29th, 2025 • 7PM Onwards • C-Extension First Floor, RP Hall",
		images: [
			{
				url: "/images/Cex First.png",
				width: 1200,
				height: 630,
				alt: "CEX FIRST Event Poster"
			}
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "CEX FIRST | The Ultimate Party Experience",
		description: "Join us for the most epic gathering of legends at CEX FIRST. March 29th, 2025 • 7PM Onwards",
		images: ["/images/Cex First.png"],
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<Toaster
					position="top-center"
					toastOptions={{
						style: {
							background: "#1a1a1a",
							color: "#f79a24",
							border: "1px solid #f79a24",
						},
					}}
				/>
			</body>
		</html>
	);
}
