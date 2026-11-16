import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { DatabaseSync } from "node:sqlite";

export interface CourseRecord {
  slug: string;
  code: "DMAT" | "LM" | "LF" | "LC";
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  for_who: string[];
  modules: { title: string; lessons: number; hours: number; summary: string }[];
  level_order: number;
  surface_color: string;
  accent_badge: string;
  hours_total: number;
  lessons_count: number;
  price_cents: number;
}

export interface BookRecord {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  edition: string;
  pages: number;
  price_cents: number;
  badge: string;
  surface_color: string;
  highlights: string[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "universo.db");

let dbInstance: DatabaseSync | null = null;

export function hashPassword(password: string, salt?: string): string {
  const usedSalt = salt ?? crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, usedSalt, 64).toString("hex");
  return `${usedSalt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const derived = crypto.scryptSync(password, salt, 64);
  const keyBuf = Buffer.from(key, "hex");
  if (derived.length !== keyBuf.length) return false;
  return crypto.timingSafeEqual(derived, keyBuf);
}

export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      slug TEXT PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      eyebrow TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      description TEXT NOT NULL,
      for_who TEXT NOT NULL,
      modules TEXT NOT NULL,
      level_order INTEGER NOT NULL,
      surface_color TEXT NOT NULL,
      accent_badge TEXT NOT NULL,
      hours_total INTEGER NOT NULL,
      lessons_count INTEGER NOT NULL,
      price_cents INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS books (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      description TEXT NOT NULL,
      edition TEXT NOT NULL,
      pages INTEGER NOT NULL,
      price_cents INTEGER NOT NULL,
      badge TEXT NOT NULL,
      surface_color TEXT NOT NULL,
      highlights TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      target_exam TEXT NOT NULL DEFAULT 'ENEM',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_slug TEXT NOT NULL REFERENCES courses(slug) ON DELETE CASCADE,
      progress_pct INTEGER NOT NULL DEFAULT 0,
      completed_lessons TEXT NOT NULL DEFAULT '[]',
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, course_slug)
    );

    CREATE TABLE IF NOT EXISTS diagnostics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_key TEXT NOT NULL,
      target_exam TEXT NOT NULL,
      math_base_score INTEGER NOT NULL,
      physics_base_score INTEGER NOT NULL,
      hours_per_week INTEGER NOT NULL,
      recommended_course_slug TEXT NOT NULL,
      estimated_weeks INTEGER NOT NULL,
      study_plan TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS support_tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      category TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'aberto',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  seedDatabase(db);
  dbInstance = db;
  return db;
}

function seedDatabase(db: DatabaseSync) {
  const courseCount = db
    .prepare("SELECT COUNT(*) as count FROM courses")
    .get() as { count: number };

  if (courseCount.count === 0) {
    const insertCourse = db.prepare(`
      INSERT INTO courses (
        slug, code, title, eyebrow, subtitle, description,
        for_who, modules, level_order, surface_color, accent_badge,
        hours_total, lessons_count, price_cents
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const coursesSeed: CourseRecord[] = [
      {
        slug: "desvendando-a-matematica",
        code: "DMAT",
        title: "Desvendando a Matemática",
        eyebrow: "DMAT · Para quem está começando",
        subtitle: "A base, do zero absoluto.",
        description:
          "A base, do zero absoluto. Frações, potências, equações e tudo que a escola mandou decorar, agora com sentido.",
        for_who: [
          "Quem trava na conta básica e não sabe por onde recomeçar",
          "Quem vai prestar ENEM ou qualquer vestibular e precisa de chão firme",
          "Quem quer entrar no LM sem carregar buraco",
        ],
        modules: [
          {
            title: "Aritmética e Sentido Numérico",
            lessons: 18,
            hours: 12,
            summary:
              "Operações fundamentais, propriedades e cálculo mental sem decoreba.",
          },
          {
            title: "Frações, Razão e Proporção",
            lessons: 20,
            hours: 14,
            summary:
              "Por que dividir por fração inverte e como dominar regra de três.",
          },
          {
            title: "Potenciação, Radiciação e Fatoração",
            lessons: 22,
            hours: 15,
            summary:
              "Manipulação algébrica sólida para destravar física e matemática.",
          },
          {
            title: "Equações e Sistemas do 1º e 2º Grau",
            lessons: 20,
            hours: 15,
            summary:
              "Da intuição geométrica às raízes e modelagem de problemas reais.",
          },
        ],
        level_order: 1,
        surface_color: "#fff9d6",
        accent_badge: "#ffe96b",
        hours_total: 56,
        lessons_count: 80,
        price_cents: 49700,
      },
      {
        slug: "licoes-de-matematica",
        code: "LM",
        title: "Lições de Matemática",
        eyebrow: "LM · Matemática completa",
        subtitle: "A matemática inteira, na ordem que faz sentido.",
        description:
          "A matemática inteira do ensino médio, na ordem que faz sentido. Cada capítulo nasce de uma pergunta, e a fórmula chega por último.",
        for_who: [
          "ENEM, Fuvest, Unicamp e os militares, com trilha ajustada ao seu vestibular",
          "Quem já tem a base e quer entender de verdade, não decorar",
          "Quem quer chegar no Cálculo sem susto",
        ],
        modules: [
          {
            title: "Funções, Exponenciais e Logaritmos",
            lessons: 36,
            hours: 28,
            summary:
              "Ideia de variação, gráficos, logaritmos pelo porquê e modelagem.",
          },
          {
            title: "Trigonometria e Geometria Plana",
            lessons: 42,
            hours: 34,
            summary:
              "Demonstrações clássicas, ciclo trigonométrico e construção de raciocínio.",
          },
          {
            title: "Análise Combinatória e Probabilidade",
            lessons: 28,
            hours: 22,
            summary:
              "Contar sem fórmulas decoradas: princípio fundamental e intuição.",
          },
          {
            title: "Geometria Espacial, Analítica e Complexos",
            lessons: 44,
            hours: 36,
            summary:
              "Nível Fuvest, Unicamp, ITA e IME com profundidade progressiva.",
          },
        ],
        level_order: 2,
        surface_color: "#eaf0ff",
        accent_badge: "#8ef7ff",
        hours_total: 120,
        lessons_count: 150,
        price_cents: 99700,
      },
      {
        slug: "licoes-de-fisica",
        code: "LF",
        title: "Lições de Física",
        eyebrow: "LF · Física completa",
        subtitle: "Do fenômeno à fórmula, sem pular o porquê.",
        description:
          "Do fenômeno à fórmula, sem pular o porquê. Mecânica, termodinâmica, ondas, eletricidade e física moderna, com o professor Felipe Guisoli.",
        for_who: [
          "ENEM, Fuvest, Unicamp e os militares, com trilha ajustada ao seu vestibular",
          "Quem sabe a fórmula e não sabe de onde ela veio",
          "Quem quer gostar de física, não só passar nela",
        ],
        modules: [
          {
            title: "Mecânica Clássica e Leis de Conservação",
            lessons: 48,
            hours: 40,
            summary:
              "Cinemática vetorial, dinâmica newtoniana, energia e momento.",
          },
          {
            title: "Termodinâmica e Física Estatística",
            lessons: 26,
            hours: 20,
            summary:
              "Calor, trabalho, máquinas térmicas e entropia explicadas do zero.",
          },
          {
            title: "Ondulatória, Acústica e Óptica",
            lessons: 30,
            hours: 24,
            summary:
              "Fenômenos ondulatórios, interferência e óptica geométrica.",
          },
          {
            title: "Eletromagnetismo e Física Moderna",
            lessons: 46,
            hours: 36,
            summary:
              "Campos, circuitos, indução de Faraday e introdução à relatividade e quântica.",
          },
        ],
        level_order: 3,
        surface_color: "#f1ecff",
        accent_badge: "#cdbdff",
        hours_total: 120,
        lessons_count: 150,
        price_cents: 99700,
      },
      {
        slug: "licoes-de-calculo",
        code: "LC",
        title: "Lições de Cálculo",
        eyebrow: "LC · O degrau mais alto",
        subtitle: "O degrau mais alto: ITA, IME, Escola Naval.",
        description:
          "Limites, derivadas e integrais do jeito que o cálculo nasceu: primeiro a pergunta, depois a conta. Curso e livro juntos.",
        for_who: [
          "ITA, IME e Escola Naval",
          "Quem terminou o LM e quer o próximo degrau",
          "Quem vai pra engenharia ou física e não quer chegar cru no Cálculo I",
        ],
        modules: [
          {
            title: "O Infinito e a Ideia de Limite",
            lessons: 24,
            hours: 22,
            summary:
              "Paradoxos de Zenão, continuidade e rigor com épsilon e delta.",
          },
          {
            title: "Derivadas: Taxas de Variação e Otimização",
            lessons: 28,
            hours: 26,
            summary:
              "Reta tangente, regra da cadeia, máximos e mínimos em física.",
          },
          {
            title: "Integrais e o Teorema Fundamental",
            lessons: 30,
            hours: 28,
            summary:
              "Somas de Riemann, técnicas de integração e áreas/volumes.",
          },
          {
            title: "Séries, EDOs e Aplicações ITA/IME",
            lessons: 26,
            hours: 24,
            summary:
              "Equações diferenciais ordinárias e problemas olímpicos/militares.",
          },
        ],
        level_order: 4,
        surface_color: "#f9f3e3",
        accent_badge: "#ffb8cb",
        hours_total: 100,
        lessons_count: 108,
        price_cents: 119700,
      },
    ];

    for (const c of coursesSeed) {
      insertCourse.run(
        c.slug,
        c.code,
        c.title,
        c.eyebrow,
        c.subtitle,
        c.description,
        JSON.stringify(c.for_who),
        JSON.stringify(c.modules),
        c.level_order,
        c.surface_color,
        c.accent_badge,
        c.hours_total,
        c.lessons_count,
        c.price_cents
      );
    }
  }

  const bookCount = db
    .prepare("SELECT COUNT(*) as count FROM books")
    .get() as { count: number };

  if (bookCount.count === 0) {
    const insertBook = db.prepare(`
      INSERT INTO books (
        slug, title, subtitle, description, edition, pages, price_cents, badge, surface_color, highlights
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const booksSeed: BookRecord[] = [
      {
        slug: "licoes-de-calculo",
        title: "Lições de Cálculo",
        subtitle: "Limites, derivadas e integrais pela Editora 314",
        description:
          "A primeira edição esgotou em sete dias. Um livro pensado para ensinar cálculo do jeito que ele nasceu: primeiro o problema físico e geométrico, depois a ferramenta formal.",
        edition: "2ª Edição · Capa Dura",
        pages: 480,
        price_cents: 18900,
        badge: "Best-seller Editora 314",
        surface_color: "#f9f3e3",
        highlights: [
          "Mais de 300 figuras e demonstrações passo a passo",
          "Integração direta com o curso em vídeo Lições de Cálculo",
          "Problemas selecionados do ITA, IME e universidades federais",
        ],
      },
      {
        slug: "guia-de-formulas-explicadas",
        title: "Guia de Fórmulas Explicadas",
        subtitle: "Coleção em 2 volumes de capa dura (Física e Matemática)",
        description:
          "O antídoto definitivo contra a decoreba. Em dois volumes de capa dura, cada fórmula do ensino médio e dos vestibulares aparece acompanhada de sua origem, intuição e demonstração.",
        edition: "1ª Edição · Box 2 Volumes",
        pages: 640,
        price_cents: 24900,
        badge: "Lançamento 2026",
        surface_color: "#eaf0ff",
        highlights: [
          "Volume 1: Matemática completa pelo porquê",
          "Volume 2: Física completa do fenômeno à equação",
          "Incluso como bônus na matrícula Vitalícia do Universo Narrado",
        ],
      },
    ];

    for (const b of booksSeed) {
      insertBook.run(
        b.slug,
        b.title,
        b.subtitle,
        b.description,
        b.edition,
        b.pages,
        b.price_cents,
        b.badge,
        b.surface_color,
        JSON.stringify(b.highlights)
      );
    }
  }

  const userCount = db
    .prepare("SELECT COUNT(*) as count FROM users")
    .get() as { count: number };

  if (userCount.count === 0) {
    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, target_exam)
      VALUES (?, ?, ?, ?, ?)
    `);
    const demoHash = hashPassword("sapereaude");
    const result = insertUser.run(
      "Estudante UN",
      "aluno@universonarrado.com.br",
      demoHash,
      "student",
      "ITA/IME"
    );

    const userId = Number(result.lastInsertRowid);
    const insertEnrollment = db.prepare(`
      INSERT INTO enrollments (user_id, course_slug, progress_pct, completed_lessons)
      VALUES (?, ?, ?, ?)
    `);
    insertEnrollment.run(
      userId,
      "desvendando-a-matematica",
      75,
      JSON.stringify([0, 1, 2])
    );
    insertEnrollment.run(
      userId,
      "licoes-de-fisica",
      25,
      JSON.stringify([0])
    );
  }
}

export function getAllCourses(): CourseRecord[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM courses ORDER BY level_order ASC")
    .all() as Record<string, unknown>[];

  return rows.map((r) => ({
    slug: String(r.slug),
    code: r.code as CourseRecord["code"],
    title: String(r.title),
    eyebrow: String(r.eyebrow),
    subtitle: String(r.subtitle),
    description: String(r.description),
    for_who: JSON.parse(String(r.for_who)),
    modules: JSON.parse(String(r.modules)),
    level_order: Number(r.level_order),
    surface_color: String(r.surface_color),
    accent_badge: String(r.accent_badge),
    hours_total: Number(r.hours_total),
    lessons_count: Number(r.lessons_count),
    price_cents: Number(r.price_cents),
  }));
}

export function getCourseBySlug(slug: string): CourseRecord | null {
  const courses = getAllCourses();
  return courses.find((c) => c.slug === slug) ?? null;
}

export function getAllBooks(): BookRecord[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM books").all() as Record<
    string,
    unknown
  >[];

  return rows.map((r) => ({
    slug: String(r.slug),
    title: String(r.title),
    subtitle: String(r.subtitle),
    description: String(r.description),
    edition: String(r.edition),
    pages: Number(r.pages),
    price_cents: Number(r.price_cents),
    badge: String(r.badge),
    surface_color: String(r.surface_color),
    highlights: JSON.parse(String(r.highlights)),
  }));
}

