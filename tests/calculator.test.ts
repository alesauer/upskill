import test from "node:test";
import assert from "node:assert/strict";
import { calculateTrilha, formatTrilhaCsv } from "../src/lib/calculator.ts";

test("calculateTrilha recommends DMAT when math base is low (<= 4)", () => {
  const res = calculateTrilha({
    targetExam: "ENEM",
    mathBaseScore: 2,
    physicsBaseScore: 3,
    hoursPerWeek: 10,
  });

  assert.equal(res.recommendedStartCode, "DMAT");
  assert.equal(res.recommendedStartSlug, "desvendando-a-matematica");
  assert.ok(res.estimatedWeeks > 0);
  assert.equal(res.weeklySplit.theoryHours, 5);
  assert.equal(res.weeklySplit.practiceHours, 3.5);
  assert.equal(res.weeklySplit.reviewHours, 1.5);
});

test("calculateTrilha recommends LM when math base is intermediate (5..8)", () => {
  const res = calculateTrilha({
    targetExam: "FUVEST_UNICAMP",
    mathBaseScore: 6,
    physicsBaseScore: 5,
    hoursPerWeek: 12,
  });

  assert.equal(res.recommendedStartCode, "LM");
  assert.equal(res.recommendedStartSlug, "licoes-de-matematica");
});

test("calculateTrilha recommends LC when math and physics bases are high (>= 9) for ITA/IME", () => {
  const res = calculateTrilha({
    targetExam: "ITA_IME",
    mathBaseScore: 9,
    physicsBaseScore: 9,
    hoursPerWeek: 20,
  });

  assert.equal(res.recommendedStartCode, "LC");
  assert.equal(res.recommendedStartSlug, "licoes-de-calculo");
  assert.ok(res.readinessIndex >= 70);
});

test("calculateTrilha respects FISICA-only focus when math base is >= 5", () => {
  const res = calculateTrilha({
    targetExam: "MEDICINA",
    mathBaseScore: 7,
    physicsBaseScore: 3,
    hoursPerWeek: 10,
    focus: "FISICA",
  });

  assert.equal(res.recommendedStartCode, "LF");
  assert.equal(res.recommendedStartSlug, "licoes-de-fisica");
});

test("formatTrilhaCsv generates valid UTF-8 BOM CSV with escaped values", () => {
  const csv = formatTrilhaCsv([
    {
      id: 1,
      target_exam: "ITA_IME",
      math_base_score: 4,
      physics_base_score: 5,
      hours_per_week: 15,
      recommended_course_slug: "desvendando-a-matematica",
      estimated_weeks: 28,
      created_at: "2026-11-16 20:00:00",
    },
  ]);

  assert.ok(csv.startsWith("\uFEFFID,Vestibular_Objetivo"));
  assert.ok(csv.includes("ITA_IME,4,5,15,desvendando-a-matematica,28"));
});
