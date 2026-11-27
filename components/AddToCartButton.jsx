"use client";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!showMessage) return;

    const timer = setTimeout(() => setShowMessage(false), 2000);
    return () => clearTimeout(timer);
  }, [showMessage]);

  function handleClick() {
    addToCart(product);
    setShowMessage(true);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="relative inline-block border border-foreground bg-background px-8 py-2 text-foreground cursor-pointer before:absolute before:inset-0 before:z-10 before:origin-left before:scale-x-0 before:bg-foreground before:transition-transform before:duration-300 hover:text-background hover:before:scale-x-100 sm:px-12">
        <span className="relative z-10">Add to cart</span>
      </button>
      {showMessage && (
        <div className="fixed right-4 bottom-4 z-60 bg-foreground text-background p-4 flex items-center justify-center">
          <p>Add to cart successfully.</p>
        </div>
      )}
    </>

  );
}