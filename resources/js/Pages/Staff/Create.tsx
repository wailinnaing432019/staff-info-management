import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import FamilyTab from './FamilyTab';
import TrainingTab from './TrainingTab';
import LegalTab from './LegalTab';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NRCInputFields from './components/NRCInputFields';
import nrcData from '@/constant/NRCData';
import { tabs } from '@/constant/Tabs';

export default function EmployeeForm() {


    const [activeTab, setActiveTab] = useState('personal');

    const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);

    const isLastTab = currentTabIndex === tabs.length - 1;



    const { data, setData, post, processing, errors } = useForm({

        staff_number: '', name: '', nickname: '', alternative_name: '', gender: '',
        date_of_birth: '', age: '', date_of_birth_detail: '', birth_place: '',
        race: '', religion: '', blood_type: '', marital_status: '',
        nrc_state: '', nrc_township: '', nrc_number: '', nrc_type: '',
        height: '', weight: '', hair_color: '', eye_color: '', distinctive_mark: '',
        father_name: '', father_job: '', mother_name: '', spouse_name: '', childrens: '',

        position: '', department: '', salary_scale: '', salary_rate: '', degree: '', penalty_detail: '', training_detail: '', transfer_detail: '', foreign_detail: '', current_training: '',
        employee_start_date_detail: '', current_pos_start_date_detail: '', current_dept_start_date_detail: '',
        assignment_type: '', is_accompanied: '', not_border: '', separation_date: '', year_of_service: '',
        current_address: '', permanent_address: '', email: '', image_path: '', mobile_phno: '', contract_agreement_detail: '', remark: '',



        destination_country: '', assigned_country: '', time_period: '', arrival_date: '', training_course: '', supporting_agency: '', return_department: '', foreign_visit_details: '',

        referee_name: '', referee_position: '', referee_department: '', rector_name: '', rector_position: '', rector_department: '', dept_head_name: '', dept_head_position: '', dept_head_department: '',
        educations: [],
        trainings: [],
        service_records: [],
        families: [],

        hasVisitedAbroad: [],
        legal_records: [],
        criminal_records: [],
        awards: []
    });



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

            setData('image_path', file);


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


                    {activeTab === 'personal' && (
                        <div className="space-y-6">
                            <div className="flex items-center space-x-6 bg-gray-50 p-4 rounded border border-dashed border-gray-300">

                                <label className="flex items-center space-x-6 cursor-pointer group">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />


                                    <div className="shrink-0 relative">
                                        {imagePreview ? (
                                            <div className="relative group">
                                                <img
                                                    className="h-24 w-24 object-cover rounded border border-gray-400 bg-white shadow-sm transition group-hover:opacity-80"
                                                    src={imagePreview}
                                                    alt="Employee preview"
                                                />

                                                <div className="absolute inset-0 bg-black/40 text-white rounded flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition">
                                                    ပုံပြောင်းရန်
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-24 w-24 rounded border border-gray-400 bg-gray-200 flex flex-col items-center justify-center text-gray-400 text-center p-1 hover:bg-gray-300 transition">
                                                <span className="text-[10px] font-bold text-gray-600">လိုင်စင်ပုံ</span>
                                                <span className="text-[9px] text-gray-500">(2" x 2")</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <span className="block text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition">
                                            {imagePreview ? "ဓာတ်ပုံအသစ် ရွေးချယ်ရန်" : "လိုင်စင်ဓာတ်ပုံ တင်ရန်"}
                                        </span>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPG (အကြံပြု)</p>
                                    </div>

                                </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700">ဝန်ထမ်းအမှတ်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.staff_number} onChange={e => setData('staff_number', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ငယ်အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.nickname} onChange={e => setData('nickname', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အခြားအမည်များ (ရှိလျှင်)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.alternative_name} onChange={e => setData('alternative_name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ကျား/ မ</label>
                                    <select className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.gender} onChange={e => setData('gender', e.target.value)}><option value="">ရွေးချယ်ရန်</option><option value="ကျား">ကျား</option><option value="မ">မ</option></select></div>
                                <div><label className="block text-sm font-medium text-gray-700">မွေးနေ့ (ရက်၊ လ၊ နှစ်)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အသက်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.age} onChange={e => setData('age', e.target.value)} /></div>

                                <div><label className="block text-sm font-medium text-gray-700">  မွေးဖွားရာဇာတိ </label>
                                    <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.birth_place} onChange={e => setData('birth_place', e.target.value)}></textarea></div>


                                <div><label className="block text-sm font-medium text-gray-700">လူမျိုး(လူမျိုးစုဖြစ်လျှင်လိုအပ်သလိုဖော်ပြရန်)</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.race} onChange={e => setData('race', e.target.value)} /></div>

                                <div className="col-span-1 md:col-span-2 mt-1">
                                    <label className="block text-sm font-medium text-gray-700">အမျိုးသားမှတ်ပုံတင်အမှတ်</label>
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
                                <div><label className="block text-sm font-medium text-gray-700">အိမ်ထောင်ရှိ/ မရှိ</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.marital_status} onChange={e => setData('marital_status', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ဇနီး/ ခင်ပွန်း အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.spouse_name} onChange={e => setData('spouse_name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">အရပ်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.height} onChange={e => setData('height', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ကိုယ်အလေးချိန်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.weight} onChange={e => setData('weight', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ဆံပင်အရောင်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.hair_color} onChange={e => setData('hair_color', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">မျက်စိအရောင်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.eye_color} onChange={e => setData('eye_color', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ထင်ရှားသည့်အမှတ်အသား</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.distinctive_mark} onChange={e => setData('distinctive_mark', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">သား/ သမီး အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.childrens} onChange={e => setData('childrens', e.target.value)} /></div>


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


                    {activeTab === 'employment' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div><label className="block text-sm font-medium text-gray-700">ပညာအရည်အချင်း အပြည့်အစုံ</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.degree} onChange={e => setData('degree', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">လက်ရှိရာထူး</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.position} onChange={e => setData('position', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">လက်ရှိဌာန</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.department} onChange={e => setData('department', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">လက်ရှိလစာနှုန်း </label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.salary_rate} onChange={e => setData('salary_rate', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">အလုပ်စတင်ဝင်ရောက်သည့်နေ့ (ရက်၊ လ၊ နှစ်)</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.employee_start_date_detail} onChange={e => setData('employee_start_date_detail', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">လက်ရှိရာထူးရသည့်နေ့ (ရက်၊ လ၊ နှစ်)</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.current_pos_start_date_detail} onChange={e => setData('current_pos_start_date_detail', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">လက်ရှိဌာနသို့ရောက်သည့်နေ့ (ရက်၊ လ၊ နှစ်) </label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.current_dept_start_date_detail} onChange={e => setData('current_dept_start_date_detail', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">အမှုထမ်းသက်တမ်း (နှစ်၊ လ၊ ရက်)  </label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.year_of_service} onChange={e => setData('year_of_service', e.target.value)} /></div>
                            <div><label className="block text-sm font-medium text-gray-700">ကင်းကွာသည့် ရက်စွဲ  </label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.separation_date} onChange={e => setData('separation_date', e.target.value)} />
                            </div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">ပြောင်းရွှေ့ တာဝန်ထမ်းဆောင်ခဲ့ဖူးသော ကျောင်း/ ဌာန (အဆင့်ဆင့် မှ-ထိ)</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.transfer_detail} onChange={e => setData('transfer_detail', e.target.value)} /></div>
                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">နိုင်ငံခြား ရောက်ဖူးခြင်း ရှိ/ မရှိ ရှိပါက သွားရောက်သည့် နိုင်ငံ ကာလ (မှ - ထိ)</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.foreign_detail} onChange={e => setData('foreign_detail', e.target.value)} /></div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">ပြစ်ဒဏ်  ခံရဖူးခြင်းရှိ/ မရှိ (ရှိလျှင် ဖော်ပြရန်)</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.penalty_detail} onChange={e => setData('penalty_detail', e.target.value)} /></div>
                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">နဝတသင်တန်း (ထက်/ အောက်) ပြီး/ မပြီး၊ သင်တန်းတက်ရောက်ခဲ့ဖူးလျှင် သင်တန်းအမည်နှင့် အမှတ်စဉ်</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.training_detail} onChange={e => setData('training_detail', e.target.value)} /></div>


                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">သင်တန်းတက်ရောက်နေပါက  ဖော်ပြရန် (ပြည်တွင်း/ ပြည်ပ)</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.current_training} onChange={e => setData('current_training', e.target.value)} /></div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">အခြားတက္ကသိုလ်နှင့် တွဲဖက်နေပါက ဖော်ပြရန်</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.is_accompanied} onChange={e => setData('is_accompanied', e.target.value)} /></div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700"> နယ်ခံ/ နယ်ဝေး</label>
                                <textarea rows={1} className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.not_border} onChange={e => setData('not_border', e.target.value)} /></div>

                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">လက်ရှိနေရပ်လိပ်စာ</label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.current_address} onChange={e => setData('current_address', e.target.value)}></textarea></div>
                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">အမြဲတမ်းနေရပ်လိပ်စာ</label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows={2} value={data.permanent_address} onChange={e => setData('permanent_address', e.target.value)}></textarea></div>

                            <div><label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.email} onChange={e => setData('email', e.target.value)} /></div>

                            <div><label className="block text-sm font-medium text-gray-700">ဖုန်းနံပါတ်</label>
                                <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.mobile_phno} onChange={e => setData('mobile_phno', e.target.value)} /></div>


                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">စာချုပ်ချုပ်ဆိုထားခြင်း ရှိ/ မရှိ၊ ရှိပါက စာချုပ်နှစ်၊ လျော်ကြေးငွေ</label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" rows={2} value={data.contract_agreement_detail} onChange={e => setData('contract_agreement_detail', e.target.value)}></textarea></div>
                            <div className="md:col-span-3"><label className="block text-sm font-medium text-gray-700">မှတ်ချက် </label>
                                <textarea className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.remark} onChange={e => setData('remark', e.target.value)}></textarea></div>
                        </div>
                    )}


                    {activeTab === 'education' && (
                        <div className="space-y-6">
                            {/* ဘွဲ့အရည်အချင်းဇယား */}
                            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">ပညာအရည်အချင်း</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 border">ဘွဲ့အမည် </th><th className="p-2 border">အထူးပြုဘာသာ</th><th className="p-2 border">ရရှိသည့်ခုနှစ်</th><th className="p-2 border">ရရှိသည့် အဆင့်</th> <th className="p-2 border"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.educations.map((row, i) => (
                                                <tr key={i} className="border-b">
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.degree_name} onChange={e => handleDynamicChange('educations', i, 'degree_name', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.major_subject} onChange={e => handleDynamicChange('educations', i, 'major_subject', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.graduation_year} onChange={e => handleDynamicChange('educations', i, 'graduation_year', e.target.value)} /></td>
                                                    <td className="p-1 border"><textarea rows={1} className="w-full border-0 p-1" value={row.degree_level} onChange={e => handleDynamicChange('educations', i, 'degree_level', e.target.value)} /></td>
                                                    <td className="p-1 border text-center"><button type="button" onClick={() => removeRow('educations', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" onClick={() => addRow('educations', { degree_name: '', major_subject: '', graduation_year: '', degree_level: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ ထည့်မည်</button>
                            </div>

                            {/* သင်တန်းများဇယား */}
                            <TrainingTab data={data} setData={setData} />
                        </div>
                    )}


                    {activeTab === 'service' && (
                        <>

                            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">နိုင်ငံ့ဝန်ထမ်းတာဝန်ထမ်းဆောင်မှုမှတ်တမ်း (စစ်ဘက်/ နယ်ဘက်)</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th rowSpan={2} className="p-2 border border-slate-400">ရာထူး </th>
                                                <th rowSpan={2} className="p-2 border border-slate-400">ဌာန </th>
                                                <th colSpan={2} className="p-2 border border-slate-400">တာဝန်ထမ်းဆောင်သည့် ကာလ</th>
                                                <th rowSpan={2} className="p-2 border border-slate-400">ရုံးစိုက်ရာဒေသ/နေရာ</th>
                                                <th rowSpan={2} className="p-2 border border-slate-400"></th>
                                            </tr>
                                            <tr>
                                                <th className="p-2 border border-slate-400">မှ </th>
                                                <th className="p-2 border border-slate-400">ထိ  </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.service_records.map((row, i) => (
                                                <tr key={i} className="border-b">
                                                    <td className="p-1 border border-x-slate-400  "><textarea rows={1} className="w-full border-0 p-1" value={row.service_position} onChange={e => handleDynamicChange('service_records', i, 'service_position', e.target.value)} /></td>
                                                    <td className="p-1 border border-r-slate-400"><textarea rows={1} className="w-full border-0 p-1" value={row.service_department} onChange={e => handleDynamicChange('service_records', i, 'service_department', e.target.value)} /></td>
                                                    <td className="p-1 border border-r-slate-400"><textarea rows={1} className="w-full border-0 p-1" value={row.service_from} onChange={e => handleDynamicChange('service_records', i, 'service_from', e.target.value)} /></td>
                                                    <td className="p-1 border border-r-slate-400"><textarea rows={1} className="w-full border-0 p-1" value={row.service_to} onChange={e => handleDynamicChange('service_records', i, 'service_to', e.target.value)} /></td>
                                                    <td className="p-1 border border-r-slate-400"><textarea rows={1} className="w-full border-0 p-1" value={row.service_location} onChange={e => handleDynamicChange('service_records', i, 'service_location', e.target.value)} /></td>
                                                    <td className="p-1 border border-r-slate-400 text-center"><button type="button" onClick={() => removeRow('service_records', i)} className="text-red-500 hover:underline">ဖျက်ရန်</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" onClick={() => addRow('service_records', { service_position: '', service_department: '', service_from: '', service_to: '', service_location: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ ထည့်မည်</button>
                            </div>
                        </>
                    )}

                    {activeTab === 'family' && (
                        <FamilyTab data={data} setData={setData} />
                    )}

                    {activeTab === 'foreign' && (
                        <>
                            <div>
                                <h3 className="font-bold text-md mb-2 text-gray-700">နိုင်ငံခြားသို့  သွားရောက်မည့်ကိစ္စ </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    <div><label className="block text-sm font-medium text-gray-700">သွားရောက်မည့် နိုင်ငံ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.destination_country} onChange={e => setData('destination_country', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">စေလွှတ်သည့်နိုင်ငံ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.assigned_country} onChange={e => setData('assigned_country', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">အချိန်ကာလ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.time_period} onChange={e => setData('time_period', e.target.value)} /></div>
                                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">သင်ကြားမည့် ဘာသာရပ် နှင့်အဆင့်/ တက်ရောက်မည့်သင်တန်း/သို့မဟုတ် အခြားကိစ္စ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.training_course} onChange={e => setData('training_course', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">နိုင်ငံခြားသို့ ရောက်ရမည့်နေ့</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.arrival_date} onChange={e => setData('arrival_date', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">မည်သည့် အစိုးရအဖွဲ့စည်း အထောက်အပံ့</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.supporting_agency} onChange={e => setData('supporting_agency', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">ပြန်လည်ရောက်ရှိလျှင် အမှုထမ်းမည့် ဌာန/ တာဝန်</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.return_department} onChange={e => setData('return_department', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700">နိုင်ငံခြားသို့သွားရောက်မည့် ကိစ္စနှင့်အထောက်အထားများ</label>
                                        <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.foreign_visit_details} onChange={e => setData('foreign_visit_details', e.target.value)} /></div>

                                </div>


                            </div>
                            <div>
                                <h3 className="font-bold text-md mb-2 text-gray-700">နိုင်ငံခြားသို့  ရောက်ဖူးခြင်းရှိ/မရှိ </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border text-sm border-collapse">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 border">မှ<br />(ရက်၊လ၊နှစ်)</th>
                                                <th className="p-2 border">ထိ <br />(ရက်၊လ၊နှစ်)</th>
                                                <th className="p-2 border">သွားရောက်သည့် နိုင်ငံများ</th>
                                                <th className="p-2 border">သွားရောက်သည့်ကိစ္စ</th>
                                                <th className="p-2 border">နိုင်ငံခြားငွေ မည်မျှ ထုတ်ယူခဲ့သည်</th>
                                                <th className="p-2 border"></th>
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
                                <button type="button" onClick={() => addRow('hasVisitedAbroad', { abroad_from: '', abroad_to: '', visit_purpose: '', country_visited: '', foreign_currency_amount: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ ထည့်မည်</button>
                            </div>

                        </>


                    )}


                    {activeTab === 'legal_awards' && (
                        <div className="space-y-6">

                            <LegalTab data={data} setData={setData} />

                            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">ပြစ်မှုမှတ်တမ်း</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th rowSpan={2} className="p-2 border">ပြစ်ဒဏ်</th>
                                                <th rowSpan={2} className="p-2 border">ပြစ်ဒဏ် ချခံရသည့် အကြောင်းအရင်း</th>
                                                <th colSpan={2} className="p-2 border">ပြစ်ဒဏ်ချမှတ်သည့်ကာလ </th>
                                                <th rowSpan={2} className="p-2 border"></th>
                                            </tr>
                                            <tr>
                                                <th className="p-2 border"> မှ </th>
                                                <th className="p-2 border"> ထိ </th>
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
                                <button type="button" onClick={() => addRow('criminal_records', { criminalPenalty: '', reasonPelanty: '', criminalFrom: '', criminalTo: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ ထည့်မည်</button>
                            </div>

                            <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">ချီးမြှင့်ခံရသည့် ဘွဲ့ထူး၊ ဂုဏ်ထူးတံဆိပ် များ</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full border text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 border">ချီးမြှင့်ခံရသည့် ဘွဲ့/တံဆိပ် အမည်</th>
                                                <th className="p-2 border">ချီးမြှင့်ခံရသည့် ကာလ</th>
                                                <th className="p-2 border">အမိန့်အမှတ်/ ခုနှစ်</th>
                                                <th className="p-2 border">မှတ်ချက်</th>
                                                <th className="p-2 border"></th>
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
                                <button type="button" onClick={() => addRow('awards', { award_title: '', award_period: '', award_year: '', award_remark: '' })} className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ ထည့်မည်</button>
                            </div>
                        </div>
                    )}

                    {activeTab === "referee" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700">Referee Name</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.referee_name} onChange={e => setData('referee_name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">Referee Department</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.referee_department} onChange={e => setData('referee_department', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">Referee Position</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.referee_position} onChange={e => setData('referee_position', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ပါမောက္ခချုပ်/ ကျောင်းအုပ်ကြီး အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.rector_name} onChange={e => setData('rector_name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ပါမောက္ခချုပ်/ ကျောင်းအုပ်ကြီး ဌာန</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.rector_department} onChange={e => setData('rector_department', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ပါမောက္ခချုပ်/ ကျောင်းအုပ်ကြီး ရာထူး</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.rector_position} onChange={e => setData('rector_position', e.target.value)} /></div>

                                <div><label className="block text-sm font-medium text-gray-700">ဌာနအကြီးအကဲ အမည်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.dept_head_name} onChange={e => setData('dept_head_name', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ဌာနအကြီးအကဲ ဌာန</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.dept_head_department} onChange={e => setData('dept_head_department', e.target.value)} /></div>
                                <div><label className="block text-sm font-medium text-gray-700">ဌာနအကြီးအကဲ ရာထူး</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.dept_head_position} onChange={e => setData('dept_head_position', e.target.value)} /></div>
                            </div>
                        </div>
                    )}
                </form>
                <div className="mt-6 flex justify-end space-x-2 border-t pt-4">

                    {currentTabIndex > 0 && (
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow font-semibold"
                            onClick={handlePrevStep}
                        >
                            နောက်သို့
                        </button>
                    )}

                    {!isLastTab ? (
                        <button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-semibold"
                            onClick={(e) => handleNextStep(e)}
                        >
                            နောက်တစ်ဆင့် သို့
                        </button>
                    ) : (<button
                        type="submit"
                        form="employeeMegaForm"
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