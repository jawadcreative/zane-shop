import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

async function ProductList({ searchParams }) {
    const params = await searchParams

    const limit = 16
    const page = Math.max(1, Number(params.page) || 1)
    const skip = (page - 1) * limit

    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
    }

    const data = await response.json()

    const products = data.products
    const totalPages = Math.ceil(data.total / limit)

    // Pagination URL
    function getPageUrl(pageNumber) {
        return `/products?page=${pageNumber}`
    }

    return (
        <main className="p-12 flex flex-col gap-6">

            {/* Products */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {products.map(product => (
                    <div
                        key={product.id}
                        className="p-4 bg-foreground/10 rounded-xl"
                    >
                        <div className="h-32 w-32 mx-auto overflow-hidden rounded-3xl">
                            <Image
                                src={product.thumbnail}
                                width={150}
                                height={150}
                                alt={product.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <p className="text-xl">{product.title}</p>
                        <p className="text-xs">{product.category}</p>

                        <div className="mt-3 flex justify-between">
                            <p>${product.price}</p>
                            <p>⭐ {product.rating}</p>
                        </div>
                    </div>
                ))}

            </section>

            {/* Pagination */}
            <nav className="flex justify-center items-center gap-6">

                {page > 1 && (
                    <Link href={getPageUrl(page - 1)}>
                        Previous
                    </Link>
                )}

                <p>
                    Page {page} of {totalPages}
                </p>

                {page < totalPages && (
                    <Link href={getPageUrl(page + 1)}>
                        Next
                    </Link>
                )}

            </nav>

        </main>
    )
}


// Skeleton Loading
function Skeleton() {
    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-12 pt-28">

            {Array.from({ length: 16 }).map((_, index) => (
                <div
                    key={index}
                    className="p-4 bg-foreground/10 rounded-xl animate-pulse"
                >
                    <div className="h-32 w-32 mx-auto rounded-3xl bg-foreground/20" />

                    <div className="mt-4 h-4 w-3/4 rounded bg-foreground/20" />

                    <div className="mt-2 h-3 w-1/2 rounded bg-foreground/20" />

                    <div className="mt-4 flex justify-between">
                        <div className="h-4 w-12 rounded bg-foreground/20" />
                        <div className="h-4 w-12 rounded bg-foreground/20" />
                    </div>
                </div>
            ))}

        </section>
    )
}


// Main Page
export default function Products({ searchParams }) {
    return (
        <Suspense fallback={<Skeleton />}>
            <ProductList searchParams={searchParams} />
        </Suspense>
    )
}
