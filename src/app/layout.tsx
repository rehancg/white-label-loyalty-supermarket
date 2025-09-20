import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider, CustomThemeProvider } from "@/theme";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import Layout from "@/components/layout/Layout";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "White Label Loyalty Supermarket",
  description:
    "Your trusted local supermarket with great deals and loyalty rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} antialiased`}>
        <ThemeContextProvider>
          <CustomThemeProvider>
            <QueryProvider>
              <ReduxProvider>
                <Layout>{children}</Layout>
              </ReduxProvider>
            </QueryProvider>
          </CustomThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
