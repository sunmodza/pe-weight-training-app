export interface UserProfile {
  id: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  bmi: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SetLog {
  setNumber: number;
  targetReps?: number;
  actualReps?: number;
  targetDuration?: number; // seconds
  actualDuration?: number; // seconds
  restDuration?: number; // seconds
  rpe?: number; // 1-10
  completed: boolean;
}

export interface ExerciseLog {
  name: string;
  phase: "warmup" | "main" | "cooldown";
  order: number;
  sets: SetLog[];
  actualDuration: number; // seconds
  targetDuration: number; // seconds
  completed: boolean;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  programName: "Beginner Full-body Bodyweight";
  startTime: Date;
  endTime: Date;
  totalDuration: number; // minutes
  phase: "warmup" | "main" | "cooldown" | "completed";
  currentExercise: number;
  currentSet: number;
  exercises: ExerciseLog[];
  notes?: string;
  overallRPE?: number; // 1-10
}

export interface AppSettings {
  soundEnabled: boolean;
  voiceEnabled: boolean;
  notificationsEnabled: boolean;
  wakeLockEnabled: boolean;
  theme: "light" | "dark" | "auto";
  language: "th" | "en";
}

export interface Exercise {
  name: string;
  nameEn: string;
  phase: "warmup" | "main" | "cooldown";
  order: number;
  duration: number; // seconds
  sets?: number;
  reps?: string;
  rpe?: string;
  restTime?: number; // seconds between sets
  instructions: string;
}

export interface WorkoutStep {
  id: string;
  type: "exercise" | "rest";
  name: string;
  nameEn: string;
  phase: "warmup" | "main" | "cooldown";
  exerciseOrder: number;
  setNumber?: number; // for main phase exercises with sets
  totalSets?: number; // for main phase exercises with sets
  duration: number; // seconds
  reps?: string;
  rpe?: string;
  instructions: string;
  isRest?: boolean;
}

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  totalTimeRemaining: number; // seconds
  currentPhase: "warmup" | "main" | "cooldown" | "completed";
  currentExerciseIndex: number;
  currentSet: number;
  currentExerciseTimeRemaining: number;
  progress: number; // 0-100
}

export const STORAGE_KEYS = {
  USER_PROFILE: 'workout_user_profile',
  WORKOUT_HISTORY: 'workout_history',
  CURRENT_SESSION: 'workout_current_session',
  APP_SETTINGS: 'workout_app_settings',
  WEEKLY_GOALS: 'workout_weekly_goals'
} as const;