# 🔍 AdhanAgent — تقرير مشاكل المشروع

> **Scan date:** 2026-06-07 | **Scope:** كل ملفات Backend + Frontend + DevOps
> **Legend:** 🔴 Critical · 🟡 Medium · 🟢 Minor

---

## 🔴 مشاكل حرجة (Critical)

---

### [B-01] `agent.py` — `create_agent` غير موجود في LangChain 0.3
**الملف:** `backend/app/services/agent.py` — السطر 4
```python
from langchain.agents import create_agent   # ❌ لا يوجد هذا في langchain 0.3.14
```
**المشكلة:** LangChain 0.3 لا تحتوي دالة `create_agent`. الدوال الصحيحة هي:
- `create_tool_calling_agent` + `AgentExecutor`
- أو `create_react_agent` من LangGraph

**التأثير:** الـ import يفشل عند بدء تشغيل التطبيق → كل الـ backend لا يعمل أو الـ `/chat` endpoint يرمي 500.
**الحل:**
```python
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_messages([
    ("system", _SYSTEM_PROMPT),
    MessagesPlaceholder("chat_history", optional=True),
    ("human", "{input}"),
    MessagesPlaceholder("agent_scratchpad"),
])
agent = create_tool_calling_agent(llm, [get_prayer_times], prompt)
executor = AgentExecutor(agent=agent, tools=[get_prayer_times])
result = await executor.ainvoke({"input": message})
```

---

### [B-02] `agent.py` — HTTP synchronous داخل async context
**الملف:** `backend/app/services/agent.py` — السطر 18
```python
with httpx.Client(timeout=10.0) as client:   # ❌ sync داخل async
```
**المشكلة:** `get_prayer_times` هو `@tool` يُستدعى من agent يعمل في async context. استخدام `httpx.Client` (synchronous) يحجب الـ event loop ويسبب بطء شديد أو توقف.
**الحل:** إما تشغيله في thread executor:
```python
import asyncio
result = await asyncio.to_thread(_fetch_prayer_times, city, country)
```
أو جعل الـ tool async مع `httpx.AsyncClient`.

---

### [B-03] `agent.py` — `import os` داخل دالة + mutation خطير للـ environment
**الملف:** `backend/app/services/agent.py` — السطر 54-55
```python
import os                                          # ❌ import داخل دالة
os.environ["OPENAI_API_KEY"] = settings.openai_api_key  # ❌ غير آمن
```
**المشكلة:** تغيير `os.environ` داخل request handler غير آمن في multi-worker environments. يجب تمرير الـ API key مباشرة للـ ChatOpenAI عند الإنشاء.
**الحل:**
```python
llm = ChatOpenAI(model="gpt-4o-mini", api_key=settings.openai_api_key)
```

---

### [B-04] `chat.py` — endpoint بدون error handling
**الملف:** `backend/app/api/v1/chat.py`
```python
@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    reply = await agent.chat(request.message)   # ❌ لا try/except
    return ChatResponse(reply=reply)
```
**المشكلة:** أي exception من `agent.chat()` يصل لـ `generic_exception_handler` الذي يكشف تفاصيل الخطأ الداخلية للمستخدم.
**الحل:** إضافة `try/except` مع `raise HTTPException(status_code=502, ...) from e`.

---

### [B-05] `backend/Dockerfile` — Python 3.11 بدل 3.12
**الملف:** `backend/Dockerfile` — السطر 1
```dockerfile
FROM python:3.11-slim   # ❌ المشروع يحتاج 3.12
```
**المشكلة:** التناقض مع الـ CI (يستخدم 3.12), الـ README, وطريقة إعداد الـ venv. قد تكون بعض dependencies تحتاج binary wheels لـ 3.12 فقط.
**الحل:** `FROM python:3.12-slim`

---

### [F-01] `ChatWidget.tsx` — عرض رسالة الترحيب عند الخطأ
**الملف:** `frontend/src/components/ChatWidget.tsx` — السطر 35
```typescript
} catch {
    setMessages((m) => [
        ...m,
        { role: "assistant", content: t("welcome") },  // ❌ يعرض رسالة الترحيب عند الخطأ!
    ]);
}
```
**المشكلة:** عند فشل الـ API call، يضاف رسالة "مرحبًا!" بدل رسالة خطأ مناسبة.
**الحل:** إضافة مفتاح `chat.error` في translation files واستخدامه هنا.

---

### [D-01] `.idea/` directory مُتتبَّع في git
**الملف:** `git ls-files | grep .idea`
**المشكلة:** مجلد `.idea/` (JetBrains IDE) موجود في الـ git على الرغم من وجوده في `.gitignore`. هذا لأنه كان committed قبل إضافة `.gitignore`.
**الحل:**
```bash
git rm -r --cached .idea/
git commit -m "chore: remove tracked .idea/ IDE files"
```

---

### [D-02] `agent.py` (root) — الملف القديم لا يزال في git
**الملف:** `agent.py` في جذر المشروع
**المشكلة:** الملف الأصلي البسيط (34 سطر) لا يزال tracked في git مع كود قديم ومشاكل معروفة (تاريخ hardcoded، imports depreciated). يُربك بنية المشروع.
**الحل:**
```bash
git rm agent.py
git commit -m "chore: remove old root agent.py (replaced by backend/app/services/agent.py)"
```

---

### [D-03] `httpsapi.aladhan.comv1timingsByCity.txt` — ملف عرضي في git
**الملف:** `httpsapi.aladhan.comv1timingsByCity.txt` في جذر المشروع
**المشكلة:** ملف نص يبدو أنه رد من الـ API حُفظ عن طريق الخطأ في المشروع وأُضيف لـ git.
**الحل:**
```bash
git rm "httpsapi.aladhan.comv1timingsByCity.txt"
git commit -m "chore: remove accidentally committed API response file"
```

---

## 🟡 مشاكل متوسطة (Medium)

---

### [F-02] `QiblaCompass.tsx` — اتجاهات البوصلة تتعكس في RTL
**الملف:** `frontend/src/components/QiblaCompass.tsx` — السطرين 29-30
```typescript
<span className="absolute start-3 ...">  {C("W")} </span>  // ❌ في RTL → يصبح يمين
<span className="absolute end-3 ...">   {C("E")} </span>  // ❌ في RTL → يصبح يسار
```
**المشكلة:** البوصلة عنصر بصري مادي (physical). في RTL، `start-3` يصبح `right: 0.75rem` → W يظهر على اليمين وE على اليسار → عكس الصواب.
**الحل:** استخدام خصائص فيزيائية (لا logical) للبوصلة:
```typescript
<span className="absolute left-3 ...">  {C("W")} </span>
<span className="absolute right-3 ..."> {C("E")} </span>
```

---

### [F-03] `NotificationBanner.tsx` — زر الإغلاق الواحد يُخفي كلا البانرين
**الملف:** `frontend/src/components/NotificationBanner.tsx` — السطر 19
```typescript
const [dismissed, setDismissed] = useState(false);  // ❌ حالة واحدة للاثنين
```
**المشكلة:** إغلاق بانر الإشعارات يُغلق أيضاً بانر تثبيت الـ PWA والعكس.
**الحل:** فصل الحالتين:
```typescript
const [dismissedNotif, setDismissedNotif] = useState(false);
const [dismissedInstall, setDismissedInstall] = useState(false);
```

---

### [F-04] `globals.css` — لون SVG الخلفية hardcoded (لا يتغير في Dark Mode)
**الملف:** `frontend/src/app/globals.css` — السطر 47
```css
stroke='%230d7a6e'  /* ❌ اللون الأخضر الفاتح hardcoded */
```
**المشكلة:** في Dark Mode تتغير `--primary` إلى `#2dd4bf` (فيروزي) لكن نمط النجوم الهندسي في الخلفية يبقى بـ `#0d7a6e`. لا توجد طريقة مباشرة لحقن CSS variable داخل SVG data URL.
**الحل الأفضل:** إنشاء `background-image` مختلف لـ light/dark، أو تحديث الـ CSS variable في `.dark` بنمط SVG مختلف اللون:
```css
.dark body {
  background-image:
    radial-gradient(...),
    url("data:image/svg+xml,...stroke='%232dd4bf'...");
}
```

---

### [F-05] `NextPrayerCountdown.tsx` — مشكلة توسيط في RTL
**الملف:** `frontend/src/components/NextPrayerCountdown.tsx` — السطر 45
```typescript
className="... absolute -top-16 start-1/2 ... -translate-x-1/2 ..."
```
**المشكلة:** `start-1/2` في RTL = `right: 50%`, لكن `-translate-x-1/2` دائماً يُحرّك إلى اليسار → عنصر الـ glow لا يكون في المنتصف في العربية.
**الحل:** استخدام `left-1/2 -translate-x-1/2` (فيزيائي) لأن هذا عنصر بصري:
```typescript
className="... absolute -top-16 left-1/2 ... -translate-x-1/2 ..."
```

---

### [F-06] `useInstallPrompt.ts` — memory leak: listener غير مُزال
**الملف:** `frontend/src/lib/hooks/useInstallPrompt.ts` — السطر 21-24
```typescript
window.addEventListener("appinstalled", () => {  // ❌ لا يُزال في cleanup
    setInstalled(true);
    setPrompt(null);
});
return () => window.removeEventListener("beforeinstallprompt", handler);  // فقط هذا
```
**المشكلة:** `appinstalled` event listener يُضاف لكن لا يُزال عند unmount → memory leak.
**الحل:** حفظ reference للـ handler وإزالته في cleanup.

---

### [F-07] `usePrayerAlert.ts` — `prayerLabel` في interface لكن غير مستخدم
**الملف:** `frontend/src/lib/hooks/usePrayerAlert.ts` — السطر 13
```typescript
prayerLabel: (name: string) => string;  // ❌ موجود في Options لكن لا يُستخدم أبداً
```
**المشكلة:** Dead code — يُربك المستخدمين الذين يمرّرون قيمة لهذا المعامل ظناً أنه يُستخدم.
**الحل:** حذفه من الـ interface وكل استدعاءاته.

---

### [F-08] `QiblaPage.tsx` — لا يوجد error state لفشل Qibla API
**الملف:** `frontend/src/app/[locale]/qibla/page.tsx`
**المشكلة:** الصفحة تعالج `geo.error` (فشل الـ geolocation) لكن لا تعالج `query.isError`. إذا نجح الـ geolocation لكن Aladhan API رجع خطأ، لا يوجد أي feedback للمستخدم.
**الحل:** إضافة:
```typescript
{query.isError && (
  <p className="text-center text-red-500">{t("common.error")}</p>
)}
```

---

### [F-09] `MonthlyTable.tsx` — `isToday` يقارن رقم اليوم فقط (دون الشهر)
**الملف:** `frontend/src/components/MonthlyTable.tsx` — السطر 37
```typescript
const isToday = Number(day.date.gregorian.day) === todayNum;  // ❌ يقارن 1-31 فقط
```
**المشكلة:** إذا عُرض شهر مختلف (أو إذا تغيّر الشهر بعد ظهر منتصف الليل)، سيُظلَّل يوم غلط.
**الحل:** مقارنة التاريخ الكامل:
```typescript
const todayStr = new Date().toISOString().slice(0, 10);  // "2026-06-07"
const isToday = day.date.gregorian.date === todayStr.split("-").reverse().join("-");
// أو parse الـ API format مباشرة
```

---

### [F-10] `useStoredLocation.ts` — Flash عند التحميل (default city يظهر أولاً)
**الملف:** `frontend/src/lib/hooks/useStoredLocation.ts`
**المشكلة:** الحالة الأولى هي `{ city: "Makkah", country: "Saudi Arabia" }` hardcoded. العميل يرى هذه المدينة لفترة وجيزة قبل أن يقرأ localStorage في الـ `useEffect`. إذا كان المستخدم حدّد مدينة مختلفة، يحدث flash مزعج.
**الحل:** استخدام `useState(() => ...)` مع قراءة مبكرة:
```typescript
const [location, setLocationState] = useState<StoredLocation>(() => {
    if (typeof window === "undefined") return DEFAULT;
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : DEFAULT;
    } catch { return DEFAULT; }
});
```

---

### [F-11] `api.ts` — لا يوجد timeout للـ fetch requests
**الملف:** `frontend/src/lib/api.ts`
**المشكلة:** الـ `fetch()` بدون `AbortController` ينتظر إلى الأبد إذا كان الـ backend لا يستجيب.
**الحل:**
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10_000);
const res = await fetch(url, { ...init, signal: controller.signal });
clearTimeout(timeoutId);
```

---

### [F-12] `sw.js` — لا يوجد fallback page عند التصفح offline
**الملف:** `frontend/public/sw.js` — السطر 60
```javascript
caches.match(request) || fetch(request)  // ❌ إذا offline ولا يوجد في cache → fetch يفشل
```
**المشكلة:** إذا كان المستخدم offline ولم تُخزَّن الصفحة في cache، تُرجع شاشة خطأ المتصفح بدل صفحة offline مناسبة.
**الحل:** إضافة offline fallback page (`/offline.html`) وخدمتها عند الفشل.

---

### [B-06] `slowapi` مثبَّت لكن غير مستخدم
**الملف:** `backend/requirements.txt` — السطر 9
```
slowapi==0.1.9  # ❌ مثبَّت لكن غير موجود في أي ملف من ملفات التطبيق
```
**المشكلة:** تم التخطيط لـ Rate Limiting في Phase 1 لكن لم يُطبَّق. `slowapi` dependency ضائعة وتُثقّل الـ Docker image.
**الحل:** إما تطبيق Rate Limiting أو حذف `slowapi` من `requirements.txt`.

---

### [B-07] `errors.py` — يكشف تفاصيل الأخطاء الداخلية
**الملف:** `backend/app/core/errors.py` — السطر 14
```python
content={"error": "Internal server error", "detail": str(exc)},  # ❌ في production
```
**المشكلة:** إرسال `str(exc)` للعميل في production يكشف معلومات حساسة (stack trace جزئي، أسماء ملفات...).
**الحل:** إرسال رسالة عامة في production، مع logging الخطأ الكامل داخليًا:
```python
import logging
logger = logging.getLogger(__name__)

async def generic_exception_handler(request, exc):
    logger.exception("Unhandled exception")
    return JSONResponse(status_code=500, content={"error": "Internal server error"})
```

---

### [B-08] `errors.py` — كل أخطاء Aladhan ترجع كـ 502
**الملف:** `backend/app/api/v1/timings.py`, `calendar.py`, `qibla.py`
**المشكلة:** إذا أعادت Aladhan API خطأ 400 (مدينة غير صحيحة)، يرجع العميل 502 (Bad Gateway) بدل 400 أو 422. يُربك المستخدمين.
**الحل:** فحص نوع الخطأ:
```python
except httpx.HTTPStatusError as e:
    code = 400 if e.response.status_code < 500 else 502
    raise HTTPException(status_code=code, detail=str(e)) from e
except Exception as e:
    raise HTTPException(status_code=504, detail="Upstream timeout") from e
```

---

### [D-04] `docker-compose.yml` — لا يوجد healthcheck، frontend يبدأ قبل backend
**الملف:** `docker-compose.yml`
```yaml
depends_on:
  - backend   # ❌ ينتظر بدء container فقط، لا يتحقق أن FastAPI جاهز
```
**الحل:**
```yaml
backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:8000/api/v1/health"]
    interval: 5s
    timeout: 3s
    retries: 5
frontend:
  depends_on:
    backend:
      condition: service_healthy
```

---

### [D-05] `frontend/Dockerfile` — `NEXT_PUBLIC_BACKEND_URL` غير مضمَّن في البناء
**الملف:** `frontend/Dockerfile` — السطر 5
```dockerfile
RUN npm run build   # ❌ بدون NEXT_PUBLIC_BACKEND_URL
```
**المشكلة:** Next.js يُضمّن `NEXT_PUBLIC_*` وقت البناء. في Docker، `127.0.0.1:8000` (الـ fallback) لا يعمل بين containers.
**الحل:**
```dockerfile
ARG NEXT_PUBLIC_BACKEND_URL=http://backend:8000
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
RUN npm run build
```

---

### [F-13] `manifest.webmanifest` — فقط SVG icons بدون PNG fallback
**الملف:** `frontend/public/manifest.webmanifest`
**المشكلة:** بعض إصدارات Android/Chrome تتطلب PNG icons (192×192 و512×512) لتثبيت الـ PWA. مع SVG فقط، قد لا يعمل `beforeinstallprompt` على بعض الأجهزة.
**الحل:** توليد PNG icons من الـ SVG وإضافتها للـ manifest.

---

## 🟢 مشاكل بسيطة (Minor)

---

### [F-14] `ChatWidget.tsx` — لا يوجد حد أقصى لطول الرسالة
**الملف:** `frontend/src/components/ChatWidget.tsx`
يمكن إرسال رسائل طويلة جداً للـ backend بدون حد.
**الحل:** `<input maxLength={500} ...>` أو validation في الـ `send` function.

---

### [F-15] `LanguageSwitcher.tsx` — يعرض "ع" بدل "AR"
**الملف:** `frontend/src/components/LanguageSwitcher.tsx` — السطر 26
```typescript
<span>{locale === "ar" ? "EN" : "ع"}</span>  // ❌ "ع" غير واضح للناطقين بالإنجليزية
```
**الحل:** `locale === "ar" ? "EN" : "AR"` للتناسق.

---

### [F-16] `providers.tsx` — `staleTime` 60 ثانية قصير لبيانات الصلاة
**الملف:** `frontend/src/app/providers.tsx`
```typescript
staleTime: 60_000,  // 60 ثانية
```
مواقيت الصلاة تتغير مرة واحدة يومياً. 60 ثانية تسبب re-fetches غير ضرورية.
**الحل:** `staleTime: 5 * 60 * 1000` (5 دقائق، يتماشى مع `CACHE_TTL_SECONDS` في الـ backend).

---

### [B-09] `cache.py` — المفاتيح المنتهية لا تُحذف تلقائياً
**الملف:** `backend/app/core/cache.py`
التنظيف يحدث فقط عند `get()`. في سيرفر طويل الأمد، يتراكم `_store` بمفاتيح منتهية.
**الحل:** إضافة background task للتنظيف الدوري، أو استخدام `cachetools.TTLCache`.

---

### [F-17] `Skeleton.tsx` — array index كـ React key
**الملف:** `frontend/src/components/ui/Skeleton.tsx`
```typescript
Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)  // ⚠️
```
آمن هنا لأن القائمة static، لكن يُثير تحذيرات ESLint.

---

### [F-18] `globals.css` — `color-mix()` بدون CSS fallback
**الملف:** `frontend/src/app/globals.css`
يتطلب Chrome 111+, Firefox 113+, Safari 16.2+. لا يوجد fallback للمتصفحات القديمة.

---

### [B-10] `requirements.txt` — `pydantic-core` غير مثبَّت صراحةً
**الملف:** `backend/requirements.txt`
`pydantic-core` dependency أساسية لـ pydantic v2 لكن غير مذكورة. تُثبَّت تلقائياً كـ transitive dependency، لكن pin صريح يضمن استخدام binary wheels.

---

### [F-19] `useGeolocation.ts` — رسالة الخطأ عامة لكل أنواع الأخطاء
**الملف:** `frontend/src/lib/hooks/useGeolocation.ts`
جميع أخطاء الـ geolocation تُعرض كـ `t("location.denied")` بغض النظر عن النوع:
- `PERMISSION_DENIED` (المستخدم رفض)
- `POSITION_UNAVAILABLE` (GPS لا يعمل)
- `TIMEOUT` (انتهت المهلة)

**الحل:** التمييز بين الأنواع وعرض رسائل مناسبة.

---

### [F-20] `PrayerTimeCard.tsx` — لا يوجد icon لـ `Imsak` و`Midnight`
**الملف:** `frontend/src/components/PrayerTimeCard.tsx`
```typescript
const ICONS: Record<string, string> = {
  Fajr: "🌅", Sunrise: "☀️", Dhuhr: "🌞", Asr: "🌤️", Maghrib: "🌇", Isha: "🌙",
  // ❌ Imsak و Midnight غائبان → يقعان على "🕌"
};
```
**الحل:** إضافة icons مناسبة:
```typescript
Imsak: "🌙",   // أو "🍽️"
Midnight: "🌌",
```

---

### [B-11] `sw.js` — Cache version string ثابت
**الملف:** `frontend/public/sw.js` — السطر 2
```javascript
const CACHE = 'adhan-v1';
```
عند نشر تحديث، يجب تغيير هذا الـ string يدوياً وإلا يبقى المستخدمون على الـ cache القديم.
**الحل:** inject الـ version عند البناء، أو استخدام timestamp:
```javascript
const CACHE = 'adhan-v2';  // يجب رفع الرقم مع كل deploy
```

---

## 📊 ملخص الإحصاءات

| الأولوية | العدد | التوزيع |
|---------|-------|---------|
| 🔴 Critical | 8 | Backend: 5 · Frontend: 2 · DevOps: 1 |
| 🟡 Medium | 14 | Backend: 3 · Frontend: 9 · DevOps: 2 |
| 🟢 Minor | 11 | Backend: 2 · Frontend: 8 · SW/Config: 1 |
| **المجموع** | **33** | |

---

## 🗺️ ترتيب الإصلاح المقترح

```
1. [D-01][D-02][D-03]  git cleanup (5 دقائق)
2. [B-01][B-02][B-03]  إصلاح agent.py بالكامل (أولوية قصوى)
3. [B-04][B-05]        chat endpoint + Dockerfile
4. [F-01]              ChatWidget error message
5. [F-02]              QiblaCompass RTL fix
6. [F-03][F-04][F-05]  UI/UX fixes
7. [B-06][D-04][D-05]  DevOps cleanup
8. الباقي              حسب الوقت المتاح
```
