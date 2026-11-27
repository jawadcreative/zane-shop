import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "./context/CartContext";
// import Preloader from "@/components/Preloader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://zane-shop.vercel.app"),
  title: {
    default: "Zane Shop | Beauty, Gadgets and Grocery",
    template: "%s | Zane Shop",
  },
  description: "We provide everything related to beauty items phones, gadgets, tablets, Grocery, Furniture, Fragrances, Vegetables, Fruits, Cool drinks, Milk, Gyms item, Microwave Oven, Macbook, T-shirts, Airpods, monopode, selfie-stick, self lamp, tv studio camera, heavy bikes, sanitizer, bat, ball, gloves, pad, helmet, basketball, baseball, feature shuttlecock, golf ball, tennis ball, metal base ball bat, iron golf, sunglasses, dresses, bags, heel, women watches, american football, football, basketball rim, Crockery and Watches",
  openGraph: {
    type: "website",
    siteName: "Zane Shop",
    images: [
      { url: "/og/default.png", width: 1200, height: 630, alt: "Zane Shop" },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <Preloader /> */}
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
