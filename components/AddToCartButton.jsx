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
        className="relative inline-block px-12 py-2 bg-background text-foreground cursor-pointer before:absolute before:inset-0 before:bg-foreground before:transition-transform before:duration-300 before:scale-x-0 before:origin-left hover:before:scale-x-100 hover:text-background before:z-10 border border-foreground">
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