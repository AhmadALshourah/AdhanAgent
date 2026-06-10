export interface City {
  en: string;
  ar: string;
}

export interface Country {
  en: string;
  ar: string;
  cities: City[];
}

export const COUNTRIES: Country[] = [
  // ── Arabian Peninsula ──────────────────────────────────────────────
  {
    en: "Saudi Arabia",
    ar: "السعودية",
    cities: [
      { en: "Riyadh", ar: "الرياض" },
      { en: "Jeddah", ar: "جدة" },
      { en: "Mecca", ar: "مكة المكرمة" },
      { en: "Medina", ar: "المدينة المنورة" },
      { en: "Dammam", ar: "الدمام" },
      { en: "Khobar", ar: "الخبر" },
      { en: "Tabuk", ar: "تبوك" },
      { en: "Abha", ar: "أبها" },
      { en: "Taif", ar: "الطائف" },
      { en: "Hail", ar: "حائل" },
    ],
  },
  {
    en: "United Arab Emirates",
    ar: "الإمارات",
    cities: [
      { en: "Dubai", ar: "دبي" },
      { en: "Abu Dhabi", ar: "أبو ظبي" },
      { en: "Sharjah", ar: "الشارقة" },
      { en: "Ajman", ar: "عجمان" },
      { en: "Ras Al Khaimah", ar: "رأس الخيمة" },
      { en: "Fujairah", ar: "الفجيرة" },
    ],
  },
  {
    en: "Kuwait",
    ar: "الكويت",
    cities: [
      { en: "Kuwait City", ar: "مدينة الكويت" },
      { en: "Hawalli", ar: "حولي" },
      { en: "Salmiya", ar: "السالمية" },
      { en: "Ahmadi", ar: "الأحمدي" },
    ],
  },
  {
    en: "Qatar",
    ar: "قطر",
    cities: [
      { en: "Doha", ar: "الدوحة" },
      { en: "Al Rayyan", ar: "الريان" },
      { en: "Al Wakrah", ar: "الوكرة" },
    ],
  },
  {
    en: "Bahrain",
    ar: "البحرين",
    cities: [
      { en: "Manama", ar: "المنامة" },
      { en: "Riffa", ar: "الرفاع" },
      { en: "Muharraq", ar: "المحرق" },
    ],
  },
  {
    en: "Oman",
    ar: "عُمان",
    cities: [
      { en: "Muscat", ar: "مسقط" },
      { en: "Salalah", ar: "صلالة" },
      { en: "Sohar", ar: "صحار" },
      { en: "Nizwa", ar: "نزوى" },
    ],
  },
  {
    en: "Yemen",
    ar: "اليمن",
    cities: [
      { en: "Sanaa", ar: "صنعاء" },
      { en: "Aden", ar: "عدن" },
      { en: "Taiz", ar: "تعز" },
      { en: "Hodeidah", ar: "الحديدة" },
      { en: "Mukalla", ar: "المكلا" },
    ],
  },

  // ── Levant ────────────────────────────────────────────────────────
  {
    en: "Jordan",
    ar: "الأردن",
    cities: [
      { en: "Amman", ar: "عمّان" },
      { en: "Zarqa", ar: "الزرقاء" },
      { en: "Irbid", ar: "إربد" },
      { en: "Aqaba", ar: "العقبة" },
      { en: "Mafraq", ar: "المفرق" },
      { en: "Madaba", ar: "مادبا" },
      { en: "Karak", ar: "الكرك" },
    ],
  },
  {
    en: "Palestine",
    ar: "فلسطين",
    cities: [
      { en: "Jerusalem", ar: "القدس" },
      { en: "Ramallah", ar: "رام الله" },
      { en: "Nablus", ar: "نابلس" },
      { en: "Hebron", ar: "الخليل" },
      { en: "Jenin", ar: "جنين" },
      { en: "Tulkarm", ar: "طولكرم" },
      { en: "Gaza", ar: "غزة" },
      { en: "Rafah", ar: "رفح" },
    ],
  },
  {
    en: "Syria",
    ar: "سوريا",
    cities: [
      { en: "Damascus", ar: "دمشق" },
      { en: "Aleppo", ar: "حلب" },
      { en: "Homs", ar: "حمص" },
      { en: "Latakia", ar: "اللاذقية" },
      { en: "Hama", ar: "حماة" },
      { en: "Deir ez-Zor", ar: "دير الزور" },
    ],
  },
  {
    en: "Lebanon",
    ar: "لبنان",
    cities: [
      { en: "Beirut", ar: "بيروت" },
      { en: "Tripoli", ar: "طرابلس" },
      { en: "Sidon", ar: "صيدا" },
      { en: "Tyre", ar: "صور" },
      { en: "Zahle", ar: "زحلة" },
    ],
  },
  {
    en: "Iraq",
    ar: "العراق",
    cities: [
      { en: "Baghdad", ar: "بغداد" },
      { en: "Basra", ar: "البصرة" },
      { en: "Mosul", ar: "الموصل" },
      { en: "Erbil", ar: "أربيل" },
      { en: "Najaf", ar: "النجف" },
      { en: "Karbala", ar: "كربلاء" },
      { en: "Sulaymaniyah", ar: "السليمانية" },
      { en: "Kirkuk", ar: "كركوك" },
    ],
  },

  // ── North Africa ──────────────────────────────────────────────────
  {
    en: "Egypt",
    ar: "مصر",
    cities: [
      { en: "Cairo", ar: "القاهرة" },
      { en: "Alexandria", ar: "الإسكندرية" },
      { en: "Giza", ar: "الجيزة" },
      { en: "Luxor", ar: "الأقصر" },
      { en: "Aswan", ar: "أسوان" },
      { en: "Port Said", ar: "بورسعيد" },
      { en: "Suez", ar: "السويس" },
      { en: "Mansoura", ar: "المنصورة" },
      { en: "Tanta", ar: "طنطا" },
      { en: "Sharm el-Sheikh", ar: "شرم الشيخ" },
    ],
  },
  {
    en: "Libya",
    ar: "ليبيا",
    cities: [
      { en: "Tripoli", ar: "طرابلس" },
      { en: "Benghazi", ar: "بنغازي" },
      { en: "Misrata", ar: "مصراتة" },
      { en: "Tobruk", ar: "طبرق" },
    ],
  },
  {
    en: "Tunisia",
    ar: "تونس",
    cities: [
      { en: "Tunis", ar: "تونس" },
      { en: "Sfax", ar: "صفاقس" },
      { en: "Sousse", ar: "سوسة" },
      { en: "Kairouan", ar: "القيروان" },
    ],
  },
  {
    en: "Algeria",
    ar: "الجزائر",
    cities: [
      { en: "Algiers", ar: "الجزائر" },
      { en: "Oran", ar: "وهران" },
      { en: "Constantine", ar: "قسنطينة" },
      { en: "Annaba", ar: "عنابة" },
      { en: "Tlemcen", ar: "تلمسان" },
    ],
  },
  {
    en: "Morocco",
    ar: "المغرب",
    cities: [
      { en: "Rabat", ar: "الرباط" },
      { en: "Casablanca", ar: "الدار البيضاء" },
      { en: "Marrakech", ar: "مراكش" },
      { en: "Fez", ar: "فاس" },
      { en: "Tangier", ar: "طنجة" },
      { en: "Agadir", ar: "أكادير" },
      { en: "Meknes", ar: "مكناس" },
    ],
  },
  {
    en: "Mauritania",
    ar: "موريتانيا",
    cities: [
      { en: "Nouakchott", ar: "نواكشوط" },
      { en: "Nouadhibou", ar: "نواذيبو" },
    ],
  },

  // ── East Africa ───────────────────────────────────────────────────
  {
    en: "Sudan",
    ar: "السودان",
    cities: [
      { en: "Khartoum", ar: "الخرطوم" },
      { en: "Omdurman", ar: "أم درمان" },
      { en: "Port Sudan", ar: "بورسودان" },
    ],
  },
  {
    en: "Somalia",
    ar: "الصومال",
    cities: [
      { en: "Mogadishu", ar: "مقديشو" },
      { en: "Hargeisa", ar: "هرجيسا" },
      { en: "Bosaso", ar: "بوصاصو" },
    ],
  },
  {
    en: "Djibouti",
    ar: "جيبوتي",
    cities: [
      { en: "Djibouti City", ar: "مدينة جيبوتي" },
    ],
  },
  {
    en: "Eritrea",
    ar: "إريتريا",
    cities: [
      { en: "Asmara", ar: "أسمرة" },
    ],
  },
  {
    en: "Ethiopia",
    ar: "إثيوبيا",
    cities: [
      { en: "Addis Ababa", ar: "أديس أبابا" },
      { en: "Dire Dawa", ar: "دير داوا" },
      { en: "Harar", ar: "هرر" },
    ],
  },
  {
    en: "Tanzania",
    ar: "تنزانيا",
    cities: [
      { en: "Dar es Salaam", ar: "دار السلام" },
      { en: "Zanzibar", ar: "زنجبار" },
      { en: "Dodoma", ar: "دودوما" },
    ],
  },
  {
    en: "Kenya",
    ar: "كينيا",
    cities: [
      { en: "Nairobi", ar: "نيروبي" },
      { en: "Mombasa", ar: "مومباسا" },
    ],
  },

  // ── West Africa ───────────────────────────────────────────────────
  {
    en: "Nigeria",
    ar: "نيجيريا",
    cities: [
      { en: "Lagos", ar: "لاغوس" },
      { en: "Kano", ar: "كانو" },
      { en: "Abuja", ar: "أبوجا" },
      { en: "Ibadan", ar: "إيبادان" },
      { en: "Kaduna", ar: "كادونا" },
    ],
  },
  {
    en: "Senegal",
    ar: "السنغال",
    cities: [
      { en: "Dakar", ar: "داكار" },
      { en: "Touba", ar: "طوبى" },
      { en: "Thiès", ar: "تييس" },
    ],
  },
  {
    en: "Mali",
    ar: "مالي",
    cities: [
      { en: "Bamako", ar: "باماكو" },
      { en: "Timbuktu", ar: "تمبكتو" },
    ],
  },
  {
    en: "Niger",
    ar: "النيجر",
    cities: [
      { en: "Niamey", ar: "نيامي" },
      { en: "Zinder", ar: "زيندر" },
    ],
  },
  {
    en: "Chad",
    ar: "تشاد",
    cities: [
      { en: "N'Djamena", ar: "نجامينا" },
    ],
  },
  {
    en: "Guinea",
    ar: "غينيا",
    cities: [
      { en: "Conakry", ar: "كوناكري" },
    ],
  },
  {
    en: "Burkina Faso",
    ar: "بوركينا فاسو",
    cities: [
      { en: "Ouagadougou", ar: "واغادوغو" },
    ],
  },
  {
    en: "Gambia",
    ar: "غامبيا",
    cities: [
      { en: "Banjul", ar: "بانجول" },
    ],
  },

  // ── Turkey & Caucasus ─────────────────────────────────────────────
  {
    en: "Turkey",
    ar: "تركيا",
    cities: [
      { en: "Istanbul", ar: "إسطنبول" },
      { en: "Ankara", ar: "أنقرة" },
      { en: "Izmir", ar: "إزمير" },
      { en: "Bursa", ar: "بورصة" },
      { en: "Antalya", ar: "أنطاليا" },
      { en: "Konya", ar: "قونيا" },
      { en: "Trabzon", ar: "طرابزون" },
    ],
  },
  {
    en: "Azerbaijan",
    ar: "أذربيجان",
    cities: [
      { en: "Baku", ar: "باكو" },
      { en: "Ganja", ar: "غنجة" },
    ],
  },

  // ── Central Asia ──────────────────────────────────────────────────
  {
    en: "Kazakhstan",
    ar: "كازاخستان",
    cities: [
      { en: "Almaty", ar: "ألماتي" },
      { en: "Astana", ar: "أستانا" },
      { en: "Shymkent", ar: "شيمكنت" },
    ],
  },
  {
    en: "Uzbekistan",
    ar: "أوزبكستان",
    cities: [
      { en: "Tashkent", ar: "طاشقند" },
      { en: "Samarkand", ar: "سمرقند" },
      { en: "Bukhara", ar: "بخارى" },
    ],
  },
  {
    en: "Kyrgyzstan",
    ar: "قيرغيزستان",
    cities: [
      { en: "Bishkek", ar: "بيشكيك" },
      { en: "Osh", ar: "أوش" },
    ],
  },
  {
    en: "Tajikistan",
    ar: "طاجيكستان",
    cities: [
      { en: "Dushanbe", ar: "دوشنبه" },
    ],
  },
  {
    en: "Turkmenistan",
    ar: "تركمانستان",
    cities: [
      { en: "Ashgabat", ar: "عشق آباد" },
    ],
  },

  // ── South Asia ────────────────────────────────────────────────────
  {
    en: "Pakistan",
    ar: "باكستان",
    cities: [
      { en: "Karachi", ar: "كراتشي" },
      { en: "Lahore", ar: "لاهور" },
      { en: "Islamabad", ar: "إسلام آباد" },
      { en: "Peshawar", ar: "بيشاور" },
      { en: "Quetta", ar: "كويتا" },
      { en: "Faisalabad", ar: "فيصل آباد" },
      { en: "Multan", ar: "ملتان" },
    ],
  },
  {
    en: "Afghanistan",
    ar: "أفغانستان",
    cities: [
      { en: "Kabul", ar: "كابل" },
      { en: "Kandahar", ar: "قندهار" },
      { en: "Herat", ar: "هراة" },
      { en: "Mazar-i-Sharif", ar: "مزار الشريف" },
    ],
  },
  {
    en: "Bangladesh",
    ar: "بنغلاديش",
    cities: [
      { en: "Dhaka", ar: "دكا" },
      { en: "Chittagong", ar: "شيتاغونغ" },
      { en: "Sylhet", ar: "سيلهيت" },
      { en: "Rajshahi", ar: "راجشاهي" },
    ],
  },
  {
    en: "India",
    ar: "الهند",
    cities: [
      { en: "New Delhi", ar: "نيودلهي" },
      { en: "Mumbai", ar: "مومباي" },
      { en: "Hyderabad", ar: "حيدر آباد" },
      { en: "Lucknow", ar: "لكناو" },
      { en: "Kolkata", ar: "كولكاتا" },
      { en: "Bangalore", ar: "بنغالور" },
      { en: "Srinagar", ar: "سريناغار" },
    ],
  },
  {
    en: "Iran",
    ar: "إيران",
    cities: [
      { en: "Tehran", ar: "طهران" },
      { en: "Mashhad", ar: "مشهد" },
      { en: "Isfahan", ar: "أصفهان" },
      { en: "Shiraz", ar: "شيراز" },
      { en: "Tabriz", ar: "تبريز" },
    ],
  },
  {
    en: "Maldives",
    ar: "المالديف",
    cities: [
      { en: "Male", ar: "ماليه" },
    ],
  },

  // ── Southeast Asia ────────────────────────────────────────────────
  {
    en: "Indonesia",
    ar: "إندونيسيا",
    cities: [
      { en: "Jakarta", ar: "جاكرتا" },
      { en: "Surabaya", ar: "سورابايا" },
      { en: "Bandung", ar: "باندونغ" },
      { en: "Medan", ar: "ميدان" },
      { en: "Makassar", ar: "ماكاسار" },
      { en: "Yogyakarta", ar: "يوغياكارتا" },
    ],
  },
  {
    en: "Malaysia",
    ar: "ماليزيا",
    cities: [
      { en: "Kuala Lumpur", ar: "كوالالمبور" },
      { en: "Johor Bahru", ar: "جوهور باهرو" },
      { en: "Penang", ar: "بينانغ" },
      { en: "Kota Kinabalu", ar: "كوتا كينابالو" },
    ],
  },
  {
    en: "Brunei",
    ar: "بروناي",
    cities: [
      { en: "Bandar Seri Begawan", ar: "بندر سري بيغاوان" },
    ],
  },
  {
    en: "Philippines",
    ar: "الفلبين",
    cities: [
      { en: "Manila", ar: "مانيلا" },
      { en: "Cotabato", ar: "كوتاباتو" },
      { en: "Zamboanga", ar: "زامبوانغا" },
    ],
  },

  // ── Balkans ───────────────────────────────────────────────────────
  {
    en: "Bosnia and Herzegovina",
    ar: "البوسنة والهرسك",
    cities: [
      { en: "Sarajevo", ar: "سراييفو" },
      { en: "Banja Luka", ar: "بانيا لوكا" },
      { en: "Mostar", ar: "موستار" },
    ],
  },
  {
    en: "Kosovo",
    ar: "كوسوفو",
    cities: [
      { en: "Pristina", ar: "بريشتينا" },
    ],
  },
  {
    en: "Albania",
    ar: "ألبانيا",
    cities: [
      { en: "Tirana", ar: "تيرانا" },
    ],
  },

  // ── Europe ────────────────────────────────────────────────────────
  {
    en: "United Kingdom",
    ar: "المملكة المتحدة",
    cities: [
      { en: "London", ar: "لندن" },
      { en: "Birmingham", ar: "برمنغهام" },
      { en: "Manchester", ar: "مانشستر" },
      { en: "Leeds", ar: "ليدز" },
      { en: "Bradford", ar: "برادفورد" },
      { en: "Glasgow", ar: "غلاسكو" },
      { en: "Leicester", ar: "ليستر" },
    ],
  },
  {
    en: "Germany",
    ar: "ألمانيا",
    cities: [
      { en: "Berlin", ar: "برلين" },
      { en: "Hamburg", ar: "هامبورغ" },
      { en: "Munich", ar: "ميونيخ" },
      { en: "Cologne", ar: "كولونيا" },
      { en: "Frankfurt", ar: "فرانكفورت" },
      { en: "Stuttgart", ar: "شتوتغارت" },
    ],
  },
  {
    en: "France",
    ar: "فرنسا",
    cities: [
      { en: "Paris", ar: "باريس" },
      { en: "Lyon", ar: "ليون" },
      { en: "Marseille", ar: "مرسيليا" },
      { en: "Strasbourg", ar: "ستراسبورغ" },
      { en: "Lille", ar: "ليل" },
    ],
  },
  {
    en: "Belgium",
    ar: "بلجيكا",
    cities: [
      { en: "Brussels", ar: "بروكسل" },
      { en: "Antwerp", ar: "أنتويرب" },
      { en: "Liège", ar: "لييج" },
    ],
  },
  {
    en: "Netherlands",
    ar: "هولندا",
    cities: [
      { en: "Amsterdam", ar: "أمستردام" },
      { en: "Rotterdam", ar: "روتردام" },
      { en: "The Hague", ar: "لاهاي" },
    ],
  },
  {
    en: "Sweden",
    ar: "السويد",
    cities: [
      { en: "Stockholm", ar: "ستوكهولم" },
      { en: "Gothenburg", ar: "يوتيبوري" },
      { en: "Malmö", ar: "مالمو" },
    ],
  },
  {
    en: "Norway",
    ar: "النرويج",
    cities: [
      { en: "Oslo", ar: "أوسلو" },
      { en: "Bergen", ar: "برغن" },
    ],
  },
  {
    en: "Denmark",
    ar: "الدنمارك",
    cities: [
      { en: "Copenhagen", ar: "كوبنهاغن" },
      { en: "Aarhus", ar: "آرهوس" },
    ],
  },
  {
    en: "Spain",
    ar: "إسبانيا",
    cities: [
      { en: "Madrid", ar: "مدريد" },
      { en: "Barcelona", ar: "برشلونة" },
      { en: "Valencia", ar: "فالنسيا" },
      { en: "Seville", ar: "إشبيلية" },
    ],
  },
  {
    en: "Italy",
    ar: "إيطاليا",
    cities: [
      { en: "Rome", ar: "روما" },
      { en: "Milan", ar: "ميلانو" },
      { en: "Turin", ar: "تورينو" },
    ],
  },
  {
    en: "Switzerland",
    ar: "سويسرا",
    cities: [
      { en: "Zurich", ar: "زيورخ" },
      { en: "Geneva", ar: "جنيف" },
      { en: "Basel", ar: "بازل" },
    ],
  },
  {
    en: "Austria",
    ar: "النمسا",
    cities: [
      { en: "Vienna", ar: "فيينا" },
      { en: "Graz", ar: "غراتس" },
    ],
  },

  // ── Americas ──────────────────────────────────────────────────────
  {
    en: "United States",
    ar: "الولايات المتحدة",
    cities: [
      { en: "New York", ar: "نيويورك" },
      { en: "Los Angeles", ar: "لوس أنجلوس" },
      { en: "Chicago", ar: "شيكاغو" },
      { en: "Houston", ar: "هيوستن" },
      { en: "Dearborn", ar: "ديربورن" },
      { en: "Washington", ar: "واشنطن" },
      { en: "Dallas", ar: "دالاس" },
      { en: "San Francisco", ar: "سان فرانسيسكو" },
    ],
  },
  {
    en: "Canada",
    ar: "كندا",
    cities: [
      { en: "Toronto", ar: "تورنتو" },
      { en: "Montreal", ar: "مونتريال" },
      { en: "Vancouver", ar: "فانكوفر" },
      { en: "Ottawa", ar: "أوتاوا" },
      { en: "Calgary", ar: "كالغاري" },
    ],
  },
  {
    en: "Brazil",
    ar: "البرازيل",
    cities: [
      { en: "São Paulo", ar: "ساو باولو" },
      { en: "Foz do Iguacu", ar: "فوز دو إيغاسو" },
    ],
  },
  {
    en: "Argentina",
    ar: "الأرجنتين",
    cities: [
      { en: "Buenos Aires", ar: "بوينس آيرس" },
      { en: "Mendoza", ar: "ميندوزا" },
    ],
  },

  // ── Oceania ───────────────────────────────────────────────────────
  {
    en: "Australia",
    ar: "أستراليا",
    cities: [
      { en: "Sydney", ar: "سيدني" },
      { en: "Melbourne", ar: "ملبورن" },
      { en: "Brisbane", ar: "بريزبان" },
      { en: "Perth", ar: "بيرث" },
    ],
  },
  {
    en: "New Zealand",
    ar: "نيوزيلندا",
    cities: [
      { en: "Auckland", ar: "أوكلاند" },
      { en: "Wellington", ar: "ويلينغتون" },
    ],
  },

  // ── Russia & China ────────────────────────────────────────────────
  {
    en: "Russia",
    ar: "روسيا",
    cities: [
      { en: "Moscow", ar: "موسكو" },
      { en: "Saint Petersburg", ar: "سان بطرسبرغ" },
      { en: "Kazan", ar: "قازان" },
      { en: "Grozny", ar: "غروزني" },
      { en: "Makhachkala", ar: "ماخاتشكالا" },
    ],
  },
  {
    en: "China",
    ar: "الصين",
    cities: [
      { en: "Beijing", ar: "بكين" },
      { en: "Shanghai", ar: "شنغهاي" },
      { en: "Urumqi", ar: "أورومتشي" },
      { en: "Kashgar", ar: "كاشغر" },
    ],
  },

  // ── South Africa ──────────────────────────────────────────────────
  {
    en: "South Africa",
    ar: "جنوب أفريقيا",
    cities: [
      { en: "Cape Town", ar: "كيب تاون" },
      { en: "Johannesburg", ar: "جوهانسبرغ" },
      { en: "Durban", ar: "ديربان" },
    ],
  },
];
