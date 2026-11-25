import SearchBar from '@/components/SeacrhBar'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

async function ProductList({ searchParams }) {
    const params = await searchParams
    const search = params.search || ''
    const category = params.category || ''
    const page = Math.max(1, Number(params.page) || 1)

    const limit = 16
    const skip = (page - 1) * limit

    let url = 'https://dummyjson.com/products'

    if (search) {
        url += `/search?q=${encodeURIComponent(search)}`
    } else if (category) {
        url += `/category/${encodeURIComponent(category)}`
    }

    if (search && category) {
        url += '?limit=0'
    } else {
        url += `?limit=${limit}&skip=${skip}`
    }

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }

    const data = await response.json()

    let products = data.products
    let total = data.total

    if (search && category) {
        products = products.filter(product => product.category === category)

        total = products.length

        products = products.slice(skip, skip + limit)
    }

    const totalPages = Math.max(1, Math.ceil(total / limit))

    const getPageUrl = (pageNumber) => {
        const params = new URLSearchParams()

        if (search) params.set('search', search)
        if (category) params.set('category', category)

        params.set('page', pageNumber)

        return `/products?${params.toString()}`
    }

    return (
        <main className="p-12 flex flex-col gap-6">

            <SearchBar search={search} category={category} />

            {/* Products */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <Link href={`/products/${product.id}`} key={product.id} className="p-4 bg-foreground/10 rounded-xl">

                        <div className="h-32 w-32 mx-auto overflow-hidden rounded-3xl">
                            <Image
                                src={product.thumbnail}
                                width={100}
                                height={100}
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

                    </Link>
                ))}
            </section>

            {/* No products found */}
            {products.length === 0 && (
                <p className="text-center">No products found.</p>
            )}

            {/* Pagination */}
            <nav className="flex justify-center items-center gap-6">

                {page > 1 && (
                    <Link href={getPageUrl(page - 1)}>
                        Previous
                    </Link>
                )}

                <p>Page {Math.min(page, totalPages)} of {totalPages}</p>

                {page < totalPages && (
                    <Link href={getPageUrl(page + 1)}>
                        Next
                    </Link>
                )}
            </nav>
        </main>
    )
}

function Skeleton() {
    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-12 pt-28">
            {Array.from({ length: 16 }).map((_, index) => (
                <div key={index} className="p-4 bg-foreground/10 rounded-xl animate-pulse">

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

export default function Products({ searchParams }) {
    return (
        <Suspense fallback={<Skeleton />}>
            <ProductList searchParams={searchParams} />
        </Suspense>
    )
}
