export default function robots() {
    return {
        rules: { userAgent: "*", allow: "/", disallow: ["/cart"] },
        sitemap: "https://zane-shop.vercel.app/sitemap.xml",
    };
}