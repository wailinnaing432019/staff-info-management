import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import AppLogoIcon from "@/Components/ApplicationLogo";
import {
    PropsWithChildren,
    ReactNode,
    useState,
    useEffect,
    useRef,
} from "react";
import {
    LogOut,
    UserRoundCog,
    Plus,
    UserRound,
    LayoutDashboardIcon,
} from "lucide-react";
import Message from "@/Pages/Staff/components/Message";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const { sharedAlerts } = usePage().props;
    const alerts = sharedAlerts || [];

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [notiOpen, setNotiOpen] = useState(false);
    const notiRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                notiRef.current &&
                !notiRef.current.contains(event.target as Node)
            ) {
                setNotiOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menus = [
        {
            title: "ပင်မစာမျက်နှာ ",
            icon: <LayoutDashboardIcon />,
            route: "dashboard",
        },
        {
            title: "ဝန်ထမ်းများစာရင်း",
            icon: <UserRound />,
            route: "employees.index",
        },
        {
            title: "ဝန်ထမ်းသစ်ထည့်ရန်",
            icon: <Plus />,
            route: "employees.create",
        },
        // { title: 'ပုံစံ ၂၅ ဝန်းထမ်းများအားလုံး', icon: <FileChartColumn />, route: 'format25page' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 text-slate-800   overflow-hidden select-none">
            <div
                className={`hidden sm:flex flex-col   text-slate-900 transition-all duration-300 shadow-xl border-r border-slate-600/60 ${
                    sidebarOpen ? "w-64" : "w-20"
                }`}
            >
                <div className="h-16 flex items-center px-4 print:hidden  border-b border-slate-600/60 space-x-3 overflow-hidden shrink-0">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="min-w-10 h-10   rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-md shadow-indigo-500/30">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                        </div>
                        {sidebarOpen && (
                            <div className="leading-tight whitespace-nowrap">
                                <h2 className="font-extrabold text-blue-900  tracking-wide text-sm">
                                    UCSMTLA
                                </h2>
                                <p className="text-[10px] text-slate-700">
                                    ကွန်ပျူတာတက္ကသိုလ် (မိတ္ထီလာ)
                                </p>
                            </div>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto print:hidden">
                    {menus.map((menu, idx) => {
                        let isActive = false;

                        if (menu.route === "employees.index") {
                            isActive =
                                route().current("employees.index") ||
                                route().current("employees.edit") ||
                                route().current("employees.show");
                        } else {
                            isActive = route().current(menu.route);
                        }
                        return (
                            <Link
                                key={idx}
                                href={route(menu.route)}
                                className={`flex items-center px-3 py-3 rounded-xl font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-indigo-300 text-slate-900 shadow-lg shadow-indigo-600/20"
                                        : "hover:bg-slate-400 hover:text-white"
                                }`}
                            >
                                <span className="text-lg min-w-6 flex items-center justify-center">
                                    {menu.icon}
                                </span>
                                {sidebarOpen && (
                                    <span className="ml-3 truncate text-xs md:text-sm">
                                        {menu.title}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {sidebarOpen && (
                    <div className="p-4   border-t border-slate-600/60 text-[11px] print:hidden text-slate-700 text-center shrink-0">
                        © {new Date().getFullYear()} UCS Meiktila
                    </div>
                )}
            </div>

            {mobileMenuOpen && (
                <div className="sm:hidden fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    ></div>
                    <div className="relative w-64 max-w-xs bg-slate-900 text-slate-300 flex flex-col p-4 space-y-4 shadow-2xl animate-slideRight">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                            <span className="font-bold text-white">
                                HR Navigation
                            </span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-xl text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <nav className="space-y-1 print:hidden">
                            {menus.map((menu, idx) => {
                                let isActive = false;
                                if (menu.route === "employees.index") {
                                    isActive =
                                        route().current("employees.index") ||
                                        route().current("employees.edit") ||
                                        route().current("employees.show");
                                } else {
                                    isActive = route().current(menu.route);
                                }
                                return (
                                    <Link
                                        key={idx}
                                        href={route(menu.route)}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center px-3 py-3 rounded-xl font-medium text-sm ${
                                            route().current(menu.route)
                                                ? "bg-indigo-600 text-white"
                                                : "hover:bg-slate-800"
                                        }`}
                                    >
                                        <span className="text-lg mr-3">
                                            {menu.icon}
                                        </span>
                                        {menu.title}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 shadow-sm shrink-0 z-10">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="hidden sm:flex p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="sm:hidden p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </button>

                        <div className="hidden md:block text-xs text-slate-400 font-medium">
                            နေ့ -{" "}
                            {new Date().toLocaleDateString("my-MM", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative" ref={notiRef}>
                            <button
                                onClick={() => setNotiOpen(!notiOpen)}
                                className="p-2 rounded-full hover:bg-slate-50 text-slate-500 relative transition-colors focus:outline-none"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>

                                {alerts.length > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                                )}
                            </button>

                            {notiOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50 text-left">
                                    <div className="px-4 py-2 border-b border-slate-50 flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-800">
                                            🔔 စနစ်သတိပေးချက်များ
                                        </span>
                                        {alerts.length > 0 && (
                                            <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                {alerts.length} ခု
                                            </span>
                                        )}
                                    </div>

                                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                                        {alerts.length > 0 ? (
                                            alerts.map(
                                                (alert: any, idx: number) => (
                                                    <div
                                                        key={idx}
                                                        className="p-3.5 hover:bg-slate-50 transition duration-150 block"
                                                    >
                                                        <div className="flex justify-between items-start gap-1">
                                                            <span
                                                                className={`text-[11px] font-bold ${
                                                                    alert.type ===
                                                                    "success"
                                                                        ? "text-green-600"
                                                                        : "text-amber-600"
                                                                }`}
                                                            >
                                                                ● {alert.title}
                                                            </span>
                                                            <span className="text-[10px] text-slate-400 ">
                                                                {alert.time}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                                            {alert.text}
                                                        </p>
                                                    </div>
                                                ),
                                            )
                                        ) : (
                                            <div className="p-6 text-center text-xs text-slate-400">
                                                လတ်တလော သတိပေးချက် မရှိသေးပါဗျာ။
                                            </div>
                                        )}
                                    </div>

                                    <div className="px-3 pt-2 pb-1 border-t border-slate-50">
                                        <Link
                                            href={route("dashboard")}
                                            onClick={() => setNotiOpen(false)}
                                            className="block text-center text-[11px] font-bold text-indigo-600 hover:underline py-1"
                                        >
                                            Dashboard သို့ သွားရန်
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-6 w-px bg-slate-200"></div>

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center space-x-2 sm:space-x-3 rounded-xl border border-transparent bg-white py-1.5 px-2 sm:px-3 text-sm font-medium text-slate-600 transition hover:text-slate-800 hover:bg-slate-50 focus:outline-none"
                                        >
                                            {/* Profile Initial Avatar */}
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs shadow-inner">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <span className="hidden sm:block text-xs font-semibold text-slate-700">
                                                {user.name}
                                            </span>

                                            <svg
                                                className="h-4 w-4 text-slate-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        <span className="flex gap-2">
                                            {" "}
                                            <UserRoundCog /> Profile
                                        </span>
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="text-rose-600 hover:bg-rose-50 w-full"
                                    >
                                        <span className="flex gap-2">
                                            <LogOut /> Logout
                                        </span>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Header (If needed) */}
                {header && (
                    <div className="bg-white border-b border-slate-600/60 px-6 py-4 shadow-sm shrink-0">
                        <div className="text-md md:text-lg font-bold text-slate-800">
                            {header}
                        </div>
                    </div>
                )}

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
                    <div className="p-4 md:p-6 mx-auto max-w-[1600px] animate-fadeIn">
                        <Message />

                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
