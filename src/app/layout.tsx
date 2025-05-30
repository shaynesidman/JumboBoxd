import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
    title: "JumboBoxd",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <div className="max-w-4xl mx-auto px-12">
                        <NavBar />
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
