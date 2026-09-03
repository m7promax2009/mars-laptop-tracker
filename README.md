# 🚀 Mars IT School — Noutbuklarni Nazorat Qilish va Monitoring Tizimi

Mars IT School o'quvchilari tomonidan dars jarayonida olingan noutbuklarni hisobga olish, qaytarilmagan (qarzdor) noutbuklarni qizil belgi bilan ko'rsatish, o'quvchi va uning ota-onasiga 1-bosishda telefon qilish imkoniyatini beruvchi to'liq Fullstack (Next.js 15 + MongoDB) veb-platformasi.

---

## 🌟 Asosiy Imkoniyatlar

1. **🔴 Qizil va 🟢 Yashil Galichkalar Tizimi:**
   - Hamma o'quvchilar ro'yxatida noutbuk olmagan yoki topshirganlar — **Yashil galichka** bilan turadi.
   - Noutbuk olgan va hali qaytarib topshirmagan o'quvchilar — **Qizil galichka** va maxsus yonib-o'chuvchi qizil ogohlantirish bilan ko'rinadi.
   - Tepada alohida **"🔴 Qarzdorlar"** filtri orqali qaytarilmagan barcha noutbuklarni 1 sekundda saralab olish mumkin.

2. **📞 1-Bosishda Qo'ng'iroq Qilish (Call System):**
   - Agar o'quvchi noutbukni qaytarib olib kelmagan bo'lsa:
     - 📱 **O'quvchiga to'g'ridan-to'g'ri qo'ng'iroq qilish** tugmasi
     - 👨‍👩‍👦 **Ota-onasiga to'g'ridan-to'g'ri qo'ng'iroq qilish** (Qizil qutida ajratilgan) tugmasi

3. **🔍 Qidiruv (Search Bar):**
   - Tepada o'quvchi F.I.SH, o'quvchi telefon raqami, ota-onasi raqami, guruhi yoki noutbuk seriya raqami bo'yicha lahzali qidiruv.

4. **➕ O'quvchi qo'shish va Tahrirlash:**
   - Yangi o'quvchi qo'shish (F.I.SH, telefoni, ota-onasi telefoni, filiali, guruhi, noutbuk ID).
   - O'quvchi noutbuk olganda yoki topshirganda holatini 1 tugma bilan yangilash.

5. **📜 Harakatlar Tarixi (Audit Log):**
   - Kim qaysi noutbukni qachon oldi, qachon topshirdi, qaysi administrator tomonidan berilgani vaqtigacha saqlanadi.

6. **📊 Excel Eksport:**
   - Qarzdorlar va umumiy ro'yxatni 1 bosishda Excel (.xlsx) formatida yuklab olish.

7. **🔐 Oson va Chiroyli Login Tizimi:**
   - Mars IT brendiga mos dizayn (Red / Dark Modern Glassmorphism).
   - "⚡ 1-Bosishda Oson Kirish" tugmasi mavjud.
   - Standart login: `admin` / parol: `mars2026`

---

## 🛠 Texnologiyalar

- **Frontend & Backend:** Next.js 15 (App Router), React 19, TypeScript
- **Dizayn:** Tailwind CSS, Lucide Icons, Framer Motion, Canvas-Confetti, Sonner Toaster
- **Ma'lumotlar Bazasi:** MongoDB (Mongoose orqali) + Avtomatik Local In-Memory Fallback
- **Eksport:** XLSX

---

## 🚀 Loyihani Ishga Tushirish (Local)

1. Loyiha papkasiga kiring:
   ```bash
   cd "/Users/shodiyor/Desktop/Новая папка 3/Mars"
   ```

2. Loyihani dev rejimda ishga tushiring:
   ```bash
   npm run dev
   ```

3. Brauzerda oching:
   👉 **http://localhost:3000**

---

## 🍃 MongoDB Ulanishi (Atlas)

Loyiha papkasidagi `.env` (yoki `.env.local`) fayliga MongoDB Atlas ulanish satringizni kiriting:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mars_db?retryWrites=true&w=majority
```

*(Eslatma: Agar MongoDB URI kiritilmasa ham tizim avtomatik tarzda o'zining ichki tezkor xotirasida 100% xatosiz ishlayveradi).*

---

## ☁️ Serverga Joylash (Vercel / Render)

### Variant 1: Vercel (Eng osoni va tezkor, 24/7 o'chmaydi)
1. Loyihani GitHub ga push qiling.
2. [Vercel.com](https://vercel.com) ga kiring va GitHub repozitoriyani tanlang.
3. Environment Variables bo'limiga `MONGODB_URI` ni qo'shing.
4. **Deploy** tugmasini bosing! 1 daqiqada tayyor bo'ladi.

### Variant 2: Render.com
1. [Render.com](https://render.com) ga kiring -> **New Web Service**.
2. GitHub repozitoriyangizni ulang.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Environment Variables ga `MONGODB_URI` qo'shing.

---

## 👤 Tizimga Kirish Ma'lumotlari:
- **Login:** `admin`
- **Parol:** `mars2026` (yoki `mars` / `1234`)
