"use client";

import { useState } from "react";

export type StarState = "off" | "hollow" | "solid" | "lost";

export type HeatIcon = {
  id: string;
  label: string;
  detail: string;
  /** Visible in Rockstar footage, vs described in preview coverage. */
  onScreen: boolean;
};

export type WantedMeterCopy = {
  title: string;
  hint: string;
  starHint: string;
  legend: { state: StarState; label: string }[];
  iconsHeading: string;
  onScreen: string;
  reported: string;
  icons: HeatIcon[];
};

const STAR_CYCLE: StarState[] = ["off", "hollow", "solid", "lost"];

function nextStar(state: StarState): StarState {
  return STAR_CYCLE[(STAR_CYCLE.indexOf(state) + 1) % STAR_CYCLE.length];
}

function Star({ state }: { state: StarState }) {
  const fill =
    state === "solid"
      ? "fill-white"
      : state === "lost"
        ? "fill-red-500"
        : "fill-none";
  const stroke =
    state === "off"
      ? "stroke-white/20"
      : state === "hollow"
        ? "stroke-white/80"
        : state === "lost"
          ? "stroke-red-400"
          : "stroke-white";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path
        d="M12 2.4l2.7 6.1 6.6.6-5 4.4 1.5 6.4L12 16.6 6.2 19.9 7.7 13.5 2.7 9.1l6.6-.6z"
        className={`${fill} ${stroke}`}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WantedMeter({ copy }: { copy: WantedMeterCopy }) {
  const [stars, setStars] = useState<StarState[]>([
    "solid",
    "solid",
    "solid",
    "solid",
    "off",
    "off",
  ]);
  const [active, setActive] = useState<Record<string, boolean>>({
    pair: true,
    clothes: true,
    face: true,
    vehicle: true,
  });

  return (
    <figure className="not-prose my-8 rounded-2xl border border-white/10 bg-[#0a0e17] p-5 sm:p-6">
      <figcaption className="text-xs uppercase tracking-wider text-white/45">
        {copy.title}
      </figcaption>
      <p className="mt-2 text-sm text-white/55">{copy.hint}</p>

      <div
        className="mt-5 flex flex-wrap items-center gap-1.5"
        role="group"
        aria-label={copy.starHint}
      >
        {stars.map((state, i) => (
          <button
            key={i}
            type="button"
            onClick={() =>
              setStars((prev) =>
                prev.map((s, j) => (j === i ? nextStar(s) : s)),
              )
            }
            className="rounded-md p-1 transition-colors hover:bg-white/10"
            aria-label={`${i + 1}: ${copy.legend.find((l) => l.state === state)?.label ?? state}`}
          >
            <Star state={state} />
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-white/40">{copy.starHint}</p>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
        {copy.legend.map((item) => (
          <li key={item.state} className="inline-flex items-center gap-1.5">
            <Star state={item.state} />
            {item.label}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs uppercase tracking-wider text-white/45">
        {copy.iconsHeading}
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {copy.icons.map((icon) => {
          const on = Boolean(active[icon.id]);
          return (
            <li key={icon.id}>
              <button
                type="button"
                onClick={() =>
                  setActive((prev) => ({ ...prev, [icon.id]: !prev[icon.id] }))
                }
                className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  on
                    ? "border-cyan-400/40 bg-cyan-500/10"
                    : "border-white/10 bg-white/[0.03] opacity-60"
                }`}
              >
                <span
                  className={`mt-0.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
                    on ? "bg-cyan-300" : "bg-white/20"
                  }`}
                />
                <span>
                  <span className="block text-sm font-medium text-white">
                    {icon.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-white/50">
                    {icon.detail}
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-wide text-white/35">
                    {icon.onScreen ? copy.onScreen : copy.reported}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

export const WANTED_METER_EN: WantedMeterCopy = {
  title: "Interactive HUD — click stars and intel icons",
  hint: "The Extended Look chase shows six star slots. Four are lit in the clearest stills. Icons under the meter are what police know about you, not extra wanted levels.",
  starHint: "Click a star to cycle empty → hollow → pursuit → lost visual.",
  legend: [
    { state: "off", label: "Empty slot" },
    { state: "hollow", label: "Crime reported, no description" },
    { state: "solid", label: "Active pursuit" },
    { state: "lost", label: "Wanted, eyes off (colour shift)" },
  ],
  iconsHeading: "What police know",
  onScreen: "Visible on screen",
  reported: "Described in previews — not a fixed on-screen icon",
  icons: [
    {
      id: "pair",
      label: "Travelling as a pair",
      detail: "Two heads together. Split up and this intel can drop.",
      onScreen: true,
    },
    {
      id: "clothes",
      label: "Clothing",
      detail: "Hanger icon. Change outfit independently of your face.",
      onScreen: true,
    },
    {
      id: "face",
      label: "Physical description",
      detail: "Head-and-shoulders. A mask can keep this hollow.",
      onScreen: true,
    },
    {
      id: "vehicle",
      label: "Vehicle",
      detail: "Car icon. It goes out when they switch cars in the Look.",
      onScreen: true,
    },
    {
      id: "cctv",
      label: "CCTV",
      detail: "Preview language from Rockstar staff. Not a guaranteed fifth icon in that chase.",
      onScreen: false,
    },
  ],
};

export const WANTED_METER_FR: WantedMeterCopy = {
  title: "HUD interactif — cliquez étoiles et icônes",
  hint: "La course de l’Extended Look montre six emplacements d’étoiles. Quatre sont allumées sur les plans les plus clairs. Les icônes sous le mètre sont ce que la police sait de vous, pas des niveaux wanted en plus.",
  starHint: "Cliquez une étoile : vide → creuse → poursuite → plus d’yeux.",
  legend: [
    { state: "off", label: "Emplacement vide" },
    { state: "hollow", label: "Crime signalé, pas de description" },
    { state: "solid", label: "Poursuite active" },
    { state: "lost", label: "Wanted, plus d’yeux (changement de couleur)" },
  ],
  iconsHeading: "Ce que la police sait",
  onScreen: "Visible à l’écran",
  reported: "Décrit en preview — pas une icône figée de cette course",
  icons: [
    {
      id: "pair",
      label: "En couple",
      detail: "Deux têtes. Se séparer peut faire tomber cette info.",
      onScreen: true,
    },
    {
      id: "clothes",
      label: "Vêtements",
      detail: "Cintre. Changez de tenue indépendamment du visage.",
      onScreen: true,
    },
    {
      id: "face",
      label: "Description physique",
      detail: "Buste. Un masque peut garder l’étoile creuse.",
      onScreen: true,
    },
    {
      id: "vehicle",
      label: "Véhicule",
      detail: "Icône voiture. Elle s’éteint quand ils changent de caisse dans le Look.",
      onScreen: true,
    },
    {
      id: "cctv",
      label: "CCTV",
      detail: "Langage preview Rockstar. Pas une cinquième icône garantie dans cette course.",
      onScreen: false,
    },
  ],
};
