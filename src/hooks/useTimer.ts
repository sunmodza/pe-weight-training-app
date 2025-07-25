import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerState, WorkoutStep } from '@/types';
import { BEGINNER_BODYWEIGHT_PROGRAM, TOTAL_WORKOUT_DURATION, getStepAtTime } from '@/data/workout-program';

interface UseTimerReturn {
  timerState: TimerState;
  currentStep: WorkoutStep | null;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  endWorkout: () => void;
}

export function useTimer(): UseTimerReturn {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    totalTimeRemaining: TOTAL_WORKOUT_DURATION,
    currentPhase: "warmup",
    currentExerciseIndex: 0,
    currentSet: 1,
    currentExerciseTimeRemaining: 0,
    progress: 0
  });

  const [currentStep, setCurrentStep] = useState<WorkoutStep | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  const updateCurrentStep = useCallback((timeElapsed: number) => {
    const result = getStepAtTime(timeElapsed);
    if (result) {
      setCurrentStep(result.step);
      setTimerState(prev => ({
        ...prev,
        currentExerciseTimeRemaining: result.step.duration - result.stepTimeElapsed,
        currentPhase: result.step.phase,
        currentExerciseIndex: BEGINNER_BODYWEIGHT_PROGRAM.findIndex(step => step === result.step),
        currentSet: result.step.setNumber || 1
      }));
    }
  }, []);

  const tick = useCallback(() => {
    const now = Date.now();
    const timeElapsed = Math.floor((now - startTimeRef.current - pausedTimeRef.current) / 1000);
    const timeRemaining = TOTAL_WORKOUT_DURATION - timeElapsed;

    if (timeRemaining <= 0) {
      setTimerState(prev => ({
        ...prev,
        isRunning: false,
        totalTimeRemaining: 0,
        currentPhase: "completed",
        progress: 100
      }));
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    updateCurrentStep(timeElapsed);

    setTimerState(prev => ({
      ...prev,
      totalTimeRemaining: timeRemaining,
      progress: (timeElapsed / TOTAL_WORKOUT_DURATION) * 100
    }));
  }, [updateCurrentStep]);

  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(tick, 100); // Update every 100ms for smooth progress
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState.isRunning, timerState.isPaused, tick]);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false
    }));
    updateCurrentStep(0);
  }, [updateCurrentStep]);

  const pauseTimer = useCallback(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      setTimerState(prev => ({
        ...prev,
        isPaused: true
      }));
    }
  }, [timerState.isRunning, timerState.isPaused]);

  const resumeTimer = useCallback(() => {
    if (timerState.isRunning && timerState.isPaused) {
      const pauseStartTime = Date.now();
      const pauseDuration = pauseStartTime - (startTimeRef.current + pausedTimeRef.current + (TOTAL_WORKOUT_DURATION - timerState.totalTimeRemaining) * 1000);
      pausedTimeRef.current += pauseDuration;
      
      setTimerState(prev => ({
        ...prev,
        isPaused: false
      }));
    }
  }, [timerState.isRunning, timerState.isPaused, timerState.totalTimeRemaining]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setTimerState({
      isRunning: false,
      isPaused: false,
      totalTimeRemaining: TOTAL_WORKOUT_DURATION,
      currentPhase: "warmup",
      currentExerciseIndex: 0,
      currentSet: 1,
      currentExerciseTimeRemaining: 0,
      progress: 0
    });
    
    setCurrentStep(null);
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
  }, []);

  const skipToNext = useCallback(() => {
    if (!timerState.isRunning) return;

    const timeElapsed = TOTAL_WORKOUT_DURATION - timerState.totalTimeRemaining;
    const result = getStepAtTime(timeElapsed);
    
    if (result) {
      const currentStepIndex = BEGINNER_BODYWEIGHT_PROGRAM.findIndex(step => step === result.step);
      if (currentStepIndex < BEGINNER_BODYWEIGHT_PROGRAM.length - 1) {
        const nextStepStartTime = BEGINNER_BODYWEIGHT_PROGRAM
          .slice(0, currentStepIndex + 1)
          .reduce((total, step) => total + step.duration, 0);
        
        const newTimeElapsed = nextStepStartTime;
        const adjustmentTime = newTimeElapsed - timeElapsed;
        startTimeRef.current -= adjustmentTime * 1000;
        
        updateCurrentStep(newTimeElapsed);
      }
    }
  }, [timerState.isRunning, timerState.totalTimeRemaining, updateCurrentStep]);

  const skipToPrevious = useCallback(() => {
    if (!timerState.isRunning) return;

    const timeElapsed = TOTAL_WORKOUT_DURATION - timerState.totalTimeRemaining;
    const result = getStepAtTime(timeElapsed);
    
    if (result) {
      const currentStepIndex = BEGINNER_BODYWEIGHT_PROGRAM.findIndex(step => step === result.step);
      if (currentStepIndex > 0) {
        const prevStepStartTime = BEGINNER_BODYWEIGHT_PROGRAM
          .slice(0, currentStepIndex - 1)
          .reduce((total, step) => total + step.duration, 0);
        
        const newTimeElapsed = prevStepStartTime;
        const adjustmentTime = newTimeElapsed - timeElapsed;
        startTimeRef.current -= adjustmentTime * 1000;
        
        updateCurrentStep(newTimeElapsed);
      }
    }
  }, [timerState.isRunning, timerState.totalTimeRemaining, updateCurrentStep]);

  const endWorkout = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  return {
    timerState,
    currentStep,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipToNext,
    skipToPrevious,
    endWorkout
  };
}