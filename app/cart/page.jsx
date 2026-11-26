"use client";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
    const {
        cart,
        loaded,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
    } = useCart();

    if (!loaded) return <p className="p-10">Loading cart...</p>;

    if (cart.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Link href="/products" className="underline">
                    Browse products
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

            <div className="flex flex-col gap-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-lg border p-4"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded object-cover"
                        />

                        <div className="flex-1">
                            <h2 className="font-semibold">{item.name}</h2>
                            <p className="text-gray-500">${item.price}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => decreaseQty(item.id)}
                                className="h-8 w-8 rounded border"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => increaseQty(item.id)}
                                className="h-8 w-8 rounded border"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <button onClick={clearCart} className="text-gray-500 underline">
                    Clear cart
                </button>
                <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
}