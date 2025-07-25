'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { StorageAPI } from '@/lib/storage';
import UserProfileForm from '@/components/UserProfileForm';
import WorkoutTimer from '@/components/WorkoutTimer';
import WorkoutSummary from '@/components/WorkoutSummary';
import WorkoutHistory from '@/components/WorkoutHistory';

type AppState = 'profile' | 'timer' | 'summary' | 'history' | 'editProfile';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workoutDuration, setWorkoutDuration] = useState(0);

  useEffect(() => {
    // Check if user profile exists
    const existingProfile = StorageAPI.getUserProfile();
    if (existingProfile) {
      setUserProfile(existingProfile);
      setAppState('timer');
    }
  }, []);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('timer');
  };

  const handleWorkoutComplete = (duration: number) => {
    setWorkoutDuration(duration);
    setAppState('summary');
  };

  const handleStartNewWorkout = () => {
    setAppState('timer');
  };

  const handleViewHistory = () => {
    setAppState('history');
  };

  const handleBackFromHistory = () => {
    // If coming from timer, go back to timer, otherwise go to summary
    const previousState = appState === 'history' ? 'timer' : 'summary';
    setAppState(previousState);
  };

  const handleEditProfile = () => {
    setAppState('editProfile');
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('timer');
  };

  const renderContent = () => {
    switch (appState) {
      case 'profile':
        return <UserProfileForm onProfileComplete={handleProfileComplete} />;
      
      case 'timer':
        return userProfile ? (
          <WorkoutTimer 
            userProfile={userProfile} 
            onWorkoutComplete={handleWorkoutComplete}
            onEditProfile={handleEditProfile}
            onViewHistory={handleViewHistory}
          />
        ) : null;
      
      case 'summary':
        return userProfile ? (
          <WorkoutSummary
            userProfile={userProfile}
            workoutDuration={workoutDuration}
            onStartNewWorkout={handleStartNewWorkout}
            onViewHistory={handleViewHistory}
            onEditProfile={handleEditProfile}
          />
        ) : null;
      
      case 'history':
        return userProfile ? (
          <WorkoutHistory 
            userProfile={userProfile} 
            onBack={() => setAppState('timer')}
          />
        ) : null;
      
      case 'editProfile':
        return (
          <UserProfileForm 
            onProfileComplete={handleProfileUpdate} 
            existingProfile={userProfile}
            isEditMode={true}
          />
        );
      
      default:
        return <UserProfileForm onProfileComplete={handleProfileComplete} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
    </div>
  );
}
