import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import Sheader from "@/components/Sheader";
import Uheader from "@/components/Uheader";
import Footer from "@/components/Footer";
import { ProductProvider } from "@/context/ProductContext";
import WhatsAppButton from "@/components/Whatup";
import Notification from "@/components/Notification";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      
      <body className={inter.className}>
      <CartProvider>
        <ProductProvider>
        <Sheader/>
      
      <Uheader/>
      <Notification/>
       {children}
       <WhatsAppButton/>
       <Footer/>
       </ProductProvider>
       </CartProvider>
       </body>
      

    </html>
  );
}
