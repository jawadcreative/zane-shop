import Button from "@/components/Button"
import AddToCartButton from "@/components/AddToCartButton"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"

function ProductSkeleton() {
    return (
        <main className="flex min-h-screen w-full animate-pulse flex-col lg:flex-row">
            {/* Image Skeleton */}
            <div className="h-[360px] w-full bg-foreground/10 sm:h-[420px] lg:h-screen lg:w-1/2" />

            {/* Details Skeleton */}
            <div className="flex min-h-[360px] w-full flex-col items-center justify-center p-5 sm:p-8 lg:min-h-screen lg:w-1/2">
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

    if (response.status === 404) {
        notFound()
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`)
    }

    const product = await response.json()

    return (
        <main className="flex min-h-screen w-full flex-col lg:flex-row">

            {/* Product Image */}
            <div className="relative h-[360px] w-full sm:h-[420px] lg:h-screen lg:w-1/2">
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
            <div className="flex w-full flex-col items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2 lg:p-10">
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
                        <AddToCartButton
                            product={{
                                id: product.id,
                                name: product.title,
                                price: product.price,
                                image: product.thumbnail,
                            }}
                        />
                        <Button text="Buy now" />
                    </div>

                </div>
            </div>
        </main>
    )
}