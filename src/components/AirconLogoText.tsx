import {
  airconGlyphs,
} from "@/components/airconGlyphs";

const streaks = [
  { y: 61, height: 9, tip: 0.02 },
  { y: 75, height: 6, tip: 0.08 },
  { y: 87, height: 8, tip: 0.14 },
  { y: 101, height: 7, tip: 0.2 },
  { y: 114, height: 9, tip: 0.25 },
  { y: 129, height: 6, tip: 0.29 },
  { y: 141, height: 8, tip: 0.24 },
  { y: 155, height: 7, tip: 0.18 },
  { y: 168, height: 9, tip: 0.12 },
  { y: 183, height: 6, tip: 0.06 },
  { y: 195, height: 5, tip: 0.02 },
] as const;

/** Visual clearance between italic letter silhouettes (not AABB boxes). */
const GAP = 2;
const IR_GAP = 1;
const BAND = 2;

type Silhouette = {
  minX: number;
  maxX: number;
  left: Map<number, number>;
  right: Map<number, number>;
};

function sampleSegment(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  left: Map<number, number>,
  right: Map<number, number>
) {
  const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / BAND));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t;
    const band = Math.round(y / BAND) * BAND;
    left.set(band, Math.min(left.get(band) ?? Number.POSITIVE_INFINITY, x));
    right.set(band, Math.max(right.get(band) ?? Number.NEGATIVE_INFINITY, x));
  }
}

function silhouette(d: string): Silhouette {
  const tokens = d.match(/[MLQZ]|-?\d+\.?\d*/gi) ?? [];
  const left = new Map<number, number>();
  const right = new Map<number, number>();
  let i = 0;
  let cmd = "";
  let cx = 0;
  let cy = 0;
  let startX = 0;
  let startY = 0;
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;

  const touch = (x: number, y: number) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    const band = Math.round(y / BAND) * BAND;
    left.set(band, Math.min(left.get(band) ?? Number.POSITIVE_INFINITY, x));
    right.set(band, Math.max(right.get(band) ?? Number.NEGATIVE_INFINITY, x));
  };

  while (i < tokens.length) {
    const token = tokens[i];
    if (/^[MLQZ]$/i.test(token)) {
      cmd = token.toUpperCase();
      i += 1;
      continue;
    }
    if (cmd === "Z") {
      sampleSegment(cx, cy, startX, startY, left, right);
      cx = startX;
      cy = startY;
      i += 1;
      continue;
    }
    if (cmd === "M") {
      cx = Number(tokens[i]);
      cy = Number(tokens[i + 1]);
      startX = cx;
      startY = cy;
      touch(cx, cy);
      i += 2;
      continue;
    }
    if (cmd === "L") {
      const x = Number(tokens[i]);
      const y = Number(tokens[i + 1]);
      sampleSegment(cx, cy, x, y, left, right);
      cx = x;
      cy = y;
      i += 2;
      continue;
    }
    if (cmd === "Q") {
      const x1 = Number(tokens[i]);
      const y1 = Number(tokens[i + 1]);
      const x = Number(tokens[i + 2]);
      const y = Number(tokens[i + 3]);
      const steps = 8;
      let px = cx;
      let py = cy;
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const ox = (1 - t) * (1 - t) * cx + 2 * (1 - t) * t * x1 + t * t * x;
        const oy = (1 - t) * (1 - t) * cy + 2 * (1 - t) * t * y1 + t * t * y;
        sampleSegment(px, py, ox, oy, left, right);
        px = ox;
        py = oy;
      }
      cx = x;
      cy = y;
      i += 4;
      continue;
    }
    i += 1;
  }

  return { minX, maxX, left, right };
}

/**
 * Italic-aware packing: nestle letters by silhouette per Y-band so bounding
 * boxes may overlap, but ink never clips — the same way tight italic logos kern.
 */
function packGlyphs() {
  const shapes = airconGlyphs.map((glyph) => silhouette(glyph.d));
  const xs: number[] = [];
  let cursor = 0;

  for (let index = 0; index < airconGlyphs.length; index++) {
    const shape = shapes[index];
    let x = cursor - shape.minX;

    if (index > 0) {
      const prev = shapes[index - 1];
      const prevX = xs[index - 1];
      const gap =
        airconGlyphs[index - 1].letter === "I" &&
        airconGlyphs[index].letter === "R"
          ? IR_GAP
          : GAP;

      let required = Number.NEGATIVE_INFINITY;
      for (const [band, nextLeft] of shape.left) {
        const prevRight = prev.right.get(band);
        if (prevRight === undefined) continue;
        required = Math.max(required, prevX + prevRight + gap - nextLeft);
      }

      // Fallback bands near neighbours if sparse sampling missed a shared Y.
      if (!Number.isFinite(required)) {
        required = prevX + prev.maxX + gap - shape.minX;
      }
      x = required;
    }

    xs.push(x);
    cursor = x + shape.maxX;
  }

  const packed = airconGlyphs.map((glyph, index) => ({
    ...glyph,
    x: xs[index],
  }));
  const last = packed[packed.length - 1];
  const lastShape = shapes[shapes.length - 1];

  return {
    packed,
    viewBoxWidth: last.x + lastShape.maxX + 2,
  };
}

const { packed: packedGlyphs, viewBoxWidth: AIRCON_PACKED_WIDTH } =
  packGlyphs();

type AirconLogoTextProps = {
  idPrefix: string;
};

export default function AirconLogoText({ idPrefix }: AirconLogoTextProps) {
  const shadowId = `${idPrefix}-aircon-shadow`;
  const highlightId = `${idPrefix}-aircon-gust-highlight`;

  return (
    <svg
      viewBox={`0 0 ${AIRCON_PACKED_WIDTH} 230`}
      className="brand-aircon-svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id={shadowId}
          x="-10%"
          y="-20%"
          width="120%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="2"
            dy="4"
            stdDeviation="4"
            floodColor="#0f172a"
            floodOpacity="0.7"
          />
        </filter>
        <linearGradient
          id={highlightId}
          x1="100%"
          y1="0%"
          x2="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#64748b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.2" />
        </linearGradient>

        {packedGlyphs.map((glyph, index) => (
          <clipPath
            id={`${idPrefix}-aircon-letter-${index}`}
            key={glyph.letter}
            clipPathUnits="userSpaceOnUse"
          >
            <path d={glyph.d} transform={`translate(${glyph.x} 0)`} />
          </clipPath>
        ))}
      </defs>

      <g filter={`url(#${shadowId})`}>
        {packedGlyphs.map((glyph, letterIndex) => {
          const bodyStart = glyph.x + glyph.width * 0.56;
          const jitter = ((letterIndex % 3) - 1) * 0.012;

          return (
            <g key={glyph.letter}>
              <path
                d={glyph.d}
                transform={`translate(${glyph.x} 0)`}
                fill="#e31e24"
              />
              <g
                clipPath={`url(#${idPrefix}-aircon-letter-${letterIndex})`}
              >
                <g
                  className="brand-letter-gust"
                  style={{ animationDelay: `${letterIndex * -0.31}s` }}
                  fill={`url(#${highlightId})`}
                >
                  {streaks.map((streak) => {
                    const tipX =
                      glyph.x +
                      glyph.width * Math.max(0, streak.tip + jitter);
                    const joinX = bodyStart + 8;
                    const middleY = streak.y + streak.height / 2;

                    return (
                      <path
                        key={`${glyph.letter}-${streak.y}`}
                        d={`M${tipX} ${middleY}L${joinX} ${streak.y}L${joinX} ${streak.y + streak.height}Z`}
                      />
                    );
                  })}
                </g>
              </g>
              <path
                d={glyph.d}
                transform={`translate(${glyph.x} 0)`}
                fill="none"
                stroke="#334155"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
