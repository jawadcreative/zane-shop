const BASE = "https://zane-shop.vercel.app";

export default async function sitemap() {
    const res = await fetch("https://dummyjson.com/products?limit=0&select=id");
    const { products } = await res.json();

    return [
        { url: BASE, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE}/products`, changeFrequency: "daily", priority: 0.8 },
        ...products.map((p) => ({
            url: `${BASE}/products/${p.id}`,
            changeFrequency: "weekly",
            priority: 0.7,
        })),
    ];
}