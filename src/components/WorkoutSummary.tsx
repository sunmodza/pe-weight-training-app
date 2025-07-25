'use client';

import { useState, useEffect, useRef } from 'react';
import { UserProfile, WorkoutSession } from '@/types';
import { StorageAPI } from '@/lib/storage';
import { Trophy, Clock, Flame, TrendingUp, RotateCcw, Settings } from 'lucide-react';
import { TOTAL_WORKOUT_DURATION } from '@/data/workout-program';

interface WorkoutSummaryProps {
  userProfile: UserProfile;
  workoutDuration: number; // in minutes
  onStartNewWorkout: () => void;
  onViewHistory: () => void;
  onEditProfile: () => void;
}

export default function WorkoutSummary({ 
  userProfile, 
  workoutDuration, 
  onStartNewWorkout, 
  onViewHistory,
  onEditProfile 
}: WorkoutSummaryProps) {
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [workoutCount, setWorkoutCount] = useState(0);
  const sessionSavedRef = useRef(false);

  useEffect(() => {
    // Calculate calories burned
    const calories = StorageAPI.estimateCaloriesBurned(userProfile, workoutDuration || 0);
    setCaloriesBurned(calories || 0);

    // Calculate completion percentage
    const totalMinutes = Math.round(TOTAL_WORKOUT_DURATION / 60);
    const completion = Math.round(((workoutDuration || 0) / totalMinutes) * 100);
    setCompletionPercentage(completion || 0);

    // Get workout history count
    const history = StorageAPI.getWorkoutHistory();
    setWorkoutCount(history.length);

    // Save this workout session only once
    if (!sessionSavedRef.current) {
      const safeDuration = workoutDuration || 0;
      const sessionId = `${userProfile.id}-${Date.now()}`;
      
      // Check if this session already exists
      const existingSessions = StorageAPI.getWorkoutHistory();
      const sessionExists = existingSessions.some(s => s.id === sessionId);
      
      if (!sessionExists) {
        const session: WorkoutSession = {
          id: sessionId,
          userId: userProfile.id,
          programName: "Beginner Full-body Bodyweight",
          startTime: new Date(Date.now() - safeDuration * 60 * 1000),
          endTime: new Date(),
          totalDuration: safeDuration,
          phase: "completed",
          currentExercise: 0,
          currentSet: 1,
          exercises: [],
          notes: `เสร็จสิ้น ${completion || 0}% ของโปรแกรม`,
          overallRPE: undefined
        };

        StorageAPI.saveWorkoutSession(session);
      }
      sessionSavedRef.current = true;
    }
  }, [userProfile, workoutDuration]);

  const getMotivationalMessage = (percentage: number): string => {
    if (percentage >= 100) return "เยี่ยมมาก! คุณทำได้ครบทั้งโปรแกรม! 🎉";
    if (percentage >= 80) return "ดีมาก! คุณเกือบทำครบแล้ว! 💪";
    if (percentage >= 60) return "ดีเลย! คุณทำได้มากกว่าครึ่งแล้ว! 👏";
    if (percentage >= 40) return "เริ่มดีแล้ว! คุณกำลังสร้างนิสัยที่ดี! 🌟";
    return "เป็นการเริ่มต้นที่ดี! พยายามต่อไปนะ! 🚀";
  };

  const getCompletionColor = (percentage: number): string => {
    if (percentage >= 100) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              เสร็จสิ้นการออกกำลังกาย!
            </h1>
            <p className={`text-lg font-medium ${getCompletionColor(completionPercentage)}`}>
              {getMotivationalMessage(completionPercentage)}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{workoutDuration || 0}</div>
              <div className="text-sm text-blue-700">นาที</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Flame className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{caloriesBurned || 0}</div>
              <div className="text-sm text-orange-700">แคลอรี่</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{completionPercentage || 0}%</div>
              <div className="text-sm text-green-700">เสร็จสิ้น</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <RotateCcw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{workoutCount}</div>
              <div className="text-sm text-purple-700">ครั้งทั้งหมด</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>ความก้าวหน้า</span>
              <span>{completionPercentage || 0}% จาก {Math.round(TOTAL_WORKOUT_DURATION / 60)} นาที</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  completionPercentage >= 100 ? 'bg-green-600' : 
                  completionPercentage >= 80 ? 'bg-blue-600' : 
                  completionPercentage >= 60 ? 'bg-yellow-600' : 'bg-orange-600'
                }`}
                style={{ width: `${Math.min(completionPercentage || 0, 100)}%` }}
              />
            </div>
          </div>

          {/* Achievement Message */}
          {completionPercentage >= 100 && (
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4 mb-6 text-white text-center">
              <h3 className="font-bold mb-1">🏆 ยินดีด้วย!</h3>
              <p className="text-sm">คุณทำโปรแกรมได้ครบ 60 นาที!</p>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">คำแนะนำต่อไป</h3>
            <div className="text-sm text-blue-700 space-y-1">
              {completionPercentage >= 100 ? (
                <>
                  <div>✅ พักผ่อน 1-2 วัน</div>
                  <div>✅ ดื่มน้ำให้เพียงพอ</div>
                  <div>✅ กินโปรตีนภายใน 30 นาที</div>
                  <div>✅ เตรียมพร้อมสำหรับครั้งถัดไป</div>
                </>
              ) : (
                <>
                  <div>• ลองทำให้ครบ 60 นาทีในครั้งถัดไป</div>
                  <div>• เพิ่มความเข้มอย่างค่อยเป็นค่อยไป</div>
                  <div>• ออกกำลังกาย 3 ครั้งต่อสัปดาห์</div>
                  <div>• พักผ่อนให้เพียงพอ</div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onStartNewWorkout}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              ออกกำลังกายอีกครั้ง
            </button>

            <button
              onClick={onViewHistory}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              ดูประวัติการออกกำลังกาย
            </button>

            <button
              onClick={onEditProfile}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              แก้ไขข้อมูลส่วนตัว
            </button>
          </div>

          {/* Additional Stats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>BMI ของคุณ: {userProfile.bmi} ({StorageAPI.getBMICategory(userProfile.bmi)})</p>
              <p className="mt-1">ข้อมูลถูกบันทึกในเครื่องของคุณเท่านั้น</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}