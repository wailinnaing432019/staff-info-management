import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import FamilyTab from './FamilyTab';
export default function EmployeeForm() {
    const [activeTab, setActiveTab] = useState('personal');

    // Format ၃ ခုလုံးမှ Column များ အားလုံး မကျန်စေရန် State တည်ဆောက်ခြင်း
    const { data, setData, post, processing, errors } = useForm({
        // ကဏ္ဍ (၁) ကိုယ်ရေးအချက်အလက် (Personal Data)
        staff_number: '', name: '', nickname: '', alternative_name: '', gender: '',
        date_of_birth: '', age: '', date_of_birth_detail: '', birth_place: '',
        race: '', religion: '', nrc: '', blood_type: '', marital_status: '',
        height: '', weight: '', hair_color: '', eye_color: '', distinctive_mark: '',
        father_name: '', father_job: '', mother_name: '', spouse_name: '', childrens: '',

        // ကဏ္ဍ (၂) ဝန်ထမ်းရေးရာနှင့် လက်ရှိအခြေအနေ (Employment Data)
        position: '', department: '', salary_scale: '', salary_rate: '',
        employee_start_date_detail: '', current_pos_start_date_detail: '', current_dept_start_date_detail: '',
        assignment_type: '', is_accompanied: false, separation_date: '',
        current_address: '', permanent_address: '', contract_agreement_detail: '', remark: '',

        // ကဏ္ဍ (၃) One-to-Many Dynamic Arrays (Format အားလုံးမှ ဇယားများ)
        educations: [{ title: '', major_subject: '', graduation_year: '', degree_level: '', category: 'degree' }],
        trainings: [{ title: '', learn_from: '', learn_to: '', location: '', rank: '', category: 'local_training' }],
        service_records: [{ service_position: '', service_department: '', service_from: '', service_to: '', service_location: '' }],
        families: [],
        foreign_visits: [{ destination_country: '', training_course: '', assigned_country: '', time_period: '', arrival_date: '', supporting_agency: '', return_department: '', foreign_visit_details: '' }],
        hasVisitedAbroad: [{ abroad_from: '', abroad_to: '', visit_purpose: '', country_visited: '', foreign_currency_amount: '' }],
        legal_records: [{ record_type: 'disciplinary', period: '', reason: '', penalty: '', remark: '' }],
        criminal_records: [{ criminalPenalty: '', reasonPelanty: '', criminalFrom: '', criminalTo: '' }],
        awards: [{ award_title: '', award_period: '', award_year: '', award_remark: '' }]
    });

    // Dynamic Row များ ထပ်တိုးရန်/ဖျက်ရန် Helper Functions
    const addRow = (field, schema) => setData(field, [...data[field], schema]);
    const removeRow = (field, index) => setData(field, data[field].filter((_, i) => i !== index));
    const handleDynamicChange = (field, index, key, value) => {
        const updated = [...data[field]];
        updated[index][key] = value;
        setData(field, updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employees.store'));
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">နိုင်ငံ့ဝန်ထမ်း ကိုယ်ရေးမှတ်တမ်း ဖြည့်သွင်းလွှာ (ပေါင်းစပ်ဖော်မတ်)</h2>

            {/* စာမျက်နှာ Tab များ သတ်မှတ်ခြင်း */}
            <div className="flex flex-wrap border-b mb-6 bg-gray-50 p-2 rounded">
                {[
                    { id: 'personal', label: '၁။ ကိုယ်ရေးအချက်အလက်' },
                    { id: 'employment', label: '၂။ ဝန်ထမ်းရေးရာ' },
                    { id: 'education', label: '၃။ ပညာရေးနှင့် သင်တန်း' },
                    { id: 'service', label: '၄။ တာဝန်ထမ်းဆောင်မှုမှတ်တမ်း' },
                    { id: 'family', label: '၅။ မိသားစုနှင့် ဆွေမျိုးများ' },
                    { id: 'foreign', label: '၆။ နိုင်ငံခြားခရီးစဉ်မှတ်တမ်း' },
                    { id: 'legal_awards', label: '၇။ ပြစ်ဒဏ်နှင့် ဆုလာဘ်' },
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} type="button"
                        className={`py-2 px-4 font-semibold text-sm transition-all rounded mr-2 mb-1 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* TAB 1: ကိုယ်ရေးအချက်အလက် */}
                {activeTab === 'personal' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label className="block text-sm font-medium text-gray-700">ဝန်ထမ်းအမှတ် / Staff Number</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.staff_number} onChange={e => setData('staff_number', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">အမည်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">ငယ်အမည် / အမည်ပွား</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.nickname} onChange={e => setData('nickname', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">အခြားအမည်များ (ရှိလျှင်)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.alternative_name} onChange={e => setData('alternative_name', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">ကျား / မ</label>
                            <select className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.gender} onChange={e => setData('gender', e.target.value)}><option value="">ရွေးချယ်ရန်</option><option value="ကျား">ကျား</option><option value="မ">မ</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-700">မွေးနေ့ (ရက်၊ လ၊ နှစ်)</label>
                            <input type="date" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">အသက်</label>
                            <input type="number" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.age} onChange={e => setData('age', e.target.value)} /></div>
                        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">မွေးနေ့သက္ကရာဇ် အသေးစိတ်မှတ်ချက်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.date_of_birth_detail} onChange={e => setData('date_of_birth_detail', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">နိုင်ငံသားစိစစ်ရေးအမှတ် (NRC)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.nrc} onChange={e => setData('nrc', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">လူမျိုး</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.race} onChange={e => setData('race', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">ကိုးကွယ်သည့်ဘာသာ</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.religion} onChange={e => setData('religion', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">သွေးအုပ်စု</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.blood_type} onChange={e => setData('blood_type', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">အိမ်ထောင်ရေးအခြေအနေ</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.marital_status} onChange={e => setData('marital_status', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">ဇနီး / ခင်ပွန်း အမည်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.spouse_name} onChange={e => setData('spouse_name', e.target.value)} /></div>
                        <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">သားသမီးများအမည် (ကော်မာခံ၍ ရေးရန် သို့မဟုတ် အကျဉ်းချုပ်)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.childrens} onChange={e => setData('childrens', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">အရပ် (ပေ/လက်မ)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.height} onChange={e => setData('height', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">ကိုယ်အလေးချိန် (ပေါင်)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.weight} onChange={e => setData('weight', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">ဆံပင်အရောင်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.hair_color} onChange={e => setData('hair_color', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">မျက်စိအရောင်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.eye_color} onChange={e => setData('eye_color', e.target.value)} /></div>
                        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">မွေးရာဇာတိ / မွေးဖွားရာဒေသအသေးစိတ်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.birth_place} onChange={e => setData('birth_place', e.target.value)} /></div>
                        <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">ထင်ရှားသည့်အမှတ်အသား</label>
                            <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows="2" value={data.distinctive_mark} onChange={e => setData('distinctive_mark', e.target.value)}></textarea></div>

                        {/* မိဘအချက်အလက် */}
                        <div className="md:col-span-3 border-t pt-4 mt-2 font-bold text-gray-700 text-base">မိဘအချက်အလက်များ</div>
                        <div><label className="block text-sm font-medium text-gray-700">အဘအမည်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.father_name} onChange={e => setData('father_name', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">အဘ၏အလုပ်အကိုင်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.father_job} onChange={e => setData('father_job', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">အမိအမည်</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.mother_name} onChange={e => setData('mother_name', e.target.value)} /></div>
                    </div>
                )}

                {/* TAB 2: ဝန်ထမ်းရေးရာအချက်အလက် */}
                {activeTab === 'employment' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label className="block text-sm font-medium text-gray-700">လက်ရှိရာထူး</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.position} onChange={e => setData('position', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">လက်ရှိဌာန</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.department} onChange={e => setData('department', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">လစာနှုန်း (Salary Scale)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.salary_scale} onChange={e => setData('salary_scale', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">လက်ရှိရလစာနှုန်း (Salary Rate)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.salary_rate} onChange={e => setData('salary_rate', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">အလုပ်စတင်ဝင်ရောက်သည့်ရက်စွဲ (အသေးစိတ်)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.employee_start_date_detail} onChange={e => setData('employee_start_date_detail', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">လက်ရှိရာထူးရသည့်ရက်စွဲ (အသေးစိတ်)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.current_pos_start_date_detail} onChange={e => setData('current_pos_start_date_detail', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">လက်ရှိဌာနသို့ရောက်သည့်ရက်စွဲ (အသေးစိတ်)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.current_dept_start_date_detail} onChange={e => setData('current_dept_start_date_detail', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">ခန့်အပ်မှုအမျိုးအစား (Assignment Type)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.assignment_type} onChange={e => setData('assignment_type', e.target.value)} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">နှုတ်ထွက်/အငြိမ်းစားယူသည့်ရက်စွဲ (Separation Date)</label>
                            <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.separation_date} onChange={e => setData('separation_date', e.target.value)} /></div>

                        <div className="flex items-center pt-6">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 h-4 w-4" checked={data.is_accompanied} onChange={e => setData('is_accompanied', e.target.checked)} />
                            <label className="ml-2 text-sm font-medium text-gray-700">မိသားစုလိုက်ပါနေထိုင်ခြင်း ရှိ/မရှိ</label>
                        </div>

                        <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">လက်ရှိနေရပ်လိပ်စာ အပြည့်အစုံ</label>
                            <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows="2" value={data.current_address} onChange={e => setData('current_address', e.target.value)}></textarea></div>
                        <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">အမြဲတမ်းနေရပ်လိပ်စာ အပြည့်အစုံ</label>
                            <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows="2" value={data.permanent_address} onChange={e => setData('permanent_address', e.target.value)}></textarea></div>
                        <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">ချုပ်ဆိုထားသည့်စာချုပ်သဘောတူညီချက်အသေးစိတ် (Contract Agreement Detail)</label>
                            <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows="2" value={data.contract_agreement_detail} onChange={e => setData('contract_agreement_detail', e.target.value)}></textarea></div>
                        <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">မှတ်ချက် / Remark</label>
                            <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows="2" value={data.remark} onChange={e => setData('remark', e.target.value)}></textarea></div>
                    </div>
                )}

                {/* TAB 3: ပညာရေးနှင့် သင်တန်းများ (Dynamic Table) */}
                {activeTab === 'education' && (
                    <div className="space-y-6">
                        {/* ဘွဲ့အရည်အချင်းဇယား */}
                        <div>
                            <h3 className="font-bold text-md mb-2 text-gray-700">ပညာအရည်အချင်းများ (Education Qualifications)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 border">ဘွဲ့အမည် / အဆင့်</th><th className="p-2 border">အထူးပြုဘာသာ</th><th className="p-2 border">ရရှိသည့်ခုနှစ်</th><th className="p-2 border">ဘွဲ့အဆင့်အတန်း/အဆင့်</th> <th className="p-2 border">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.educations.map((row, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.title} onChange={e => handleDynamicChange('educations', i, 'title', e.target.value)} placeholder="e.g. B.C.Sc" /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.major_subject} onChange={e => handleDynamicChange('educations', i, 'major_subject', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.graduation_year} onChange={e => handleDynamicChange('educations', i, 'graduation_year', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.degree_level} onChange={e => handleDynamicChange('educations', i, 'degree_level', e.target.value)} /></td>
                                                <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('educations', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={() => addRow('educations', { title: '', major_subject: '', graduation_year: '', degree_level: '', category: 'degree' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ ဘွဲ့ထပ်ထည့်ရန်</button>
                        </div>

                        {/* သင်တန်းများဇယား */}
                        <div>
                            <h3 className="font-bold text-md mb-2 text-gray-700">တက်ရောက်ခဲ့ဖူးသော သင်တန်းမှတ်တမ်းများ (Local / Foreign Training / Current Training)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 border">သင်တန်းအမည်</th><th className="p-2 border">အမျိုးအစား</th><th className="p-2 border">မှ (ရက်စွဲ)</th><th className="p-2 border">ထိ (ရက်စွဲ)</th><th className="p-2 border">ကျောင်း/နေရာ</th><th className="p-2 border">အဆင့်/အမှတ်စဉ်</th><th className="p-2 border">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.trainings.map((row, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.title} onChange={e => handleDynamicChange('trainings', i, 'title', e.target.value)} /></td>
                                                <td className="p-1 border">
                                                    <select className="w-full border-0 p-1" value={row.category} onChange={e => handleDynamicChange('trainings', i, 'category', e.target.value)}>
                                                        <option value="local_training">ပြည်တွင်းသင်တန်း (Local)</option>
                                                        <option value="foreign_training">ပြည်ပသင်တန်း (Foreign)</option>
                                                        <option value="current_training">လက်ရှိတက်ရောက်ဆဲသင်တန်း</option>
                                                    </select>
                                                </td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.learn_from} onChange={e => handleDynamicChange('trainings', i, 'learn_from', e.target.value)} placeholder="ရက်/လ/နှစ် သို့ ကာလ" /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.learn_to} onChange={e => handleDynamicChange('trainings', i, 'learn_to', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.location} onChange={e => handleDynamicChange('trainings', i, 'location', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.rank} onChange={e => handleDynamicChange('trainings', i, 'rank', e.target.value)} /></td>
                                                <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('trainings', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={() => addRow('trainings', { title: '', learn_from: '', learn_to: '', location: '', rank: '', category: 'local_training' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ သင်တန်းထပ်ထည့်ရန်</button>
                        </div>
                    </div>
                )}

                {/* TAB 4: တာဝန်ထမ်းဆောင်မှုမှတ်တမ်း */}
                {activeTab === 'service' && (
                    <div>
                        <h3 className="font-bold text-md mb-2 text-gray-700">နိုင်ငံ့ဝန်ထမ်း တာဝန်ထမ်းဆောင်မှုမှတ်တမ်း (စစ်ဘက် / နယ်ဘက်လုပ်ငန်းမှတ်တမ်း နှင့် ပြောင်းရွှေ့မှုများ)</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">ရာထူး (Service Position)</th><th className="p-2 border">ဌာန (Service Dept)</th><th className="p-2 border">မှ (ရက်စွဲ)</th><th className="p-2 border">ထိ (ရက်စွဲ)</th><th className="p-2 border">ရုံးစိုက်ရာဒေသ/နေရာ</th><th className="p-2 border">လုပ်ဆောင်ချက်</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.service_records.map((row, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.service_position} onChange={e => handleDynamicChange('service_records', i, 'service_position', e.target.value)} /></td>
                                            <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.service_department} onChange={e => handleDynamicChange('service_records', i, 'service_department', e.target.value)} /></td>
                                            <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.service_from} onChange={e => handleDynamicChange('service_records', i, 'service_from', e.target.value)} /></td>
                                            <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.service_to} onChange={e => handleDynamicChange('service_records', i, 'service_to', e.target.value)} /></td>
                                            <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.service_location} onChange={e => handleDynamicChange('service_records', i, 'service_location', e.target.value)} /></td>
                                            <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('service_records', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button type="button" onClick={() => addRow('service_records', { service_position: '', service_department: '', service_from: '', service_to: '', service_location: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ လုပ်ငန်းမှတ်တမ်းထပ်ထည့်ရန်</button>
                    </div>
                )}

                {/* TAB 5: မိသားစုဝင်များနှင့် ဆွေမျိုးများ (Format 36 ၏ မျိုးရိုးဇယားများအားလုံး) */}
                {activeTab === 'family' && (
                    <FamilyTab data={data} setData={setData} />
                )}

                {/* TAB 6: နိုင်ငံခြားခရီးစဉ်မှတ်တမ်း */}
                {activeTab === 'foreign' && (
                    <>

                        <div>
                            <h3 className="font-bold text-md mb-2 text-gray-700">နိုင်ငံခြားသို့  ရောက်ဖူးခြင်းရှိ/မရှိ </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border text-sm border-collapse">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 border">မှ(ရက်၊လ၊နှစ်)</th>
                                            <th className="p-2 border">ထိ(ရက်၊လ၊နှစ်)</th>
                                            <th className="p-2 border">သွားရောက်သည့် နိုင်ငံများ</th>
                                            <th className="p-2 border">သွားရောက်သည့်ကိစ္စ</th>
                                            <th className="p-2 border">နိုင်ငံခြားငွေ မည်မျှ ထုတ်ယူခဲ့သည်</th>
                                            <th className="p-2 border">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.hasVisitedAbroad.map((row, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.abroad_from} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'training_course', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.abroad_to} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'destination_country', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.country_visited} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'time_period', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.visit_purpose} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'arrival_date', e.target.value)} /></td>

                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.foreign_currency_amount} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'supporting_agency', e.target.value)} /></td>
                                                <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('hasVisitedAbroad', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={() => addRow('hasVisitedAbroad', { abroad_from: '', abroad_to: '', visit_purpose: '', country_visited: '', foreign_currency_amount: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ နိုင်ငံခြားခရီးစဉ်ထပ်ထည့်ရန်</button>
                        </div>
                        <div>
                            <h3 className="font-bold text-md mb-2 text-gray-700">နိုင်ငံခြားသို့  သွားရောက်မည့်ကိစ္စ </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border text-sm border-collapse">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 border">သင်ကြားမည့် ဘာသာရပ် နှင့်အဆင့်/ တက်ရောက်မည့်သင်တန်း/သို့မဟုတ် အခြားကိစ္စ</th><th className="p-2 border">စေလွှတ်သည့်နိုင်ငံ</th><th className="p-2 border">အချိန်ကာလ</th><th className="p-2 border">နိုင်ငံခြားသို့ ရောက်ရမည့်နေ့</th>  <th className="p-2 border">စေလွှတ်သည့်အေဂျင်စီ</th><th className="p-2 border">ပြန်လည်သတင်းပို့ရမည့်ဌာန</th><th className="p-2 border">အသေးစိတ်မှတ်ချက်</th><th className="p-2 border">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.foreign_visits.map((row, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.training_course} onChange={e => handleDynamicChange('foreign_visits', i, 'training_course', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.destination_country} onChange={e => handleDynamicChange('foreign_visits', i, 'destination_country', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.time_period} onChange={e => handleDynamicChange('foreign_visits', i, 'time_period', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.arrival_date} onChange={e => handleDynamicChange('foreign_visits', i, 'arrival_date', e.target.value)} /></td>

                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.supporting_agency} onChange={e => handleDynamicChange('foreign_visits', i, 'supporting_agency', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.return_department} onChange={e => handleDynamicChange('foreign_visits', i, 'return_department', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.foreign_visit_details} onChange={e => handleDynamicChange('foreign_visits', i, 'foreign_visit_details', e.target.value)} /></td>
                                                <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('foreign_visits', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={() => addRow('foreign_visits', { destination_country: '', training_course: '', assigned_country: '', time_period: '', arrival_date: '', supporting_agency: '', return_department: '', foreign_visit_details: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ နိုင်ငံခြားခရီးစဉ်ထပ်ထည့်ရန်</button>
                        </div>
                    </>


                )}

                {/* TAB 7: ပြစ်ဒဏ်နှင့် ဆုလာဘ်များ */}
                {activeTab === 'legal_awards' && (
                    <div className="space-y-6">
                        {/* ပြစ်ဒဏ်မှတ်တမ်းများ */}
                        <div>
                            <h3 className="font-bold text-md mb-2 text-gray-700">ဌာနဆိုင်ရာအရေးယူမှု / တရားရုံးတရားစွဲဆိုမှု / ရာဇဝတ်မှုနှင့်ပြစ်မှုမှတ်တမ်း (Disciplinary & Court Actions)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 border">မှတ်တမ်းအမျိုးအစား</th><th className="p-2 border">ကာလ (Period)</th><th className="p-2 border">အကြောင်းရင်း / ဥပဒေပုဒ်မ</th><th className="p-2 border">ချမှတ်ခံရသည့်ပြစ်ဒဏ် (Penalty)</th><th className="p-2 border">မှတ်ချက်</th><th className="p-2 border">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.legal_records.map((row, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="p-1 border">
                                                    <select className="w-full border-0 p-1" value={row.record_type} onChange={e => handleDynamicChange('legal_records', i, 'record_type', e.target.value)}>
                                                        <option value="disciplinary">ဌာနဆိုင်ရာ အရေးယူခံရခြင်း</option>
                                                        <option value="court">တရားရုံးတွင် တရားစွဲဆိုခံရခြင်း</option>
                                                        <option value="criminal">ပြစ်မှု/ရာဇဝတ်မှု ပြစ်ဒဏ်မှတ်တမ်း</option>
                                                    </select>
                                                </td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.period} onChange={e => handleDynamicChange('legal_records', i, 'period', e.target.value)} placeholder="e.g. ၂၀၂၅-၂၀၂၆" /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.reason} onChange={e => handleDynamicChange('legal_records', i, 'reason', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.penalty} onChange={e => handleDynamicChange('legal_records', i, 'penalty', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.remark} onChange={e => handleDynamicChange('legal_records', i, 'remark', e.target.value)} /></td>
                                                <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('legal_records', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={() => addRow('legal_records', { record_type: 'disciplinary', period: '', reason: '', penalty: '', remark: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ အရေးယူမှုမှတ်တမ်းထပ်ထည့်ရန်</button>
                        </div>
                        <div>
                            <h3 className="font-bold text-md mb-2 text-gray-700">ပြစ်မှုမှတ်တမ်း </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 border">ပြစ်ဒဏ်</th><th className="p-2 border">ပြစ်ဒဏ် ချခံရသည့် အကြောင်းအရင်း</th><th className="p-2 border">ပြစ်ဒဏ်ချမှတ်သည့်ကာလ(မှ)</th><th className="p-2 border">ပြစ်ဒဏ်ချမှတ်သည့်ကာလ(ထိ)</th><th className="p-2 border">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.criminal_records.map((row, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.criminalPenalty} onChange={e => handleDynamicChange('criminal_records', i, 'reason', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.reasonPelanty} onChange={e => handleDynamicChange('criminal_records', i, 'penalty', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.criminalFrom} onChange={e => handleDynamicChange('criminal_records', i, 'remark', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.criminalTo} onChange={e => handleDynamicChange('criminal_records', i, 'remark', e.target.value)} /></td>
                                                <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('criminal_records', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={() => addRow('criminal_records', { record_type: 'disciplinary', period: '', reason: '', penalty: '', remark: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ အရေးယူမှုမှတ်တမ်းထပ်ထည့်ရန်</button>
                        </div>
                        {/* ဆုလာဘ်မှတ်တမ်းများ */}
                        <div>
                            <h3 className="font-bold text-md mb-2 text-gray-700">ဘွဲ့ / တံဆိပ် / ဂုဏ်ထူးဆောင်ဆုများ ချီးမြှင့်ခံရဖူးခြင်း (Award Received)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 border">ချီးမြှင့်ခံရသည့် ဘွဲ့/တံဆိပ်/ဆုအမည်</th><th className="p-2 border">ချီးမြှင့်ခံရသည့် ကာလ</th><th className="p-2 border">အမိန့်အမှတ် / ခုနှစ်</th><th className="p-2 border">မှတ်ချက် (Award Remark)</th><th className="p-2 border">လုပ်ဆောင်ချက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.awards.map((row, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.award_title} onChange={e => handleDynamicChange('awards', i, 'award_title', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.award_period} onChange={e => handleDynamicChange('awards', i, 'award_period', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.award_year} onChange={e => handleDynamicChange('awards', i, 'award_year', e.target.value)} /></td>
                                                <td className="p-1 border"><input type="text" className="w-full border-0 p-1" value={row.award_remark} onChange={e => handleDynamicChange('awards', i, 'award_remark', e.target.value)} /></td>
                                                <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('awards', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={() => addRow('awards', { award_title: '', award_period: '', award_year: '', award_remark: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ ရရှိခဲ့သောဆု ထပ်ထည့်ရန်</button>
                        </div>
                    </div>
                )}

                {/* Form Action Button */}
                <div className="flex justify-end pt-4 border-t">
                    <button type="submit" disabled={processing} className="bg-green-600 text-white font-semibold px-6 py-2 rounded shadow hover:bg-green-700 disabled:opacity-50 transition-all">
                        {processing ? 'ဒေတာများကို သိမ်းဆည်းနေပါသည်...' : 'မှတ်တမ်းများအားလုံးကို သိမ်းဆည်းမည်'}
                    </button>
                </div>
            </form>
        </div>
    );
}