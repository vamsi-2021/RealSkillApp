export type LessonStatus = 'completed' | 'in_progress' | 'locked';
export type TierLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface SubLesson {
  id: string;
  title: string;
  duration: string;
  status: LessonStatus;
  lessonId?: string; // maps to lessonData.ts — undefined for locked lessons
}

export interface Section {
  id: string;
  title: string;
  description: string;
  status: LessonStatus;
  progress: number;
  subLessons: SubLesson[];
}

export interface Tier {
  id: string;
  number: string;
  level: TierLevel;
  sections: Section[];
}

export const LEVEL_COLORS: Record<TierLevel, string> = {
  BEGINNER: '#22C55E',
  INTERMEDIATE: '#F59E0B',
  ADVANCED: '#EF4444',
};

export const TIERS: Tier[] = [
  {
    id: 't1',
    number: '01',
    level: 'BEGINNER',
    sections: [
      {
        id: 's1',
        title: 'Workshop Safety & PPE',
        description:
          'Learn the essential safety practices and personal protective equipment required for a safe welding environment.',
        status: 'completed',
        progress: 1,
        subLessons: [
          { id: 'sl1', title: 'Introduction to Workshop Safety', duration: '6 min', status: 'completed', lessonId: 's4' },
          { id: 'sl2', title: 'Personal Protective Equipment (PPE)', duration: '8 min', status: 'completed', lessonId: 's4' },
          { id: 'sl3', title: 'Workshop Hazards & Risk Awareness', duration: '7 min', status: 'completed', lessonId: 's4' },
          { id: 'sl4', title: 'Fire Safety & Emergency Procedures', duration: '9 min', status: 'in_progress', lessonId: 's4' },
          { id: 'sl5', title: 'Safe Equipment Handling', duration: '7 min', status: 'locked' },
        ],
      },
      {
        id: 's2',
        title: 'Machine Setup & Polarity',
        description:
          'Master the fundamentals of setting up your welding machine and understanding polarity for optimal weld quality.',
        status: 'completed',
        progress: 1,
        subLessons: [
          { id: 'sl6', title: 'Understanding AC/DC Current', duration: '5 min', status: 'completed', lessonId: '1' },
          { id: 'sl7', title: 'Polarity Settings & Effects', duration: '7 min', status: 'completed', lessonId: 's5' },
          { id: 'sl8', title: 'Machine Parameters Setup', duration: '8 min', status: 'completed', lessonId: '1' },
          { id: 'sl9', title: 'Cable & Ground Connections', duration: '6 min', status: 'completed', lessonId: '1' },
          { id: 'sl10', title: 'Pre-weld Safety Checklist', duration: '5 min', status: 'completed', lessonId: 's4' },
        ],
      },
      {
        id: 's3',
        title: 'Striking & Restarting the Arc',
        description:
          'Develop your arc-striking technique and learn to confidently restart the arc after interruptions.',
        status: 'completed',
        progress: 1,
        subLessons: [
          { id: 'sl11', title: 'Scratch vs. Tap Starting Method', duration: '6 min', status: 'completed', lessonId: '1' },
          { id: 'sl12', title: 'Electrode Angle & Travel Speed', duration: '8 min', status: 'completed', lessonId: '2' },
          { id: 'sl13', title: 'Arc Length Control', duration: '7 min', status: 'completed', lessonId: '1' },
          { id: 'sl14', title: 'Restarting After Stick', duration: '5 min', status: 'completed', lessonId: '1' },
          { id: 'sl15', title: 'Common Arc Issues & Fixes', duration: '6 min', status: 'completed', lessonId: 's3' },
        ],
      },
    ],
  },
  {
    id: 't2',
    number: '02',
    level: 'INTERMEDIATE',
    sections: [
      {
        id: 's4',
        title: '1G Flat Stringer Beads',
        description:
          'Build the foundation of weld quality by practicing controlled stringer beads in the flat position.',
        status: 'in_progress',
        progress: 0.65,
        subLessons: [
          { id: 'sl16', title: 'Flat Position Fundamentals', duration: '7 min', status: 'completed', lessonId: '2' },
          { id: 'sl17', title: 'Stringer Bead Technique', duration: '9 min', status: 'completed', lessonId: '2' },
          { id: 'sl18', title: 'Travel Speed & Consistency', duration: '8 min', status: 'in_progress', lessonId: '2' },
          { id: 'sl19', title: 'Bead Width & Penetration', duration: '7 min', status: 'locked' },
          { id: 'sl20', title: 'Visual Inspection Criteria', duration: '6 min', status: 'locked' },
        ],
      },
      {
        id: 's5',
        title: '2G Horizontal Fillet',
        description:
          'Advance to horizontal fillet welds, developing control against gravity and improving bead consistency.',
        status: 'in_progress',
        progress: 0.28,
        subLessons: [
          { id: 'sl21', title: 'Horizontal Position Setup', duration: '6 min', status: 'completed', lessonId: '2' },
          { id: 'sl22', title: 'Fillet Weld Geometry', duration: '7 min', status: 'in_progress', lessonId: 's3' },
          { id: 'sl23', title: 'Controlling Undercut', duration: '8 min', status: 'locked' },
          { id: 'sl24', title: 'Multi-pass Technique', duration: '9 min', status: 'locked' },
          { id: 'sl25', title: 'Horizontal Weld Inspection', duration: '6 min', status: 'locked' },
        ],
      },
      {
        id: 's6',
        title: 'Bead Profile & Inspection',
        description:
          'Learn to evaluate weld quality visually and understand the acceptance criteria for SMAW welds.',
        status: 'in_progress',
        progress: 0,
        subLessons: [
          { id: 'sl26', title: 'Visual Inspection Basics', duration: '7 min', status: 'locked' },
          { id: 'sl27', title: 'Common Weld Defects', duration: '9 min', status: 'locked' },
          { id: 'sl28', title: 'Measuring Tools & Gauges', duration: '6 min', status: 'locked' },
          { id: 'sl29', title: 'AWS Acceptance Criteria', duration: '8 min', status: 'locked' },
          { id: 'sl30', title: 'Repair Techniques', duration: '7 min', status: 'locked' },
        ],
      },
    ],
  },
  {
    id: 't3',
    number: '03',
    level: 'ADVANCED',
    sections: [
      {
        id: 's7',
        title: '3G Vertical-Up Plate',
        description:
          'Master the challenging vertical-up position, developing the control needed for structural certification.',
        status: 'locked',
        progress: 0,
        subLessons: [
          { id: 'sl31', title: 'Vertical Position Fundamentals', duration: '8 min', status: 'locked' },
          { id: 'sl32', title: 'Uphill Progression Technique', duration: '9 min', status: 'locked' },
          { id: 'sl33', title: 'Weave Patterns', duration: '7 min', status: 'locked' },
          { id: 'sl34', title: 'Root, Fill & Cap Passes', duration: '10 min', status: 'locked' },
          { id: 'sl35', title: '3G Certification Prep', duration: '8 min', status: 'locked' },
        ],
      },
      {
        id: 's8',
        title: '4G Overhead Groove',
        description:
          'Tackle the most demanding position—overhead groove welding—required for AWS D1.1 certification.',
        status: 'locked',
        progress: 0,
        subLessons: [
          { id: 'sl36', title: 'Overhead Safety Precautions', duration: '6 min', status: 'locked' },
          { id: 'sl37', title: 'Overhead Arc Control', duration: '9 min', status: 'locked' },
          { id: 'sl38', title: 'Puddle Management', duration: '8 min', status: 'locked' },
          { id: 'sl39', title: 'Multi-pass Overhead Technique', duration: '10 min', status: 'locked' },
          { id: 'sl40', title: '4G Certification Prep', duration: '8 min', status: 'locked' },
        ],
      },
      {
        id: 's9',
        title: 'AWS D1.1 Plate Certification',
        description:
          'Prepare comprehensively for the AWS D1.1 Structural Welding plate certification test.',
        status: 'locked',
        progress: 0,
        subLessons: [
          { id: 'sl41', title: 'AWS D1.1 Code Overview', duration: '7 min', status: 'locked' },
          { id: 'sl42', title: 'Qualification Test Procedures', duration: '9 min', status: 'locked' },
          { id: 'sl43', title: 'Mock Certification Test 1', duration: '12 min', status: 'locked' },
          { id: 'sl44', title: 'Mock Certification Test 2', duration: '12 min', status: 'locked' },
          { id: 'sl45', title: 'Final Exam & Submission', duration: '15 min', status: 'locked' },
        ],
      },
    ],
  },
];
