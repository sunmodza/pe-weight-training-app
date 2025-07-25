import { Exercise, WorkoutStep } from '@/types';

// Original exercise definitions for reference
export const BEGINNER_BODYWEIGHT_EXERCISES: Exercise[] = [
  // Warmup Phase (10 minutes total)
  {
    name: "เดินเกาะกับที่อย่างช้า",
    nameEn: "Slow Marching in Place",
    phase: "warmup",
    order: 1,
    duration: 120, // 2 minutes
    instructions: "เริ่มช้าๆ ค่อยๆ เร่งความเร็ว หลัง 1 นาทีให้แกว่งแขน"
  },
  {
    name: "หมุนแขน",
    nameEn: "Arm Circles",
    phase: "warmup",
    order: 2,
    duration: 60, // 1 minute
    instructions: "30 วินาทีไปข้างหน้า 30 วินาทีถอยหลัง ยื่นแขนออก หมุนจากเล็กไปใหญ่"
  },
  {
    name: "แกว่งขา",
    nameEn: "Leg Swings",
    phase: "warmup",
    order: 3,
    duration: 120, // 2 minutes
    instructions: "จับผนัง/เก้าอี้ประคอง แกว่งไปข้างหน้า-หลัง 30 วินาที/ขา แกว่งข้างๆ 30 วินาที/ขา"
  },
  {
    name: "หมุนลำตัว",
    nameEn: "Torso Twists",
    phase: "warmup",
    order: 4,
    duration: 60, // 1 minute
    instructions: "เท้าห่างสะโพกแล้วหมุนซ้าย-ขวาอย่างอ่อนโยน"
  },
  {
    name: "ยกเข่า",
    nameEn: "Knee Raises",
    phase: "warmup",
    order: 5,
    duration: 120, // 2 minutes
    instructions: "สลับกันยกเข่าเข้าหาอก เริ่มช้าแล้วค่อยๆ เร่ง"
  },
  {
    name: "สควอทน้ำหนักตัว",
    nameEn: "Bodyweight Squats",
    phase: "warmup",
    order: 6,
    duration: 120, // 2 minutes
    instructions: "เคลื่อนไหวช้ามาก เน้นท่าทาง ไม่ใช่ความลึก"
  },

  // Main Phase (43 minutes total)
  {
    name: "พุชอัพกับผนัง",
    nameEn: "Wall Push-ups",
    phase: "main",
    order: 1,
    duration: 480, // 8 minutes (3 sets + rest)
    sets: 3,
    reps: "8-12",
    rpe: "4-5",
    restTime: 90,
    instructions: "ยืนห่างผนัง 1 แขน วางมือที่ระดับไหล่ เอนไปข้างหน้าแล้วดันกลับ รักษาตัวตรง"
  },
  {
    name: "สควอทด้วยเก้าอี้",
    nameEn: "Chair Squats",
    phase: "main",
    order: 2,
    duration: 540, // 9 minutes (3 sets + rest)
    sets: 3,
    reps: "8-10",
    rpe: "5-6",
    restTime: 120,
    instructions: "ใช้เก้าอี้เป็นจุดกำหนดความลึก เท้าห่างเท่าไหล่ นั่งแตะเก้าอี้แล้วลุกขึ้น"
  },
  {
    name: "แพลงค์คุกเข่า",
    nameEn: "Modified Plank",
    phase: "main",
    order: 3,
    duration: 480, // 8 minutes (3 sets + rest)
    sets: 3,
    reps: "15-30 วินาที",
    rpe: "4-5",
    restTime: 90,
    instructions: "เริ่มจากท่าคุกเข่า เดินมือไปข้างหน้า เก็บเข่าไว้ที่พื้น ตัวตรงจากหัวถึงเข่า"
  },
  {
    name: "ยกเข่ายืน",
    nameEn: "Standing Knee Raises",
    phase: "main",
    order: 4,
    duration: 420, // 7 minutes (3 sets + rest)
    sets: 3,
    reps: "10 ครั้ง/ขา",
    rpe: "4",
    restTime: 60,
    instructions: "จับผนัง/เก้าอี้ประคองตัว ยกเข่าเข้าหาอก ขาที่ยืนงอเล็กน้อย"
  },
  {
    name: "นั่งผนัง",
    nameEn: "Wall Sit",
    phase: "main",
    order: 5,
    duration: 540, // 9 minutes (3 sets + rest)
    sets: 3,
    reps: "10-20 วินาที",
    rpe: "5-6",
    restTime: 120,
    instructions: "หลังชิดผนัง เลื่อนลงจนต้นขาขนานพื้น (หรือสบาย) เข่างอ 90 องศา"
  },
  {
    name: "ยกส้นเท้า",
    nameEn: "Standing Calf Raises",
    phase: "main",
    order: 6,
    duration: 300, // 5 minutes (2 sets + rest)
    sets: 2,
    reps: "12-15",
    rpe: "3-4",
    restTime: 60,
    instructions: "จับผนัง/เก้าอี้ประคอง ยกตัวบนปลายเท้า หยุดช่วงบน ลงช้าๆ"
  },

  // Cooldown Phase (7 minutes total)
  {
    name: "เดินช้าๆ",
    nameEn: "Slow Walking",
    phase: "cooldown",
    order: 1,
    duration: 120, // 2 minutes
    instructions: "ความเร็วอ่อนโยน เพื่อลดอัตราการเต้นของหัวใจ"
  },
  {
    name: "ยืดกล้ามเนื้อต้นขาหน้า",
    nameEn: "Quadriceps Stretch",
    phase: "cooldown",
    order: 2,
    duration: 60, // 1 minute
    instructions: "30 วินาที/ขา จับผนังประคองตัว"
  },
  {
    name: "ยืดกล้ามเนื้อต้นขาหลัง",
    nameEn: "Hamstring Stretch",
    phase: "cooldown",
    order: 3,
    duration: 60, // 1 minute
    instructions: "30 วินาที/ขา วางส้นเท้าไปข้างหน้า โน้มตัวอย่างนุ่มนวล"
  },
  {
    name: "ยืดไหล่",
    nameEn: "Shoulder Stretch",
    phase: "cooldown",
    order: 4,
    duration: 60, // 1 minute
    instructions: "30 วินาที/แขน กอดแขนผ่านตัว"
  },
  {
    name: "หายใจลึกๆ",
    nameEn: "Deep Breathing",
    phase: "cooldown",
    order: 5,
    duration: 120, // 2 minutes
    instructions: "นั่งหรือนอน หายใจเข้า 4 จังหวะ หายใจออก 6 จังหวะ"
  }
];

// Detailed workout steps with individual sets and rest periods
export const BEGINNER_BODYWEIGHT_PROGRAM: WorkoutStep[] = [
  // Warmup Phase (10 minutes total)
  {
    id: "warmup-1",
    type: "exercise",
    name: "เดินเกาะกับที่อย่างช้า",
    nameEn: "Slow Marching in Place",
    phase: "warmup",
    exerciseOrder: 1,
    duration: 120,
    instructions: "เริ่มช้าๆ ค่อยๆ เร่งความเร็ว หลัง 1 นาทีให้แกว่งแขน"
  },
  {
    id: "warmup-2",
    type: "exercise",
    name: "หมุนแขน",
    nameEn: "Arm Circles",
    phase: "warmup",
    exerciseOrder: 2,
    duration: 60,
    instructions: "30 วินาทีไปข้างหน้า 30 วินาทีถอยหลัง ยื่นแขนออก หมุนจากเล็กไปใหญ่"
  },
  {
    id: "warmup-3",
    type: "exercise",
    name: "แกว่งขา",
    nameEn: "Leg Swings",
    phase: "warmup",
    exerciseOrder: 3,
    duration: 120,
    instructions: "จับผนัง/เก้าอี้ประคอง แกว่งไปข้างหน้า-หลัง 30 วินาที/ขา แกว่งข้างๆ 30 วินาที/ขา"
  },
  {
    id: "warmup-4",
    type: "exercise",
    name: "หมุนลำตัว",
    nameEn: "Torso Twists",
    phase: "warmup",
    exerciseOrder: 4,
    duration: 60,
    instructions: "เท้าห่างสะโพกแล้วหมุนซ้าย-ขวาอย่างอ่อนโยน"
  },
  {
    id: "warmup-5",
    type: "exercise",
    name: "ยกเข่า",
    nameEn: "Knee Raises",
    phase: "warmup",
    exerciseOrder: 5,
    duration: 120,
    instructions: "สลับกันยกเข่าเข้าหาอก เริ่มช้าแล้วค่อยๆ เร่ง"
  },
  {
    id: "warmup-6",
    type: "exercise",
    name: "สควอทน้ำหนักตัว",
    nameEn: "Bodyweight Squats",
    phase: "warmup",
    exerciseOrder: 6,
    duration: 120,
    instructions: "เคลื่อนไหวช้ามาก เน้นท่าทาง ไม่ใช่ความลึก"
  },

  // Main Phase (43 minutes total) - แบ่งเป็นเซ็ตและพัก
  // 1. พุชอัพกับผนัง - 3 เซ็ต
  {
    id: "main-1-set1",
    type: "exercise",
    name: "พุชอัพกับผนัง",
    nameEn: "Wall Push-ups",
    phase: "main",
    exerciseOrder: 1,
    setNumber: 1,
    totalSets: 3,
    duration: 90, // เวลาทำเซ็ต
    reps: "8-12",
    rpe: "4-5",
    instructions: "ยืนห่างผนัง 1 แขน วางมือที่ระดับไหล่ เอนไปข้างหน้าแล้วดันกลับ รักษาตัวตรง"
  },
  {
    id: "main-1-rest1",
    type: "rest",
    name: "พักหลังเซ็ต 1",
    nameEn: "Rest after Set 1",
    phase: "main",
    exerciseOrder: 1,
    setNumber: 1,
    totalSets: 3,
    duration: 90,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-1-set2",
    type: "exercise",
    name: "พุชอัพกับผนัง",
    nameEn: "Wall Push-ups",
    phase: "main",
    exerciseOrder: 1,
    setNumber: 2,
    totalSets: 3,
    duration: 90,
    reps: "8-12",
    rpe: "4-5",
    instructions: "ยืนห่างผนัง 1 แขน วางมือที่ระดับไหล่ เอนไปข้างหน้าแล้วดันกลับ รักษาตัวตรง"
  },
  {
    id: "main-1-rest2",
    type: "rest",
    name: "พักหลังเซ็ต 2",
    nameEn: "Rest after Set 2",
    phase: "main",
    exerciseOrder: 1,
    setNumber: 2,
    totalSets: 3,
    duration: 90,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-1-set3",
    type: "exercise",
    name: "พุชอัพกับผนัง",
    nameEn: "Wall Push-ups",
    phase: "main",
    exerciseOrder: 1,
    setNumber: 3,
    totalSets: 3,
    duration: 90,
    reps: "8-12",
    rpe: "4-5",
    instructions: "ยืนห่างผนัง 1 แขน วางมือที่ระดับไหล่ เอนไปข้างหน้าแล้วดันกลับ รักษาตัวตรง"
  },
  {
    id: "main-1-rest3",
    type: "rest",
    name: "พักก่อนท่าถัดไป",
    nameEn: "Rest before next exercise",
    phase: "main",
    exerciseOrder: 1,
    setNumber: 3,
    totalSets: 3,
    duration: 40,
    instructions: "พักผ่อนก่อนเปลี่ยนท่า",
    isRest: true
  },

  // 2. สควอทด้วยเก้าอี้ - 3 เซ็ต
  {
    id: "main-2-set1",
    type: "exercise",
    name: "สควอทด้วยเก้าอี้",
    nameEn: "Chair Squats",
    phase: "main",
    exerciseOrder: 2,
    setNumber: 1,
    totalSets: 3,
    duration: 100,
    reps: "8-10",
    rpe: "5-6",
    instructions: "ใช้เก้าอี้เป็นจุดกำหนดความลึก เท้าห่างเท่าไหล่ นั่งแตะเก้าอี้แล้วลุกขึ้น"
  },
  {
    id: "main-2-rest1",
    type: "rest",
    name: "พักหลังเซ็ต 1",
    nameEn: "Rest after Set 1",
    phase: "main",
    exerciseOrder: 2,
    setNumber: 1,
    totalSets: 3,
    duration: 120,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-2-set2",
    type: "exercise",
    name: "สควอทด้วยเก้าอี้",
    nameEn: "Chair Squats",
    phase: "main",
    exerciseOrder: 2,
    setNumber: 2,
    totalSets: 3,
    duration: 100,
    reps: "8-10",
    rpe: "5-6",
    instructions: "ใช้เก้าอี้เป็นจุดกำหนดความลึก เท้าห่างเท่าไหล่ นั่งแตะเก้าอี้แล้วลุกขึ้น"
  },
  {
    id: "main-2-rest2",
    type: "rest",
    name: "พักหลังเซ็ต 2",
    nameEn: "Rest after Set 2",
    phase: "main",
    exerciseOrder: 2,
    setNumber: 2,
    totalSets: 3,
    duration: 120,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-2-set3",
    type: "exercise",
    name: "สควอทด้วยเก้าอี้",
    nameEn: "Chair Squats",
    phase: "main",
    exerciseOrder: 2,
    setNumber: 3,
    totalSets: 3,
    duration: 100,
    reps: "8-10",
    rpe: "5-6",
    instructions: "ใช้เก้าอี้เป็นจุดกำหนดความลึก เท้าห่างเท่าไหล่ นั่งแตะเก้าอี้แล้วลุกขึ้น"
  },
  {
    id: "main-2-rest3",
    type: "rest",
    name: "พักก่อนท่าถัดไป",
    nameEn: "Rest before next exercise",
    phase: "main",
    exerciseOrder: 2,
    setNumber: 3,
    totalSets: 3,
    duration: 40,
    instructions: "พักผ่อนก่อนเปลี่ยนท่า",
    isRest: true
  },

  // 3. แพลงค์คุกเข่า - 3 เซ็ต
  {
    id: "main-3-set1",
    type: "exercise",
    name: "แพลงค์คุกเข่า",
    nameEn: "Modified Plank",
    phase: "main",
    exerciseOrder: 3,
    setNumber: 1,
    totalSets: 3,
    duration: 90,
    reps: "15-30 วินาที",
    rpe: "4-5",
    instructions: "เริ่มจากท่าคุกเข่า เดินมือไปข้างหน้า เก็บเข่าไว้ที่พื้น ตัวตรงจากหัวถึงเข่า"
  },
  {
    id: "main-3-rest1",
    type: "rest",
    name: "พักหลังเซ็ต 1",
    nameEn: "Rest after Set 1",
    phase: "main",
    exerciseOrder: 3,
    setNumber: 1,
    totalSets: 3,
    duration: 90,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-3-set2",
    type: "exercise",
    name: "แพลงค์คุกเข่า",
    nameEn: "Modified Plank",
    phase: "main",
    exerciseOrder: 3,
    setNumber: 2,
    totalSets: 3,
    duration: 90,
    reps: "15-30 วินาที",
    rpe: "4-5",
    instructions: "เริ่มจากท่าคุกเข่า เดินมือไปข้างหน้า เก็บเข่าไว้ที่พื้น ตัวตรงจากหัวถึงเข่า"
  },
  {
    id: "main-3-rest2",
    type: "rest",
    name: "พักหลังเซ็ต 2",
    nameEn: "Rest after Set 2",
    phase: "main",
    exerciseOrder: 3,
    setNumber: 2,
    totalSets: 3,
    duration: 90,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-3-set3",
    type: "exercise",
    name: "แพลงค์คุกเข่า",
    nameEn: "Modified Plank",
    phase: "main",
    exerciseOrder: 3,
    setNumber: 3,
    totalSets: 3,
    duration: 90,
    reps: "15-30 วินาที",
    rpe: "4-5",
    instructions: "เริ่มจากท่าคุกเข่า เดินมือไปข้างหน้า เก็บเข่าไว้ที่พื้น ตัวตรงจากหัวถึงเข่า"
  },
  {
    id: "main-3-rest3",
    type: "rest",
    name: "พักก่อนท่าถัดไป",
    nameEn: "Rest before next exercise",
    phase: "main",
    exerciseOrder: 3,
    setNumber: 3,
    totalSets: 3,
    duration: 40,
    instructions: "พักผ่อนก่อนเปลี่ยนท่า",
    isRest: true
  },

  // 4. ยกเข่ายืน - 3 เซ็ต
  {
    id: "main-4-set1",
    type: "exercise",
    name: "ยกเข่ายืน",
    nameEn: "Standing Knee Raises",
    phase: "main",
    exerciseOrder: 4,
    setNumber: 1,
    totalSets: 3,
    duration: 80,
    reps: "10 ครั้ง/ขา",
    rpe: "4",
    instructions: "จับผนัง/เก้าอี้ประคองตัว ยกเข่าเข้าหาอก ขาที่ยืนงอเล็กน้อย"
  },
  {
    id: "main-4-rest1",
    type: "rest",
    name: "พักหลังเซ็ต 1",
    nameEn: "Rest after Set 1",
    phase: "main",
    exerciseOrder: 4,
    setNumber: 1,
    totalSets: 3,
    duration: 60,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-4-set2",
    type: "exercise",
    name: "ยกเข่ายืน",
    nameEn: "Standing Knee Raises",
    phase: "main",
    exerciseOrder: 4,
    setNumber: 2,
    totalSets: 3,
    duration: 80,
    reps: "10 ครั้ง/ขา",
    rpe: "4",
    instructions: "จับผนัง/เก้าอี้ประคองตัว ยกเข่าเข้าหาอก ขาที่ยืนงอเล็กน้อย"
  },
  {
    id: "main-4-rest2",
    type: "rest",
    name: "พักหลังเซ็ต 2",
    nameEn: "Rest after Set 2",
    phase: "main",
    exerciseOrder: 4,
    setNumber: 2,
    totalSets: 3,
    duration: 60,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-4-set3",
    type: "exercise",
    name: "ยกเข่ายืน",
    nameEn: "Standing Knee Raises",
    phase: "main",
    exerciseOrder: 4,
    setNumber: 3,
    totalSets: 3,
    duration: 80,
    reps: "10 ครั้ง/ขา",
    rpe: "4",
    instructions: "จับผนัง/เก้าอี้ประคองตัว ยกเข่าเข้าหาอก ขาที่ยืนงอเล็กน้อย"
  },
  {
    id: "main-4-rest3",
    type: "rest",
    name: "พักก่อนท่าถัดไป",
    nameEn: "Rest before next exercise",
    phase: "main",
    exerciseOrder: 4,
    setNumber: 3,
    totalSets: 3,
    duration: 40,
    instructions: "พักผ่อนก่อนเปลี่ยนท่า",
    isRest: true
  },

  // 5. นั่งผนัง - 3 เซ็ต
  {
    id: "main-5-set1",
    type: "exercise",
    name: "นั่งผนัง",
    nameEn: "Wall Sit",
    phase: "main",
    exerciseOrder: 5,
    setNumber: 1,
    totalSets: 3,
    duration: 100,
    reps: "10-20 วินาที",
    rpe: "5-6",
    instructions: "หลังชิดผนัง เลื่อนลงจนต้นขาขนานพื้น (หรือสบาย) เข่างอ 90 องศา"
  },
  {
    id: "main-5-rest1",
    type: "rest",
    name: "พักหลังเซ็ต 1",
    nameEn: "Rest after Set 1",
    phase: "main",
    exerciseOrder: 5,
    setNumber: 1,
    totalSets: 3,
    duration: 120,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-5-set2",
    type: "exercise",
    name: "นั่งผนัง",
    nameEn: "Wall Sit",
    phase: "main",
    exerciseOrder: 5,
    setNumber: 2,
    totalSets: 3,
    duration: 100,
    reps: "10-20 วินาที",
    rpe: "5-6",
    instructions: "หลังชิดผนัง เลื่อนลงจนต้นขาขนานพื้น (หรือสบาย) เข่างอ 90 องศา"
  },
  {
    id: "main-5-rest2",
    type: "rest",
    name: "พักหลังเซ็ต 2",
    nameEn: "Rest after Set 2",
    phase: "main",
    exerciseOrder: 5,
    setNumber: 2,
    totalSets: 3,
    duration: 120,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-5-set3",
    type: "exercise",
    name: "นั่งผนัง",
    nameEn: "Wall Sit",
    phase: "main",
    exerciseOrder: 5,
    setNumber: 3,
    totalSets: 3,
    duration: 100,
    reps: "10-20 วินาที",
    rpe: "5-6",
    instructions: "หลังชิดผนัง เลื่อนลงจนต้นขาขนานพื้น (หรือสบาย) เข่างอ 90 องศา"
  },
  {
    id: "main-5-rest3",
    type: "rest",
    name: "พักก่อนท่าถัดไป",
    nameEn: "Rest before next exercise",
    phase: "main",
    exerciseOrder: 5,
    setNumber: 3,
    totalSets: 3,
    duration: 40,
    instructions: "พักผ่อนก่อนเปลี่ยนท่า",
    isRest: true
  },

  // 6. ยกส้นเท้า - 2 เซ็ต
  {
    id: "main-6-set1",
    type: "exercise",
    name: "ยกส้นเท้า",
    nameEn: "Standing Calf Raises",
    phase: "main",
    exerciseOrder: 6,
    setNumber: 1,
    totalSets: 2,
    duration: 80,
    reps: "12-15",
    rpe: "3-4",
    instructions: "จับผนัง/เก้าอี้ประคอง ยกตัวบนปลายเท้า หยุดช่วงบน ลงช้าๆ"
  },
  {
    id: "main-6-rest1",
    type: "rest",
    name: "พักหลังเซ็ต 1",
    nameEn: "Rest after Set 1",
    phase: "main",
    exerciseOrder: 6,
    setNumber: 1,
    totalSets: 2,
    duration: 60,
    instructions: "พักผ่อน หายใจให้เป็นปกติ",
    isRest: true
  },
  {
    id: "main-6-set2",
    type: "exercise",
    name: "ยกส้นเท้า",
    nameEn: "Standing Calf Raises",
    phase: "main",
    exerciseOrder: 6,
    setNumber: 2,
    totalSets: 2,
    duration: 80,
    reps: "12-15",
    rpe: "3-4",
    instructions: "จับผนัง/เก้าอี้ประคอง ยกตัวบนปลายเท้า หยุดช่วงบน ลงช้าๆ"
  },
  {
    id: "main-6-rest2",
    type: "rest",
    name: "พักจบ Main Phase",
    nameEn: "Final rest before cooldown",
    phase: "main",
    exerciseOrder: 6,
    setNumber: 2,
    totalSets: 2,
    duration: 80,
    instructions: "พักผ่อนก่อนเข้าสู่ช่วงคลาย",
    isRest: true
  },

  // Cooldown Phase (7 minutes total)
  {
    id: "cooldown-1",
    type: "exercise",
    name: "เดินช้าๆ",
    nameEn: "Slow Walking",
    phase: "cooldown",
    exerciseOrder: 1,
    duration: 120,
    instructions: "ความเร็วอ่อนโยน เพื่อลดอัตราการเต้นของหัวใจ"
  },
  {
    id: "cooldown-2",
    type: "exercise",
    name: "ยืดกล้ามเนื้อต้นขาหน้า",
    nameEn: "Quadriceps Stretch",
    phase: "cooldown",
    exerciseOrder: 2,
    duration: 60,
    instructions: "30 วินาที/ขา จับผนังประคองตัว"
  },
  {
    id: "cooldown-3",
    type: "exercise",
    name: "ยืดกล้ามเนื้อต้นขาหลัง",
    nameEn: "Hamstring Stretch",
    phase: "cooldown",
    exerciseOrder: 3,
    duration: 60,
    instructions: "30 วินาที/ขา วางส้นเท้าไปข้างหน้า โน้มตัวอย่างนุ่มนวล"
  },
  {
    id: "cooldown-4",
    type: "exercise",
    name: "ยืดไหล่",
    nameEn: "Shoulder Stretch",
    phase: "cooldown",
    exerciseOrder: 4,
    duration: 60,
    instructions: "30 วินาที/แขน กอดแขนผ่านตัว"
  },
  {
    id: "cooldown-5",
    type: "exercise",
    name: "หายใจลึกๆ",
    nameEn: "Deep Breathing",
    phase: "cooldown",
    exerciseOrder: 5,
    duration: 120,
    instructions: "นั่งหรือนอน หายใจเข้า 4 จังหวะ หายใจออก 6 จังหวะ"
  }
];

// Calculate phase durations dynamically from the program
export const PHASE_DURATIONS = {
  warmup: BEGINNER_BODYWEIGHT_PROGRAM
    .filter(step => step.phase === 'warmup')
    .reduce((total, step) => total + step.duration, 0),
  main: BEGINNER_BODYWEIGHT_PROGRAM
    .filter(step => step.phase === 'main')
    .reduce((total, step) => total + step.duration, 0),
  cooldown: BEGINNER_BODYWEIGHT_PROGRAM
    .filter(step => step.phase === 'cooldown')
    .reduce((total, step) => total + step.duration, 0)
};

// Calculate total workout duration from all steps
export const TOTAL_WORKOUT_DURATION = BEGINNER_BODYWEIGHT_PROGRAM
  .reduce((total, step) => total + step.duration, 0);

export function getStepsByPhase(phase: "warmup" | "main" | "cooldown"): WorkoutStep[] {
  return BEGINNER_BODYWEIGHT_PROGRAM.filter(step => step.phase === phase);
}

export function getTotalDurationByPhase(phase: "warmup" | "main" | "cooldown"): number {
  return getStepsByPhase(phase).reduce((total, step) => total + step.duration, 0);
}

export function getStepAtTime(timeElapsed: number): { step: WorkoutStep; stepTimeElapsed: number } | null {
  let currentTime = 0;
  
  for (const step of BEGINNER_BODYWEIGHT_PROGRAM) {
    if (timeElapsed >= currentTime && timeElapsed < currentTime + step.duration) {
      return {
        step,
        stepTimeElapsed: timeElapsed - currentTime
      };
    }
    currentTime += step.duration;
  }
  
  return null;
}

// Backward compatibility functions
export function getExercisesByPhase(phase: "warmup" | "main" | "cooldown"): Exercise[] {
  return BEGINNER_BODYWEIGHT_EXERCISES.filter(exercise => exercise.phase === phase);
}

export function getExerciseAtTime(timeElapsed: number): { exercise: Exercise; exerciseTimeElapsed: number } | null {
  const result = getStepAtTime(timeElapsed);
  if (result && result.step.type === 'exercise') {
    // Convert WorkoutStep back to Exercise format for compatibility
    const exercise: Exercise = {
      name: result.step.name,
      nameEn: result.step.nameEn,
      phase: result.step.phase,
      order: result.step.exerciseOrder,
      duration: result.step.duration,
      sets: result.step.totalSets,
      reps: result.step.reps,
      rpe: result.step.rpe,
      instructions: result.step.instructions
    };
    return {
      exercise,
      exerciseTimeElapsed: result.stepTimeElapsed
    };
  }
  return null;
}