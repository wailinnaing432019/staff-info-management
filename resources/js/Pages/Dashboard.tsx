import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Users,
    Building2,
    UserPlus,
    FileSpreadsheet,
    ChevronRight,
    Calendar,
    Zap,
    AlertOctagon,
    AlertTriangle,
    HomeIcon,
} from "lucide-react";
import SelectionBoxPrint from "./SelectionBoxPrint";
import toMyanmarNumber from "@/util/numberHelper";

export default function Dashboard({ stats }) {
    const dashboardData = stats || {};

    const currentMyanmarDate = () => {
        const months = [
            "ဇန်နဝါရီလ",
            "ဖေဖော်ဝါရီလ",
            "မတ်လ",
            "ဧပြီလ",
            "မေလ",
            "ဇွန်လ",
            "ဇူလိုင်လ",
            "သြဂုတ်လ",
            "စက်တင်ဘာလ",
            "အောက်တိုဘာလ",
            "နိုဝင်ဘာလ",
            "ဒီဇင်ဘာလ",
        ];
        const d = new Date();
        const monthName = months[d.getMonth()];
        const year = d.getFullYear();
        return `${monthName}၊ ${year}`;
    };
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="py-6 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900  ">
                                မင်္ဂလာပါ ကြိုဆိုပါ၏။
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ) ဝန်ထမ်းရေးရာ
                                အချက်အလက်များကို ဤနေရာတွင် စီမံနိုင်ပါသည်။
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold border border-indigo-100">
                            <Calendar size={16} />
                            <span>{currentMyanmarDate()}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500 font-medium">
                                    စုစုပေါင်း ဝန်ထမ်း
                                </span>
                                <h4 className="text-2xl font-bold text-gray-900 ">
                                    {toMyanmarNumber(
                                        dashboardData.totalEmployees,
                                    )}{" "}
                                    <span className="text-sm font-bold text-gray-500">
                                        ဦး
                                    </span>
                                </h4>
                                <p className="text-xs text-gray-400 font-medium">
                                    ကျား:{" "}
                                    {toMyanmarNumber(dashboardData.maleCount)} |
                                    မ:{" "}
                                    {toMyanmarNumber(dashboardData.femaleCount)}
                                </p>
                            </div>
                            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                                <Users size={24} />
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500 font-medium">
                                    သင်ကြားရေးဌာနများ
                                </span>
                                <h4 className="text-2xl font-bold text-gray-900 ">
                                    {toMyanmarNumber(
                                        dashboardData.totalDepartments,
                                    )}{" "}
                                    <span className="text-sm font-bold text-gray-500">
                                        ဌာန
                                    </span>
                                </h4>
                            </div>
                            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                                <Building2 size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-sm font-bold text-gray-800 mb-4 flex">
                            <Zap className="mr-2" /> လုပ်ဆောင်ချက် များ (Quick
                            Actions)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Link
                                href="/employees/create"
                                className="flex items-center gap-3 p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-black hover:text-white transition duration-200 group text-left"
                            >
                                <div className="p-2 bg-white text-black rounded-lg group-hover:bg-gray-800">
                                    <UserPlus
                                        size={18}
                                        className="  group-hover:text-white"
                                    />
                                </div>
                                <div>
                                    <span className="text-sm font-bold block">
                                        ဝန်ထမ်းအသစ်ထည့်ရန်
                                    </span>
                                    <span className="text-xs text-gray-400 group-hover:text-gray-300">
                                        Mega Form ဖြင့် အသစ်ဖြည့်သွင်းမည်
                                    </span>
                                </div>
                            </Link>

                            <Link
                                href="/employees"
                                className="flex items-center gap-3 p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-black hover:text-white transition duration-200 group text-left"
                            >
                                <div className="p-2 bg-white text-black    rounded-lg group-hover:bg-gray-800">
                                    <FileSpreadsheet
                                        size={18}
                                        className="  group-hover:text-white"
                                    />
                                </div>
                                <div>
                                    <span className="text-sm font-bold block ">
                                        ဝန်ထမ်းစာရင်းများ စီမံရန်
                                    </span>
                                    <span className="text-xs text-gray-400 group-hover:text-gray-300">
                                        အချက်အလက် ရှာဖွေ/ပြင်ဆင်/ဖျက်ရန်
                                    </span>
                                </div>
                            </Link>

                            <SelectionBoxPrint />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-bold text-gray-800 flex">
                                    <HomeIcon className="mx-2" /> ဌာနအလိုက်
                                    ဝန်ထမ်းအင်အားပြဇယား
                                </h4>
                                <Link
                                    href="/employees"
                                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center"
                                >
                                    အားလုံးကြည့်ရန် <ChevronRight size={14} />
                                </Link>
                            </div>

                            <div className="space-y-4 pt-2">
                                {dashboardData.departmentWise.map(
                                    (dept, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between text-xs font-semibold text-gray-700">
                                                <span>{dept.name}</span>
                                                <span className="">
                                                    {toMyanmarNumber(
                                                        dept.count,
                                                    )}{" "}
                                                    ဦး (
                                                    {toMyanmarNumber(
                                                        dept.percentage,
                                                    )}
                                                    )
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-black h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        width: dept.percentage,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <h4 className="text-sm font-bold text-gray-800 flex">
                                <AlertTriangle className="mx-2" /> လတ်တလော
                                စနစ်သတိပေးချက်များ
                            </h4>

                            <div className="space-y-3">
                                {dashboardData.alerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className={`p-3.5 rounded-xl border text-xs leading-relaxed font-medium ${
                                            alert.type === "success"
                                                ? "bg-green-50 border-green-100 text-green-800"
                                                : "bg-amber-50 border-amber-100 text-amber-800"
                                        }`}
                                    >
                                        {alert.text}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
                                <p className="text-xs font-bold text-gray-700">
                                    စနစ်ထိန်းသိမ်းမှုနောက်ဆုံးရက်
                                </p>
                                <span className="text-[11px] text-gray-400  block mt-1">
                                    Last sync: Just now
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
