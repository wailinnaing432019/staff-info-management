import React, { useState } from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import FamilyEditTab from './EditComponent/FamilyEditTab';
import TrainingEditTab from './EditComponent/TrainingEditTab';
import LegalEditTab from './EditComponent/LegalEditTab';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Message from './components/Message';
import NRCInputFields from './components/NRCInputFields';
import nrcData from '@/constant/NRCData';
import { tabs } from '@/constant/Tabs';
import Referee from './components/Referee';

export default function Edit({ employee }) {
    // ၁။ ၇ ဆင့်ပါသော Tabs Configuration


    const [activeTab, setActiveTab] = useState('personal');
    const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
    const isLastTab = currentTabIndex === tabs.length - 1;

    // ၂။ useForm ထဲသို့ DB မှလာသော ဒေတာဟောင်းများကို အပြည့်အစုံထည့်သွင်းခြင်း
    const { data, setData, post, errors, processing } = useForm({
        _method: 'PUT', // for image
        // Tab 1: Personal (Main Employee Table)
        staff_number: employee.staff_number || '',
        name: employee.name || '',
        nickname: employee.nickname || '',
        alternative_name: employee.alternative_name || '',
        gender: employee.gender || 'ကျား',
        date_of_birth: employee.date_of_birth || '',
        age: employee.age || '',
        date_of_birth_detail: employee.date_of_birth_detail || '',
        birth_place: employee.birth_place || '',
        race: employee.race || '',
        religion: employee.religion || '',
        nrc_state: employee.nrc_state || '',
        nrc_township: employee.nrc_township || '',
        nrc_type: employee.nrc_type || '',
        nrc_number: employee.nrc_number || '',
        father_name: employee.father_name || '',
        father_job: employee.father_job || '',
        mother_name: employee.mother_name || '',
        marital_status: employee.marital_status || 'လူပျို/အပျို',
        spouse_name: employee.spouse_name || '',
        childrens: employee.info?.childrens || '',
        // Tab 1: Physical (One-to-One)
        height: employee.physical?.height || '',
        weight: employee.physical?.weight || '',
        hair_color: employee.physical?.hair_color || '',
        eye_color: employee.physical?.eye_color || '',
        blood_type: employee.physical?.blood_type || '',
        distinctive_mark: employee.physical?.distinctive_mark || '',

        // Tab 1: Info Extra (One-to-One)
        image_path: employee.info?.image_path || '',
        mobile_phno: employee.info?.mobile_phno || '',
        email: employee.info?.email || '',
        current_address: employee.info?.current_address || '',
        permanent_address: employee.info?.permanent_address || '',
        degree: employee.info?.degree || '',
        current_training: employee.info?.current_training || '',

        // Tab 2: Employment (One-to-One)

        position: employee.employment?.position || '',
        department: employee.employment?.department || '',
        salary_scale: employee.employment?.salary_scale || '',
        salary_rate: employee.employment?.salary_rate || '',
        employee_start_date_detail: employee.employment?.employee_start_date_detail || '',
        current_pos_start_date_detail: employee.employment?.current_pos_start_date_detail || '',
        current_depf_start_date_detail: employee.employment?.current_depf_start_date_detail || '',
        transfer_detail: employee.employment?.transfer_detail || '',
        penalty_detail: employee.employment?.penalty_detail || '',
        contract_agreement_detail: employee.employment?.contract_agreement_detail || '',
        foreign_detail: employee.employment?.foreign_detail || '',
        training_detail: employee.employment?.training_detail || '',
        is_accompanied: employee.info?.is_accompanied || '',
        not_border: employee.info?.not_border || '',

        training_course: employee.foreign_visited_purpose?.training_course || '',

        destination_country: employee.foreign_visited_purpose?.destination_country || '',
        assigned_country: employee.foreign_visited_purpose?.assigned_country || '',
        time_period: employee.foreign_visited_purpose?.time_period || '',
        arrival_date: employee.foreign_visited_purpose?.arrival_date || '',
        supporting_agency: employee.foreign_visited_purpose?.supporting_agency || '',
        return_department: employee.foreign_visited_purpose?.return_department || '',
        foreign_visit_details: employee.foreign_visited_purpose?.foreign_visit_details || '',

        referee_name: employee.referee?.referee_name || '', referee_position: employee.referee?.referee_position || '', referee_department: employee.referee?.referee_department || '', rector_name: employee.referee?.rector_name || '', rector_position: employee.referee?.rector_position || '', rector_department: employee.referee?.rector_department || '', dept_head_name: employee.referee?.dept_head_name || '', dept_head_position: employee.referee?.dept_head_position || '', dept_head_department: employee.referee?.dept_head_department || '',

        educations: employee.educations?.length > 0 ? employee.educations : [
            { degree_name: '', major_subject: '', graduation_year: '', degree_level: '' }
        ],
        trainings: employee.trainings?.length > 0 ? employee.trainings : [
            { learn_course: '', from_date: '', to_date: '', location: '', category: 'local_trainig' }
        ],
        service_records: employee.service_records?.length > 0 ? employee.service_records : [
            { position_held: '', department_name: '', start_date: '', end_date: '', location_region: '' }
        ],
        families: employee.family_members?.length > 0 ? employee.family_members : [
            { relation_name: '', relationship_type: '', gender: 'ကျား', nationality: '', occupation: '', address: '' }
        ],
        foreign_visits: employee.foreign_visits?.length > 0 ? employee.foreign_visits : [
            {
                'destination_country': '',
                'assigned_country': '',
                'time_period': '',
                'arrival_date': '',
                'training_course': '',
                'supporting_agency': '',
                'return_department': '',
                'foreign_visit_details': '',
            }
        ],
        abroad_visits: employee.abroad_visits?.length > 0 ? employee.abroad_visits : [
            {
                'employee_id': '',
                'country_visited': '',
                'visit_purpose': '',
                'abroad_from': '',
                'abroad_to': '',
                'foreign_currency_amount': '',
            }
        ],
        legal_records: employee.court_disciplinary_actions?.length > 0 ? employee.court_disciplinary_actions : [
            { record_type: 'disciplinary', period: '', reason: '', penalty: '' }
        ],
        awards: employee.awards_received?.length > 0 ? employee.awards_received : [
            { award_name: '', award_year: '', description: '' }
        ]
    });

    const handleNextStep = (e) => {
        if (e) e.preventDefault(); if (currentTabIndex < tabs.length - 1) setActiveTab(tabs[currentTabIndex + 1].id);
    };
    const handlePrevStep = () => { if (currentTabIndex > 0) setActiveTab(tabs[currentTabIndex - 1].id); };

    // Update Submit Form 
    const handleSubmit = (e) => {
        e.preventDefault();
        // Method ကို PUT ပုံစံဖြင့် လှမ်းပို့ခြင်း
        post(`/employees/${employee.id}`);
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

    // ➕ ➖ One-to-Many ဇယားများအတွက် Dynamic Row တိုး/လျှော့ Logic များ
    const addRow = (field, schema) => { setData(field, [...data[field], schema]); };
    const removeRow = (field, index) => {

        setData(field, data[field].filter((_, i) => i !== index));

    };
    const updateRowValue = (field, index, key, value) => {
        const updated = [...data[field]];
        updated[index][key] = value;
        setData(field, updated);
    };

    return (
        <AuthenticatedLayout

        >

            <Head title={`ဝန်ထမ်းပြင်ဆင်ရန် - ${employee.name}`} />

            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">✏️ ဝန်ထမ်းကိုယ်ရေးမှတ်တမ်း ပြင်ဆင်ခြင်း (Mega Form)</h2>
                        <p className="text-xs text-gray-500 mt-1">လက်ရှိပြင်ဆင်နေသည့် ဝန်ထမ်း - {employee.name} ({employee.staff_number || '-'})</p>
                    </div>
                    <Link href="/employees" className="text-sm font-bold text-gray-500 hover:text-black">⬅️ စာရင်းသို့ပြန်သွားရန်</Link>
                </div>

                {/* 🔄 Horizontal Tab Stepper */}
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

                {/* 📝 MAIN FORM */}
                <form id="employeeMegaEditForm" onSubmit={handleSubmit} className="space-y-6">

                    {/* ================= TAB 1: PERSONAL INFO ================= */}
                    {activeTab === 'personal' && (
                        <div className="space-y-6 animate-fadeIn">

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
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">ဝန်ထမ်းအမှတ်</label>
                                    <input type="text" value={data.staff_number} onChange={e => setData('staff_number', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">အမည် <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">ငယ်အမည်</label>
                                    <input type="text" value={data.nickname} onChange={e => setData('nickname', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">အခြားအမည်များ (ရှိလျှင်)</label>
                                    <input type="text" value={data.alternative_name} onChange={e => setData('alternative_name', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">ကျား / မ</label>
                                    <select value={data.gender} onChange={e => setData('gender', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                                        <option value="ကျား">ကျား</option>
                                        <option value="မ">မ</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">မွေးသက္ကရာဇ်</label>
                                    <input type="text" value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div><label className="block text-xs font-bold text-gray-700 mb-1">အသက်</label>
                                    <input type="number" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.age} onChange={e => setData('age', e.target.value)} /></div>
                                <div  ><label className="block text-xs font-bold text-gray-700 mb-1">မွေးနေ့သက္ကရာဇ် အသေးစိတ်မှတ်ချက်</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.date_of_birth_detail} onChange={e => setData('date_of_birth_detail', e.target.value)} /></div>
                                <div className="  mt-1">
                                    <label className="block text-xs font-bold text-gray-700 mb-1">နိုင်ငံသားစိစစ်ရေးအမှတ် (NRC)</label>
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
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">မွေးဖွားရာဇာတိ</label>
                                    <input type="text" value={data.birth_place} onChange={e => setData('birth_place', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">လူမျိုး</label>
                                    <input type="text" value={data.race} onChange={e => setData('race', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">ကိုးကွယ်သည့်ဘာသာ</label>
                                    <input type="text" value={data.religion} onChange={e => setData('religion', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">ဖခင်အမည်</label>
                                    <input type="text" value={data.father_name} onChange={e => setData('father_name', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>


                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">ဖခင်အလုပ်အကိုင်</label>
                                    <input type="text" value={data.father_job} onChange={e => setData('father_job', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">မိခင်အမည်</label>
                                    <input type="text" value={data.mother_name} onChange={e => setData('mother_name', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">အိမ်ထောင်ရေးအခြေအနေ</label>
                                    <select value={data.marital_status} onChange={e => setData('marital_status', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm">
                                        <option value="လူပျို/အပျို">လူပျို/အပျို</option>
                                        <option value="အိမ်ထောင်ရှိ">အိမ်ထောင်ရှိ</option>
                                        <option value="ကွာရှင်း">ကွာရှင်း</option>
                                        <option value="မုဆိုးဖို/မုဆိုးမ">မုဆိုးဖို/မုဆိုးမ</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">ဇနီး/ခင်ပွန်းအမည် (ရှိလျှင်)</label>
                                    <input type="text" value={data.spouse_name} onChange={e => setData('spouse_name', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>

                                <div><label className="block text-xs font-bold text-gray-700 mb-1">သားသမီးများရှိလျှင် အမည်များ</label>
                                    <input type="text" className="mt-1 block w-full rounded border-gray-300 shadow-sm" value={data.childrens} onChange={e => setData('childrens', e.target.value)} /></div>


                            </div>

                            {/* ကိုယ်ကာယ ကြံ့ခိုင်မှုပိုင်း */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h4 className="text-sm font-bold text-gray-800 mb-3">🧍 ကိုယ်ကာယအချက်အလက်များ</h4>
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">အရပ်</label>
                                        <input type="text" value={data.height} onChange={e => setData('height', e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">ကိုယ်အလေးချိန်</label>
                                        <input type="text" value={data.weight} onChange={e => setData('weight', e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">ဆံပင်အရောင်</label>
                                        <input type="text" value={data.hair_color} onChange={e => setData('hair_color', e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">မျက်စိအရောင်</label>
                                        <input type="text" value={data.eye_color} onChange={e => setData('eye_color', e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">သွေးအုပ်စု</label>
                                        <input type="text" value={data.blood_type} onChange={e => setData('blood_type', e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-600 mb-1">ထင်ရှားသောအမှတ်အသား</label>
                                        <input type="text" value={data.distinctive_mark} onChange={e => setData('distinctive_mark', e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* ဆက်သွယ်ရန် လိပ်စာ */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">လက်ကိုင်ဖုန်း</label>
                                    <input type="text" value={data.mobile_phno} onChange={e => setData('mobile_phno', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">အီးမေးလ်လိပ်စာ</label>
                                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">လက်ရှိနေရပ်လိပ်စာ</label>
                                    <textarea value={data.current_address} onChange={e => setData('current_address', e.target.value)} rows="2" className="w-full px-3 py-2 border rounded-lg text-sm"></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">အမြဲတမ်းနေရပ်လိပ်စာ</label>
                                    <textarea value={data.permanent_address} onChange={e => setData('permanent_address', e.target.value)} rows="2" className="w-full px-3 py-2 border rounded-lg text-sm"></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= TAB 2: EMPLOYMENT INFO ================= */}
                    {activeTab === 'employment' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                            <div><label className="block text-xs font-bold text-gray-700 mb-1">ပညာအရည်အချင်း</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" value={data.degree} onChange={e => setData('degree', e.target.value)} /></div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">လက်ရှိရာထူး</label>
                                <input type="text" value={data.position} onChange={e => setData('position', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">လက်ရှိဌာန</label>
                                <input type="text" value={data.department} onChange={e => setData('department', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">လစာနှုန်းစကေး</label>
                                <input type="text" value={data.salary_scale} onChange={e => setData('salary_scale', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">လက်ရှိလစာနှုန်း</label>
                                <input type="text" value={data.salary_rate} onChange={e => setData('salary_rate', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">လက်ရှိတာဝန် စတင်ဝင်ရောက်သည့်နေ့</label>
                                <input type='text' value={data.employee_start_date_detail} onChange={e => setData('employee_start_date_detail', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">လက်ရှိရာထူး စတင်ရရှိသည့်နေ့</label>
                                <input type='text' value={data.current_pos_start_date_detail} onChange={e => setData('current_pos_start_date_detail', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                            </div>




                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">ပြောင်းရွှေ့ တာဝန်ထမ်းဆောင်ခဲ့ဖူးသော ကျောင်း/ဌာန (အဆင့်ဆင့်မှ-ထိ)</label>
                                <textarea rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" value={data.transfer_detail} onChange={e => setData('transfer_detail', e.target.value)} /></div>
                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">နိုင်ငံခြား သွားရောက်ဖူးလျှင် အသေးစိတ်</label>
                                <textarea rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" value={data.foreign_detail} onChange={e => setData('foreign_detail', e.target.value)} /></div>

                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">ပြစ်ဒဏ် ချမှတ်ခံရဖူးခြင်းရှိ/ မရှိ အသေးစိတ်</label>
                                <textarea rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" value={data.penalty_detail} onChange={e => setData('penalty_detail', e.target.value)} /></div>
                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">နဝတ သင်တန်း အသေးစိတ်(တက်ရောက်ဖူးလျှင်)</label>
                                <textarea rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" value={data.training_detail} onChange={e => setData('training_detail', e.target.value)} /></div>


                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">သင်တန်းတက်ရောက်နေပါက အသေးစိတ်</label>
                                <textarea rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" value={data.current_training} onChange={e => setData('current_training', e.target.value)} /></div>

                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">တခြား တက္ကသိုလ်နှင့် တွဲဖက်နေပါက အသေးစိတ်</label>
                                <textarea rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" value={data.is_accompanied} onChange={e => setData('is_accompanied', e.target.value)} /></div>
                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-700 mb-1">နယ်ခံ / နယ်ဝေး</label>
                                <textarea rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" value={data.not_border} onChange={e => setData('not_border', e.target.value)} /></div>


                        </div>
                    )}

                    {/* ================= TAB 3: EDUCATION & TRAINING ================= */}
                    {activeTab === 'education' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-bold text-gray-800">🎓 (က) ပညာအရည်အချင်းမှတ်တမ်း</h4>
                                    <button type="button" onClick={() => addRow('educations', { degree_name: '', major_subject: '', graduation_year: '', degree_level: '' })} className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded">+ အသစ်ထည့်ရန်</button>
                                </div>
                                <table className="w-full border text-xs text-left">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border p-2">ဘွဲ့အမည် / အောင်မြင်သည့်တန်း</th>
                                            <th className="border p-2">အထူးပြုဘာသာ</th>
                                            <th className="border p-2">အောင်မြင်သည့်ခုနှစ်</th>
                                            <th className="border p-2">ရရှိသည့်အဆင့်</th>
                                            <th className="border p-2 text-center w-16">ဖျက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.educations.map((edu, idx) => (
                                            <tr key={idx}>
                                                <td className="border p-1"><input type="text" value={edu.degree_name} onChange={e => updateRowValue('educations', idx, 'degree_name', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1"><input type="text" value={edu.major_subject} onChange={e => updateRowValue('educations', idx, 'major_subject', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1"><input type="text" value={edu.graduation_year} onChange={e => updateRowValue('educations', idx, 'graduation_year', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1"><input type="text" value={edu.degree_level} onChange={e => updateRowValue('educations', idx, 'degree_level', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1 text-center"><button type="button" onClick={() => removeRow('educations', idx)} className="text-red-600 font-bold">❌</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* သင်တန်းဇယား */}
                            <TrainingEditTab data={data} removeRow={removeRow} addRow={addRow} updateRowValue={updateRowValue} />
                        </div>
                    )}

                    {/* ================= TAB 4: SERVICE RECORD ================= */}
                    {activeTab === 'service' && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-bold text-gray-800">🏢 နိုင်ငံ့ဝန်ထမ်း တာဝန်ထမ်းဆောင်မှုမှတ်တမ်း (စစ်ဘက်/နယ်ဘက်)</h4>
                                <button type="button" onClick={() => addRow('service_records', { position_held: '', department_name: '', start_date: '', end_date: '', location_region: '' })} className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded">+ အသစ်ထည့်ရန်</button>
                            </div>
                            <table className="w-full border text-xs text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border p-2">ထမ်းဆောင်ခဲ့သည့် ရာထူး</th>
                                        <th className="border p-2">ဌာန / အလုပ်ဌာနအမည်</th>
                                        <th className="border p-2">စတင်သည့်ရက်</th>
                                        <th className="border p-2">ပြီးဆုံးသည့်ရက်</th>
                                        <th className="border p-2">နေရာဒေသ / တိုင်းဒေသကြီး</th>
                                        <th className="border p-2 text-center w-16">ဖျက်</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.service_records.map((rec, idx) => (
                                        <tr key={idx}>
                                            <td className="border p-1"><input type="text" value={rec.service_position} onChange={e => updateRowValue('service_records', idx, 'service_position', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                            <td className="border p-1"><input type="text" value={rec.service_department} onChange={e => updateRowValue('service_records', idx, 'service_department', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                            <td className="border p-1"><input type="text" value={rec.service_from} onChange={e => updateRowValue('service_records', idx, 'service_from', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                            <td className="border p-1"><input type="text" value={rec.service_to} onChange={e => updateRowValue('service_records', idx, 'service_to', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                            <td className="border p-1"><input type="text" value={rec.service_location} onChange={e => updateRowValue('service_records', idx, 'service_location', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                            <td className="border p-1 text-center"><button type="button" onClick={() => removeRow('service_records', idx)} className="text-red-600 font-bold">❌</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* ================= TAB 5: FAMILY MEMBERS ================= */}
                    {activeTab === 'family' && (
                        <FamilyEditTab data={data} removeRow={removeRow} addRow={addRow} updateRowValue={updateRowValue} />
                    )}

                    {/* ================= TAB 6: FOREIGN TRIP RECORDS ================= */}
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

                            <div className="space-y-4 animate-fadeIn">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-bold text-gray-800">✈️ နိုင်ငံခြားသို့ သွားရောက်ခဲ့သည့် ခရီးစဉ်မှတ်တမ်းများ</h4>
                                    <button type="button" onClick={() => addRow('abroad_visits', {
                                        'employee_id': '',
                                        'country_visited': '',
                                        'visit_purpose': '',
                                        'abroad_from': '',
                                        'abroad_to': '',
                                        'foreign_currency_amount': '',
                                    })} className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded">+ အသစ်ထည့်ရန်</button>
                                </div>
                                <table className="w-full border text-xs text-left">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border p-2">သွားရောက်ခဲ့သည့် နိုင်ငံ</th>
                                            <th className="border p-2">ခရီးစဉ်ကိစ္စ / ရည်ရွယ်ချက်</th>
                                            <th className="border p-2">သွားရောက်ခဲ့သည့် ကာလ</th>
                                            <th className="border p-2">ပြန်လည်ရောက်ရှိသည့် နေ့</th>
                                            <th className="border p-2">နိုင်ငံခြားငွေ မည်မျှ ထုတ်ယူခဲ့သည်</th>
                                            <th className="border p-2 text-center w-16">ဖျက်</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.abroad_visits.map((f, idx) => (
                                            <tr key={idx}>
                                                <td className="border p-1"><input type="text" value={f.abroad_from} onChange={e => updateRowValue('abroad_visits', idx, 'abroad_from', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1"><input type="text" value={f.abroad_to} onChange={e => updateRowValue('abroad_visits', idx, 'abroad_to', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1"><input type="text" value={f.country_visited} onChange={e => updateRowValue('abroad_visits', idx, 'country_visited', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1"><input type="text" value={f.visit_purpose} onChange={e => updateRowValue('abroad_visits', idx, 'visit_purpose', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1"><input type="text" value={f.foreign_currency_amount} onChange={e => updateRowValue('abroad_visits', idx, 'foreign_currency_amount', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                                <td className="border p-1 text-center"><button type="button" onClick={() => removeRow('abroad_visits', idx)} className="text-red-600 font-bold">❌</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* ================= TAB 7: LEGAL RECORDS & AWARDS ================= */}
                    {activeTab === 'legal_awards' && (
                        <LegalEditTab data={data} removeRow={removeRow} addRow={addRow} updateRowValue={updateRowValue} />
                    )}


                    {activeTab === "referee" && (
                        <div className="space-y-6">
                            <Referee data={data} setData={setData} />
                        </div>
                    )}
                </form>

                {/* 🔘 BOTTOM FOOTER ACTIONS BUTTONS */}
                <div className="flex justify-between items-center border-t pt-5 mt-8">
                    {currentTabIndex > 0 ? (
                        <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 text-sm rounded-lg font-semibold" onClick={handlePrevStep}>
                            ⬅️ နောက်သို့
                        </button>
                    ) : <div />}

                    {!isLastTab ? (
                        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm rounded-lg font-semibold" onClick={(e) => handleNextStep(e)}>
                            နောက်တစ်ဆင့် သို့ ➡️
                        </button>
                    ) : (
                        <button type="submit" form="employeeMegaEditForm" disabled={processing} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-sm rounded-lg font-bold">
                            {processing ? 'ပြင်ဆင်ချက်များ သိမ်းနေပါသည်...' : '💾 ပြင်ဆင်ချက်အားလုံး သိမ်းဆည်းမည်'}
                        </button>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}