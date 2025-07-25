import { UserProfile, WorkoutSession, AppSettings, STORAGE_KEYS } from '@/types';

export class StorageAPI {
  static saveUserProfile(profile: UserProfile): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    }
  }

  static getUserProfile(): UserProfile | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) {
        const profile = JSON.parse(data);
        return {
          ...profile,
          createdAt: new Date(profile.createdAt),
          updatedAt: new Date(profile.updatedAt)
        };
      }
    }
    return null;
  }

  static saveWorkoutSession(session: WorkoutSession): void {
    if (typeof window !== 'undefined') {
      const history = this.getWorkoutHistory();
      const sessionWithDates = {
        ...session,
        startTime: new Date(session.startTime),
        endTime: new Date(session.endTime)
      };
      history.push(sessionWithDates);
      localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(history));
    }
  }

  static getWorkoutHistory(): WorkoutSession[] {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
      if (data) {
        const sessions = JSON.parse(data);
        return sessions.map((session: WorkoutSession) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime)
        }));
      }
    }
    return [];
  }

  static saveCurrentSession(session: WorkoutSession): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
    }
  }

  static getCurrentSession(): WorkoutSession | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
      if (data) {
        const session = JSON.parse(data);
        return {
          ...session,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime)
        };
      }
    }
    return null;
  }

  static clearCurrentSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    }
  }

  static saveAppSettings(settings: AppSettings): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(settings));
    }
  }

  static getAppSettings(): AppSettings {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
      if (data) {
        return JSON.parse(data);
      }
    }
    return {
      soundEnabled: true,
      voiceEnabled: true,
      notificationsEnabled: true,
      wakeLockEnabled: true,
      theme: "auto",
      language: "th"
    };
  }

  static clearAllData(): void {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  }

  static exportData(): string {
    if (typeof window !== 'undefined') {
      const data = {
        userProfile: this.getUserProfile(),
        workoutHistory: this.getWorkoutHistory(),
        appSettings: this.getAppSettings()
      };
      return JSON.stringify(data, null, 2);
    }
    return '';
  }

  static importData(jsonData: string): boolean {
    try {
      if (typeof window !== 'undefined') {
        const data = JSON.parse(jsonData);
        
        if (data.userProfile) {
          this.saveUserProfile(data.userProfile);
        }
        
        if (data.workoutHistory && Array.isArray(data.workoutHistory)) {
          localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(data.workoutHistory));
        }
        
        if (data.appSettings) {
          this.saveAppSettings(data.appSettings);
        }
        
        return true;
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
    return false;
  }

  static calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  }

  static getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'น้ำหนักน้อย';
    if (bmi < 25) return 'ปกติ';
    if (bmi < 30) return 'น้ำหนักเกิน';
    return 'อ้วน';
  }

  static estimateCaloriesBurned(userProfile: UserProfile, durationMinutes: number): number {
    // Basic calculation for bodyweight exercise
    // Using MET value of approximately 3.5 for light bodyweight exercises
    const weightKg = userProfile.weight;
    const met = 3.5;
    const caloriesPerMinute = (met * weightKg * 3.5) / 200;
    return Math.round(caloriesPerMinute * durationMinutes);
  }
}