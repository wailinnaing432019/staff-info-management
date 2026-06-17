import { useState } from "react";
import { Award, X, Printer } from "lucide-react";

export default function SelectionBoxPrint() {
    const [isOpen, setIsOpen] = useState(false);
    const [staffNumber, setStaffNumber] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("25");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateReport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!staffNumber.trim()) {
            setError("ဝန်ထမ်းအမှတ် ထည့်သွင်းပေးပါ");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `/api/check-staff-number?name=${encodeURIComponent(staffNumber)}`,
            );
            const result = await response.json();

            if (response.ok && result.id) {
                const targetUrl = `/employees/${result.id}/format${selectedFormat}pdf`;
                window.open(targetUrl, "_blank");

                setIsOpen(false);
                setStaffNumber("");
            } else {
                setError(result.message || "ဤဝန်ထမ်းအမှတ်ဖြင့် ဝန်ထမ်းမရှိပါ");
            }
        } catch (err) {
            setError("ဆာဗာနှင့် ချိတ်ဆက်မှု မအောင်မြင်ပါ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 p-4 group-hover:bg-black  group-hover:text-white    border border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-black hover:text-white  text-gray-700 cursor-pointer text-left transition duration-200 group shadow-sm"
            >
                <div className="p-2 bg-white text-gray-500 group-hover:bg-black group-hover:text-white rounded-lg border border-gray-200 shadow-sm transition duration-200">
                    <Award size={18} />
                </div>
                <div>
                    <span className="text-sm font-bold block text-gray-800  group-hover:text-white ">
                        ဝန်ထမ်းအချက်အလက် ထုတ်ယူရန်
                    </span>
                    <span className="text-xs text-gray-400  ">
                        Format 18 / 36 / 25 ပုံစံ Print ထုတ်ခြင်း
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2 text-gray-800 font-bold text-sm">
                                <Printer
                                    size={18}
                                    className="text-indigo-600"
                                />
                                <span>ဝန်ထမ်းအချက်အလက် ထုတ်ယူရန်</span>
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setError("");
                                }}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleGenerateReport}
                            className="p-5 space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                    ဝန်ထမ်းအမှတ် (Staff Number)
                                </label>
                                <input
                                    type="text"
                                    value={staffNumber}
                                    onChange={(e) =>
                                        setStaffNumber(e.target.value)
                                    }
                                    placeholder="ဝန်ထမ်းအမည်"
                                    className="w-full h-9 text-xs border rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 border-gray-300"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                    အစီရင်ခံစာ ပုံစံ (Format)
                                </label>
                                <select
                                    value={selectedFormat}
                                    onChange={(e) =>
                                        setSelectedFormat(e.target.value)
                                    }
                                    className="w-full h-9 text-xs border rounded-lg px-2 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 border-gray-300"
                                >
                                    <option value="25">
                                        Format 25 (A5 Card ပုံစံ)
                                    </option>
                                    <option value="18">Format 18 ပုံစံ</option>
                                    <option value="36">Format 36 ပုံစံ</option>
                                </select>
                            </div>

                            {error && (
                                <p className="text-[11px] text-red-500 bg-red-50 p-2 rounded border border-red-100">
                                    ⚠️ {error}
                                </p>
                            )}

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setError("");
                                    }}
                                    className="px-4 h-9 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                >
                                    ပယ်ဖျက်မည်
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 h-9 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition flex items-center gap-1"
                                >
                                    {loading
                                        ? "စစ်ဆေးနေသည်..."
                                        : "Print ထုတ်မည်"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
