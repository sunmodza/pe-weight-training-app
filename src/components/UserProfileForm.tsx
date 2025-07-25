'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import { StorageAPI } from '@/lib/storage';

interface UserProfileFormProps {
  onProfileComplete: (profile: UserProfile) => void;
  existingProfile?: UserProfile | null;
  isEditMode?: boolean;
}

export default function UserProfileForm({ onProfileComplete, existingProfile, isEditMode = false }: UserProfileFormProps) {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  useEffect(() => {
    // If in edit mode, use the provided existing profile
    const profileToLoad = isEditMode ? existingProfile : StorageAPI.getUserProfile();
    
    if (profileToLoad) {
      setFormData({
        age: profileToLoad.age.toString(),
        weight: profileToLoad.weight.toString(),
        height: profileToLoad.height.toString()
      });
      setBmi(profileToLoad.bmi);
      setBmiCategory(StorageAPI.getBMICategory(profileToLoad.bmi));
    }
  }, [existingProfile, isEditMode]);

  useEffect(() => {
    if (formData.weight && formData.height) {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      if (weight > 0 && height > 0) {
        const calculatedBMI = StorageAPI.calculateBMI(weight, height);
        setBmi(calculatedBMI);
        setBmiCategory(StorageAPI.getBMICategory(calculatedBMI));
      }
    }
  }, [formData.weight, formData.height]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (!formData.age || age < 13 || age > 99) {
      newErrors.age = 'อายุต้องอยู่ระหว่าง 13-99 ปี';
    }

    if (!formData.weight || weight < 30 || weight > 300) {
      newErrors.weight = 'น้ำหนักต้องอยู่ระหว่าง 30-300 กิโลกรัม';
    }

    if (!formData.height || height < 100 || height > 250) {
      newErrors.height = 'ส่วนสูงต้องอยู่ระหว่าง 100-250 เซนติเมตร';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const profile: UserProfile = {
      id: isEditMode && existingProfile ? existingProfile.id : Math.random().toString(36).substring(2, 11),
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      bmi: bmi!,
      createdAt: isEditMode && existingProfile ? existingProfile.createdAt : new Date(),
      updatedAt: new Date()
    };

    StorageAPI.saveUserProfile(profile);
    onProfileComplete(profile);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-600';
    if (bmi < 25) return 'text-green-600';
    if (bmi < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIntensityRecommendation = (bmi: number, age: number) => {
    if (age > 50 || bmi > 30) {
      return 'แนะนำเริ่มต้นด้วยความเข้มต่ำ (RPE 3-4)';
    } else if (bmi > 25) {
      return 'แนะนำความเข้มต่ำถึงปานกลาง (RPE 4-5)';
    } else {
      return 'สามารถเริ่มต้นด้วยความเข้มปานกลาง (RPE 4-6)';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-black text-center mb-6">
          {isEditMode ? 'แก้ไขข้อมูลส่วนตัว' : 'ข้อมูลเบื้องต้น'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
        <label className="block text-sm font-medium text-black mb-2">
          อายุ (ปี)
        </label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
          placeholder="25"
          min="13"
          max="99"
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
        <label className="block text-sm font-medium text-black mb-2">
          น้ำหนัก (กิโลกรัม)
        </label>
        <input
          type="number"
          step="0.1"
          value={formData.weight}
          onChange={(e) => handleInputChange('weight', e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
          placeholder="65.0"
          min="30"
          max="300"
        />
        {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
          </div>

          <div>
        <label className="block text-sm font-medium text-black mb-2">
          ส่วนสูง (เซนติเมตร)
        </label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) => handleInputChange('height', e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
          placeholder="170"
          min="100"
          max="250"
        />
        {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
          </div>

            {bmi && (
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">ข้อมูล BMI</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">BMI ของคุณ:</span>
                  <span className={`text-lg font-bold ${getBMIColor(bmi)}`}>
                    {bmi}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">ประเภท:</span>
                  <span className={`text-sm font-medium ${getBMIColor(bmi)}`}>
                    {bmiCategory}
                  </span>
                </div>
                {formData.age && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>คำแนะนำ:</strong><br />
                      {getIntensityRecommendation(bmi, parseInt(formData.age))}
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              disabled={!bmi}
            >
              {isEditMode ? 'บันทึกการเปลี่ยนแปลง' : 'เริ่มออกกำลังกาย'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>หมายเหตุ:</strong> ข้อมูลของคุณจะถูกเก็บไว้ในเครื่องเท่านั้น 
              ไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์ใดๆ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}