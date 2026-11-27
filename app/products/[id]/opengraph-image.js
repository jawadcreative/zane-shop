import { ImageResponse } from "next/og";

export const alt = "Product preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const product = await fetch(`https://dummyjson.com/products/${id}`).then((r) => r.json());

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "white" }}>
        <img src={product.thumbnail} width={630} height={630} style={{ objectFit: "cover" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 48 }}>
          <div style={{ fontSize: 28, color: "#666" }}>{product.category}</div>
          <div style={{ fontSize: 56, fontWeight: 700 }}>{product.title}</div>
          <div style={{ fontSize: 48, marginTop: 24 }}>${product.price}</div>
        </div>
      </div>
    ),
    size
  );
}