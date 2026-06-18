# 🏛️ UCSMTLA Staff Information Management System

ကျောင်းတွင်းရှိ သင်ကြားရေးဌာနများတွင် တာဝန်ထမ်းဆောင်နေသော ဝန်ထမ်းများ၏ ကိုယ်ရေးအကျဉ်းချုပ်နှင့် အချက်အလက်များကို စနစ်တကျ သိမ်းဆည်းရန်၊ ပြင်ဆင်ရန်နှင့် PDF/Print ထုတ်ယူနိုင်ရန်အတွက် တည်ဆောက်ထားသော **Staff Information Management System** ဖြစ်ပါသည်။

---

## 🚀 Tech Stack (အသုံးပြုထားသော နည်းပညာများ)

- **Backend Framework:** Laravel (v11.x)
- **Frontend Library:** React.js (with Vite)
- **Monolith Bridge:** Inertia.js (React + Laravel Dynamic Integration)
- **Authentication:** Laravel Breeze
- **Styling:** Tailwind CSS

---

## 🛠️ System Features (စနစ်၏ လုပ်ဆောင်ချက်များ)

- **Dynamic Form Wizard:** ဝန်ထမ်းအချက်အလက်များကို Tab များအလိုက် (ကိုယ်ရေးအချက်အလက်၊ ဝန်ထမ်းရေးရာ၊ ပညာရေးနှင့် သင်တန်း စသဖြင့်) အဆင့်ဆင့် စနစ်တကျ ဖြည့်သွင်းနိုင်ခြင်း။
- **Real-time Validation:** Form ဖြည့်စွက်ရာတွင် မှားယွင်းမှုများရှိပါက အနီရောင်စာတန်းများဖြင့် ချက်ချင်းပြသပေးပြီး၊ စာပြန်ရိုက်သည်နှင့် Auto ရှင်းလင်းပေးခြင်း။
- **Auto-resizing Inputs:** Textarea များတွင် Edit value များ ဝင်လာသည်နှင့် စာသားအရှည်အလိုက် အမြင့် (Height) ကို အလိုအလျောက် ညှိပေးခြင်း။
- **Advanced Print/PDF Layout:** A3 Landscape စနစ်ဖြင့် ဝန်ထမ်းကိုယ်ရေးအကျဉ်းချုပ် ဇယားကြီးတစ်ခုလုံးကို 30% Scale အလိုအလျောက်ချုံ့၍ ကွက်တိ Print ထုတ်ယူနိုင်ခြင်း။
- **Dynamic Myanmar Helper:** စာရွက်စာတမ်းများ Print ထုတ်ယူသည့် အချိန်ရှိ လက်ရှိ လနှင့် နှစ်ကို မြန်မာဘာသာဖြင့် (ဥပမာ - ဇွန်လ-၂၀၂၆) အလိုအလျောက် တွက်ချက်ပြသပေးခြင်း။

---

## 💻 Installation Guide for Another PC (တခြားစက်တွင် ထည့်သွင်းအသုံးပြုနည်း)

ဒီ Project ကို မိမိစက်ထဲသို့ GitHub မှတစ်ဆင့် ဆွဲယူပြီး စတင်အသုံးပြုရန် အောက်ပါအဆင့်များကို လုပ်ဆောင်ပါ။

### ၁။ Project ကို Clone ပြုလုပ်ခြင်း

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
(မှတ်ချက် - your-username/your-repo-name နေရာတွင် မိမိ၏ GitHub Link ကို ပြောင်းလဲအသုံးပြုနိုင်ပါသည်)

Bash
cd ucsmtla-staff-system
၂။ Dependencies များ ထည့်သွင်းခြင်း
Bash
# Composer (Backend) dependencies သွင်းရန်
composer install

# NPM (Frontend) dependencies သွင်းရန်
npm install
၃။ Environment ဖိုင် ပြင်ဆင်ခြင်း
.env.example ဖိုင်ကို မိတ္တူကူးပြီး .env ဖိုင်အဖြစ် ပြောင်းလဲဆောက်လုပ်ပါ။

Bash
# Windows (Command Prompt) အတွက်
copy .env.example .env

# Git Bash / macOS / Linux အတွက်
cp .env.example .env
၄။ Application Key ထုတ်ယူခြင်း
Bash
php artisan key:generate
၅။ Database ချိတ်ဆက်ခြင်း
XAMPP သို့မဟုတ် MySQL တွင် Database အသစ်တစ်ခု ဆောက်လုပ်ပါ။ ပြီးနောက် .env ဖိုင်ကို ဖွင့်လှစ်၍ မိမိ Database configuration အတိုင်း ပြင်ဆင်ပါ။

Code snippet
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ucsmtla_staff_db
DB_USERNAME=root
DB_PASSWORD=
၆။ Database Migration (Tables များဆောက်ခြင်း)
Bash
php artisan migrate

# သို့မဟုတ် Seed data များပါတစ်ခါတည်းထည့်လိုပါက
php artisan migrate --seed
၇။ Storage Link ချိတ်ဆက်ခြင်း (ဓာတ်ပုံများအတွက်)
ဝန်ထမ်းဓာတ်ပုံများနှင့် Files များ စနစ်တကျ ပေါ်စေရန်အတွက် Link ချိတ်ပေးရန် လိုအပ်ပါသည်။

Bash
php artisan storage:link
🚀 Running the Application (စနစ်ကို စတင်ပတ်ရန်)
စနစ်အား Run ရန်အတွက် Terminal (၂) ခုခွဲ၍ အောက်ပါ command များကို ပတ်ပေးရပါမည်။

Terminal 1: Laravel Local Server
Bash
php artisan serve
Terminal 2: Vite/React Compilation
Bash
npm run dev
ထို့နောက် Browser တွင် http://127.0.0.1:8000 သို့ သွားရောက်၍ စနစ်အား စတင်အသုံးပြုနိုင်ပြီ ဖြစ်ပါသည်။

📝 License
This project is developed for Computer University (Meiktila). All rights reserved.


---
```
