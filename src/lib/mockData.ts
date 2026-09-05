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

const now = Date.now();
const h = (hours: number) => new Date(now - hours * 3600000).toISOString();
const d = (days: number) => new Date(now - days * 86400000).toISOString();

let studentsStore: MockStudent[] = [
  { _id:"s1", name:"Abbos Aloxodjayev", phone:"+998901001101", parentPhone:"+998937011101", group:"nF-233", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(5), notes:"", createdAt:d(60), updatedAt:h(5) },
  { _id:"s2", name:"Abdufattohov Abdulloh", phone:"+998901001102", parentPhone:"+998937011102", group:"nF-2631", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-002", takenAt:h(1.5), returnedAt:null, notes:"Darsdan keyin loyiha uchun oldi", createdAt:d(55), updatedAt:h(1.5) },
  { _id:"s3", name:"Abdug'ani Abdumajidov", phone:"+998901001103", parentPhone:"+998937011103", group:"nF-3020", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(3), notes:"", createdAt:d(50), updatedAt:h(3) },
  { _id:"s4", name:"Abduganiyev Muhammadyusuf", phone:"+998901001104", parentPhone:"+998937011104", group:"nF-454", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(1), notes:"", createdAt:d(45), updatedAt:d(1) },
  { _id:"s5", name:"Abduhalilov Abduazim", phone:"+998901001105", parentPhone:"+998937011105", group:"nF-493", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(8), notes:"", createdAt:d(40), updatedAt:h(8) },
  { _id:"s6", name:"Abduhalilov Izzatilla", phone:"+998901001106", parentPhone:"+998937011106", group:"RCT-299", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-006", takenAt:h(3), returnedAt:null, notes:"React darsi uchun oldi", createdAt:d(38), updatedAt:h(3) },
  { _id:"s7", name:"Abduhamid Sultonov", phone:"+998901001107", parentPhone:"+998937011107", group:"YB-3142", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(2), notes:"", createdAt:d(35), updatedAt:h(2) },
  { _id:"s8", name:"Abdujabborov Jahongir", phone:"+998901001108", parentPhone:"+998937011108", group:"RCT-247", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(2), notes:"", createdAt:d(50), updatedAt:d(2) },
  { _id:"s9", name:"Abdujabborov Murod", phone:"+998901001109", parentPhone:"+998937011109", group:"nB-3031", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-009", takenAt:h(26), returnedAt:null, notes:"Kechadan beri qaytarmagan!", createdAt:d(48), updatedAt:h(26) },
  { _id:"s10", name:"Abdujalilov Muhammadaziz", phone:"+998901001110", parentPhone:"+998937011110", group:"nBG-227", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(6), notes:"", createdAt:d(42), updatedAt:h(6) },
  { _id:"s11", name:"Abdukarimov Sherzod", phone:"+998901001111", parentPhone:"+998937011111", group:"nF-483", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(1), notes:"", createdAt:d(40), updatedAt:d(1) },
  { _id:"s12", name:"Abdulaziz Hakimboyev", phone:"+998901001112", parentPhone:"+998937011112", group:"YB-3142", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(4), notes:"", createdAt:d(36), updatedAt:h(4) },
  { _id:"s13", name:"Abdulaziz G'ofurjonov", phone:"+998901001113", parentPhone:"+998937011113", group:"RCT-352", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-013", takenAt:h(4.5), returnedAt:null, notes:"Imtihonga tayyorlanmoqda", createdAt:d(34), updatedAt:h(4.5) },
  { _id:"s14", name:"Abdulbahob Esman", phone:"+998901001114", parentPhone:"+998937011114", group:"nB-301", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(7), notes:"", createdAt:d(30), updatedAt:h(7) },
  { _id:"s15", name:"Abdulboriy Abdurashidxojayev", phone:"+998901001115", parentPhone:"+998937011115", group:"nF-483", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(3), notes:"", createdAt:d(28), updatedAt:d(3) },
  { _id:"s16", name:"Abdullayev Bag'davlat", phone:"+998901001116", parentPhone:"+998937011116", group:"nBG-227", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(1), notes:"", createdAt:d(45), updatedAt:h(1) },
  { _id:"s17", name:"Abdullayev Muhammad Amin", phone:"+998901001117", parentPhone:"+998937011117", group:"nB-350", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(10), notes:"", createdAt:d(50), updatedAt:h(10) },
  { _id:"s18", name:"Abdullayev Muhammadamin", phone:"+998901001118", parentPhone:"+998937011118", group:"nF-3020", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(1), notes:"", createdAt:d(42), updatedAt:d(1) },
  { _id:"s19", name:"Abdullayev Ibrohim", phone:"+998901001119", parentPhone:"+998937011119", group:"nB-350", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(9), notes:"", createdAt:d(38), updatedAt:h(9) },
  { _id:"s20", name:"Abdullayev Zafarbek", phone:"+998901001120", parentPhone:"+998937011120", group:"nF-2957", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-020", takenAt:h(2), returnedAt:null, notes:"Portfolio yasash uchun oldi", createdAt:d(32), updatedAt:h(2) },
  { _id:"s21", name:"Abdulloh Piraliev", phone:"+998901001121", parentPhone:"+998937011121", group:"IK-496", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(3), notes:"", createdAt:d(25), updatedAt:h(3) },
  { _id:"s22", name:"Abdulloh Murodjonov", phone:"+998901001122", parentPhone:"+998937011122", group:"RCT-543", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-022", takenAt:h(48), returnedAt:null, notes:"2 kundan beri qaytarmagan! Bog'lanish kerak", createdAt:d(55), updatedAt:h(48) },
  { _id:"s23", name:"Abdulloh Abdumalikov", phone:"+998901001123", parentPhone:"+998937011123", group:"nFPro-375", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(1), notes:"", createdAt:d(40), updatedAt:h(1) },
  { _id:"s24", name:"Abdumalikov Muhammadiyor", phone:"+998901001124", parentPhone:"+998937011124", group:"nKD-2838", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(2), notes:"", createdAt:d(22), updatedAt:d(2) },
  { _id:"s25", name:"Abdumannopov Komiljon", phone:"+998901001125", parentPhone:"+998937011125", group:"nF-468", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(5), notes:"", createdAt:d(35), updatedAt:h(5) },
  { _id:"s26", name:"Abdumavlonov Sayfuddin", phone:"+998901001126", parentPhone:"+998937011126", group:"nF-459", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(7), notes:"", createdAt:d(30), updatedAt:h(7) },
  { _id:"s27", name:"Abdunazarov Muhammadali", phone:"+998901001127", parentPhone:"+998937011127", group:"YB-3143", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-027", takenAt:h(5), returnedAt:null, notes:"Rocket dars uchun oldi", createdAt:d(28), updatedAt:h(5) },
  { _id:"s28", name:"Abduqahhorov Abdusamad", phone:"+998901001128", parentPhone:"+998937011128", group:"nFPro-516", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(2), notes:"", createdAt:d(20), updatedAt:h(2) },
  { _id:"s29", name:"Abdurahmon Azimov", phone:"+998901001129", parentPhone:"+998937011129", group:"IK-496", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(4), notes:"", createdAt:d(18), updatedAt:h(4) },
  { _id:"s30", name:"Abdurahmon Abdujabborov", phone:"+998901001130", parentPhone:"+998937011130", group:"YB-3123", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(1), notes:"", createdAt:d(40), updatedAt:d(1) },
  { _id:"s31", name:"Abdurahmonov Abdugani", phone:"+998901001131", parentPhone:"+998937011131", group:"F3-155", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(6), notes:"", createdAt:d(36), updatedAt:h(6) },
  { _id:"s32", name:"Abdurahmonov Hojiakbar", phone:"+998901001132", parentPhone:"+998937011132", group:"nF-2403", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-032", takenAt:h(0.5), returnedAt:null, notes:"Hozirgina oldi", createdAt:d(44), updatedAt:h(0.5) },
  { _id:"s33", name:"Abduraimov Abbos", phone:"+998901001133", parentPhone:"+998937011133", group:"nBG-227", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(3), notes:"", createdAt:d(32), updatedAt:h(3) },
  { _id:"s34", name:"Abduramonov Abdumavlon", phone:"+998901001134", parentPhone:"+998937011134", group:"nBG-2999", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(8), notes:"", createdAt:d(28), updatedAt:h(8) },
  { _id:"s35", name:"Abdurapiyev Sardor", phone:"+998901001135", parentPhone:"+998937011135", group:"YB-3114", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(1), notes:"", createdAt:d(25), updatedAt:d(1) },
  { _id:"s36", name:"Abdurasulov Muhammadyusuf", phone:"+998901001136", parentPhone:"+998937011136", group:"nB-3031", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(2), notes:"", createdAt:d(38), updatedAt:h(2) },
  { _id:"s37", name:"Abduraximov Abduhakim", phone:"+998901001137", parentPhone:"+998937011137", group:"YB-3110", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(5), notes:"", createdAt:d(42), updatedAt:h(5) },
  { _id:"s38", name:"Abdusamad Rixsiboyev", phone:"+998901001138", parentPhone:"+998937011138", group:"nF-459", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(4), notes:"", createdAt:d(30), updatedAt:h(4) },
  { _id:"s39", name:"Abdusamadov Zafarbek", phone:"+998901001139", parentPhone:"+998937011139", group:"nF-454", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(2), notes:"", createdAt:d(35), updatedAt:d(2) },
  { _id:"s40", name:"Abdusamatov Abu Bakr", phone:"+998901001140", parentPhone:"+998937011140", group:"YB-3143", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-040", takenAt:h(6), returnedAt:null, notes:"Rocket loyihasi uchun oldi", createdAt:d(20), updatedAt:h(6) },
  { _id:"s41", name:"Abdusamatov Abdurahmon", phone:"+998901001141", parentPhone:"+998937011141", group:"YB-3123", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(1), notes:"", createdAt:d(40), updatedAt:h(1) },
  { _id:"s42", name:"Abdusamatov Abdumalik", phone:"+998901001142", parentPhone:"+998937011142", group:"RCT-352", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(7), notes:"", createdAt:d(45), updatedAt:h(7) },
  { _id:"s43", name:"Abdusardor Komilov", phone:"+998901001143", parentPhone:"+998937011143", group:"nB-350", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(3), notes:"", createdAt:d(30), updatedAt:h(3) },
  { _id:"s44", name:"Abdusattorov Ibrohim", phone:"+998901001144", parentPhone:"+998937011144", group:"nF-509", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(1), notes:"", createdAt:d(25), updatedAt:d(1) },
  { _id:"s45", name:"Abdusharipov Toxirjon", phone:"+998901001145", parentPhone:"+998937011145", group:"RCT-352", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(9), notes:"", createdAt:d(35), updatedAt:h(9) },
  { _id:"s46", name:"Abdushukrov Abdulloh", phone:"+998901001146", parentPhone:"+998937011146", group:"YB-3088", branch:"Mars IT", status:"taken", laptopId:"MARS-LP-046", takenAt:h(72), returnedAt:null, notes:"3 kun oldin olgan, hali qaytarmagan! SHOSHILINCH", createdAt:d(50), updatedAt:h(72) },
  { _id:"s47", name:"Abdushukurov Izatilla", phone:"+998901001147", parentPhone:"+998937011147", group:"F3-155", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(2), notes:"", createdAt:d(38), updatedAt:h(2) },
  { _id:"s48", name:"Abdushukurov Sobitjon", phone:"+998901001148", parentPhone:"+998937011148", group:"nF-489", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(6), notes:"", createdAt:d(42), updatedAt:h(6) },
  { _id:"s49", name:"Abduvahobov Kamronbek", phone:"+998901001149", parentPhone:"+998937011149", group:"YB-3142", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:h(4), notes:"", createdAt:d(30), updatedAt:h(4) },
  { _id:"s50", name:"Abduvohobov Ravshan", phone:"+998901001150", parentPhone:"+998937011150", group:"nB-498", branch:"Mars IT", status:"returned", laptopId:"", takenAt:null, returnedAt:d(1), notes:"", createdAt:d(48), updatedAt:d(1) },
];

let logsStore: MockLog[] = [
  { _id:"log-1", studentId:"s2", studentName:"Abdufattohov Abdulloh", action:"TAKEN", laptopId:"MARS-LP-002", adminName:"Admin", details:"Darsdan keyin loyiha uchun oldi", createdAt:h(1.5) },
  { _id:"log-2", studentId:"s6", studentName:"Abduhalilov Izzatilla", action:"TAKEN", laptopId:"MARS-LP-006", adminName:"Admin", details:"React darsi uchun oldi", createdAt:h(3) },
  { _id:"log-3", studentId:"s9", studentName:"Abdujabborov Murod", action:"TAKEN", laptopId:"MARS-LP-009", adminName:"Admin", details:"Kechadan beri qaytarmagan", createdAt:h(26) },
  { _id:"log-4", studentId:"s13", studentName:"Abdulaziz G'ofurjonov", action:"TAKEN", laptopId:"MARS-LP-013", adminName:"Admin", details:"Imtihonga tayyorlanmoqda", createdAt:h(4.5) },
  { _id:"log-5", studentId:"s20", studentName:"Abdullayev Zafarbek", action:"TAKEN", laptopId:"MARS-LP-020", adminName:"Admin", details:"Portfolio yasash uchun oldi", createdAt:h(2) },
  { _id:"log-6", studentId:"s22", studentName:"Abdulloh Murodjonov", action:"TAKEN", laptopId:"MARS-LP-022", adminName:"Admin", details:"2 kundan beri qaytarmagan", createdAt:h(48) },
  { _id:"log-7", studentId:"s27", studentName:"Abdunazarov Muhammadali", action:"TAKEN", laptopId:"MARS-LP-027", adminName:"Admin", details:"Rocket dars uchun oldi", createdAt:h(5) },
  { _id:"log-8", studentId:"s32", studentName:"Abdurahmonov Hojiakbar", action:"TAKEN", laptopId:"MARS-LP-032", adminName:"Admin", details:"Hozirgina oldi", createdAt:h(0.5) },
  { _id:"log-9", studentId:"s40", studentName:"Abdusamatov Abu Bakr", action:"TAKEN", laptopId:"MARS-LP-040", adminName:"Admin", details:"Rocket loyihasi uchun oldi", createdAt:h(6) },
  { _id:"log-10", studentId:"s46", studentName:"Abdushukrov Abdulloh", action:"TAKEN", laptopId:"MARS-LP-046", adminName:"Admin", details:"3 kun oldin olgan", createdAt:h(72) },
  { _id:"log-11", studentId:"s3", studentName:"Abdug'ani Abdumajidov", action:"RETURNED", laptopId:"MARS-LP-003", adminName:"Admin", details:"Vaqtida topshirdi", createdAt:h(3) },
  { _id:"log-12", studentId:"s7", studentName:"Abduhamid Sultonov", action:"RETURNED", laptopId:"MARS-LP-007", adminName:"Admin", details:"Butun holatda qaytardi", createdAt:h(2) },
];

export const getMockStudents = () => [...studentsStore];
export const setMockStudents = (students: MockStudent[]) => { studentsStore = students; };

export const addMockStudent = (student: Omit<MockStudent, "_id" | "createdAt" | "updatedAt">): MockStudent => {
  const newStudent: MockStudent = { ...student, _id: "s-" + Date.now(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  studentsStore.unshift(newStudent);
  return newStudent;
};

export const updateMockStudent = (id: string, update: Partial<MockStudent>): MockStudent | null => {
  const index = studentsStore.findIndex((s) => s._id === id);
  if (index === -1) return null;
  studentsStore[index] = { ...studentsStore[index], ...update, updatedAt: new Date().toISOString() };
  return studentsStore[index];
};

export const deleteMockStudent = (id: string): boolean => {
  const initialLength = studentsStore.length;
  studentsStore = studentsStore.filter((s) => s._id !== id);
  return studentsStore.length < initialLength;
};

export const getMockLogs = () => [...logsStore];
export const addMockLog = (log: Omit<MockLog, "_id" | "createdAt">): MockLog => {
  const newLog: MockLog = { ...log, _id: "log-" + Date.now(), createdAt: new Date().toISOString() };
  logsStore.unshift(newLog);
  return newLog;
};
