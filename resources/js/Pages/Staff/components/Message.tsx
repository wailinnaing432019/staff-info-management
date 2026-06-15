import { usePage } from "@inertiajs/react";
import { Check, FileWarning, MessageCircleWarningIcon, StickyNote } from "lucide-react";
import { useState, useEffect } from "react";

export default function Message() {
    const { flash, errors } = usePage().props;

    const errorMessage = flash?.error || errors?.error;
    const successMessage = flash?.success;

    // 💡 Error နှင့် Success Box များကို ပိတ်ရန် State များ သတ်မှတ်ခြင်း
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // 💡 Backend က ဒေတာအသစ် ထပ်တက်လာတိုင်း Box များ ပြန်ပွင့်လာစေရန် စောင့်ကြည့်ခြင်း (useEffect)
    useEffect(() => {
        if (errorMessage) setShowError(true);
    }, [errorMessage]);

    useEffect(() => {
        if (successMessage) setShowSuccess(true);
    }, [successMessage]);

    return (
        <>
            {/* ⚠️ Backend က Error တက်လာရင် ပြသမည့် Box */}
            {showError && errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-md animate-fadeIn flex justify-between items-start gap-3">
                    <div className="flex items-start gap-3 flex-1">
                        <span className="text-lg mt-0.5"><MessageCircleWarningIcon /></span>
                        <div>
                            <h5 className="font-bold text-sm mb-1">အချက်အလက် ပြင်ဆင်ရန် တောင်းဆိုမှု မအောင်မြင်ပါ။</h5>
                            <p className="text-xs text-red-600/90 leading-relaxed  bg-red-100/50 p-2 rounded mt-1 break-all">
                                {errorMessage}
                            </p>
                        </div>
                    </div>

                    {/* 💡 ညာဘက်ထောင့်ရှိ ပိတ်ရန် ခလုတ် (Close Button) */}
                    <button
                        type="button"
                        onClick={() => setShowError(false)}
                        className="text-red-400 hover:text-red-700  font-bold text-4xl px-1 rounded transition-colors duration-150 leading-none"
                        title="ပိတ်ရန်"
                    >
                        &times;
                    </button>
                </div>
            )}


            {showSuccess && successMessage && (
                <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow-sm flex justify-between items-center animate-fadeIn">
                    <div>
                        <span className="font-bold flex "><Check className="mr-2" /> အောင်မြင်ပါသည်  </span>
                        <span className="text-sm">{successMessage}</span>
                    </div>

                    {/* 💡 ညာဘက်ထောင့်ရှိ ပိတ်ရန် ခလုတ် (Close Button) */}
                    <button
                        type="button"
                        onClick={() => setShowSuccess(false)}
                        className="text-red-400 hover:text-red-700  font-bold text-4xl px-1 rounded transition-colors duration-150 leading-none"
                        title="ပိတ်ရန်"
                    >
                        &times;
                    </button>
                </div>
            )}
        </>
    );
}