import { Inter } from "next/font/google";
import "../app/css/globals.css";
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fintech",
  description: "A finance manage app created by Innovation for Impact at the University of Michigan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>
          {children}
        </CookiesProvider> 
      </body>
    </html>
  );
}
