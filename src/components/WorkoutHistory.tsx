'use client';

import { useState, useEffect } from 'react';
import { WorkoutSession, UserProfile } from '@/types';
import { StorageAPI } from '@/lib/storage';
import { Calendar, Clock, Flame, TrendingUp, ChevronLeft, Trash2 } from 'lucide-react';

interface WorkoutHistoryProps {
  userProfile: UserProfile;
  onBack: () => void;
}

export default function WorkoutHistory({ userProfile, onBack }: WorkoutHistoryProps) {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMinutes: 0,
    averageDuration: 0,
    totalCalories: 0,
    thisWeekWorkouts: 0
  });

  useEffect(() => {
    const history = StorageAPI.getWorkoutHistory();
    setWorkoutHistory(history.reverse()); // Show most recent first

    // Calculate statistics
    const totalWorkouts = history.length;
    const totalMinutes = history.reduce((sum, session) => sum + session.totalDuration, 0);
    const averageDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;
    const totalCalories = history.reduce((sum, session) => {
      return sum + StorageAPI.estimateCaloriesBurned(userProfile, session.totalDuration);
    }, 0);

    // Calculate this week's workouts
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekWorkouts = history.filter(session => 
      new Date(session.startTime) >= oneWeekAgo
    ).length;

    setStats({
      totalWorkouts,
      totalMinutes,
      averageDuration,
      totalCalories,
      thisWeekWorkouts
    });
  }, [userProfile]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getCompletionColor = (duration: number): string => {
    const percentage = (duration / 60) * 100;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getCompletionBadge = (duration: number): string => {
    const percentage = (duration / 60) * 100;
    if (percentage >= 100) return '🏆 เสร็จสมบูรณ์';
    if (percentage >= 80) return '⭐ ดีมาก';
    if (percentage >= 60) return '👍 ดี';
    return '💪 เริ่มต้น';
  };

  const clearHistory = () => {
    if (confirm('คุณต้องการลบประวัติทั้งหมดหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
      localStorage.removeItem('workout_history');
      setWorkoutHistory([]);
      setStats({
        totalWorkouts: 0,
        totalMinutes: 0,
        averageDuration: 0,
        totalCalories: 0,
        thisWeekWorkouts: 0
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">ประวัติการออกกำลังกาย</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{stats.totalWorkouts}</span>
            </div>
            <p className="text-sm text-gray-600">ครั้งทั้งหมด</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{stats.totalMinutes}</span>
            </div>
            <p className="text-sm text-gray-600">นาทีรวม</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">{stats.totalCalories}</span>
            </div>
            <p className="text-sm text-gray-600">แคลอรี่</p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{stats.thisWeekWorkouts}</span>
            </div>
            <p className="text-sm text-gray-600">สัปดาห์นี้</p>
          </div>
        </div>

        {/* Average Duration */}
        {stats.averageDuration > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">ค่าเฉลี่ย</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ระยะเวลาเฉลี่ย:</span>
              <span className="font-bold text-lg">{stats.averageDuration} นาที</span>
            </div>
          </div>
        )}

        {/* Workout List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">ประวัติล่าสุด</h2>
            {workoutHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="ลบประวัติทั้งหมด"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {workoutHistory.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">ยังไม่มีประวัติการออกกำลังกาย</p>
              <p className="text-sm text-gray-400">เริ่มออกกำลังกายเพื่อสร้างประวัติของคุณ</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {workoutHistory.map((session, index) => (
                <div key={session.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-800">{session.programName}</h3>
                      <p className="text-sm text-gray-500">{formatDate(session.startTime)}</p>
                    </div>
                    <span className={`text-sm font-medium ${getCompletionColor(session.totalDuration)}`}>
                      {getCompletionBadge(session.totalDuration)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">เวลา</p>
                      <p className="font-medium">{session.totalDuration} นาที</p>
                    </div>
                    <div>
                      <p className="text-gray-500">แคลอรี่</p>
                      <p className="font-medium">
                        {StorageAPI.estimateCaloriesBurned(userProfile, session.totalDuration)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">ความสำเร็จ</p>
                      <p className="font-medium">
                        {Math.round((session.totalDuration / 60) * 100)}%
                      </p>
                    </div>
                  </div>

                  {session.notes && (
                    <p className="text-sm text-gray-600 mt-2 italic">{session.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Goals Section */}
        {workoutHistory.length > 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 mt-6 text-white">
            <h3 className="font-bold mb-2">🎯 เป้าหมายสัปดาห์</h3>
            <div className="flex justify-between items-center">
              <span>ออกกำลังกาย 3 ครั้งต่อสัปดาห์</span>
              <span className="text-lg font-bold">
                {stats.thisWeekWorkouts}/3
              </span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((stats.thisWeekWorkouts / 3) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={onBack}
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}