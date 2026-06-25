export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface LessonData {
  id: string;
  title: string;
  category: string;
  course: string;
  level: DifficultyLevel;
  duration: string;
  bgColor: string;
  accentColor: string;
  summary: string;
  takeaways: string[];
  relatedIds: string[];
  xp: number;
}

const LESSONS: Record<string, LessonData> = {
  '1': {
    id: '1',
    title: 'Striking the Arc with E7018 Low-Hydrogen',
    category: 'ELECTRODE TECHNIQUE',
    course: 'SMAW ARC CONTROL',
    level: 'INTERMEDIATE',
    duration: '3:45',
    bgColor: '#06111E',
    accentColor: '#0A2848',
    summary:
      'Master the scratch and tap starts for E7018 on DCEP. Keep flux dry, hold a tight arc length, and avoid the porosity that ruins code-quality structural welds.',
    takeaways: [
      'Run E7018 on DCEP (electrode positive) for stable penetration',
      'Hold arc length equal to the electrode core diameter (~1/8")',
      'Keep rods in a 250°F rod oven — moisture causes hydrogen cracking',
    ],
    relatedIds: ['s2', 's3', 's4'],
    xp: 45,
  },
  '2': {
    id: '2',
    title: 'Running a Bead: Travel Speed & Angle Control',
    category: 'TECHNIQUE',
    course: 'MIG WELDING FUNDAMENTALS',
    level: 'BEGINNER',
    duration: '5:20',
    bgColor: '#0B1A0D',
    accentColor: '#0D3018',
    summary:
      'Consistent travel speed and correct gun angle are the foundation of quality MIG welds. Dial in flat and horizontal beads before moving to position work.',
    takeaways: [
      'Maintain a 10–15° drag angle for best penetration and bead profile',
      'Too-fast travel creates narrow, ropy beads with lack of fusion',
      'Push technique gives a wider, flatter bead — ideal for thin material',
    ],
    relatedIds: ['1', 's5', 's3'],
    xp: 40,
  },
  '3': {
    id: '3',
    title: 'Residential Panel Wiring: 200A Main Breaker',
    category: 'PANEL WORK',
    course: 'ELECTRICAL SYSTEMS',
    level: 'ADVANCED',
    duration: '8:12',
    bgColor: '#13100A',
    accentColor: '#2A1A06',
    summary:
      'Wire a 200A residential main panel safely — from landing service entrance conductors to torquing the neutral bus. Covers NEC code requirements and the most common mistakes.',
    takeaways: [
      'Always de-energize the utility feed before touching the main lugs',
      'Neutral and ground bars must be bonded only at the main panel',
      'Torque all lugs to manufacturer spec — loose connections cause fires',
    ],
    relatedIds: ['4', 's4', '5'],
    xp: 60,
  },
  '4': {
    id: '4',
    title: 'Press Fit vs Solder: Which to Use & When',
    category: 'PIPE FITTING',
    course: 'PLUMBING ESSENTIALS',
    level: 'INTERMEDIATE',
    duration: '4:50',
    bgColor: '#080F1A',
    accentColor: '#0A1A3A',
    summary:
      'Press fittings and solder joints each have their place. Learn when code allows press, when you must sweat, and how to make leak-free connections every time.',
    takeaways: [
      'Press fittings require no open flame — approved for occupied spaces',
      'Solder requires a dry pipe; any water prevents proper tinning',
      'Always use lead-free solder (≤0.2% lead) for potable water systems',
    ],
    relatedIds: ['3', '5', 's4'],
    xp: 45,
  },
  '5': {
    id: '5',
    title: 'Framing a Load-Bearing Wall Step by Step',
    category: 'FRAMING',
    course: 'CARPENTRY FUNDAMENTALS',
    level: 'BEGINNER',
    duration: '6:30',
    bgColor: '#140C06',
    accentColor: '#3A1A06',
    summary:
      'Frame a load-bearing wall from layout to plumb-and-brace. Covers header sizing, stud spacing, and the IBC requirements that keep your structure code-compliant.',
    takeaways: [
      'Double top plate transfers the load to the studs — never skip it',
      'Header size depends on span and load above; always check the span table',
      '16" on-center stud spacing is standard; 24" requires engineered loads',
    ],
    relatedIds: ['3', '4', 's4'],
    xp: 40,
  },

  // ── Extended lessons (appear in related lists) ───────────────────────────

  s2: {
    id: 's2',
    title: 'Vertical-Up 3G Weave on Structural Plate',
    category: 'JOINT POSITIONS',
    course: 'SMAW ARC CONTROL',
    level: 'ADVANCED',
    duration: '5:12',
    bgColor: '#081A10',
    accentColor: '#0D3018',
    summary:
      'The 3G vertical-up position demands precise weave motion and arc length control. Master the Z-weave and C-weave patterns to pass AWS D1.1 plate certification.',
    takeaways: [
      'Push into the toes on each leg of the weave to ensure toe fusion',
      'Pause at each side — allow the puddle to wet in fully before moving',
      'Keep travel speed steady; hesitation creates undercut at the toes',
    ],
    relatedIds: ['1', 's3', 's4'],
    xp: 55,
  },
  s3: {
    id: 's3',
    title: 'Reading the Bead: Porosity, Undercut & Overlap',
    category: 'WELD INSPECTION',
    course: 'SMAW ARC CONTROL',
    level: 'INTERMEDIATE',
    duration: '4:20',
    bgColor: '#181006',
    accentColor: '#2A1A06',
    summary:
      'Every bead tells a story. Learn to identify porosity, undercut, overlap, and incomplete fusion — and trace each defect back to its root cause.',
    takeaways: [
      'Porosity = gas entrapment; check for moisture, contamination, or low amperage',
      'Undercut at the toes means travel speed or arc length is too high',
      'Overlap (cold lap) indicates insufficient heat or travel that is too slow',
    ],
    relatedIds: ['1', 's2', 's4'],
    xp: 45,
  },
  s4: {
    id: 's4',
    title: 'PPE & Hot Work Safety for SMAW',
    category: 'SAFETY PROTOCOL',
    course: 'WORKPLACE SAFETY',
    level: 'BEGINNER',
    duration: '2:55',
    bgColor: '#10081A',
    accentColor: '#1E0E2E',
    summary:
      'Hot work accounts for a significant share of industrial fires. This lesson covers OSHA-required PPE, fire watch procedures, and safe work area setup for arc welding.',
    takeaways: [
      'Wear a properly shaded lens (#10–13 for SMAW) to prevent arc eye',
      'Establish a 35-foot hot work perimeter — remove all combustibles',
      'Fire watch must remain on site for 30 minutes after the arc is out',
    ],
    relatedIds: ['1', 's2', 's3'],
    xp: 30,
  },
  s5: {
    id: 's5',
    title: 'E6010 vs E7018: Electrode Selection Guide',
    category: 'ELECTRODE TECHNIQUE',
    course: 'SMAW ARC CONTROL',
    level: 'INTERMEDIATE',
    duration: '6:10',
    bgColor: '#061218',
    accentColor: '#0A2030',
    summary:
      "E6010 and E7018 are the two dominant SMAW electrodes in structural work — and they couldn't be more different. Learn when to reach for each and why the choice matters.",
    takeaways: [
      'E6010 digs through contamination; E7018 needs clean, dry base metal',
      'E6010 is the root-pass choice for open-root pipe and structural joints',
      'E7018 delivers superior notch toughness — required by AWS D1.1 for critical joints',
    ],
    relatedIds: ['1', 's2', 's3'],
    xp: 45,
  },
};

export function getLesson(id: string): LessonData {
  return LESSONS[id] ?? LESSONS['1'];
}

export function getLessons(ids: string[]): LessonData[] {
  return ids.map(id => LESSONS[id]).filter(Boolean) as LessonData[];
}
