import { ImageResponse } from "next/og";
import {
  AIRCON_VIEWBOX_WIDTH,
  airconGlyphs,
} from "@/components/airconGlyphs";

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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: "64px 26px",
          background:
            "linear-gradient(145deg, #071a2d 0%, #123b67 58%, #0b2948 100%)",
        }}
      >
        <div
          style={{
            marginRight: "-0.3em",
            color: "#f8fafc",
            fontFamily: "Arial, sans-serif",
            fontSize: 60,
            fontWeight: 900,
            letterSpacing: "0.3em",
            lineHeight: 1,
            WebkitTextStroke: "2px #f8fafc",
          }}
        >
          GANSBAAI
        </div>

        <svg
          width="460"
          height="86"
          viewBox={`0 0 ${AIRCON_VIEWBOX_WIDTH} 230`}
          aria-hidden="true"
        >
          {airconGlyphs.map((glyph) => (
            <path
              key={glyph.letter}
              d={glyph.d}
              transform={`translate(${glyph.x} 0)`}
              fill="#ef4444"
              stroke="#6b7280"
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
    ),
    size
  );
}
