import Model from "@/components/Model";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Trello Appwrite Clone",
	description: "Generated by Shadab",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='bg-[#F5F6F8]'>
				{children}
				<Model />
			</body>
		</html>
	);
}
