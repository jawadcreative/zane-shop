"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const router = useRouter()

    function handleSearch(e) {
        e.preventDefault()

        if (!search.trim()) return

        router.push(`/products?search=${encodeURIComponent(search.trim())}`)
    }

    return (
        <form onSubmit={handleSearch} className="flex w-full gap-2 sm:w-auto">
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="min-w-0 flex-1 border border-foreground/40 p-2 outline-none sm:w-64 sm:flex-none"
            />

            <button type="submit" className="shrink-0 cursor-pointer border border-foreground bg-foreground px-4 py-2 text-background sm:px-6">Search</button>
        </form>
    )
}

export default SearchBar