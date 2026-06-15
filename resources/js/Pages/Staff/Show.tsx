import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Format18 from './components/Format18';
import Format36 from './components/Format36';
import Format25 from './components/Format25';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ employeeData }) {
    const [activeTab, setActiveTab] = useState('f18');

    // ဝန်ထမ်းဒေတာတွေကို ပုံစံ ၁၈၊ ၃၆၊ ၂၅ ထဲက Key နာမည်တွေနဲ့ ကွက်တိကိုက်ညီအောင် လှမ်းညှိပေးခြင်း
    const mappedData = {
        ...employeeData,
        educations: employeeData.educations || [],
        trainings: employeeData.trainings || [],
        // 💡 DB Relation Name က family_members ဖြစ်သော်လည်း Frontend က families လို့ သုံးချင်ရင် ဤသို့ပေးထားနိုင်သည်
        families: employeeData.family_members || [],
        legal_records: employeeData.court_disciplinary_actions || [],
        criminal_records: employeeData.criminal_records || [],
        awards_received: employeeData.awards_received || [],
        court_disciplinary_actions: employeeData.court_disciplinary_actions || [],
    };

    return (
        <AuthenticatedLayout

        >

            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <Head title={`${employeeData.name} - ကိုယ်ရေးမှတ်တမ်း Preview`} />

                <div className="max-w-4xl mx-auto mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                        {employeeData.name} ၏ ဝန်ထမ်းရေးရာ ပုံစံများ Preview
                    </h2>

                    {/* 🔘 Navigation Tabs ခလုတ်များ */}
                    <div className="flex bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm gap-2">
                        <button
                            onClick={() => setActiveTab('f18')}
                            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'f18' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            📋 ပုံစံ (၁၈) ပြသရန်
                        </button>
                        <button
                            onClick={() => setActiveTab('f36')}
                            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'f36' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            📋 ပုံစံ (၃၆) ပြသရန်
                        </button>
                        <button
                            onClick={() => setActiveTab('f25')}
                            className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'f25' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            📋 ပုံစံ (၂၅) ပြသရန်
                        </button>
                    </div>
                </div>

                {/* Render View တိုက်ရိုက်ခေါ်ပြခြင်း */}
                <div className="animate-fadeIn">
                    {activeTab === 'f18' && <Format18 data={mappedData} />}
                    {activeTab === 'f36' && <Format36 data={mappedData} />}
                    {activeTab === 'f25' && <Format25 data={mappedData} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}