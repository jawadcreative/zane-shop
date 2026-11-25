
import SearchBar from '@/components/SeacrhBar'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

async function ProductList({ searchParams }) {
    const { page } = await searchParams
    const currentPage = Math.max(1, Number(page) || 1)
    const limit = 16
    const skip = (currentPage - 1) * limit

    const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    )

    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }

    const data = await response.json()

    const products = data.products
    const totalPages = Math.ceil(data.total / limit)

    return (
        <main className="p-12 flex flex-col gap-6">
            <SearchBar />

            {/* Products */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="p-4 bg-foreground/10 rounded-xl">

                        <div className="h-32 w-32 mx-auto overflow-hidden rounded-3xl">
                            <Image
                                src={product.thumbnail}
                                width={100}
                                height={100}
                                alt={product.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <p className='text-xl'>{product.title}</p>
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

                {currentPage > 1 && (
                    <Link href={`/products?page=${currentPage - 1}`}>
                        Previous
                    </Link>
                )}

                <p>
                    Page {currentPage} of {totalPages}
                </p>

                {currentPage < totalPages && (
                    <Link href={`/products?page=${currentPage + 1}`}>
                        Next
                    </Link>
                )}

            </nav>
        </main>
    )
}


const Skeleton = () => {
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

export default function Products({ searchParams }) {
    return (
        <Suspense fallback={<Skeleton />}>
            <ProductList searchParams={searchParams} />
        </Suspense>
    )
}
