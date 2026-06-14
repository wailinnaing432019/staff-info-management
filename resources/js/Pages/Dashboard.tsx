import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, Building2, Award, AlertTriangle, UserPlus, FileSpreadsheet, ChevronRight, Calendar, LayoutDashboardIcon, Flashlight, LineSquiggle, Zap } from 'lucide-react';

export default function Dashboard({ stats }) {
    // 💡 Controller မှ ဒေတာမပါလာသေးပါက စမ်းသပ်ကြည့်ရှုနိုင်ရန် Sample Data များ သတ်မှတ်ထားခြင်း
    const dashboardData = stats || {
        totalEmployees: 38,
        maleCount: 12,
        femaleCount: 26,
        totalDepartments: 5,
        recentAwards: 2,
        activePenalties: 1,
        departmentWise: [
            { name: 'ကွန်ပျူတာသိပ္ပံဌာန', count: 12, percentage: '31%' },
            { name: 'ကွန်ပျူတာနည်းပညာဌာန', count: 10, percentage: '26%' },
            { name: 'သတင်းအချက်အလက်နည်းပညာဌာန', count: 8, percentage: '21%' },
            { name: 'မြန်မာစာ/အင်္ဂလိပ်စာဌာန', count: 5, percentage: '13%' },
            { name: 'စီမံခန့်ခွဲရေးဌာန', count: 3, percentage: '9%' },
        ],
        alerts: [
            { id: 1, type: 'success', text: 'ဆရာမ ဒေါ်လှလှအား သရုပ်ပြရာထူးမှ လက်ထောက်ကထိကအဖြစ် ရာထူးတိုးမြှင့်ခဲ့ပါသည်။' },
            { id: 2, type: 'warning', text: 'ဝန်ထမ်း (၂) ဦး၏ လုပ်ငန်းသဘောတူစာချုပ် သက်တမ်းကုန်ဆုံးရန် ၁ လအလို ကျန်ရှိပါသည်။' }
        ]
    };
    const currentMyanmarDate = () => {
        const months = [
            'ဇန်နဝါရီလ', 'ဖေဖော်ဝါရီလ', 'မတ်လ', 'ဧပြီလ', 'မေလ', 'ဇွန်လ',
            'ဇူလိုင်လ', 'သြဂုတ်လ', 'စက်တင်ဘာလ', 'အောက်တိုဘာလ', 'နိုဝင်ဘာလ', 'ဒီဇင်ဘာလ'
        ];
        const d = new Date();
        const monthName = months[d.getMonth()];
        const year = d.getFullYear();

        return `${monthName}၊ ${year}`;
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">


                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">မင်္ဂလာပါ  ကြိုဆိုပါ၏။</h3>
                            <p className="text-sm text-gray-500 mt-0.5">ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ) ဝန်ထမ်းရေးရာ အချက်အလက်များကို ဤနေရာတွင် စီမံနိုင်ပါသည်။</p>
                        </div>
                        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold border border-indigo-100">
                            <Calendar size={16} />
                            <span>{currentMyanmarDate()}</span>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">


                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500 font-medium">စုစုပေါင်း ဝန်ထမ်း</span>
                                <h4 className="text-2xl font-bold text-gray-900 font-mono">{dashboardData.totalEmployees} <span className="text-sm font-bold text-gray-500">ဦး</span></h4>
                                <p className="text-xs text-gray-400 font-medium">ကျား: {dashboardData.maleCount} | မ: {dashboardData.femaleCount}</p>
                            </div>
                            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                                <Users size={24} />
                            </div>
                        </div>


                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500 font-medium">သင်ကြားရေးဌာနများ</span>
                                <h4 className="text-2xl font-bold text-gray-900 font-mono">{dashboardData.totalDepartments} <span className="text-sm font-bold text-gray-500">ဌာန</span></h4>
                                <p className="text-xs text-green-600 font-semibold">● အားလုံး အလုပ်လုပ်ဆဲ</p>
                            </div>
                            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                <Building2 size={24} />
                            </div>
                        </div>


                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500 font-medium">ဆုတံဆိပ် ချီးမြှင့်ခံရမှု</span>
                                <h4 className="text-2xl font-bold text-gray-900 font-mono">{dashboardData.recentAwards} <span className="text-sm font-bold text-gray-500">ကြိမ်</span></h4>
                                <p className="text-xs text-indigo-600 font-medium">ယခုနှစ်အတွင်း မှတ်တမ်း</p>
                            </div>
                            <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl">
                                <Award size={24} />
                            </div>
                        </div>


                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500 font-medium">ပြစ်ဒဏ် / အရေးယူမှု</span>
                                <h4 className="text-2xl font-bold text-gray-900 font-mono">{dashboardData.activePenalties} <span className="text-sm font-bold text-gray-500">ခု</span></h4>
                                <p className="text-xs text-red-500 font-medium">စိစစ်ရန် မှတ်တမ်းကျန်</p>
                            </div>
                            <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
                                <AlertTriangle size={24} />
                            </div>
                        </div>
                    </div>


                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-sm font-bold text-gray-800 mb-4 flex"><Zap className='mr-2' /> လုပ်ဆောင်ချက် ဖြတ်လမ်းများ (Quick Actions)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Link
                                href="/employees/create"
                                className="flex items-center gap-3 p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-black hover:text-white transition duration-200 group text-left"
                            >
                                <div className="p-2 bg-white text-black rounded-lg group-hover:bg-gray-800">
                                    <UserPlus size={18} className='  group-hover:text-white' />
                                </div>
                                <div>
                                    <span className="text-sm font-bold block">ဝန်ထမ်းအသစ်ထည့်ရန်</span>
                                    <span className="text-xs text-gray-400 group-hover:text-gray-300">Mega Form ဖြင့် အသစ်ဖြည့်သွင်းမည်</span>
                                </div>
                            </Link>

                            <Link
                                href="/employees"
                                className="flex items-center gap-3 p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-black hover:text-white transition duration-200 group text-left"
                            >
                                <div className="p-2 bg-white text-black    rounded-lg group-hover:bg-gray-800">
                                    <FileSpreadsheet size={18} className='  group-hover:text-white' />
                                </div>
                                <div>
                                    <span className="text-sm font-bold block ">ဝန်ထမ်းစာရင်းများ စီမံရန်</span>
                                    <span className="text-xs text-gray-400 group-hover:text-gray-300">အချက်အလက် ရှာဖွေ/ပြင်ဆင်/ဖျက်ရန်</span>
                                </div>
                            </Link>

                            <div
                                className="flex items-center gap-3 p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed text-left"
                            >
                                <div className="p-2 bg-white text-gray-300 rounded-lg">
                                    <Award size={18} className='  group-hover:text-white' />
                                </div>
                                <div>
                                    <span className="text-sm font-bold block">အစီရင်ခံစာ ထုတ်ယူရန်</span>
                                    <span className="text-xs text-gray-300">Format 25 / A5 Card ပုံစံ Print ထုတ်ခြင်း</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-bold text-gray-800">🏛️ ဌာနအလိုက် ဝန်ထမ်းအင်အားပြဇယား</h4>
                                <Link href="/employees" className="text-xs font-bold text-indigo-600 hover:underline flex items-center">
                                    အားလုံးကြည့်ရန် <ChevronRight size={14} />
                                </Link>
                            </div>

                            <div className="space-y-4 pt-2">
                                {dashboardData.departmentWise.map((dept, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex justify-between text-xs font-semibold text-gray-700">
                                            <span>{dept.name}</span>
                                            <span className="font-mono">{dept.count} ဦး ({dept.percentage})</span>
                                        </div>
                                        {/* Custom Progress Bar */}
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-black h-full rounded-full transition-all duration-500"
                                                style={{ width: dept.percentage }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <h4 className="text-sm font-bold text-gray-800">🔔 လတ်တလော စနစ်သတိပေးချက်များ</h4>

                            <div className="space-y-3">
                                {dashboardData.alerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className={`p-3.5 rounded-xl border text-xs leading-relaxed font-medium ${alert.type === 'success'
                                            ? 'bg-green-50 border-green-100 text-green-800'
                                            : 'bg-amber-50 border-amber-100 text-amber-800'
                                            }`}
                                    >
                                        {alert.text}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
                                <p className="text-xs font-bold text-gray-700">စနစ်ထိန်းသိမ်းမှုနောက်ဆုံးရက်</p>
                                <span className="text-[11px] text-gray-400 font-mono block mt-1">Last sync: Just now</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}