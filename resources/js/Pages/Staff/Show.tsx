import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Format18 from "./components/Format18";
import Format36 from "./components/Format36";
import Format25 from "./components/Format25";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Format55 from "./components/Format55";

export default function Show({ employeeData }) {
    const [activeTab, setActiveTab] = useState("f18");

    const mappedData = {
        ...employeeData,
        educations: employeeData.educations || [],
        trainings: employeeData.trainings || [],

        families: employeeData.family_members || [],
        legal_records: employeeData.court_disciplinary_actions || [],
        criminal_records: employeeData.criminal_records || [],
        awards_received: employeeData.awards_received || [],
        court_disciplinary_actions:
            employeeData.court_disciplinary_actions || [],
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <Head title={`${employeeData.name} - ကိုယ်ရေးမှတ်တမ်း `} />

                <div className="max-w-4xl mx-auto mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                        {employeeData.name} ၏ ဝန်ထမ်းရေးရာ ပုံစံများ
                    </h2>

                    <div className="flex bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm gap-2">
                        <button
                            onClick={() => setActiveTab("f18")}
                            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${
                                activeTab === "f18"
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            📋 ပုံစံ (၁၈) ပြသရန်
                        </button>
                        <button
                            onClick={() => setActiveTab("f36")}
                            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${
                                activeTab === "f36"
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            📋 ပုံစံ (၃၆) ပြသရန်
                        </button>
                        <button
                            onClick={() => setActiveTab("f25")}
                            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${
                                activeTab === "f25"
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            📋 ပုံစံ (၂၅) ပြသရန်
                        </button>
                        {employeeData.is_rector_or_above === 1 && (
                            <button
                                onClick={() => setActiveTab("f55")}
                                className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${
                                    activeTab === "f55"
                                        ? "bg-indigo-600 text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                📋 ပုံစံ (၅၅) ပြသရန်
                            </button>
                        )}
                    </div>
                </div>

                <div className="animate-fadeIn">
                    {activeTab === "f18" && <Format18 data={mappedData} />}
                    {activeTab === "f36" && <Format36 data={mappedData} />}
                    {activeTab === "f25" && <Format25 data={mappedData} />}
                    {activeTab === "f55" && <Format55 data={mappedData} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
