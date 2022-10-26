import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../assets/Urbanist-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const fontData = await font;
    const { searchParams } = new URL(req.url);
    const hasName = searchParams.has("name");
    const name = hasName ? searchParams.get("name")?.slice(0, 100) : "estranho";

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 72,
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            background:
              "linear-gradient(104.04deg, #FF3156 0%, #BD77EB 48.96%, #F8E533 100%)",
          }}
        >
          Fala aê, {name}!
        </div>
      ),
      {
        width: 600,
        height: 600,
        fonts: [
          {
            name: "Urbanist",
            data: fontData,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
