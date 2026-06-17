import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import FamilyTab from './FamilyTab';
import TrainingTab from './TrainingTab';
import LegalTab from './LegalTab';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NRCInputFields from './components/NRCInputFields';
import nrcData from '@/constant/NRCData';
import { tabs } from '@/constant/Tabs';
import Referee from './components/Referee';
import EmployeeFormFields from './components/StaffFormFields';

export default function EmployeeForm() {


    const [activeTab, setActiveTab] = useState('personal');

    const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);

    const isLastTab = currentTabIndex === tabs.length - 1;



    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({

        staff_number: '', name: '', nickname: '', alternative_name: '', gender: 'male',
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

        abroad_visits: [],
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

    const validateTabs = () => {
        let localErrors = {};
        let isValid = true;

 
        if (activeTab === 'personal') {
            const personalFields = [
                'staff_number', 'name', 'nickname', 'alternative_name', 'gender',
                'date_of_birth', 'age', 'birth_place', 'race', 'religion',
                'blood_type', 'marital_status', 'spouse_name', 'height', 'weight',
                'hair_color', 'eye_color', 'distinctive_mark', 'childrens',
                'father_name', 'father_job', 'mother_name'
            ];

            personalFields.forEach(field => {
                if (!data[field] || String(data[field]).trim() === '') {
                    localErrors[field] = 'ဤအချက်အလက်အား ဖြည့်စွက်ရန် လိုအပ်ပါသည်။';
                    isValid = false;
                }
            });
        }

 
        if (activeTab === 'employment') {
            const employmentFields = [
                'degree', 'position', 'department', 'salary_rate',
                'employee_start_date_detail', 'current_pos_start_date_detail',
                'current_dept_start_date_detail', 'year_of_service', 'separation_date',
                'transfer_detail', 'foreign_detail', 'penalty_detail', 'training_detail',
                'current_training', 'is_accompanied', 'not_border', 'current_address',
                'permanent_address', 'email', 'mobile_phno', 'contract_agreement_detail', 'remark'
            ];

            employmentFields.forEach(field => {
                if (!data[field] || String(data[field]).trim() === '') {
                    localErrors[field] = 'ဤအချက်အလက်အား ဖြည့်စွက်ရန် လိုအပ်ပါသည်။';
                    isValid = false;
                }
            });
        }

      

        if (!isValid) {
            setError(localErrors);
        } else {
           
            clearErrors();
        }

        return isValid;
    };

    const handleTabChange = (targetTabId) => {
        const targetTabIndex = tabs.findIndex(tab => tab.id === targetTabId);

        if (targetTabIndex <= currentTabIndex) {
            setActiveTab(targetTabId);
            clearErrors();
            return;
        }


        if (!validateTabs()) {
            return;
        }

        setActiveTab(targetTabId);
    };
    const handleNextStep = (e) => {
        if (e) e.preventDefault();

        if (!validateTabs()) {

            return;
        }
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
                            onClick={() => handleTabChange(tab.id)}
                            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab.id ? 'bg-black text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <form onSubmit={handleSubmit} id="employeeMegaForm" onInput={handleFormInput} className="space-y-6">
                    <EmployeeFormFields
                        activeTab={activeTab} data={data} setData={setData} errors={errors}
                        imagePreview={imagePreview} handleImageChange={handleImageChange}
                        handleDynamicChange={handleDynamicChange} removeRow={removeRow} addRow={addRow}
                    />
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