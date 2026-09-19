import Link from "next/link";

export default function SystemHero() {
  return (
    <section className="mx-auto w-[calc(100%-20px)] max-w-[1440px] border-x-2 border-b-2 border-[#1c242b] sm:w-[calc(100%-32px)]">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        {/* EDITORIAL INTRO */}

        <div
          className="flex min-h-[610px] flex-col justify-between bg-white p-6 sm:p-10 lg:p-14"
        >
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="size-2 bg-[#2f6fed]" />
            PENTA LABS / SYSTEM DIVISION
          </div>

          <div className="my-16">
            <p className="mb-7 max-w-[520px] font-mono text-[11px] uppercase tracking-[0.15em] text-[#65717d]">
              CUSTOM SOFTWARE / CONNECTED INFRASTRUCTURE /
              COMPLEX BUSINESS OPERATIONS
            </p>

            <h1 className="text-[clamp(54px,7vw,118px)] leading-[0.9] font-bold tracking-[-0.095em]">
              WE BUILD
              <br />
              <span className="text-[#2f6fed]">
                SYSTEMS
              </span>
              <br />
              THAT RUN
              <br />
              BUSINESS.
            </h1>

            <p className="mt-9 max-w-[520px] text-[14px] leading-[1.8] text-[#526477] sm:text-[16px]">
              Not another disconnected tool. We design
              the software, workflows, integrations,
              and interfaces that connect an entire
              operation.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#explorer"
              className="inline-flex min-h-12 items-center justify-center border-2 border-[#1c242b] bg-[#2f6fed] px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-[4px_4px_0_#1c242b] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1c242b]"
            >
              EXPLORE SYSTEMS ↘
            </Link>

            <Link
              href="#builder"
              className="inline-flex min-h-12 items-center justify-center border-2 border-[#1c242b] bg-white px-5 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#1c242b] hover:text-white"
            >
              DESIGN YOUR OWN ↗
            </Link>
          </div>
        </div>

        {/* ARCHITECTURAL VISUAL */}

        <div
          className="relative flex min-h-[560px] flex-col overflow-hidden border-t-2 border-[#1c242b] bg-[#101419] text-white lg:border-t-0 lg:border-l-2"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(rgba(137,175,255,0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(137,175,255,0.09) 1px,transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative flex items-center justify-between border-b border-white/15 p-6 font-mono text-[10px] tracking-[0.12em] text-white/60">
            <span>FIG. 01 / CONNECTED OPERATIONS</span>
            <span className="size-2 rounded-full bg-[#2f6fed] shadow-[0_0_14px_#2f6fed]" />
          </div>

          <div className="relative flex flex-1 items-center justify-center p-5 sm:p-10">
            <svg
              viewBox="0 0 500 440"
              aria-label="Diagram showing five connected business layers"
              role="img"
              className="w-full max-w-[520px]"
            >
              <defs>
                <linearGradient
                  id="system-hero-line"
                  x1="0"
                  x2="1"
                >
                  <stop offset="0%" stopColor="#607b9c" />
                  <stop offset="100%" stopColor="#2f6fed" />
                </linearGradient>
              </defs>

              {/* CONNECTORS */}

              <g
                fill="none"
                stroke="url(#system-hero-line)"
                strokeWidth="1.4"
              >
                <path d="M250 78V128" />
                <path d="M250 202V245" />
                <path d="M250 245H105V282" />
                <path d="M250 245H395V282" />
                <path d="M105 350V375H250" />
                <path d="M395 350V375H250" />
                <path d="M250 375V396" />
              </g>

              {/* CONNECTION MARKERS */}

              {[
                [250, 78],
                [250, 128],
                [250, 202],
                [250, 245],
                [105, 282],
                [395, 282],
                [250, 396],
              ].map(([cx, cy], index) => (
                <circle
                  key={index}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill="#2f6fed"
                />
              ))}

              {/* SYSTEM NODES */}

              <g fontFamily="monospace" textAnchor="middle">
                <rect
                  x="170"
                  y="22"
                  width="160"
                  height="56"
                  fill="#19222e"
                  stroke="#7b92ae"
                />
                <text
                  x="250"
                  y="45"
                  fill="#8aa3c2"
                  fontSize="9"
                >
                  LAYER 01
                </text>
                <text
                  x="250"
                  y="62"
                  fill="white"
                  fontSize="12"
                >
                  INPUT / EVENTS
                </text>

                <rect
                  x="120"
                  y="128"
                  width="260"
                  height="74"
                  fill="#2f6fed"
                  stroke="#8cb0ff"
                />
                <text
                  x="250"
                  y="155"
                  fill="#d8e5ff"
                  fontSize="9"
                >
                  LAYER 02
                </text>
                <text
                  x="250"
                  y="178"
                  fill="white"
                  fontWeight="700"
                  fontSize="15"
                >
                  CORE ORCHESTRATOR
                </text>

                <rect
                  x="28"
                  y="282"
                  width="154"
                  height="68"
                  fill="#19222e"
                  stroke="#7b92ae"
                />
                <text
                  x="105"
                  y="309"
                  fill="#8aa3c2"
                  fontSize="9"
                >
                  LAYER 03
                </text>
                <text
                  x="105"
                  y="327"
                  fill="white"
                  fontSize="12"
                >
                  DATA LAYER
                </text>

                <rect
                  x="318"
                  y="282"
                  width="154"
                  height="68"
                  fill="#19222e"
                  stroke="#7b92ae"
                />
                <text
                  x="395"
                  y="309"
                  fill="#8aa3c2"
                  fontSize="9"
                >
                  LAYER 04
                </text>
                <text
                  x="395"
                  y="327"
                  fill="white"
                  fontSize="12"
                >
                  INTEGRATIONS
                </text>

                <rect
                  x="169"
                  y="396"
                  width="162"
                  height="36"
                  fill="#19222e"
                  stroke="#7b92ae"
                />
                <text
                  x="250"
                  y="418"
                  fill="white"
                  fontSize="11"
                >
                  USER INTERFACES
                </text>
              </g>
            </svg>
          </div>

          <div className="relative grid grid-cols-3 border-t border-white/15">
            {[
              ["01", "STRATEGY"],
              ["02", "ARCHITECTURE"],
              ["03", "EXECUTION"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="border-r border-white/15 px-4 py-5 last:border-r-0"
              >
                <div className="font-mono text-[10px] text-[#78a7ff]">
                  {number}
                </div>
                <div className="mt-2 text-[10px] font-semibold tracking-[0.06em] sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}