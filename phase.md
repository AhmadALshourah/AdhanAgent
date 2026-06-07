# 🕌 AdhanAgent — خطة التطوير المتكاملة (Roadmap)

> خطة كاملة لتحويل المشروع من سكربت واحد إلى تطبيق Full-Stack احترافي يصلح لمعرض الأعمال (CV).
> آخر مرحلة في هذه الوثيقة هي **Implementation** (التنفيذ).

---

## 📌 1. الوضع الحالي (Current State)

المشروع حاليًا ملف واحد فقط `agent.py` (34 سطرًا) يبني وكيل **LangChain** يجلب مواقيت الصلاة عبر **Aladhan API**، بالإضافة إلى ملاحظة نصية.

### المشاكل المعروفة في الكود الحالي
| # | المشكلة | الموقع | الإصلاح المقترح |
|---|---------|--------|------------------|
| 1 | التاريخ ثابت (hardcoded) `19-02-2025` | `agent.py:23` | استخدام تاريخ اليوم ديناميكيًا |
| 2 | استيرادات LangChain قديمة (deprecated) | `agent.py:1,4` | `langchain-openai` + tool-calling agent |
| 3 | `json.dumps(respones.text)` خاطئ | `agent.py:24` | استخدام `response.json()` |
| 4 | أخطاء إملائية (`respones`, `fro`, `funchion`) | عدة أسطر | تصحيح + توثيق سليم |
| 5 | لا توجد معالجة أخطاء أو timeout للطلبات | `agent.py:23` | try/except + httpx timeout |
| 6 | لا يوجد فصل بين الطبقات (لا API ولا UI) | كامل المشروع | بنية monorepo (backend + frontend) |
| 7 | `.venv` و `.idea` متتبَّعان في Git | المستودع | إضافة `.gitignore` |

---

## 🎯 2. الرؤية المستهدفة (Target Vision)

تطبيق ويب احترافي لمواقيت الصلاة يجمع بين:

- **Backend هجين**: REST API (FastAPI) لمواقيت الصلاة + **مساعد ذكي (AI)** بـ LangChain للدردشة.
- **Frontend حديث**: Next.js + TypeScript + Tailwind CSS.
- **الميزات**: مواقيت اليوم + كشف الموقع التلقائي، العرض الشهري، اتجاه القبلة، العدّاد التنازلي + التنبيهات.
- **ثنائي اللغة**: عربي + إنجليزي مع دعم اتجاه RTL/LTR كامل.

### مبادئ التصميم المعماري
- فصل الاهتمامات (Separation of Concerns): backend مستقل عن frontend.
- API موثّق (OpenAPI/Swagger تلقائيًا من FastAPI).
- قابلية النشر (Deployable): Docker + Vercel/Render.
- جودة: اختبارات + linting + CI/CD.

---

## 🗂️ 3. البنية النهائية للمجلدات (Target Structure)

```
AdhanAgent/
├── backend/
│   ├── app/
│   │   ├── main.py                 # نقطة الدخول لـ FastAPI + CORS
│   │   ├── settings.py             # الإعدادات عبر pydantic-settings
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── timings.py       # GET /api/v1/timings
│   │   │       ├── calendar.py      # GET /api/v1/calendar
│   │   │       ├── qibla.py         # GET /api/v1/qibla
│   │   │       ├── chat.py          # POST /api/v1/chat
│   │   │       └── health.py        # GET /api/v1/health
│   │   ├── services/
│   │   │   ├── aladhan_client.py    # عميل httpx async + caching
│   │   │   └── agent.py             # وكيل LangChain المُحدَّث
│   │   ├── schemas/                 # نماذج Pydantic
│   │   └── core/                    # cache, errors, rate limit
│   ├── tests/                       # pytest
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── [locale]/
│   │   │       ├── page.tsx          # الرئيسية (مواقيت + عدّاد)
│   │   │       ├── monthly/page.tsx  # العرض الشهري
│   │   │       ├── qibla/page.tsx    # القبلة
│   │   │       └── layout.tsx        # RTL/LTR + theme
│   │   ├── components/               # PrayerTimeCard, Countdown, ...
│   │   ├── lib/                      # api client, hooks
│   │   ├── i18n/                     # next-intl config + messages
│   │   └── styles/
│   ├── messages/ (ar.json, en.json)
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── Dockerfile
│   └── .env.example
├── .github/workflows/ci.yml
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 4. المراحل (Phases)

### Phase 0 — الأساس والإعداد (Foundation & Setup)
**الهدف:** تجهيز هيكل المشروع وأدوات العمل.

- [x] إعادة هيكلة المستودع إلى monorepo: `backend/` و `frontend/`.
- [x] نقل `agent.py` الحالي إلى `backend/app/services/agent.py` كنقطة انطلاق.
- [x] إضافة `.gitignore` صحيح (Python + Node) وإزالة `.venv` و `.idea` من التتبّع.
- [x] **Backend stack:** Python 3.12 (uv)، FastAPI، uvicorn، httpx، pydantic، pydantic-settings، langchain 1.x، langchain-openai، pytest.
- [x] **Frontend stack:** Next.js 15.5 (App Router)، TypeScript، Tailwind CSS، next-intl، lucide-react، Framer Motion، TanStack Query.
- [x] ملفات `.env.example` للـ backend (`OPENAI_API_KEY`, `ALADHAN_BASE_URL`) والـ frontend (`NEXT_PUBLIC_BACKEND_URL`).

**Definition of Done:** المجلدان `backend/` و `frontend/` موجودان، التبعيات مثبّتة، والمشروع يعمل بـ "Hello World" على كل جانب.

---

### Phase 1 — Backend (FastAPI + AI)
**الهدف:** بناء REST API هجين مع مساعد ذكي.

- [x] وحدة إعدادات `settings.py` عبر pydantic-settings (قراءة من `.env`).
- [x] عميل Aladhan غير متزامن `aladhan_client.py` (httpx) مع timeout ومعالجة أخطاء.
- [x] طبقة caching بسيطة (TTL in-memory) لتقليل الطلبات المكرّرة.
- [x] نماذج Pydantic للاستجابات: `PrayerTimings`, `MonthlyCalendar`, `QiblaDirection`, `ChatResponse`.
- [x] **Endpoints تحت `/api/v1`:**
  - [x] `GET /timings` — مواقيت اليوم (بالمدينة/الدولة أو lat/lng) بتاريخ اليوم **ديناميكيًا**.
  - [x] `GET /calendar` — مواقيت الشهر كاملًا مع التاريخ الهجري.
  - [x] `GET /qibla` — اتجاه القبلة من lat/lng.
  - [x] `POST /chat` — المساعد الذكي (وكيل LangChain مُحدَّث).
  - [x] `GET /health` — فحص صحة الخدمة.
- [x] **تحديث الوكيل:** استخدام `langchain-openai`، LangChain 1.x `create_agent` API، تاريخ ديناميكي، `response.json()`.
- [x] إعداد CORS، معالجة أخطاء موحّدة (exception handlers).
- [x] توثيق Swagger تلقائي على `/docs`.

**Definition of Done:** كل الـ endpoints تعمل وتُرجع بيانات صحيحة عبر `/docs`، والمساعد الذكي يجيب على أسئلة المواقيت.

---

### Phase 2 — Frontend (Next.js)
**الهدف:** بناء الواجهة الهيكلية وربطها بالـ Backend.

- [x] هيكلة App Router مع توجيه اللغة `[locale]` ودعم `ar`/`en` (next-intl).
- [x] طبقة API client مكتوبة بـ TypeScript (fetch wrapper مُنمَّط) متصلة بالـ Backend.
- [x] جلب البيانات عبر TanStack Query (caching، loading، error states).
- [x] **الصفحات:** الرئيسية (مواقيت اليوم + العدّاد)، العرض الشهري، القبلة، + واجهة الدردشة.
- [x] **المكوّنات:**
  - [x] `PrayerTimeCard` — بطاقة وقت صلاة.
  - [x] `NextPrayerCountdown` — عدّاد للصلاة القادمة.
  - [x] `QiblaCompass` — بوصلة اتجاه القبلة.
  - [x] `MonthlyTable` — جدول المواقيت الشهري.
  - [x] `LocationPicker` — كشف تلقائي (Geolocation) + بحث بالمدينة.
  - [x] `ChatWidget` — نافذة الدردشة مع المساعد.
  - [x] `LanguageSwitcher` + `ThemeToggle`.
- [x] خطّاف `useGeolocation` للكشف التلقائي عن الموقع.

**Definition of Done:** كل الصفحات تعرض بيانات حقيقية من الـ Backend، والتنقّل بينها يعمل. ✅ تم التحقّق فعليًا: الرئيسية (6 بطاقات + عدّاد)، الشهري (جدول 30 يومًا بالتاريخ الهجري)، القبلة، الدردشة — `npm run build` ناجح، بدون أخطاء console، RTL/LTR يعمل تلقائيًا.

> 🔸 ملاحظة مُرحَّلة إلى Phase 3: شريط التنقّل يسبّب overflow أفقيًا بسيطًا على عرض الموبايل (يحتاج قائمة هامبرغر متجاوبة).

---

### Phase 3 — التصميم وتجربة المستخدم (Design & UX)
**الهدف:** واجهة جميلة ومتجاوبة وسهلة الوصول.

- [x] نظام تصميم: لوحة ألوان بطابع إسلامي (teal/emerald + gold) + نمط نجمي هندسي + خط عربي Cairo ولاتيني Inter عبر `next/font`.
- [x] وضعا Dark/Light عبر `ThemeToggle` (مع حفظ التفضيل في localStorage + سكربت لمنع الوميض).
- [x] تصميم متجاوب (Responsive) كامل + **قائمة هامبرغر** للموبايل (حُلّت مشكلة overflow في Phase 2).
- [x] حركات Framer Motion: العدّاد، انتقالات الصفحات (`MotionPage`)، إبراز الصلاة القادمة، قائمة الموبايل.
- [x] دعم RTL/LTR عبر CSS logical properties (`start/end`, `ps/pe`).
- [x] إمكانية الوصول (a11y): focus-visible outlines، سمات `aria-label`/`aria-expanded`، تباين كافٍ، عناصر native قابلة للتنقّل.
- [x] حالات Loading (skeletons: `PrayerGridSkeleton`/`TableSkeleton`/compass) و Error واضحة وأنيقة.

**Definition of Done:** الواجهة تبدو احترافية على كل المقاسات، وتدعم Dark/Light و RTL/LTR دون كسر التخطيط. ✅ تم التحقّق بصريًا: Light + Dark، عربي RTL، قائمة هامبرغر، العدّاد، البطاقات (الفجر مُبرَز) — `npm run build` ناجح، `horizontalOverflow: false`، خط Cairo مُطبّق.

---

### Phase 4 — التعريب (Localization / i18n)
**الهدف:** دعم لغتين بالكامل.

- [x] next-intl كامل: `routing.ts`, `request.ts`, `middleware.ts` + ملفات `messages/ar.json` و `messages/en.json` شاملة.
- [x] تبديل الاتجاه RTL/LTR تلقائيًا حسب اللغة (html `dir` + CSS logical properties).
- [x] تعريب الأرقام: مكتبة `locale-utils.ts` تحوّل كل الأرقام والأوقات → عربية-هندية (٠١٢...) في العربية / لاتينية في الإنجليزية.
- [x] تعريب التواريخ: أسماء الشهور الميلادية والهجرية مترجمة في `MonthlyTable`.
- [x] تعريب العدّاد (`ساعة/دقيقة/ثانية`) وعناصر القبلة (ش/ج/شر/غ).
- [x] حفظ تفضيل اللغة: `NEXT_LOCALE` cookie (سنة) يُقرأ من الـ middleware عند أول طلب SSR.

**Definition of Done:** التبديل بين العربية والإنجليزية يغيّر كل النصوص والاتجاه فورًا دون أخطاء. ✅ تم التحقّق عبر DOM: عربي → `٠٢:٣٠:٤٨`, `٠٤:١١` / إنجليزي → `02:30:48`, `04:11` — cookie `NEXT_LOCALE` تُحفظ وتُحدَّث عند كل تبديل — `npm run build` ناجح.

---

### Phase 5 — التنبيهات و PWA
**الهدف:** ميزات تفاعلية وعمل دون اتصال.

- [x] عدّاد تنازلي دقيق للصلاة القادمة — يتجدّد كل ثانية، `٠٢:٢٣:٥٨` بأرقام عربية.
- [x] إشعارات المتصفح (Notification API) + banner طلب الإذن — `usePrayerAlert` يُطلق الإشعار مرة واحدة عند كل صلاة.
- [x] صوت أذان اختياري — `audio.ts` نغمة جرس ثلاثية بـ Web Audio API (بلا ملف خارجي، تعمل offline).
- [x] **PWA كامل:** `manifest.webmanifest` + أيقونة SVG إسلامية + `sw.js` (cache-first/network-first) + `useInstallPrompt` + `offline-cache.ts` بـ localStorage.

**Definition of Done:** التطبيق قابل للتثبيت، يطلق إشعارًا عند وقت الصلاة، ويعرض آخر مواقيت دون اتصال. ✅ تم التحقق: `swState: activated`, `manifest: /manifest.webmanifest`, `themeColor: #0d7a6e` — `npm run build` ناجح.

---

### Phase 6 — الجودة والنشر (Testing, CI/CD, Deployment)
**الهدف:** ضمان الجودة والنشر للعالم.

- [x] **Backend:** 11 اختبار pytest (5 وحدات cache + 1 health + 5 API integration) — **11/11 ✅ في 0.68s** — respx يُحاكي Aladhan API دون اتصال.
- [x] **Frontend:** `npm run build` + `npm run lint` يعملان نظيفًا (TypeScript strict).
- [x] Linting/format: ruff (lint + format check) — **0 أخطاء** بعد الإصلاح.
- [x] GitHub Actions: `.github/workflows/ci.yml` — backend (ruff + pytest) + frontend (lint + build) عند كل push/PR.
- [x] Docker: `Dockerfile` لكل خدمة + `docker-compose.yml` موجود.
- [x] النشر: إرشادات Vercel (Frontend) + Render/Railway (Backend) موثّقة في README.
- [x] `README.md` احترافي: badges CI/Python/Next.js، مخطّط Mermaid معماري، جدول ميزات، setup instructions، docker، هيكل المجلدات.

**Definition of Done:** CI أخضر، التطبيق منشور ويعمل على رابط عام، و README جاهز لعرضه في الـ CV. ✅ تم التحقّق محليًا: 11 test passed، ruff clean، npm build ناجح.

---

## 🛡️ 5. Phase 7.5 — Project Scan & Hardening (ما بعد التنفيذ)

بعد اكتمال كل المراحل، تمّ إجراء **scan شامل** للمشروع وإيجاد **33 مشكلة** (8 حرجة، 14 متوسطة، 11 بسيطة). جميعها تمّ إصلاحها وتوثيقها في [`issues.md`](./issues.md).

### أبرز الإصلاحات

| الفئة | المشكلة | الإصلاح |
|-------|---------|---------|
| Backend | LangChain 0.3 vs 1.3.4 API mismatch | اعتماد `create_agent` / `ainvoke` الصحيح لـ 1.3.4 |
| Backend | `os.environ` mutation في request handler | تمرير `api_key` مباشرةً لـ `ChatOpenAI` |
| Backend | `/chat` بدون `try/except` | معالجة الأخطاء → 502 Bad Gateway |
| Backend | أخطاء Aladhan كلها → 502 | `handle_upstream_error()`: 4xx→400, 5xx→502, timeout→504 |
| Backend | Cache لا يُنظَّف تلقائياً | Background asyncio task + `cleanup()` / `size()` |
| Backend | `slowapi` مثبَّت وغير مستخدم | حُذف من `requirements.txt` |
| Backend | `Dockerfile` Python 3.11 | رُفع إلى `3.12-slim` |
| Frontend | Chat error يعرض رسالة "welcome" | مفتاح `chat.error` في الترجمة |
| Frontend | QiblaCompass يتعكس في RTL | `left-3`/`right-3` (physical, لا logical) |
| Frontend | NotificationBanner حالة مشتركة للبانرين | `dismissedNotif` + `dismissedInstall` منفصلتان |
| Frontend | `useStoredLocation` flash عند التحميل | Lazy `useState` initializer |
| Frontend | `api.ts` لا timeout | `AbortController` 12s على كل fetch |
| Frontend | `sw.js` لا offline fallback | `adhan-v2` + pre-cache `offline.html` |
| Frontend | `isToday` يقارن يوم الشهر فقط | مقارنة يوم + شهر + سنة |
| Frontend | Geolocation error واحد لكل الأنواع | `GeoErrorKey: "denied"/"unavailable"/"timeout"` |
| DevOps | Docker frontend يبدأ قبل backend | `healthcheck` + `depends_on: service_healthy` |
| DevOps | `NEXT_PUBLIC_BACKEND_URL` لا يُبنى في Docker | `ARG`/`ENV` قبل `npm run build` |

### الاختبارات المضافة
- **22 اختباراً** تغطي الـ fixes الجديدة:
  - `test_cache.py` — 3 اختبارات لـ `cleanup()` و`size()`
  - `test_chat.py` — 4 اختبارات جديدة للـ chat endpoint
  - `test_error_handling.py` — 4 اختبارات لـ B-08 (400/502/504 distinction)
  - **22/22 passed ✅**

---

## ✅ 6. Phase 7 — Implementation (التنفيذ — المرحلة الأخيرة)

ترتيب التنفيذ الموصى به (كل خطوة تعتمد على ما قبلها):

| الترتيب | المرحلة | المُخرَج | معيار "تمّ" (DoD) |
|---------|---------|---------|---------------------|
| 1 | Phase 0 — الإعداد | بنية monorepo + تبعيات | الجانبان يعملان "Hello World" |
| 2 | Phase 1 — Backend | REST API + مساعد AI | كل endpoints تعمل عبر `/docs` |
| 3 | Phase 2 — Frontend | صفحات ومكوّنات متصلة | الصفحات تعرض بيانات حقيقية |
| 4 | Phase 3 — Design | واجهة متجاوبة + ثيمات | احترافية على كل المقاسات |
| 5 | Phase 4 — i18n | دعم عربي/إنجليزي | تبديل اللغة والاتجاه يعمل |
| 6 | Phase 5 — التنبيهات/PWA | عدّاد + إشعارات + offline | قابل للتثبيت ويعمل دون اتصال |
| 7 | Phase 6 — الجودة/النشر | اختبارات + CI + نشر | CI أخضر + رابط منشور |

### قائمة تتبّع التنفيذ الكبرى
- [x] Phase 0 مكتملة ✅
- [x] Phase 1 مكتملة ✅
- [x] Phase 2 مكتملة ✅
- [x] Phase 3 مكتملة ✅
- [x] Phase 4 مكتملة ✅
- [x] Phase 5 مكتملة ✅
- [x] Phase 6 مكتملة ✅
- [x] Phase 7.5 — Project Scan & Hardening مكتملة ✅
- [ ] 🚀 المشروع منشور وجاهز للعرض في الـ CV

---

## 📚 ملاحظات تقنية ومراجع

- **Aladhan API:** `https://api.aladhan.com/v1/` — endpoints: `timingsByCity`, `calendarByCity`, `qibla/{lat}/{lng}`.
- **إدارة المفاتيح:** لا تُرفع `OPENAI_API_KEY` إلى Git؛ تُقرأ من `.env` فقط.
- **التكلفة:** مسار الدردشة (AI) فقط هو ما يستهلك OpenAI؛ بقية المسارات مجانية عبر Aladhan.
- **البديل دون AI:** يمكن للواجهة العمل بالكامل على endpoints المواقيت/التقويم/القبلة حتى بدون مفتاح OpenAI (الدردشة تُعطَّل بأمان).
