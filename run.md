# 🚀 تشغيل مشروع AdhanAgent

---

## المتطلبات الأساسية

| الأداة | الإصدار المطلوب |
|--------|-----------------|
| Python | 3.12+ |
| Node.js | 22+ |
| npm | 10+ |
| Docker + Docker Compose | أي إصدار حديث (للتشغيل بـ Docker فقط) |

---

## الطريقة 1 — تشغيل محلي (Development)

### الخطوة 1 — إعداد ملفات البيئة

```bash
# Backend
cp backend/.env.example backend/.env
# افتح backend/.env وعدّل:
# OPENAI_API_KEY=sk-...مفتاحك هنا...

# Frontend
cp frontend/.env.example frontend/.env.local
# القيمة الافتراضية تشتغل مباشرةً:
# NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

---

### الخطوة 2 — تشغيل الـ Backend

```bash
cd backend

# إنشاء البيئة الافتراضية (مرة واحدة فقط)
python -m venv .venv

# تفعيل البيئة
# Windows:
.venv\Scripts\activate
# Linux / macOS:
source .venv/bin/activate

# تثبيت التبعيات (مرة واحدة فقط)
pip install -r requirements.txt

# تشغيل الـ server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

الـ API متاح على: **http://127.0.0.1:8000**
توثيق Swagger: **http://127.0.0.1:8000/docs**

---

### الخطوة 3 — تشغيل الـ Frontend

افتح terminal جديد:

```bash
cd frontend

# تثبيت التبعيات (مرة واحدة فقط)
npm ci

# تشغيل بوضع التطوير
npm run dev
```

التطبيق متاح على: **http://localhost:3000**

---

## الطريقة 2 — Docker Compose (الأسهل)

```bash
# من جذر المشروع

# أولاً: اعدّل ملف backend/.env
cp backend/.env.example backend/.env
# ثم أضف OPENAI_API_KEY داخله

# بناء وتشغيل الخدمتين معاً
docker compose up --build

# أو في الخلفية
docker compose up --build -d

# إيقاف التشغيل
docker compose down
```

> الـ frontend ينتظر تلقائياً حتى يصبح الـ backend جاهزاً (healthcheck).

| الخدمة | الرابط |
|--------|--------|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger Docs | http://localhost:8000/docs |

---

## أوامر الاختبار (Backend)

```bash
cd backend

# تأكد من تفعيل البيئة أولاً
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate

# تشغيل كل الاختبارات
PYTHONPATH=$(pwd) python -m pytest tests/ -v

# تشغيل اختبار ملف محدد
PYTHONPATH=$(pwd) python -m pytest tests/test_cache.py -v

# مع تفاصيل الأخطاء
PYTHONPATH=$(pwd) python -m pytest tests/ -v --tb=long
```

> **Windows PowerShell:** استخدم `$env:PYTHONPATH = "."` بدل `PYTHONPATH=$(pwd)` ثم نفّذ الأمر.

```powershell
# Windows PowerShell
cd backend
$env:PYTHONPATH = "."
.venv\Scripts\python -m pytest tests/ -v
```

---

## أوامر الجودة

### Backend — Ruff (Lint + Format)

```bash
cd backend

# فحص الكود
python -m ruff check app/ tests/

# فحص + إصلاح تلقائي
python -m ruff check app/ tests/ --fix

# فحص التنسيق
python -m ruff format --check app/ tests/

# تطبيق التنسيق
python -m ruff format app/ tests/
```

### Frontend — ESLint + TypeScript

```bash
cd frontend

# فحص ESLint
npm run lint

# فحص TypeScript (بدون بناء)
npx tsc --noEmit

# بناء production (يشمل lint + type-check)
npm run build
```

---

## المتغيرات البيئية

### `backend/.env`

| المتغير | القيمة الافتراضية | الوصف |
|---------|------------------|-------|
| `OPENAI_API_KEY` | *(فارغ)* | مفتاح OpenAI — مطلوب لتشغيل الـ `/chat` |
| `ALADHAN_BASE_URL` | `https://api.aladhan.com/v1` | رابط Aladhan API |
| `CACHE_TTL_SECONDS` | `300` | مدة التخزين المؤقت (5 دقائق) |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | origins مسموح بها لـ CORS (افصل بفاصلة لأكثر من origin) |

### `frontend/.env.local`

| المتغير | القيمة الافتراضية | الوصف |
|---------|------------------|-------|
| `NEXT_PUBLIC_BACKEND_URL` | `http://127.0.0.1:8000` | رابط الـ backend (يُضمَّن وقت البناء) |

---

## ملاحظات

- **بدون `OPENAI_API_KEY`:** كل الـ endpoints تعمل طبيعياً ما عدا `/chat` — يرجع رسالة "not configured" بدل خطأ.
- **تغيير `NEXT_PUBLIC_BACKEND_URL` بعد البناء لا يعمل** — يجب إعادة البناء (`npm run build`) لأن Next.js يضمّن هذه القيمة في الكود.
- **Docker:** الـ `backend/.env` يُحقن في الـ container عبر `env_file`. لا حاجة لتغيير `docker-compose.yml`.
