"use client";

import { useId, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface Cpu {
  id: string;
  name: string;
  socket: "AM5" | "LGA1700";
  price: number;
  watts: number;
}

interface Motherboard {
  id: string;
  name: string;
  socket: "AM5" | "LGA1700";
  memoryType: "DDR5" | "DDR4";
  price: number;
}

interface GraphicsCard {
  id: string;
  name: string;
  price: number;
  watts: number;
}

interface Memory {
  id: string;
  name: string;
  type: "DDR5" | "DDR4";
  price: number;
}

interface PowerSupply {
  id: string;
  name: string;
  wattage: number;
  price: number;
}

const CPUS: Cpu[] = [
  { id: "ryzen-5-7600", name: "Ryzen 5 7600", socket: "AM5", price: 219, watts: 65 },
  { id: "ryzen-7-7800x3d", name: "Ryzen 7 7800X3D", socket: "AM5", price: 359, watts: 120 },
  { id: "core-i5-13400f", name: "Core i5-13400F", socket: "LGA1700", price: 199, watts: 65 },
];

const MOTHERBOARDS: Motherboard[] = [
  { id: "b650-aorus-elite", name: "B650 AORUS Elite", socket: "AM5", memoryType: "DDR5", price: 179 },
  { id: "b760m-pro", name: "B760M Pro RS", socket: "LGA1700", memoryType: "DDR4", price: 129 },
];

const GPUS: GraphicsCard[] = [
  { id: "rtx-4060", name: "GeForce RTX 4060", price: 299, watts: 115 },
  { id: "rtx-4070-super", name: "GeForce RTX 4070 Super", price: 599, watts: 220 },
  { id: "rx-7700-xt", name: "Radeon RX 7700 XT", price: 449, watts: 245 },
];

const MEMORY_OPTIONS: Memory[] = [
  { id: "ddr5-32gb", name: "32GB DDR5-6000 Kit", type: "DDR5", price: 109 },
  { id: "ddr4-32gb", name: "32GB DDR4-3200 Kit", type: "DDR4", price: 79 },
];

const PSU_OPTIONS: PowerSupply[] = [
  { id: "psu-550", name: "550W 80+ Bronze", wattage: 550, price: 69 },
  { id: "psu-650", name: "650W 80+ Gold", wattage: 650, price: 89 },
  { id: "psu-850", name: "850W 80+ Gold", wattage: 850, price: 119 },
];

const BASE_SYSTEM_DRAW = 60;
const PSU_HEADROOM = 1.3;

function findById<T extends { id: string }>(list: T[], id: string): T | undefined {
  return list.find((item) => item.id === id);
}

export default function PcBuilderDemo() {
  const [cpuId, setCpuId] = useState<string>("");
  const [moboId, setMoboId] = useState<string>("");
  const [gpuId, setGpuId] = useState<string>("");
  const [memoryId, setMemoryId] = useState<string>("");
  const [psuId, setPsuId] = useState<string>("");

  const cpuFieldId = useId();
  const moboFieldId = useId();
  const gpuFieldId = useId();
  const memoryFieldId = useId();
  const psuFieldId = useId();

  const cpu = cpuId ? findById(CPUS, cpuId) : undefined;
  const mobo = moboId ? findById(MOTHERBOARDS, moboId) : undefined;
  const gpu = gpuId ? findById(GPUS, gpuId) : undefined;
  const memory = memoryId ? findById(MEMORY_OPTIONS, memoryId) : undefined;
  const psu = psuId ? findById(PSU_OPTIONS, psuId) : undefined;

  const subtotal = [cpu?.price, mobo?.price, gpu?.price, memory?.price, psu?.price]
    .filter((value): value is number => typeof value === "number")
    .reduce((sum, price) => sum + price, 0);

  const estimatedDraw = BASE_SYSTEM_DRAW + (cpu?.watts ?? 0) + (gpu?.watts ?? 0);
  const recommendedWattage = Math.ceil((estimatedDraw * PSU_HEADROOM) / 50) * 50;

  const messages = useMemo(() => {
    const results: { ok: boolean; text: string }[] = [];

    if (cpu && mobo) {
      results.push(
        cpu.socket === mobo.socket
          ? { ok: true, text: `${cpu.socket} CPU matches the ${mobo.socket} motherboard socket.` }
          : {
              ok: false,
              text: `Socket mismatch: ${cpu.name} needs ${cpu.socket}, but ${mobo.name} uses ${mobo.socket}.`,
            },
      );
    }

    if (mobo && memory) {
      results.push(
        memory.type === mobo.memoryType
          ? { ok: true, text: `${memory.type} memory matches the motherboard's supported memory type.` }
          : {
              ok: false,
              text: `Memory mismatch: ${mobo.name} takes ${mobo.memoryType}, but ${memory.name} is ${memory.type}.`,
            },
      );
    }

    if (cpu && gpu && psu) {
      results.push(
        psu.wattage >= recommendedWattage
          ? {
              ok: true,
              text: `${psu.name} comfortably covers the estimated ${estimatedDraw}W draw.`,
            }
          : {
              ok: false,
              text: `Power supply may be undersized: estimated draw is ${estimatedDraw}W, so a ${recommendedWattage}W+ unit is recommended.`,
            },
      );
    }

    return results;
  }, [cpu, mobo, gpu, psu, memory, estimatedDraw, recommendedWattage]);

  const hasAnySelection = Boolean(cpu || mobo || gpu || memory || psu);

  return (
    <div className="space-y-6">
      <p className="text-sm text-white/50">
        Sample estimates only — a small, local simulation of the build planner&apos;s
        compatibility logic. Prices and wattages are illustrative, not live data.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="CPU" id={cpuFieldId} value={cpuId} onChange={setCpuId} placeholder="Select a CPU">
          {CPUS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.socket}) — ${item.price}
            </option>
          ))}
        </Field>

        <Field
          label="Motherboard"
          id={moboFieldId}
          value={moboId}
          onChange={setMoboId}
          placeholder="Select a motherboard"
        >
          {MOTHERBOARDS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.socket}, {item.memoryType}) — ${item.price}
            </option>
          ))}
        </Field>

        <Field label="GPU" id={gpuFieldId} value={gpuId} onChange={setGpuId} placeholder="Select a GPU">
          {GPUS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — ${item.price}
            </option>
          ))}
        </Field>

        <Field
          label="Memory"
          id={memoryFieldId}
          value={memoryId}
          onChange={setMemoryId}
          placeholder="Select memory"
        >
          {MEMORY_OPTIONS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — ${item.price}
            </option>
          ))}
        </Field>

        <Field
          label="Power Supply"
          id={psuFieldId}
          value={psuId}
          onChange={setPsuId}
          placeholder="Select a power supply"
        >
          {PSU_OPTIONS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — ${item.price}
            </option>
          ))}
        </Field>
      </div>

      <div
        className="rounded-lg border border-white/10 bg-white/[0.03] p-4 space-y-3"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-sm text-white/50">Estimated subtotal (sample pricing)</span>
          <span className="text-lg font-semibold text-white">${subtotal}</span>
        </div>

        {(cpu || gpu) && (
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <span className="text-white/50">Estimated power draw / recommended PSU</span>
            <span className="text-white/80">
              ~{estimatedDraw}W draw · {recommendedWattage}W+ recommended
            </span>
          </div>
        )}

        {!hasAnySelection ? (
          <p className="text-sm text-white/40">
            Choose components above to see compatibility feedback and a budget estimate.
          </p>
        ) : (
          <ul className="space-y-2">
            {messages.map((message) => (
              <li
                key={message.text}
                className={`flex gap-2 text-sm ${message.ok ? "text-white/70" : "text-amber-300"}`}
              >
                {message.ok ? (
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-[#f8c946]" aria-hidden="true" />
                ) : (
                  <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-300" aria-hidden="true" />
                )}
                <span>{message.text}</span>
              </li>
            ))}
            {messages.length === 0 && (
              <li className="text-sm text-white/40">
                Select at least two related parts (e.g. CPU + motherboard) to run a compatibility
                check.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

function Field({ label, id, value, placeholder, onChange, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2.5 text-base sm:text-sm text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
    </div>
  );
}
