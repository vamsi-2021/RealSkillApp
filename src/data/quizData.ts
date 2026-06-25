export interface QuizOption {
  letter: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctLetter: string;
  explanation: string;
  xp: number;
}

export interface QuizData {
  feedItemId: string;
  title: string;
  category: string;
  questions: QuizQuestion[];
}

const QUIZZES: Record<string, QuizData> = {
  '1': {
    feedItemId: '1',
    title: 'Striking the Arc with E7018 Low-Hydrogen',
    category: 'SMAW ARC CONTROL',
    questions: [
      {
        id: 'q1',
        question:
          'Which polarity should you use when running an E7018 low-hydrogen electrode?',
        options: [
          {
            letter: 'A',
            text: 'DCEN (electrode negative) — for the deepest penetration',
          },
          {
            letter: 'B',
            text: 'DCEP (electrode positive) — reverse polarity',
          },
          { letter: 'C', text: 'AC only — DC will overheat the rod' },
          {
            letter: 'D',
            text: "Polarity doesn't matter for low-hydrogen rods",
          },
        ],
        correctLetter: 'B',
        explanation:
          'E7018 runs on DCEP (reverse polarity). Electrode-positive drives more heat into the rod, producing the deep penetration and low-hydrogen weld required by AWS D1.1 structural code.',
        xp: 45,
      },
      {
        id: 'q2',
        question:
          'What storage temperature must E7018 electrodes be held at to prevent moisture absorption?',
        options: [
          { letter: 'A', text: 'Room temperature (20–25°C) in a sealed bag' },
          { letter: 'B', text: '50–75°F in any cool dry location' },
          { letter: 'C', text: '250–300°F (120–150°C) in a rod oven' },
          { letter: 'D', text: 'Any temperature above freezing' },
        ],
        correctLetter: 'C',
        explanation:
          'E7018 is a low-hydrogen electrode requiring storage at 250–300°F in a rod oven per AWS D1.1. Excess moisture causes hydrogen pickup and hydrogen-induced cracking in the finished weld.',
        xp: 45,
      },
      {
        id: 'q3',
        question:
          'What is the correct travel (drag) angle for a 1G flat bead with E7018?',
        options: [
          { letter: 'A', text: '5–10° push angle from vertical' },
          { letter: 'B', text: '10–15° drag (pull) angle from vertical' },
          { letter: 'C', text: '45° angle to the work surface' },
          { letter: 'D', text: 'Vertical (90°) with no travel angle' },
        ],
        correctLetter: 'B',
        explanation:
          'A 10–15° trailing (drag) angle gives good visibility of the leading puddle edge and proper slag control, producing a clean, consistent bead profile with E7018 on flat plate.',
        xp: 45,
      },
    ],
  },
  '2': {
    feedItemId: '2',
    title: 'Running a Bead: Travel Speed & Angle Control',
    category: 'MIG WELDING FUNDAMENTALS',
    questions: [
      {
        id: 'q1',
        question:
          'What happens to the weld bead if your travel speed is too fast with MIG?',
        options: [
          {
            letter: 'A',
            text: 'Wider bead with excessive penetration',
          },
          {
            letter: 'B',
            text: 'Narrow, ropy bead with poor fusion',
          },
          { letter: 'C', text: 'Perfectly flat bead — speed has no effect' },
          { letter: 'D', text: 'Increased spatter only, no bead profile change' },
        ],
        correctLetter: 'B',
        explanation:
          'Too-fast travel speed gives the puddle insufficient time to spread and fuse into the base metal, producing a narrow, convex bead with lack-of-fusion defects at the toes.',
        xp: 40,
      },
      {
        id: 'q2',
        question:
          'For MIG welding in a push technique, which direction does the gun point?',
        options: [
          { letter: 'A', text: 'Into the direction of travel (pointing forward)' },
          { letter: 'B', text: 'Away from the direction of travel (pointing backward)' },
          { letter: 'C', text: 'Perpendicular to the work surface' },
          { letter: 'D', text: 'Push vs. pull has no practical difference' },
        ],
        correctLetter: 'A',
        explanation:
          'Push technique points the gun in the direction of travel (away from the puddle). It produces a flatter, wider bead with less penetration — common for thin material to reduce burn-through risk.',
        xp: 40,
      },
    ],
  },
};

const DEFAULT_QUIZ: QuizData = {
  feedItemId: 'default',
  title: 'Skills Mastery Check',
  category: 'SKILLS ASSESSMENT',
  questions: [
    {
      id: 'dq1',
      question:
        'Which PPE is the minimum requirement for SMAW arc welding operations?',
      options: [
        { letter: 'A', text: 'Safety glasses only' },
        {
          letter: 'B',
          text: 'Full welding hood, leather gloves, and flame-resistant jacket',
        },
        { letter: 'C', text: 'Sunglasses with a #5 filter lens' },
        { letter: 'D', text: 'A clear-visor face shield' },
      ],
      correctLetter: 'B',
      explanation:
        'SMAW produces intense UV/IR radiation, sparks, and spatter. A welding hood (shade #10–13), leather gloves, and a flame-resistant jacket are minimum required PPE per OSHA 1910.252.',
      xp: 30,
    },
    {
      id: 'dq2',
      question:
        'What does the "70" in the E7018 electrode designation represent?',
      options: [
        { letter: 'A', text: 'The electrode diameter in thousandths of an inch' },
        {
          letter: 'B',
          text: 'Minimum tensile strength of 70,000 psi (70 ksi)',
        },
        { letter: 'C', text: 'The amperage range required for the electrode' },
        { letter: 'D', text: 'The percentage of iron powder in the coating' },
      ],
      correctLetter: 'B',
      explanation:
        'AWS classification: "E" = electrode, "70" = 70,000 psi minimum tensile strength, "1" = all-position, "8" = low-hydrogen flux coating with DCEP or AC current.',
      xp: 30,
    },
  ],
};

export function getQuiz(feedItemId: string): QuizData {
  return QUIZZES[feedItemId] ?? DEFAULT_QUIZ;
}
