import Button from "@/components/Button"
import Image from "next/image"

export default async function ProductPage({ params }) {
    const { id } = await params

    const response = await fetch(`https://dummyjson.com/products/${id}`)

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`)
    }

    const product = await response.json()

    return (
        <main className="h-screen w-full flex">
            <div className="w-1/2 h-full">
                <Image src={product.thumbnail} height={300} width={300} alt={product.title} className="h-full w-full" />
            </div>
            <div className="h-screen w-1/2 flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2">
                    <p>{product.category}</p>
                    <p className="text-3xl font-bold w-md">{product.title}</p>
                    <p>⭐ {product.rating}</p>
                    <p className="w-md mt-10">{product.description}</p>
                    <p className="mt-4 text-2xl">$ {product.price}</p>
                    <div className="flex gap-3 items-center mt-6">
                        <Button text={'Add to card'}/>
                        <Button text={'Buy now'}/>
                    </div>
                </div>
            </div>
        </main>
    )
}