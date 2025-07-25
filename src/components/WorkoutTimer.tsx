'use client';

import { useState, useEffect } from 'react';
import { useTimer } from '@/hooks/useTimer';
import { UserProfile } from '@/types';
import { Play, Pause, SkipForward, SkipBack, Square, Settings, History } from 'lucide-react';
import { PHASE_DURATIONS, TOTAL_WORKOUT_DURATION } from '@/data/workout-program';

interface WorkoutTimerProps {
  userProfile: UserProfile;
  onWorkoutComplete: (duration: number) => void;
  onEditProfile: () => void;
  onViewHistory: () => void;
}

export default function WorkoutTimer({ userProfile, onWorkoutComplete, onEditProfile, onViewHistory }: WorkoutTimerProps) {
  const {
    timerState,
    currentStep,
    startTimer,
    pauseTimer,
    resumeTimer,
    skipToNext,
    skipToPrevious,
    endWorkout
  } = useTimer();

  const [showGetReady, setShowGetReady] = useState(false);
  const [getReadyCount, setGetReadyCount] = useState(5);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseLabel = (phase: string): string => {
    switch (phase) {
      case 'warmup': return 'อบอุ่นร่างกาย';
      case 'main': return 'ออกกำลังกายหลัก';
      case 'cooldown': return 'คลายกล้ามเนื้อ';
      case 'completed': return 'เสร็จสิ้น';
      default: return '';
    }
  };

  const getPhaseColor = (phase: string): string => {
    switch (phase) {
      case 'warmup': return 'bg-yellow-500';
      case 'main': return 'bg-red-500';
      case 'cooldown': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStart = () => {
    setShowGetReady(true);
    setGetReadyCount(5);
    
    const countdown = setInterval(() => {
      setGetReadyCount(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setShowGetReady(false);
          startTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePauseResume = () => {
    if (timerState.isPaused) {
      resumeTimer();
    } else {
      pauseTimer();
    }
  };

  const handleEndWorkout = () => {
    if (confirm('คุณต้องการจบการออกกำลังกายหรือไม่?')) {
      endWorkout();
      const durationInMinutes = Math.round((TOTAL_WORKOUT_DURATION - timerState.totalTimeRemaining) / 60);
      onWorkoutComplete(durationInMinutes || 0);
    }
  };

  useEffect(() => {
    if (timerState.currentPhase === 'completed') {
      const durationInMinutes = Math.round((TOTAL_WORKOUT_DURATION - timerState.totalTimeRemaining) / 60);
      onWorkoutComplete(durationInMinutes || 0);
    }
  }, [timerState.currentPhase, timerState.totalTimeRemaining, onWorkoutComplete]);

  if (showGetReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-8">เตรียมพร้อม!</h1>
          <div className="text-8xl font-bold mb-4">{getReadyCount}</div>
          <p className="text-xl">เริ่มออกกำลังกายใน {getReadyCount} วินาที</p>
        </div>
      </div>
    );
  }

  if (!timerState.isRunning && timerState.totalTimeRemaining === TOTAL_WORKOUT_DURATION) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Beginner Full-body Bodyweight Workout
            </h1>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                โปรแกรมออกกำลังกาย {Math.round(TOTAL_WORKOUT_DURATION / 60)} นาที
              </h2>
              <div className="text-sm text-blue-700 space-y-1">
                <div>🔥 อบอุ่นร่างกาย: {Math.round(PHASE_DURATIONS.warmup / 60)} นาที</div>
                <div>💪 ออกกำลังกายหลัก: {Math.round(PHASE_DURATIONS.main / 60)} นาที</div>
                <div>🧘‍♀️ คลายกล้ามเนื้อ: {Math.round(PHASE_DURATIONS.cooldown / 60)} นาที</div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium text-gray-800">ข้อมูลของคุณ</h3>
                <button
                  onClick={onEditProfile}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                  title="แก้ไขข้อมูล"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>อายุ: {userProfile.age} ปี</div>
                <div>น้ำหนัก: {userProfile.weight} กก.</div>
                <div>ส่วนสูง: {userProfile.height} ซม.</div>
                <div>BMI: {userProfile.bmi}</div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors mb-4"
            >
              <Play className="inline-block w-6 h-6 mr-2" />
              เริ่มออกกำลังกาย
            </button>

            <button
              onClick={onViewHistory}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
            >
              <History className="w-4 h-4" />
              ดูประวัติการออกกำลังกาย
            </button>

            <p className="text-xs text-gray-500 mt-4">
              กรุณาเตรียมพื้นที่ว่างและขวดน้ำไว้ใกล้ตัว
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-4 pt-4">
          <button
            onClick={skipToPrevious}
            className="p-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
            disabled={!timerState.isRunning}
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="text-sm text-gray-300">เวลาที่เหลือ</div>
            <div className="text-3xl font-bold">{formatTime(timerState.totalTimeRemaining)}</div>
          </div>
          
          <button
            onClick={skipToNext}
            className="p-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
            disabled={!timerState.isRunning}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>{getPhaseLabel(timerState.currentPhase)}</span>
            <span>{Math.round(timerState.progress)}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getPhaseColor(timerState.currentPhase)}`}
              style={{ width: `${timerState.progress}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        {currentStep && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            {currentStep.isRest ? (
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2 text-blue-400">💤 {currentStep.name}</h2>
                <p className="text-gray-300 text-sm mb-4">{currentStep.nameEn}</p>
                <div className="bg-blue-900 rounded-lg p-4 mb-4">
                  <p className="text-sm leading-relaxed text-blue-200">{currentStep.instructions}</p>
                </div>
                <div className="text-center">
                  <div className="text-sm text-blue-300 mb-1">เวลาพัก</div>
                  <div className="text-3xl font-bold text-blue-400">
                    {formatTime(timerState.currentExerciseTimeRemaining)}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className="text-xl font-bold">{currentStep.name}</h2>
                    {currentStep.setNumber && currentStep.totalSets && (
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        เซ็ต {currentStep.setNumber}/{currentStep.totalSets}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">{currentStep.nameEn}</p>
                </div>

                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <p className="text-sm leading-relaxed">{currentStep.instructions}</p>
                </div>

                {(currentStep.reps || currentStep.rpe) && (
                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    {currentStep.reps && (
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="text-xs text-gray-300">เป้าหมาย</div>
                        <div className="font-bold">{currentStep.reps}</div>
                      </div>
                    )}
                    {currentStep.rpe && (
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="text-xs text-gray-300">ความหนัก</div>
                        <div className="font-bold">RPE {currentStep.rpe}</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-center">
                  <div className="text-sm text-gray-300 mb-1">
                    {currentStep.setNumber ? `เซ็ต ${currentStep.setNumber}` : 'เวลาท่านี้'}
                  </div>
                  <div className="text-2xl font-bold">
                    {formatTime(timerState.currentExerciseTimeRemaining)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Control Button */}
        <div className="text-center mb-4">
          <button
            onClick={handlePauseResume}
            className={`w-20 h-20 rounded-full font-bold text-xl transition-colors ${
              timerState.isPaused
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-yellow-600 hover:bg-yellow-700'
            }`}
            disabled={!timerState.isRunning}
          >
            {timerState.isPaused ? (
              <Play className="w-8 h-8 mx-auto" />
            ) : (
              <Pause className="w-8 h-8 mx-auto" />
            )}
          </button>
        </div>

        {/* End Workout Button */}
        <div className="text-center">
          <button
            onClick={handleEndWorkout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
          >
            <Square className="w-4 h-4 inline-block mr-1" />
            จบการออกกำลังกาย
          </button>
        </div>

        {timerState.isPaused && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-xl p-6 text-center max-w-sm mx-4">
              <h3 className="text-xl font-bold mb-2">หยุดชั่วคราว</h3>
              <p className="text-gray-600 mb-4">กดปุ่มเล่นเพื่อดำเนินการต่อ</p>
              <button
                onClick={resumeTimer}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                <Play className="w-4 h-4 inline-block mr-1" />
                ดำเนินการต่อ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}