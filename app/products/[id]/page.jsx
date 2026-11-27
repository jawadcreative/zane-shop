import Button from "@/components/Button"
import AddToCartButton from "@/components/AddToCartButton"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export async function generateMetadata({ params }) {
    const { id } = await params
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) return {}
    const product = await res.json()

    const description = product.description.slice(0, 155)

    return {
        title: product.title,
        description,
        alternates: { canonical: `/products/${id}` },
        openGraph: {
            type: "website",
            siteName: "Zane Shop",
            title: `${product.title} | Zane Shop`,
            description,
            url: `/products/${id}`,
        },
    }
}

function ProductSkeleton() {
    return (
        <main className="flex min-h-screen w-full animate-pulse flex-col lg:flex-row">
            <div className="h-90 w-full bg-foreground/10 sm:h-105 lg:h-screen lg:w-1/2" />

            <div className="flex min-h-90 w-full flex-col items-center justify-center p-5 sm:p-8 lg:min-h-screen lg:w-1/2">
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
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: product.images?.length ? product.images : [product.thumbnail],
        description: product.description,
        sku: product.sku,
        category: product.category,
        ...(product.brand && {
            brand: { "@type": "Brand", name: product.brand },
        }),
        offers: {
            "@type": "Offer",
            url: `https://zane-shop.vercel.app/products/${id}`,
            price: product.price,
            priceCurrency: "USD",
            availability:
                product.stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
        },
        ...(product.reviews?.length && {
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviews.length,
            },
        }),
    }

    return (
        <main className="flex min-h-screen w-full flex-col lg:flex-row">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />

            <div className="relative h-90 w-full sm:h-105 lg:h-screen lg:w-1/2">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>

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