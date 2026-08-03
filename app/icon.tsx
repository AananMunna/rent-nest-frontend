import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
            width: 380,
            height: 380,
            borderRadius: 88,
            background: "rgba(255,255,255,0.12)",
            border: "10px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 168,
              fontWeight: 900,
              lineHeight: 1,
              fontFamily: "Arial, Helvetica, sans-serif",
              textShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 6,
                left: 28,
                width: 164,
                height: 164,
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                transform: "rotate(45deg)",
                borderTop: "24px solid white",
                borderLeft: "24px solid white",
              }}
            />
            <div
              style={{
                width: 128,
                height: 128,
                borderRadius: 24,
                border: "20px solid white",
                boxSizing: "border-box",
                position: "relative",
                marginTop: 26,
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  );
}