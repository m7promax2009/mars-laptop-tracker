export interface MockStudent {
  _id: string;
  name: string;
  phone: string;
  parentPhone: string;
  group: string;
  branch: string;
  status: "taken" | "returned";
  laptopId?: string;
  takenAt?: string | null;
  returnedAt?: string | null;
  expectedReturn?: string | null;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockLog {
  _id: string;
  studentId: string;
  studentName: string;
  action: "TAKEN" | "RETURNED" | "CREATED" | "EDITED" | "DELETED";
  laptopId?: string;
  adminName: string;
  details?: string;
  createdAt: string;
}

// Initial realistic dataset for Mars IT School
let studentsStore: MockStudent[] = [
  {
    _id: "m-st-1",
    name: "Islomjon Karimov",
    phone: "+998901234567",
    parentPhone: "+998935551234",
    group: "Frontend 204",
    branch: "Yunusobod",
    status: "taken",
    laptopId: "MARS-LP-018",
    takenAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    expectedReturn: new Date(Date.now() + 1 * 3600 * 1000).toISOString(),
    notes: "Darsdan keyin qo'shimcha loyiha qilmoqchi bo'ldi",
    createdAt: new Date(Date.now() - 30 * 86400 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "m-st-2",
    name: "Madina Rustamova",
    phone: "+998977123456",
    parentPhone: "+998909876543",
    group: "Python Backend 108",
    branch: "Chilonzor",
    status: "taken",
    laptopId: "MARS-LP-007",
    takenAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    expectedReturn: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    notes: "Uyga olib ketgan, hali topshirmadi (Kecha olingan)",
    createdAt: new Date(Date.now() - 40 * 86400 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "m-st-3",
    name: "Sardorbek Aliyev",
    phone: "+998912345678",
    parentPhone: "+998944567890",
    group: "Robotics 51",
    branch: "Beruniy",
    status: "returned",
    laptopId: "MARS-LP-033",
    takenAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    returnedAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    notes: "Topshirdi, zaryadchigi bilan butun",
    createdAt: new Date(Date.now() - 60 * 86400 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "m-st-4",
    name: "Jasur Nematov",
    phone: "+998998887766",
    parentPhone: "+998971112233",
    group: "GameDev Scratch 12",
    branch: "Tinchlik",
    status: "taken",
    laptopId: "MARS-LP-025",
    takenAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    expectedReturn: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    notes: "Unity darsi uchun oldi",
    createdAt: new Date(Date.now() - 15 * 86400 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "m-st-5",
    name: "Zuhra Qodirova",
    phone: "+998933445566",
    parentPhone: "+998901112233",
    group: "UI/UX Design 19",
    branch: "Yunusobod",
    status: "returned",
    laptopId: "MARS-LP-012",
    takenAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    returnedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    notes: "Vaqtida topshirdi",
    createdAt: new Date(Date.now() - 25 * 86400 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "m-st-6",
    name: "Bekzod To'lqinov",
    phone: "+998946667788",
    parentPhone: "+998994445566",
    group: "Frontend 204",
    branch: "Yunusobod",
    status: "returned",
    laptopId: "MARS-LP-019",
    takenAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    returnedAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    notes: "Muammosiz topshirildi",
    createdAt: new Date(Date.now() - 50 * 86400 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "m-st-7",
    name: "Abdulloh Mirzayev",
    phone: "+998901122334",
    parentPhone: "+998937788990",
    group: "Python Backend 108",
    branch: "Chilonzor",
    status: "taken",
    laptopId: "MARS-LP-004",
    takenAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    expectedReturn: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    notes: "Qaytarish muddati 1 kunga o'tib ketgan!",
    createdAt: new Date(Date.now() - 80 * 86400 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

let logsStore: MockLog[] = [
  {
    _id: "log-1",
    studentId: "m-st-1",
    studentName: "Islomjon Karimov",
    action: "TAKEN",
    laptopId: "MARS-LP-018",
    adminName: "Mars Administrator",
    details: "Darsdan keyin olindi",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    _id: "log-2",
    studentId: "m-st-5",
    studentName: "Zuhra Qodirova",
    action: "RETURNED",
    laptopId: "MARS-LP-012",
    adminName: "Mars Administrator",
    details: "Noutbuk butun holatda qaytarildi",
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
  }
];

export const getMockStudents = () => [...studentsStore];
export const setMockStudents = (students: MockStudent[]) => {
  studentsStore = students;
};

export const addMockStudent = (student: Omit<MockStudent, "_id" | "createdAt" | "updatedAt">): MockStudent => {
  const newStudent: MockStudent = {
    ...student,
    _id: `m-st-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  studentsStore.unshift(newStudent);
  return newStudent;
};

export const updateMockStudent = (id: string, update: Partial<MockStudent>): MockStudent | null => {
  const index = studentsStore.findIndex((s) => s._id === id);
  if (index === -1) return null;
  studentsStore[index] = {
    ...studentsStore[index],
    ...update,
    updatedAt: new Date().toISOString(),
  };
  return studentsStore[index];
};

export const deleteMockStudent = (id: string): boolean => {
  const initialLength = studentsStore.length;
  studentsStore = studentsStore.filter((s) => s._id !== id);
  return studentsStore.length < initialLength;
};

export const getMockLogs = () => [...logsStore];
export const addMockLog = (log: Omit<MockLog, "_id" | "createdAt">): MockLog => {
  const newLog: MockLog = {
    ...log,
    _id: `log-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  logsStore.unshift(newLog);
  return newLog;
};
