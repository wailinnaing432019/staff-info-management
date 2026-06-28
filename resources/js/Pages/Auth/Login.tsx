import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AppLogoIcon from "@/Components/ApplicationLogo";
import { EyeClosed, EyeIcon } from "lucide-react";

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { flash } = usePage().props as any;
    const { data, setData, post, processing, errors, reset } = useForm<
        Required<LoginForm>
    >({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="ကြိုဆိုပါ၏">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex h-full min-h-screen w-full flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full m-9 flex-col-reverse lg:max-w-5xl lg:flex-row shadow-xl rounded-xl overflow-hidden">
                        <div className="flex-1 w-full bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <div className="flex flex-col items-center gap-4">
                                <Link
                                    href="/"
                                    className="flex flex-col items-center gap-2 font-medium"
                                >
                                    <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-50 p-2 text-indigo-600">
                                        <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                                    </div>
                                    <span className="sr-only">
                                        ကွန်ပျူတာတက္ကသိုလ်
                                    </span>
                                </Link>

                                <div className="space-y-2 text-center">
                                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                                        ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ)
                                    </h1>
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                        အကောင့်သို့၀င်ပါ
                                    </p>
                                </div>
                            </div>

                            {flash?.session_expired && (
                                <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 mt-4 font-semibold text-center text-xs">
                                    ⚠️ {flash.session_expired}
                                </div>
                            )}

                            <form
                                className="flex flex-col gap-6 mt-6"
                                onSubmit={submit}
                            >
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <InputLabel
                                            htmlFor="email"
                                            value="အီးမေးလ်"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            value={data.email}
                                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <InputLabel
                                            htmlFor="password"
                                            value="လျို့၀ှက်နံပါတ်"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                value={data.password}
                                                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                            >
                                                {showPassword ? (
                                                    <EyeIcon />
                                                ) : (
                                                    <EyeClosed />
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Submit Button */}
                                    <PrimaryButton
                                        className="mt-4 w-full h-11 justify-center rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 transition"
                                        tabIndex={4}
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <span className="animate-spin mr-2">
                                                ⏳
                                            </span>
                                        )}
                                        အကောင့်သို့ ဝင်မည်
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        {/* ညာဘက်ခြမ်း: တက္ကသိုလ် Logo ဓာတ်ပုံကြီး */}
                        <div className="relative w-full shrink-0 overflow-hidden bg-[#9f1313] lg:w-[480px] dark:bg-[#1D0002] flex items-center justify-center">
                            <img
                                src={`/storage/logos/ucsmtla.jpg`}
                                className="w-full h-full object-cover min-h-[300px] lg:min-h-full"
                                alt="UCSM"
                                onError={(e) => {
                                    // ပုံမထွက်လာပါက နောက်ခံအရောင်ပဲပြရန် Fallback
                                    (e.target as HTMLElement).style.display =
                                        "none";
                                }}
                            />
                        </div>
                    </main>
                </div>
            </div>
 
            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <footer className="bg-gray-50 border-t border-gray-200 py-4 mt-4">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <p className="font-bold text-gray-800 text-base">
                            Staff Info Management System
                        </p>
                        <p className="text-gray-400 italic">
                            University Of Computer Studies (Meiktila)
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end space-y-2">
                        <div className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                            Supervised by:{" "}
                            <span className="text-gray-700 capitalize">
                                Dr. Daw Thuzar Htet
                            </span>
                        </div>

                        <div className="h-px w-full bg-gray-200 hidden md:block"></div>

                        <div className="text-right">
                            <p className="text-xs mb-1">
                                &copy; 2026 All Rights Reserved
                            </p>
                            <p className="text-xs">
                                Developed by{" "}
                                <a
                                    href="mailto:wailinnaing432019@gmail.com"
                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                >
                                    Wai Linn Naing
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
