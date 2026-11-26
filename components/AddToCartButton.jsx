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
        className="rounded-lg bg-black px-6 py-3 text-white hover:opacity-80 cursor-pointer"
      >
        Add to cart
      </button>
      {showMessage && (
        <div className="fixed right-4 bottom-4 bg-foreground text-background p-4 flex items-center justify-center">
          <p>Add to cart successfully.</p>
        </div>
      )}
    </>

  );
}