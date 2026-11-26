import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

const LIMIT = 16

function ProductSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                    <div className="h-56 bg-foreground/10 rounded-lg" />
                    <div className="h-5 w-3/4 bg-foreground/10 rounded" />
                    <div className="h-4 w-1/4 bg-foreground/10 rounded" />
                </div>
            ))}
        </div>
    )
}

async function ProductList({ searchParams }) {
    const params = await searchParams

    const search = typeof params.search === 'string'
        ? params.search.trim()
        : ''

    const page = Math.max(1, Number(params.page) || 1)

    const url = search
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${LIMIT}&skip=${(page - 1) * LIMIT}`
        : `https://dummyjson.com/products?limit=${LIMIT}&skip=${(page - 1) * LIMIT}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
    }

    const { products, total } = await response.json()

    const totalPages = Math.ceil(total / LIMIT)

    return (
        <>
            {/* Products */}
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {products.map((item) => (
                        <Link
                            href={`/products/${item.id}`}
                            key={item.id}
                            className="group"
                        >
                            <div className="relative h-64 bg-foreground/5 rounded-lg overflow-hidden">
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <h2 className="font-semibold mt-3">
                                {item.title}
                            </h2>

                            <p className="text-foreground/60 text-sm capitalize">
                                {item.category}
                            </p>

                            <div className="flex items-center justify-between">
                                <p className="font-bold mt-2">
                                    ${item.price}
                                </p>
                                <p>⭐ {item.rating}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <h2 className="text-2xl font-bold">
                        No products found
                    </h2>
                    <p className="text-foreground/60 mt-2">
                        Try searching for another product.
                    </p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <Link
                        href={`/products?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                        className={`px-4 py-2 border rounded ${page === 1
                            ? 'pointer-events-none opacity-40'
                            : ''
                            }`}
                        aria-disabled={page === 1}
                    >
                        Previous
                    </Link>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <Link
                        href={`/products?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                        className={`px-4 py-2 border rounded ${page >= totalPages
                            ? 'pointer-events-none opacity-40'
                            : ''
                            }`}
                        aria-disabled={page >= totalPages}
                    >
                        Next
                    </Link>
                </div>
            )}
        </>
    )
}

export default function ProductsPage({ searchParams }) {
    return (
        <main className="px-5 pt-16">

            {/* Heading and Search */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mb-10">
                <h1 className="text-3xl font-bold">
                    All Products
                </h1>

                <SearchBar />
            </div>

            {/* Product List */}
            <Suspense fallback={<ProductSkeleton />}>
                <ProductList searchParams={searchParams} />
            </Suspense>

        </main>
    )
}