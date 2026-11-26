
import Button from "@/components/Button"
import Image from "next/image"
import { Suspense } from "react"

function ProductSkeleton() {
    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full md:w-1/2 h-[400px] md:h-screen bg-foreground/10" />

            {/* Details Skeleton */}
            <div className="w-full md:w-1/2 min-h-[400px] md:min-h-screen flex flex-col items-center justify-center p-6">
                <div className="flex flex-col gap-3 w-full max-w-md">
                    <div className="h-4 w-24 rounded bg-foreground/20" />
                    <div className="h-8 w-full rounded bg-foreground/20" />
                    <div className="h-4 w-16 rounded bg-foreground/20" />
                    <div className="mt-8 h-20 w-full rounded bg-foreground/20" />
                    <div className="mt-4 h-8 w-24 rounded bg-foreground/20" />
                </div>
            </div>
        </main>
    )
}

export default function ProductPage({ params }) {
    return (
        <Suspense fallback={<ProductSkeleton />}>
            <ProductDetails params={params} />
        </Suspense>
    )
}

async function ProductDetails({ params }) {
    const { id } = await params

    const response = await fetch(
        `https://dummyjson.com/products/${id}`
    )

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`)
    }

    const product = await response.json()

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row">

            {/* Product Image */}
            <div className="relative w-full md:w-1/2 h-[400px] md:h-screen">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-10">
                <div className="flex flex-col gap-2 w-full max-w-md">

                    <p className="text-sm text-foreground/60 capitalize">
                        {product.category}
                    </p>

                    <h1 className="text-3xl font-bold">
                        {product.title}
                    </h1>

                    <p>⭐ {product.rating}</p>

                    <p className="mt-6 text-foreground/70">
                        {product.description}
                    </p>

                    <p className="mt-4 text-2xl font-bold">
                        ${product.price}
                    </p>

                    <div className="flex flex-wrap gap-3 items-center mt-6">
                        <Button text="Add to cart" />
                        <Button text="Buy now" />
                    </div>

                </div>
            </div>
        </main>
    )
}
