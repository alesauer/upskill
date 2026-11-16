export type TargetExam =
  | "ENEM"
  | "FUVEST_UNICAMP"
  | "MEDICINA"
  | "ITA_IME"
  | "SUPERIOR";

export type StudyFocus = "MATEMATICA" | "FISICA" | "AMBAS";

export interface TrilhaInput {
  targetExam: TargetExam;
  mathBaseScore: number; // 0..10
  physicsBaseScore: number; // 0..10
  hoursPerWeek: number; // 2..40
  focus?: StudyFocus;
}

export interface LadderStepPlan {
  code: "DMAT" | "LM" | "LF" | "LC";
  slug: string;
  title: string;
  included: boolean;
  priority: "imediata" | "sequencial" | "opcional" | "concluida";
  hoursRequired: number;
  estimatedWeeks: number;
  reason: string;
}

export interface TrilhaCalculationResult {
  targetExam: TargetExam;
  mathBaseScore: number;
  physicsBaseScore: number;
  hoursPerWeek: number;
  focus: StudyFocus;
  recommendedStartCode: "DMAT" | "LM" | "LF" | "LC";
  recommendedStartSlug: string;
  rationale: string;
  readinessIndex: number;
  totalEstimatedHours: number;
  estimatedWeeks: number;
  estimatedMonths: number;
  weeklySplit: {
    theoryHours: number;
    practiceHours: number;
    reviewHours: number;
  };
  ladderSteps: LadderStepPlan[];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function calculateTrilha(rawInput: TrilhaInput): TrilhaCalculationResult {
  const mathBaseScore = clamp(Math.round(rawInput.mathBaseScore), 0, 10);
  const physicsBaseScore = clamp(Math.round(rawInput.physicsBaseScore), 0, 10);
  const hoursPerWeek = clamp(Math.round(rawInput.hoursPerWeek), 2, 40);
  const focus: StudyFocus = rawInput.focus ?? "AMBAS";
  const targetExam = rawInput.targetExam;

  const needsDmat = mathBaseScore <= 4;
  const needsLm = mathBaseScore <= 8 && focus !== "FISICA";
  const needsLf = physicsBaseScore <= 8 && focus !== "MATEMATICA";
  const needsLc =
    targetExam === "ITA_IME" ||
    targetExam === "SUPERIOR" ||
    (mathBaseScore >= 8 && focus !== "FISICA");

  // Effective hours multiplier based on base knowledge
  const dmatHours = needsDmat ? 56 : 0;
  const lmHours = needsLm
    ? mathBaseScore >= 7
      ? 72
      : 120
    : 0;
  const lfHours = needsLf
    ? physicsBaseScore >= 7
      ? 78
      : 120
    : 0;
  const lcHours = needsLc ? 100 : 0;

  // Pace factor accounts for exercises + review outside video lessons (1.35x)
  const paceFactor = 1.35;

  const steps: LadderStepPlan[] = [
    {
      code: "DMAT",
      slug: "desvendando-a-matematica",
      title: "Desvendando a Matemática",
      included: needsDmat,
      priority: needsDmat ? "imediata" : "concluida",
      hoursRequired: Math.round(dmatHours * paceFactor),
      estimatedWeeks: needsDmat
        ? Math.max(1, Math.ceil((dmatHours * paceFactor) / hoursPerWeek))
        : 0,
      reason: needsDmat
        ? "Sua base algébrica precisa de chão firme em frações, potências e equações antes de avançar."
        : "Base aritmética e algébrica já consolidada.",
    },
    {
      code: "LM",
      slug: "licoes-de-matematica",
      title: "Lições de Matemática",
      included: needsLm,
      priority: !needsDmat && needsLm ? "imediata" : needsLm ? "sequencial" : "concluida",
      hoursRequired: Math.round(lmHours * paceFactor),
      estimatedWeeks: needsLm
        ? Math.max(1, Math.ceil((lmHours * paceFactor) / hoursPerWeek))
        : 0,
      reason: needsLm
        ? "Construção completa da matemática do ensino médio pelo porquê, ajustada ao seu vestibular."
        : focus === "FISICA"
        ? "Foco exclusivo em Física selecionado."
        : "Matemática do ensino médio já dominada.",
    },
    {
      code: "LF",
      slug: "licoes-de-fisica",
      title: "Lições de Física",
      included: needsLf,
      priority:
        focus === "FISICA" && needsLf && !needsDmat
          ? "imediata"
          : needsLf
          ? "sequencial"
          : "concluida",
      hoursRequired: Math.round(lfHours * paceFactor),
      estimatedWeeks: needsLf
        ? Math.max(1, Math.ceil((lfHours * paceFactor) / hoursPerWeek))
        : 0,
      reason: needsLf
        ? "Física completa do fenômeno à fórmula: mecânica, termo, ondas, elétrica e moderna."
        : focus === "MATEMATICA"
        ? "Foco exclusivo em Matemática selecionado."
        : "Física do ensino médio já dominada.",
    },
    {
      code: "LC",
      slug: "licoes-de-calculo",
      title: "Lições de Cálculo",
      included: needsLc,
      priority:
        !needsDmat && !needsLm && !needsLf && needsLc
          ? "imediata"
          : needsLc
          ? targetExam === "ITA_IME" || targetExam === "SUPERIOR"
            ? "sequencial"
            : "opcional"
          : "opcional",
      hoursRequired: Math.round(lcHours * paceFactor),
      estimatedWeeks: needsLc
        ? Math.max(1, Math.ceil((lcHours * paceFactor) / hoursPerWeek))
        : 0,
      reason: needsLc
        ? "Limites, derivadas e integrais para ITA, IME, Escola Naval ou entrada forte na engenharia."
        : "Degrau avançado opcional após consolidar o ensino médio.",
    },
  ];

  const immediateStep =
    steps.find((s) => s.priority === "imediata") ?? steps[1];

  const totalEstimatedHours = steps
    .filter((s) => s.included)
    .reduce((acc, s) => acc + s.hoursRequired, 0);

  const estimatedWeeks = Math.max(
    1,
    Math.ceil(totalEstimatedHours / hoursPerWeek)
  );
  const estimatedMonths = round1(estimatedWeeks / 4.33);

  const examDifficultyWeight =
    targetExam === "ITA_IME"
      ? 1.15
      : targetExam === "MEDICINA" || targetExam === "FUVEST_UNICAMP"
      ? 1.05
      : 1.0;

  const rawReadiness =
    ((mathBaseScore * 0.55 + physicsBaseScore * 0.45) / 10) *
    (100 / examDifficultyWeight);
  const readinessIndex = clamp(Math.round(rawReadiness), 8, 98);

  const rationaleMap: Record<LadderStepPlan["code"], string> = {
    DMAT: "Comece pelo Desvendando a Matemática (DMAT). Sem dominar frações, potências e equações pelo porquê, qualquer curso seguinte vira decoreba.",
    LM: "Sua base permite entrar direto no Lições de Matemática (LM), construindo funções, trigonometria e geometria com rigor e intuição.",
    LF: "Como seu foco atual é Física e sua base matemática sustenta o ritmo, comece pelo Lições de Física (LF), indo do fenômeno à fórmula.",
    LC: "Você já tem base sólida no ensino médio. O próximo degrau natural é o Lições de Cálculo (LC) para dominar limites, derivadas e integrais.",
  };

  return {
    targetExam,
    mathBaseScore,
    physicsBaseScore,
    hoursPerWeek,
    focus,
    recommendedStartCode: immediateStep.code,
    recommendedStartSlug: immediateStep.slug,
    rationale: rationaleMap[immediateStep.code],
    readinessIndex,
    totalEstimatedHours,
    estimatedWeeks,
    estimatedMonths,
    weeklySplit: {
      theoryHours: round1(hoursPerWeek * 0.5),
      practiceHours: round1(hoursPerWeek * 0.35),
      reviewHours: round1(hoursPerWeek * 0.15),
    },
    ladderSteps: steps,
  };
}

export interface DiagnosticReportRow {
  id: number;
  target_exam: string;
  math_base_score: number;
  physics_base_score: number;
  hours_per_week: number;
  recommended_course_slug: string;
  estimated_weeks: number;
  created_at: string;
}

export function formatTrilhaCsv(rows: DiagnosticReportRow[]): string {
  const header = [
    "ID",
    "Vestibular_Objetivo",
    "Base_Matematica_0_10",
    "Base_Fisica_0_10",
    "Horas_Por_Semana",
    "Curso_Inicial_Recomendado",
    "Semanas_Estimadas",
    "Data_Criacao",
  ].join(",");

  const escape = (val: unknown) => {
    const str = String(val ?? "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const lines = rows.map((r) =>
    [
      r.id,
      r.target_exam,
      r.math_base_score,
      r.physics_base_score,
      r.hours_per_week,
      r.recommended_course_slug,
      r.estimated_weeks,
      r.created_at,
    ]
      .map(escape)
      .join(",")
  );

  return "\uFEFF" + [header, ...lines].join("\r\n");
}
