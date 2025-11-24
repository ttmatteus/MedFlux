export type PriorityLevel =
  | "Emergência"
  | "Muito Urgente"
  | "Urgente"
  | "Pouco Urgente"
  | "Não Urgente";

export const PRIORITY_BADGE_STYLES: Record<
  PriorityLevel,
  { badgeClass: string; hex: string }
> = {
  Emergência: { badgeClass: "bg-red-500", hex: "#EF4444" },
  "Muito Urgente": { badgeClass: "bg-orange-500", hex: "#F97316" },
  Urgente: { badgeClass: "bg-yellow-400", hex: "#FACC15" },
  "Pouco Urgente": { badgeClass: "bg-green-500", hex: "#22C55E" },
  "Não Urgente": { badgeClass: "bg-cyan-400", hex: "#22D3EE" },
};

export const getPriorityBadge = (level: PriorityLevel) =>
  PRIORITY_BADGE_STYLES[level];

export const PRIORITY_ORDER: PriorityLevel[] = [
  "Emergência",
  "Muito Urgente",
  "Urgente",
  "Pouco Urgente",
  "Não Urgente",
];

