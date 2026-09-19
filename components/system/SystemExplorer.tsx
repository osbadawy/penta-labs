"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  SYSTEMS,
  SYSTEM_CATEGORIES,
  type SystemCategory,
  type SystemDefinition,
} from "./systemData";


type Filter = "ALL" | SystemCategory;

const NODE_POSITIONS = [
  { x: 20, y: 40 },
  { x: 150, y: 40 },
  { x: 280, y: 40 },
  { x: 95, y: 158 },
  { x: 225, y: 158 },
];

const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [3, 4],
] as const;

function SystemDiagram({
  system,
  activeIndex,
  onSelect,
  isRunning,
}: {
  system: SystemDefinition;
  activeIndex: number;
  onSelect: (index: number) => void;
  isRunning: boolean;
}) {
  return (
    <div className="relative overflow-hidden border-b border-white/15 bg-[#101419] p-4 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,167,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(120,167,255,0.08) 1px,transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      />

      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.08em] text-white/50">
        <span>INTERACTIVE ARCHITECTURE / {system.number}</span>

        <span className="flex items-center gap-2">
          <span
            className={[
              "size-1.5 rounded-full",
              isRunning
                ? "animate-pulse bg-[#2f6fed]"
                : "bg-white/40",
            ].join(" ")}
          />

          {isRunning ? "FLOW ACTIVE" : "FLOW IDLE"}
        </span>
      </div>

      <div className="relative mx-auto max-w-[660px]">
        {/* DESKTOP / TABLET GRAPH */}

        <svg
          viewBox="0 0 400 248"
          role="img"
          aria-label={`${system.name} architecture showing five interconnected modules`}
          className="hidden w-full sm:block"
        >
          {CONNECTIONS.map(([start, end]) => {
            const a = NODE_POSITIONS[start];
            const b = NODE_POSITIONS[end];

            const startActive = activeIndex === start;
            const endActive = activeIndex === end;

            return (
              <path
                key={`${start}-${end}`}
                d={`M${a.x + 50} ${a.y + 29} L${b.x + 50} ${b.y + 29}`}
                fill="none"
                stroke={
                  startActive || endActive
                    ? "#78a7ff"
                    : "#506174"
                }
                strokeWidth={
                  startActive || endActive ? 2 : 1
                }
                strokeDasharray={
                  isRunning ? "5 5" : undefined
                }
                className="transition-[stroke,stroke-width] duration-300"
              />
            );
          })}

          {system.modules.map((module, index) => {
            const position = NODE_POSITIONS[index];
            const active = activeIndex === index;

            return (
              <g key={module.id}>
                <rect
                  x={position.x}
                  y={position.y}
                  width="100"
                  height="58"
                  rx="0"
                  fill={active ? "#2f6fed" : "#19222e"}
                  stroke={active ? "#a3beff" : "#75869a"}
                  strokeWidth={active ? 2 : 1}
                  className="transition-colors duration-300"
                />

                <text
                  x={position.x + 8}
                  y={position.y + 17}
                  fill={active ? "#dce7ff" : "#91a6be"}
                  fontFamily="monospace"
                  fontSize="8"
                >
                  {String(index + 1).padStart(2, "0")}
                </text>

                <text
                  x={position.x + 50}
                  y={position.y + 37}
                  fill="white"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontWeight="700"
                  fontSize="8"
                >
                  {module.name.length > 15
                    ? `${module.name.slice(0, 14)}…`
                    : module.name}
                </text>
              </g>
            );
          })}

          {/* FLOW OUTPUT */}

          <path
            d="M275 216V238H200"
            stroke="#78a7ff"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 5"
          />
        </svg>

        {/* ACCESSIBLE INTERACTIVE MODULES */}

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {system.modules.map((module, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={isActive}
                className={[
                  "min-h-[92px] min-w-0 border p-3 text-left transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78a7ff]",
                  isActive
                    ? "border-[#78a7ff] bg-[#2f6fed] text-white"
                    : "border-white/20 bg-[#19222e] text-white hover:border-white/65",
                ].join(" ")}
              >
                <span className="font-mono text-[9px] text-white/60">
                  0{index + 1} / 05
                </span>

                <span className="mt-3 block break-words text-[10px] font-bold leading-[1.4] sm:text-[11px]">
                  {module.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SystemExplorer() {
  const [filter, setFilter] =
    useState<Filter>("ALL");

  const [selectedId, setSelectedId] =
    useState(SYSTEMS[0].id);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const visibleSystems = useMemo(
    () =>
      filter === "ALL"
        ? SYSTEMS
        : SYSTEMS.filter(
            (system) => system.category === filter,
          ),
    [filter],
  );

  const selectedSystem =
    SYSTEMS.find(
      (system) => system.id === selectedId,
    ) ?? SYSTEMS[0];

  const activeModule =
    selectedSystem.modules[activeIndex] ??
    selectedSystem.modules[0];

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) =>
          (current + 1) %
          selectedSystem.modules.length,
      );
    }, 850);

    return () => window.clearInterval(interval);
  }, [isRunning, selectedSystem.id, selectedSystem.modules.length]);

  function selectSystem(system: SystemDefinition) {
    setSelectedId(system.id);
    setActiveIndex(0);
    setIsRunning(false);
  }

  function selectFilter(nextFilter: Filter) {
    setFilter(nextFilter);

    const firstSystem =
      nextFilter === "ALL"
        ? SYSTEMS[0]
        : SYSTEMS.find(
            (system) =>
              system.category === nextFilter,
          );

    if (firstSystem) {
      selectSystem(firstSystem);
    }
  }

  return (
    <section
      id="explorer"
      aria-labelledby="system-explorer-title"
      className="mx-auto w-[calc(100%-20px)] max-w-[1440px] scroll-mt-28 border-x-2 border-b-2 border-[#1c242b] bg-white sm:w-[calc(100%-32px)]"
    >
      {/* SECTION INTRO */}

      <div
        className="flex flex-col justify-between gap-8 border-b-2 border-[#1c242b] p-6 sm:p-10 lg:flex-row lg:items-end"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2f6fed]">
            01 / SYSTEM DIRECTORY
          </span>

          <h2
            id="system-explorer-title"
            className="mt-5 text-[clamp(38px,5.8vw,82px)] leading-[0.95] font-bold tracking-[-0.08em]"
          >
            COMPLEXITY
            <br />
            <span className="text-[#2f6fed]">
              IS THE POINT.
            </span>
          </h2>
        </div>

        <p className="max-w-[390px] text-[13px] leading-[1.8] text-[#526477]">
          Explore some of the architectures we can
          design. Select a system, inspect its
          components, and see how the workflow moves
          through connected modules.
        </p>
      </div>

      {/* CATEGORY FILTERS */}

      <div
        className="flex flex-wrap gap-2 border-b-2 border-[#1c242b] bg-[#e9eef5] p-4 sm:p-6"
      >
        {SYSTEM_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => selectFilter(category)}
            aria-pressed={filter === category}
            className={[
              "min-h-10 border border-[#1c242b] px-3 font-mono text-[10px] font-bold tracking-[0.06em] transition-colors",
              filter === category
                ? "bg-[#1c242b] text-white"
                : "bg-white text-[#1c242b] hover:bg-[#d9e5ff]",
            ].join(" ")}
          >
            {category}
          </button>
        ))}
      </div>

      {/* SYSTEM SELECTOR + WORKSPACE */}

      <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
        {/* SYSTEM LIST */}

        <div
          className="border-b-2 border-[#1c242b] lg:border-r-2 lg:border-b-0"
        >
          <div className="flex items-center justify-between border-b border-[#1c242b] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.1em]">
            <span>SELECT AN ARCHITECTURE</span>
            <span>{visibleSystems.length.toString().padStart(2, "0")}</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1">
            {visibleSystems.map((system) => {
              const isSelected =
                system.id === selectedId;

              return (
                <button
                  key={system.id}
                  type="button"
                  onClick={() => selectSystem(system)}
                  aria-pressed={isSelected}
                  className={[
                    "group flex min-h-[105px] items-center gap-4 border-b border-[#1c242b]/20 px-5 py-5 text-left transition-colors last:border-b-0 sm:border-r lg:border-r-0",
                    isSelected
                      ? "bg-[#1c242b] text-white"
                      : "bg-white hover:bg-[#edf3ff]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-mono text-[10px]",
                      isSelected
                        ? "text-[#78a7ff]"
                        : "text-[#2f6fed]",
                    ].join(" ")}
                  >
                    {system.number}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold leading-[1.3]">
                      {system.name}
                    </span>

                    <span
                      className={[
                        "mt-2 block font-mono text-[9px] tracking-[0.08em]",
                        isSelected
                          ? "text-white/55"
                          : "text-[#65717d]",
                      ].join(" ")}
                    >
                      {system.category}
                    </span>
                  </span>

                  <span
                    className={[
                      "text-lg transition-transform group-hover:translate-x-1",
                      isSelected
                        ? "text-[#78a7ff]"
                        : "text-[#1c242b]",
                    ].join(" ")}
                  >
                    ↗
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE SYSTEM */}

        <div          
          className="min-w-0 bg-[#101419] text-white"
        >
          <div className="border-b border-white/15 p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.1em] text-[#78a7ff]">
              <span>
                SYSTEM / {selectedSystem.number}
              </span>

              <span>ARCHITECTURE PREVIEW</span>
            </div>

            <h3 className="mt-6 text-[clamp(26px,3.1vw,46px)] leading-[1.05] font-bold tracking-[-0.06em]">
              {selectedSystem.headline}
            </h3>

            <p className="mt-5 max-w-[560px] text-[13px] leading-[1.8] text-white/60">
              {selectedSystem.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedSystem.applications.map((application) => (
                <span
                  key={application}
                  className="border border-white/20 px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.05em] text-white/70"
                >
                  {application}
                </span>
              ))}
            </div>
          </div>

          <SystemDiagram
            system={selectedSystem}
            activeIndex={activeIndex}
            onSelect={(index) => {
              setIsRunning(false);
              setActiveIndex(index);
            }}
            isRunning={isRunning}
          />

          {/* MODULE INSPECTOR */}

          <div
            aria-live="polite"
            className="grid border-b border-white/15 sm:grid-cols-[1fr_auto]"
          >
            <div className="p-5 sm:p-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#78a7ff]">
                {activeModule.role}
              </div>

              <h4 className="mt-3 text-[25px] font-bold tracking-[-0.06em]">
                {activeModule.name}
              </h4>

              <p className="mt-3 max-w-[500px] text-[12px] leading-[1.8] text-white/60">
                {activeModule.description}
              </p>
            </div>

            <div className="flex items-end p-5 pt-0 sm:p-7">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                className="min-h-12 w-full border border-[#78a7ff] bg-[#2f6fed] px-5 font-mono text-[10px] font-bold tracking-[0.08em] text-white transition-colors hover:bg-[#2456bb] sm:w-auto"
              >
                {isRunning
                  ? "■ STOP FLOW"
                  : "▶ RUN FLOW"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.08em] text-white/40 sm:px-7">
            <span>
              INTERACTIVE CONCEPT / NOT A LIVE DEPLOYMENT
            </span>

            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(selectedSystem.modules.length).padStart(2, "0")}{" "}
              MODULES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}