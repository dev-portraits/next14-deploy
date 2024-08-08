import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "rc-tooltip/assets/bootstrap.css";
import StoreProvider from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "mindIt",
  description: "we provide best products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <StoreProvider>
          <div>{children}</div>
      </StoreProvider>
      </body>
    </html>
  );
}