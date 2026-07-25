"use client";

import { useId, useState } from "react";

type ScentFamily = "Woody" | "Fresh" | "Citrus" | "Floral" | "Sweet";
type BudgetRange = "Under $30" | "$30–$60" | "$60–$100";

interface Alternative {
  name: string;
  family: ScentFamily;
  price: string;
  similarity: string;
  notes: string[];
}

const SCENT_FAMILIES: ScentFamily[] = ["Woody", "Fresh", "Citrus", "Floral", "Sweet"];
const BUDGET_RANGES: BudgetRange[] = ["Under $30", "$30–$60", "$60–$100"];

const LUXURY_SAMPLES: Record<ScentFamily, string[]> = {
  Woody: ["Bleu de Chanel", "Terre d'Hermès"],
  Fresh: ["Acqua di Giò", "Cool Water"],
  Citrus: ["Light Blue", "Eau Sauvage"],
  Floral: ["Chanel No. 5", "J'adore"],
  Sweet: ["Baccarat Rouge 540", "Lost Cherry"],
};

const ALTERNATIVES: Record<ScentFamily, Alternative[]> = {
  Woody: [
    {
      name: "Cedarwood & Amber (sample)",
      family: "Woody",
      price: "$24",
      similarity: "Shares a warm cedar-and-amber dry-down with a similar smoky finish.",
      notes: ["Cedarwood", "Amber", "Bergamot"],
    },
    {
      name: "Vetiver Noir (sample)",
      family: "Woody",
      price: "$29",
      similarity: "Comparable vetiver and musk base at a fraction of the price.",
      notes: ["Vetiver", "Musk", "Pepper"],
    },
  ],
  Fresh: [
    {
      name: "Ocean Breeze (sample)",
      family: "Fresh",
      price: "$19",
      similarity: "Matches the aquatic top notes and light musk base.",
      notes: ["Marine Accord", "Bergamot", "White Musk"],
    },
    {
      name: "Aqua Citrus (sample)",
      family: "Fresh",
      price: "$22",
      similarity: "Similar clean, sporty freshness with a citrus opening.",
      notes: ["Citrus", "Sea Salt", "Cedar"],
    },
  ],
  Citrus: [
    {
      name: "Sicilian Zest (sample)",
      family: "Citrus",
      price: "$18",
      similarity: "Bright bergamot and lemon opening similar to the reference scent.",
      notes: ["Bergamot", "Lemon", "Neroli"],
    },
    {
      name: "Citrus Cologne No. 2 (sample)",
      family: "Citrus",
      price: "$21",
      similarity: "Light, classic citrus-cologne structure at a lower price point.",
      notes: ["Orange", "Petitgrain", "Musk"],
    },
  ],
  Floral: [
    {
      name: "White Petal (sample)",
      family: "Floral",
      price: "$26",
      similarity: "Soft jasmine and rose heart notes with a similar powdery finish.",
      notes: ["Jasmine", "Rose", "Iris"],
    },
    {
      name: "Garden Bloom (sample)",
      family: "Floral",
      price: "$23",
      similarity: "Comparable floral bouquet with a light, airy sillage.",
      notes: ["Peony", "Lily of the Valley", "Musk"],
    },
  ],
  Sweet: [
    {
      name: "Amber Cherry (sample)",
      family: "Sweet",
      price: "$27",
      similarity: "Similar sweet cherry-and-almond gourmand character.",
      notes: ["Cherry", "Almond", "Amber"],
    },
    {
      name: "Vanilla Saffron (sample)",
      family: "Sweet",
      price: "$25",
      similarity: "Warm vanilla and spice profile reminiscent of the reference fragrance.",
      notes: ["Vanilla", "Saffron", "Cedar"],
    },
  ],
};

export default function SpritzDemo() {
  const [family, setFamily] = useState<ScentFamily>("Woody");
  const [budget, setBudget] = useState<BudgetRange>("Under $30");
  const [luxuryPick, setLuxuryPick] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);

  const familyFieldId = useId();
  const budgetFieldId = useId();
  const luxuryFieldId = useId();

  const results = ALTERNATIVES[family];

  return (
    <div className="space-y-6">
      <p className="text-sm text-white/50">
        This preview uses sample portfolio data. It does not perform live scraping, does not call
        Gemini, and does not provide live retailer prices.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label htmlFor={familyFieldId} className="block text-xs font-medium uppercase tracking-wider text-white/50">
            Scent family
          </label>
          <select
            id={familyFieldId}
            value={family}
            onChange={(event) => {
              setFamily(event.target.value as ScentFamily);
              setLuxuryPick("");
              setHasSearched(false);
            }}
            className="w-full rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2.5 text-base sm:text-sm text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
          >
            {SCENT_FAMILIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor={budgetFieldId} className="block text-xs font-medium uppercase tracking-wider text-white/50">
            Budget range
          </label>
          <select
            id={budgetFieldId}
            value={budget}
            onChange={(event) => setBudget(event.target.value as BudgetRange)}
            className="w-full rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2.5 text-base sm:text-sm text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
          >
            {BUDGET_RANGES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor={luxuryFieldId} className="block text-xs font-medium uppercase tracking-wider text-white/50">
            Sample luxury fragrance (optional)
          </label>
          <select
            id={luxuryFieldId}
            value={luxuryPick}
            onChange={(event) => setLuxuryPick(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#1e1e1e] px-3 py-2.5 text-base sm:text-sm text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8c946]"
          >
            <option value="">None selected</option>
            {LUXURY_SAMPLES[family].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setHasSearched(true)}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f8c946] px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[#f8c946]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white w-full sm:w-auto"
      >
        Find Alternatives
      </button>

      <div aria-live="polite">
        {hasSearched && (
          <div className="space-y-3">
            <p className="text-sm text-white/50">
              Sample alternatives for <span className="text-white/80">{family}</span> scents around{" "}
              <span className="text-white/80">{budget}</span>
              {luxuryPick && (
                <>
                  , similar to <span className="text-white/80">{luxuryPick}</span>
                </>
              )}
              :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((alternative) => (
                <div
                  key={alternative.name}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4 space-y-2"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-medium text-white">{alternative.name}</h3>
                    <span className="text-sm text-[#f8c946]">{alternative.price}</span>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-white/40">
                    {alternative.family}
                  </p>
                  <p className="text-sm text-white/70">{alternative.similarity}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {alternative.notes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
