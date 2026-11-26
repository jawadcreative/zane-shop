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
        <form onSubmit={handleSearch} className="flex gap-2">
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="p-2 border outline-none border-foreground/40"
            />

            <button type="submit" className="px-6 py-2 bg-foreground text-background border border-foreground cursor-pointer">Search</button>
        </form>
    )
}

export default SearchBar