import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Header, Main } from "@/widgets";
import { I18nProvider, QueryProvider, ThemeProvider } from "./_providers";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Dating",
  description: "Dating main page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <QueryProvider>
            <I18nProvider>
              <div className="flex flex-col justify-between min-h-screen">
                <Header />
                <Main>{children}</Main>
                <Footer />
              </div>
            </I18nProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
