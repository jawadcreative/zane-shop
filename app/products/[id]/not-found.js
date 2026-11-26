// app/products/[id]/not-found.js
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductNotFound() {
  const { id } = useParams();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Product not found</h1>
      <p className="text-gray-500">
        We couldn&apos;t find a product with ID{" "}
        <span className="font-mono font-semibold">{id}</span>.
      </p>
      <Link
        href="/products"
        className="rounded-lg bg-black px-5 py-2 text-white hover:opacity-80"
      >
        Browse all products
      </Link>
    </div>
  );
}