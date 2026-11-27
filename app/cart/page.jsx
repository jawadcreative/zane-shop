"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter()
    const {
        cart,
        loaded,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
    } = useCart();


    if (!loaded) return <div className="p-10 h-screen w-full flex items-center justify-center">Loading cart...</div>;

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

    const handleClick = () => {
        clearCart()
        router.push('/checkout')
    }

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
            <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

            <div className="flex flex-col gap-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-lg border p-3 sm:flex sm:gap-4 sm:p-4"
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-16 w-16 rounded object-cover sm:h-20 sm:w-20"
                        />

                        <div className="min-w-0 flex-1">
                            <h2 className="line-clamp-2 font-semibold">{item.name}</h2>
                            <p className="text-gray-500">${item.price}</p>
                        </div>

                        <div className="col-span-2 flex items-center justify-between sm:ml-auto sm:col-span-1 sm:justify-start sm:gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    aria-label={`Decrease quantity of ${item.name}`}
                                    className="h-8 w-8 rounded border cursor-pointer"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => increaseQty(item.id)}
                                    aria-label={`Increase quantity of ${item.name}`}
                                    className="h-8 w-8 rounded border cursor-pointer"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 cursor-pointer"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <button onClick={clearCart} className="text-gray-500 underline cursor-pointer">
                    Clear cart
                </button>
                <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <button onClick={handleClick} className="mt-4 w-full cursor-pointer bg-white px-4 py-3 text-black active:scale-95">Complete order ${totalPrice.toFixed(2)}</button>
        </main>
    );
}