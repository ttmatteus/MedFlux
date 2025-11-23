import { PRIORITY_BADGE_STYLES, PriorityLevel } from "../constants/priority";

interface TriageFormData {
  pressao: string;
  bpm: string;
  temperatura: string;
  sintomas: {
    dorIntensa: boolean;
    febreAlta: boolean;
    dorLeve: boolean;
    queixasLeves: boolean;
  };
}

export interface PriorityResult {
  level: string;
  color: string;
  description: string;
  reasons: string[];
}

type RuleContext = {
  bpm: number;
  temperatura: number;
  sistolica: number;
  diastolica: number;
  form: TriageFormData;
};

interface Rule {
  score: number;
  reason: string;
  predicate: (ctx: RuleContext) => boolean;
}

const parsePressure = (pressao: string) => {
  const numbers = pressao
    .split(/[^0-9]/)
    .filter(Boolean)
    .map(Number);
  if (numbers.length >= 2) {
    return { sistolica: numbers[0], diastolica: numbers[1] };
  }
  return { sistolica: Number.NaN, diastolica: Number.NaN };
};

const parseNumber = (value: string) => {
  const normalized = value.replace(',', '.').replace(/[^\d.]/g, '');
  return Number(normalized);
};

const SYMPTOM_RULES: Rule[] = [
  {
    score: 4,
    reason: "Dor intensa / falta de ar",
    predicate: ({ form }) => form.sintomas.dorIntensa,
  },
  {
    score: 3,
    reason: "Febre alta, vômitos persistentes ou ferida com risco",
    predicate: ({ form }) => form.sintomas.febreAlta,
  },
  {
    score: 1.5,
    reason: "Dor moderada",
    predicate: ({ form }) => form.sintomas.dorLeve,
  },
  {
    score: 0.5,
    reason: "Sintomas leves",
    predicate: ({ form }) => form.sintomas.queixasLeves,
  },
];

const VITAL_RULES: Rule[] = [
  {
    score: 3,
    reason: 'Alteração crítica de BPM',
    predicate: ({ bpm }) => Number.isFinite(bpm) && (bpm >= 140 || bpm <= 45),
  },
  {
    score: 1.5,
    reason: 'BPM fora do ideal',
    predicate: ({ bpm }) => Number.isFinite(bpm) && (bpm >= 120 || bpm <= 55),
  },
  {
    score: 3,
    reason: 'Hipertermia',
    predicate: ({ temperatura }) => Number.isFinite(temperatura) && temperatura >= 40,
  },
  {
    score: 1.5,
    reason: "Febre moderada",
    predicate: ({ temperatura }) => Number.isFinite(temperatura) && temperatura >= 38.5,
  },
  {
    score: 0.75,
    reason: "Temperatura elevada",
    predicate: ({ temperatura }) => Number.isFinite(temperatura) && temperatura >= 37.5,
  },
  {
    score: 3,
    reason: 'Pressão crítica',
    predicate: ({ sistolica, diastolica }) =>
      Number.isFinite(sistolica) &&
      Number.isFinite(diastolica) &&
      (sistolica >= 200 ||
        diastolica >= 130 ||
        sistolica <= 80 ||
        diastolica <= 50),
  },
  {
    score: 2,
    reason: 'Pressão elevada',
    predicate: ({ sistolica, diastolica }) =>
      Number.isFinite(sistolica) &&
      Number.isFinite(diastolica) &&
      (sistolica >= 180 || diastolica >= 110),
  },
];

const applyRules = (rules: Rule[], context: RuleContext) => {
  return rules.reduce(
    (acc, rule) => {
      if (rule.predicate(context)) {
        acc.score += rule.score;
        acc.reasons.push(rule.reason);
      }
      return acc;
    },
    { score: 0, reasons: [] as string[] },
  );
};

export const calculatePriority = (formData: TriageFormData): PriorityResult => {
  const bpm = parseNumber(formData.bpm);
  const temperatura = parseNumber(formData.temperatura);
  const { sistolica, diastolica } = parsePressure(formData.pressao);

  const context: RuleContext = {
    bpm,
    temperatura,
    sistolica,
    diastolica,
    form: formData,
  };

  const symptomScore = applyRules(SYMPTOM_RULES, context);
  const vitalScore = applyRules(VITAL_RULES, context);

  const totalScore = symptomScore.score + vitalScore.score;
  const reasons = [...symptomScore.reasons, ...vitalScore.reasons];

  const priorities: Array<{
    minScore: number;
    level: PriorityLevel;
    description: string;
  }> = [
    {
      minScore: 7,
      level: "Emergência",
      description: "Atendimento imediato. Há risco significativo à vida ou sinais muito críticos.",
    },
    {
      minScore: 5,
      level: "Muito Urgente",
      description: "Atendimento prioritário. Quadro grave ou instável.",
    },
    {
      minScore: 3,
      level: "Urgente",
      description: "Necessita avaliação em curto prazo para evitar agravos.",
    },
    {
      minScore: 1.5,
      level: "Pouco Urgente",
      description: "Paciente estável, mas necessita supervisão e acompanhamento.",
    },
    {
      minScore: 0,
      level: "Não Urgente",
      description: "Quadro simples, pode aguardar atendimento eletivo.",
    },
  ];

  const matchedPriority =
    priorities.find((priority) => totalScore >= priority.minScore) ??
    priorities[priorities.length - 1];

  const badge = PRIORITY_BADGE_STYLES[matchedPriority.level];

  return {
    level: matchedPriority.level,
    color: badge.hex,
    description: matchedPriority.description,
    reasons,
  };
};

