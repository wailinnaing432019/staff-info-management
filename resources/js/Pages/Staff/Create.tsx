import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import FamilyTab from './FamilyTab';
import TrainingTab from './TrainingTab';
import LegalTab from './LegalTab';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NRCInputFields from './components/NRCInputFields';
import nrcData from '@/constant/NRCData';

export default function EmployeeForm() {

    const tabs = [
        { id: 'personal', label: '၁။ ကိုယ်ရေးအချက်အလက်' },
        { id: 'employment', label: '၂။ ဝန်ထမ်းရေးရာ' },
        { id: 'education', label: '၃။ ပညာရေးနှင့် သင်တန်း' },
        { id: 'service', label: '၄။ တာဝန်ထမ်းဆောင်မှုမှတ်တမ်း' },
        { id: 'family', label: '၅။ မိသားစုနှင့် ဆွေမျိုးများ' },
        { id: 'foreign', label: '၆။ နိုင်ငံခြားခရီးစဉ်မှတ်တမ်း' },
        { id: 'legal_awards', label: '၇။ ပြစ်ဒဏ်နှင့် ဆုလာဘ်' },
        // တကယ်လို့ နောက်ထပ် Tab တွေရှိသေးရင်လည်း ဒီအောက်မှာ စိတ်ကြိုက်ထပ်တိုးရုံပါပဲ
    ];
    const [activeTab, setActiveTab] = useState('personal');

    const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);

    // ၃။ ဒါက နောက်ဆုံး Tab ဟုတ်မဟုတ် စစ်ထုတ်ပေးမည့် Boolean variable
    const isLastTab = currentTabIndex === tabs.length - 1;


    // Format ၃ ခုလုံးမှ Column များ အားလုံး မကျန်စေရန် State တည်ဆောက်ခြင်း
    const { data, setData, post, processing, errors } = useForm({
        // ကဏ္ဍ (၁) ကိုယ်ရေးအချက်အလက် (Personal Data)
        staff_number: '', name: '', nickname: '', alternative_name: '', gender: '',
        date_of_birth: '', age: '', date_of_birth_detail: '', birth_place: '',
        race: '', religion: '',  blood_type: '', marital_status: '',
        nrc_state: '', nrc_township: '', nrc_number: '', nrc_type: '',
        height: '', weight: '', hair_color: '', eye_color: '', distinctive_mark: '',
        father_name: '', father_job: '', mother_name: '', spouse_name: '', childrens: '',

        // ကဏ္ဍ (၂) ဝန်ထမ်းရေးရာနှင့် လက်ရှိအခြေအနေ (Employment Data)
        position: '', department: '', salary_scale: '', salary_rate: '', degree: '', penalty_detail: '', training_detail: '', transfer_detail: '', foreign_detail: '', current_training: '',
        employee_start_date_detail: '', current_pos_start_date_detail: '', current_dept_start_date_detail: '',
        assignment_type: '', is_accompanied: '', not_border: '', separation_date: '', year_of_service: '',
        current_address: '', permanent_address: '', email: '', image_path: '', mobile_phno: '', contract_agreement_detail: '', remark: '',

        // Foreign Visit

        destination_country: '', assigned_country: '', time_period: '', arrival_date: '', training_course: '', supporting_agency: '', return_department: '', foreign_visit_details: '',
        // ကဏ္ဍ (၃) One-to-Many Dynamic Arrays (Format အားလုံးမှ ဇယားများ)
        educations: [{ degree_name: '', major_subject: '', graduation_year: '', degree_level: '' }],
        trainings: [],
        service_records: [{ service_position: '', service_department: '', service_from: '', service_to: '', service_location: '' }],
        families: [],

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

    const handleNextStep = (e) => {
        if (e) e.preventDefault();
        if (!isLastTab) {
            setActiveTab(tabs[currentTabIndex + 1].id);
        }
    };

    const handlePrevStep = () => {
        if (currentTabIndex > 0) {
            setActiveTab(tabs[currentTabIndex - 1].id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ၇ ဆင့်မြောက် ရောက်နေမှပဲ ဒေတာ တကယ်ပို့ခွင့်ပေးမည်
        if (isLastTab) {
            post(route('employees.store'));
        }
    };

    const handleFormInput = (e) => {
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.resize = 'none';
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };
    const [imagePreview, setImagePreview] = useState(data.image_path ? `/storage/${data.image_path}` : null);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // ၁။ Form Data ထဲသို့ ရွေးချယ်လိုက်သော File Object ကို ထည့်ခြင်း
            setData('image_path', file);

            // ၂။ ဖုန်း/ကွန်ပျူတာထဲက ပုံကို ချက်ချင်း Preview မြင်ရအောင် URL ပြောင်းခြင်း
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ဝန်ထမ်း အသစ်ထပ်ထည့်ခြင်း
                </h2>
            }
        >
            <Head title={`ဝန်ထမ်း အသစ်ထပ်ထည့်ခြင်း`} />
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">နိုင်ငံ့ဝန်ထမ်း ကိုယ်ရေးမှတ်တမ်း ဖြည့်သွင်းလွှာ</h2>

                {/* စာမျက်နှာ Tab များ သတ်မှတ်ခြင်း */}

                <div className="flex flex-wrap gap-1.5 mb-6 border-b pb-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab.id ? 'bg-black text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <form onSubmit={handleSubmit} id="employeeMegaForm" onInput={handleFormInput} className="space-y-6">

                    {/* TAB 1: ကိုယ်ရေးအချက်အလက် */}
                    {activeTab === 'personal' && (
                        <div className="space-y-6">
                            {/* 📷 လိုင်စင်ဓာတ်ပုံ တင်သည့်အပိုင်း (၂ လက်မ ပတ်လည် ဆိုဒ် ကန့်သတ်ချက်ဖြင့်) */}
                            <div className="flex items-center space-x-6 bg-gray-50 p-4 rounded border border-dashed border-gray-300">
                                <div className="shrink-0">
                                    {imagePreview ? (
                                        <img
                                            className="h-24 w-24 object-cover rounded border border-gray-400 bg-white shadow-sm"
                                            src={imagePreview}
                                            alt="Employee preview"
                                        />
                                    ) : (
                                        <div className="h-24 w-24 rounded border border-gray-400 bg-gray-200 flex flex-col items-center justify-center text-gray-400 text-center p-1">
                                            <span className="text-[10px] font-bold">လိုင်စင်ပုံ</span>
                                            <span className="text-[9px]">(2" x 2")</span>
                                        </div>
                                    )}
                                </div>
                                <label className="block">
                                    <span className="sr-only">လိုင်စင်ဓာတ်ပုံ ရွေးချယ်ရန်</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100 cursor-pointer"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">PNG, JPG (အကြံပြုဆိုဒ် - ၂ လက်မ ပတ်လည်)</p>
                                </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700">ဝန်ထမ်းအမှတ် / Staff Number</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.staff_number} onChange={e => setData('staff_number', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ငယ်အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.nickname} onChange={e => setData('nickname', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အခြားအမည်များ (ရှိလျှင်)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.alternative_name} onChange={e => setData('alternative_name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ကျား / မ</label>
                                    <select className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.gender} onChange={e => setData('gender', e.target.value)}><option value="">ရွေးချယ်ရန်</option><option value="ကျား">ကျား</option><option value="မ">မ</option></select></div>
                                <div><label className="block text-sm font-medium text-gray-700">မွေးနေ့ (ရက်၊ လ၊ နှစ်)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အသက်</label>
                                    <input type="number" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.age} onChange={e => setData('age', e.target.value)} /></div>
                                <div ><label className="block text-sm font-medium text-gray-700">မွေးနေ့သက္ကရာဇ် အသေးစိတ်မှတ်ချက်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.date_of_birth_detail} onChange={e => setData('date_of_birth_detail', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">မွေးရာဇာတိ / မွေးဖွားရာဒေသအသေးစိတ်</label>
                                    <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.birth_place} onChange={e => setData('birth_place', e.target.value)}></textarea></div>

                                {/* <div><label className="block text-sm font-medium text-gray-700">နိုင်ငံသားစိစစ်ရေးအမှတ် (NRC)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.nrc} onChange={e => setData('nrc', e.target.value)} /></div> */}
                                <div><label className="block text-sm font-medium text-gray-700">လူမျိုး</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.race} onChange={e => setData('race', e.target.value)} /></div>

                                <div className="col-span-1 md:col-span-2 mt-1">
                                    <label className="block text-sm font-medium text-gray-700">နိုင်ငံသားစိစစ်ရေးအမှတ် (NRC)</label>
                                    <NRCInputFields
                                        nrcData={nrcData}
                                        state={data.nrc_state}
                                        township={data.nrc_township}
                                        type={data.nrc_type}
                                        number={data.nrc_number}
                                        errors={errors}
                                        onChange={(key, value) => setData(key, value)}
                                        isDisabled={false}
                                    />
                                </div>
                                <div><label className="block text-sm font-medium text-gray-700">ကိုးကွယ်သည့်ဘာသာ</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.religion} onChange={e => setData('religion', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">သွေးအုပ်စု</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.blood_type} onChange={e => setData('blood_type', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အိမ်ထောင်ရေးအခြေအနေ</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.marital_status} onChange={e => setData('marital_status', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ဇနီး / ခင်ပွန်း အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.spouse_name} onChange={e => setData('spouse_name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အရပ် (ပေ/လက်မ)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.height} onChange={e => setData('height', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ကိုယ်အလေးချိန် (ပေါင်)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.weight} onChange={e => setData('weight', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ဆံပင်အရောင်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.hair_color} onChange={e => setData('hair_color', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">မျက်စိအရောင်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.eye_color} onChange={e => setData('eye_color', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ထင်ရှားသည့်အမှတ်အသား</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.distinctive_mark} onChange={e => setData('distinctive_mark', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">သားသမီးများရှိလျှင် အမည်များ</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.childrens} onChange={e => setData('childrens', e.target.value)} /></div>

                                {/* မိဘအချက်အလက် */}
                                <div className="md:col-span-3 border-t pt-4 mt-2 font-bold text-gray-700 text-base">မိဘအချက်အလက်များ</div>
                                <div><label className="block text-sm font-medium text-gray-700">အဘအမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.father_name} onChange={e => setData('father_name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အဘ၏အလုပ်အကိုင်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.father_job} onChange={e => setData('father_job', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အမိအမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.mother_name} onChange={e => setData('mother_name', e.target.value)} /></div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: ဝန်ထမ်းရေးရာအချက်အလက် */}
                    {activeTab === 'employment' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700">ပညာအရည်အချင်း</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.degree} onChange={e => setData('degree', e.target.value)} /></div>
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
                            <div><label className="block text-sm font-medium text-gray-700">အမှုထမ်းသက်တမ်း  </label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.year_of_service} onChange={e => setData('year_of_service', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">နှုတ်ထွက်/အငြိမ်းစားယူသည့်ရက်စွဲ (Separation Date)</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.separation_date} onChange={e => setData('separation_date', e.target.value)} />
                            </div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">ပြောင်းရွှေ့ တာဝန်ထမ်းဆောင်ခဲ့ဖူးသော ကျောင်း/ဌာန (အဆင့်ဆင့်မှ-ထိ)</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.transfer_detail} onChange={e => setData('transfer_detail', e.target.value)} /></div>
                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">နိုင်ငံခြား သွားရောက်ဖူးလျှင် အသေးစိတ်</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.foreign_detail} onChange={e => setData('foreign_detail', e.target.value)} /></div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">ပြစ်ဒဏ် ချမှတ်ခံရဖူးခြင်းရှိ/မရှိ အသေးစိတ်</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.penalty_detail} onChange={e => setData('penalty_detail', e.target.value)} /></div>
                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">နဝတ သင်တန်း အသေးစိတ်(တက်ရောက်ဖူးလျှင်)</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.training_detail} onChange={e => setData('training_detail', e.target.value)} /></div>


                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">သင်တန်းတက်ရောက်နေပါက အသေးစိတ်</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.current_training} onChange={e => setData('current_training', e.target.value)} /></div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">တခြား တက္ကသိုလ်နှင့် တွဲဖက်နေပါက အသေးစိတ်</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.is_accompanied} onChange={e => setData('is_accompanied', e.target.value)} /></div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">တခြား တက္ကသိုလ်နှင့် တွဲဖက်နေပါက အသေးစိတ်</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.not_border} onChange={e => setData('not_border', e.target.value)} /></div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">လက်ရှိနေရပ်လိပ်စာ အပြည့်အစုံ</label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.current_address} onChange={e => setData('current_address', e.target.value)}></textarea></div>
                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">အမြဲတမ်းနေရပ်လိပ်စာ အပြည့်အစုံ</label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows={2} value={data.permanent_address} onChange={e => setData('permanent_address', e.target.value)}></textarea></div>

                            <div><label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.email} onChange={e => setData('email', e.target.value)} /></div>

                            <div><label className="block text-sm font-medium text-gray-700">လက်ကိုင်ဖုန်း</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.mobile_phno} onChange={e => setData('mobile_phno', e.target.value)} /></div>


                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">ချုပ်ဆိုထားသည့်စာချုပ်သဘောတူညီချက်အသေးစိတ် (Contract Agreement Detail)</label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows={2} value={data.contract_agreement_detail} onChange={e => setData('contract_agreement_detail', e.target.value)}></textarea></div>
                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">မှတ်ချက် / Remark</label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.remark} onChange={e => setData('remark', e.target.value)}></textarea></div>
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
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.degree_name} onChange={e => handleDynamicChange('educations', i, 'degree_name', e.target.value)} placeholder="e.g. B.C.Sc" /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.major_subject} onChange={e => handleDynamicChange('educations', i, 'major_subject', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.graduation_year} onChange={e => handleDynamicChange('educations', i, 'graduation_year', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.degree_level} onChange={e => handleDynamicChange('educations', i, 'degree_level', e.target.value)} /></td>
                                                    <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('educations', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" onClick={() => addRow('educations', { degree_name: '', major_subject: '', graduation_year: '', degree_level: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ ဘွဲ့ထပ်ထည့်ရန်</button>
                            </div>

                            {/* သင်တန်းများဇယား */}
                            <TrainingTab data={data} setData={setData} />
                        </div>
                    )}

                    {/* TAB 4: တာဝန်ထမ်းဆောင်မှုမှတ်တမ်း */}
                    {activeTab === 'service' && (
                        <>

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
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.service_position} onChange={e => handleDynamicChange('service_records', i, 'service_position', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.service_department} onChange={e => handleDynamicChange('service_records', i, 'service_department', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.service_from} onChange={e => handleDynamicChange('service_records', i, 'service_from', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.service_to} onChange={e => handleDynamicChange('service_records', i, 'service_to', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.service_location} onChange={e => handleDynamicChange('service_records', i, 'service_location', e.target.value)} /></td>
                                                    <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('service_records', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" onClick={() => addRow('service_records', { service_position: '', service_department: '', service_from: '', service_to: '', service_location: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ လုပ်ငန်းမှတ်တမ်းထပ်ထည့်ရန်</button>
                            </div>
                        </>
                    )}

                    {/* TAB 5: မိသားစုဝင်များနှင့် ဆွေမျိုးများ (Format 36 ၏ မျိုးရိုးဇယားများအားလုံး) */}
                    {activeTab === 'family' && (
                        <FamilyTab data={data} setData={setData} />
                    )}

                    {/* TAB 6: နိုင်ငံခြားခရီးစဉ်မှတ်တမ်း */}
                    {activeTab === 'foreign' && (
                        <>
                            <div>
                                <h3 className="font-bold text-md mb-2 text-gray-700">နိုင်ငံခြားသို့  သွားရောက်မည့်ကိစ္စ </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div><label className="block text-sm font-medium text-gray-700">သင်ကြားမည့် ဘာသာရပ် နှင့်အဆင့်/ တက်ရောက်မည့်သင်တန်း/သို့မဟုတ် အခြားကိစ္စ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.training_course} onChange={e => setData('training_course', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">သွားရောက်မည့် နိုင်ငံ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.destination_country} onChange={e => setData('destination_country', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">စေလွှတ်သည့်နိုင်ငံ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.assigned_country} onChange={e => setData('assigned_country', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">အချိန်ကာလ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.time_period} onChange={e => setData('time_period', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">နိုင်ငံခြားသို့ ရောက်ရမည့်နေ့</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.arrival_date} onChange={e => setData('arrival_date', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">စေလွှတ်သည့်အေဂျင်စီ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.supporting_agency} onChange={e => setData('supporting_agency', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">ပြန်လည်သတင်းပို့ရမည့်ဌာန</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.return_department} onChange={e => setData('return_department', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">အသေးစိတ်မှတ်ချက်</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.foreign_visit_details} onChange={e => setData('foreign_visit_details', e.target.value)} /></div>

                                </div>


                            </div>
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
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.abroad_from} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'abroad_from', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.abroad_to} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'abroad_to', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.country_visited} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'country_visited', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.visit_purpose} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'visit_purpose', e.target.value)} /></td>

                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.foreign_currency_amount} onChange={e => handleDynamicChange('hasVisitedAbroad', i, 'foreign_currency_amount', e.target.value)} /></td>
                                                    <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('hasVisitedAbroad', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" onClick={() => addRow('hasVisitedAbroad', { abroad_from: '', abroad_to: '', visit_purpose: '', country_visited: '', foreign_currency_amount: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ နိုင်ငံခြားခရီးစဉ်ထပ်ထည့်ရန်</button>
                            </div>

                        </>


                    )}

                    {/* TAB 7: ပြစ်ဒဏ်နှင့် ဆုလာဘ်များ */}
                    {activeTab === 'legal_awards' && (
                        <div className="space-y-6">
                            {/* ပြစ်ဒဏ်မှတ်တမ်းများ */}

                            <LegalTab data={data} setData={setData} />

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
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.criminalPenalty} onChange={e => handleDynamicChange('criminal_records', i, 'criminalPenalty', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.reasonPelanty} onChange={e => handleDynamicChange('criminal_records', i, 'reasonPelanty', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.criminalFrom} onChange={e => handleDynamicChange('criminal_records', i, 'criminalFrom', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.criminalTo} onChange={e => handleDynamicChange('criminal_records', i, 'criminalTo', e.target.value)} /></td>
                                                    <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('criminal_records', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" onClick={() => addRow('criminal_records', { criminalPenalty: '', reasonPelanty: '', criminalFrom: '', criminalTo: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ အရေးယူမှုမှတ်တမ်းထပ်ထည့်ရန်</button>
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
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.award_title} onChange={e => handleDynamicChange('awards', i, 'award_title', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.award_period} onChange={e => handleDynamicChange('awards', i, 'award_period', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.award_year} onChange={e => handleDynamicChange('awards', i, 'award_year', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.award_remark} onChange={e => handleDynamicChange('awards', i, 'award_remark', e.target.value)} /></td>
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


                </form>
                <div className="mt-6 flex justify-end space-x-2 border-t pt-4">

                    {/* "နောက်သို့" ပြန်သွားမည့်ခလုတ် (ပထမဆုံး Tab မဟုတ်ရင် ပြမည်) */}
                    {currentTabIndex > 0 && (
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow font-semibold"
                            onClick={handlePrevStep}
                        >
                            နောက်သို့
                        </button>
                    )}

                    {/* ✅ နောက်ဆုံး Tab မဟုတ်သေးရင် "နောက်တစ်ဆင့် သို့" သီးသန့် ခလုတ်ပဲ ပြမည် */}
                    {!isLastTab ? (
                        <button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-semibold"
                            onClick={(e) => handleNextStep(e)} // ကလစ်နှိပ်မှ နောက်တစ်ဆင့်တက်ပြီး Form Submit လုံးဝ မဖြစ်တော့ပါ
                        >
                            နောက်တစ်ဆင့် သို့
                        </button>
                    ) : (
                        /* ✅ ၇ ဆင့်မြောက် နောက်ဆုံး Tab ရောက်မှသာ Form ကို လှမ်း Submit လုပ်မည့် ခလုတ်ပေါ်မည် */
                        <button
                            type="submit"
                            form="employeeMegaForm" // 👈 HTML5 ရဲ့ 'form' attribute သုံးပြီး အပေါ်က Form ကြီးကို လှမ်းတွန်းခိုင်းခြင်းဖြစ်ပါတယ်
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow font-bold"
                        >
                            {processing ? 'သိမ်းဆည်းနေပါသည်...' : 'ဒေတာအားလုံးသိမ်းဆည်းမည်'}
                        </button>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}