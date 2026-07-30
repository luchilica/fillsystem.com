import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          borderRadius: 36,
        }}
      >
        <svg width={140} height={140} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="ring" x1="1" y1="0" x2="0.25" y2="0.9">
              <stop offset="0" stopColor="#5C86FF" />
              <stop offset="0.22" stopColor="#2551D2" />
              <stop offset="0.46" stopColor="#0A0A0F" />
              <stop offset="1" stopColor="#0A0A0F" />
            </linearGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="11.2"
            stroke="url(#ring)"
            strokeWidth="4"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
