async function categoryList() {
    const response = await fetch('https://dummyjson.com/products/categories', {
        next: { revalidate: 3600 },
    })

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
    }

    return response.json()
}

const SeacrhBar = async ({ search = '', category = '' }) => {
    const categories = await categoryList()

    return (
        <form action="/products" method="get" className="w-full flex flex-wrap gap-3 items-center">
            <input
                placeholder="Search products..."
                type="search"
                name="search"
                id="searchBar"
                defaultValue={search}
                className="py-2 px-6 flex-1 min-w-48 border border-foreground/40 outline-none rounded-full"
            />
            <select
                name="category"
                id="category"
                defaultValue={category}
                className="p-2 border border-foreground/40 rounded-md outline-none bg-background text-foreground"
            >
                <option value="">All categories</option>
                {categories.map(item => (
                    <option key={item.slug} value={item.slug}>
                        {item.name}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="px-6 py-2 rounded-full bg-foreground text-background"
            >
                Search
            </button>
        </form>
    )
}

export default SeacrhBar