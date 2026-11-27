"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartIcon() {
    const { totalItems, loaded } = useCart();

    return (
        <Link href="/cart" className="relative inline-block ">
            <span className="rotate-y-180 inline-block">🛒</span>
            {loaded && totalItems > 0 && (
                <span className="absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] text-background">
                    {totalItems > 99 ? "99+" : totalItems}
                </span>
            )}
        </Link>
    );
}