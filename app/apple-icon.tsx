import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1d4ed8 52%, #22c55e 100%)",
        }}
      >
        <div
          style={{
            width: 138,
            height: 138,
            borderRadius: 32,
            background: "rgba(255,255,255,0.12)",
            border: "4px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 18,
              border: "10px solid white",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}