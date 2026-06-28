// src/Pages/Employees/Edit.tsx
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { tabs } from "@/constant/Tabs";
import EmployeeFormFields from "./components/StaffFormFields";
import { validateHelperTabs } from "@/util/validationHelper";
import Swal from "sweetalert2";

export default function EditEmployee({ employee }) {
    const [activeTab, setActiveTab] = useState("personal");
    const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

    const { data, setData, post, errors, setError, clearErrors, processing } =
        useForm({
            _method: "PUT",
            staff_number: employee.staff_number || "",
            is_rector_or_above: employee.is_rector_or_above || 0,
            name: employee.name || "",
            nickname: employee.nickname || "",
            alternative_name: employee.alternative_name || "",
            gender: employee.gender || "ကျား",
            date_of_birth: employee.date_of_birth || "",
            age: employee.age || "",
            date_of_birth_detail: employee.date_of_birth_detail || "",
            birth_place: employee.birth_place || "",
            race: employee.race || "",
            religion: employee.religion || "",
            nrc_state: employee.nrc_state || "",
            nrc_township: employee.nrc_township || "",
            nrc_type: employee.nrc_type || "",
            nrc_number: employee.nrc_number || "",
            father_name: employee.father_name || "",
            father_job: employee.father_job || "",
            mother_name: employee.mother_name || "",
            marital_status: employee.marital_status || "",
            spouse_name: employee.spouse_name || "",
            childrens: employee.info?.childrens || "",
            height: employee.physical?.height || "",
            weight: employee.physical?.weight || "",
            hair_color: employee.physical?.hair_color || "",
            eye_color: employee.physical?.eye_color || "",
            blood_type: employee.physical?.blood_type || "",
            distinctive_mark: employee.physical?.distinctive_mark || "",
            image_path: employee.info?.image_path || "",
            mobile_phno: employee.info?.mobile_phno || "",
            email: employee.info?.email || "",
            current_address: employee.info?.current_address || "",
            permanent_address: employee.info?.permanent_address || "",
            degree: employee.info?.degree || "",
            separation_date: employee.info?.separation_date,
            remark: employee.info?.remark,
            current_training: employee.info?.current_training || "",
            position: employee.employment?.position || "",
            department: employee.employment?.department || "",
            salary_scale: employee.employment?.salary_scale || "",
            salary_rate: employee.employment?.salary_rate || "",
            year_of_service: employee.employment?.year_of_service,
            employee_start_date_detail:
                employee.employment?.employee_start_date_detail || "",
            current_pos_start_date_detail:
                employee.employment?.current_pos_start_date_detail || "",
            current_dept_start_date_detail:
                employee.employment?.current_dept_start_date_detail || "",
            transfer_detail: employee.employment?.transfer_detail || "",
            penalty_detail: employee.employment?.penalty_detail || "",
            contract_agreement_detail:
                employee.employment?.contract_agreement_detail || "",
            foreign_detail: employee.employment?.foreign_detail || "",
            training_detail: employee.employment?.training_detail || "",
            is_accompanied: employee.info?.is_accompanied || "",
            not_border: employee.info?.not_border || "",
            training_course:
                employee.foreign_visited_purpose?.training_course || "",
            destination_country:
                employee.foreign_visited_purpose?.destination_country || "",
            assigned_country:
                employee.foreign_visited_purpose?.assigned_country || "",
            time_period: employee.foreign_visited_purpose?.time_period || "",
            arrival_date: employee.foreign_visited_purpose?.arrival_date || "",
            supporting_agency:
                employee.foreign_visited_purpose?.supporting_agency || "",
            return_department:
                employee.foreign_visited_purpose?.return_department || "",
            foreign_visit_details:
                employee.foreign_visited_purpose?.foreign_visit_details || "",
            referee_name: employee.referee?.referee_name || "",
            referee_position: employee.referee?.referee_position || "",
            referee_department: employee.referee?.referee_department || "",
            rector_name: employee.referee?.rector_name || "",
            rector_position: employee.referee?.rector_position || "",
            rector_department: employee.referee?.rector_department || "",
            dept_head_name: employee.referee?.dept_head_name || "",
            dept_head_position: employee.referee?.dept_head_position || "",
            dept_head_department: employee.referee?.dept_head_department || "",

            skin_color: employee.details?.skin_color || "",
            is_parent_season_at_birth:
                employee.details?.is_parent_season_at_birth || "",
            previous_address: employee.details?.previous_address || "",
            father_address_detail:
                employee.details?.father_address_detail || "",
            mother_address_detail:
                employee.details?.mother_address_detail || "",
            reason_for_current_occupation:
                employee.details?.reason_for_current_occupation || "",
            selection_type: employee.details?.selection_type || "",
            previous_school: employee.details?.previous_school || "",
            last_school: employee.details?.last_school || "",
            student_level: employee.details?.student_level || "",
            hobby: employee.details?.hobby || "",
            referee_status: employee.details?.referee_status || "",
            reason_for_transfer: employee.details?.reason_for_transfer || "",
            service_rank: employee.details?.service_rank || "",
            close_friend: employee.details?.close_friend || "",
            close_foreign_friend: employee.details?.close_foreign_friend || "",
            supporter: employee.details?.supporter || "",
            crime_victim_status: employee.details?.crime_victim_status || "",
            is_party_member: employee.details?.is_party_member || "",
            employment_reference: employee.details?.employment_reference || "",
            educations:
                employee.educations?.length > 0 ? employee.educations : [],
            trainings: employee.trainings?.length > 0 ? employee.trainings : [],
            service_records:
                employee.service_records?.length > 0
                    ? employee.service_records
                    : [],
            families:
                employee.family_members?.length > 0
                    ? employee.family_members
                    : [],
            foreign_visits:
                employee.foreign_visits?.length > 0
                    ? employee.foreign_visits
                    : [],
            abroad_visits:
                employee.abroad_visits?.length > 0
                    ? employee.abroad_visits
                    : [],
            legal_records:
                employee.court_disciplinary_actions?.length > 0
                    ? employee.court_disciplinary_actions
                    : [],
            criminal_records:
                employee.criminal_records?.length > 0
                    ? employee.criminal_records
                    : [],
            awards:
                employee.awards_received?.length > 0
                    ? employee.awards_received
                    : [],
            past_jobs: employee.past_jobs?.length > 0 ? employee.past_jobs : [],
        });

    const addRow = (field, schema) => setData(field, [...data[field], schema]);
    const removeRow = (field, index) =>
        setData(
            field,
            data[field].filter((_, i) => i !== index),
        );
    const handleDynamicChange = (field, index, key, value) => {
        const updated = [...data[field]];
        updated[index][key] = value;
        setData(field, updated);
    };

    const validateTabs = () => {
        const { isValid, localErrors } = validateHelperTabs(activeTab, data);
        clearErrors();
        if (!isValid) {
            setError(localErrors);
            Swal.fire({
                icon: "error",
                text: "လိုအပ်သည့် ဒေတာများအားလုံးပြည့်စုံစွာ ဖြည့်ရန်လိုအပ်ပါသည်",
                confirmButtonText: "နားလည်ပါပြီ",
                confirmButtonColor: "oklch(0.577 0.245 27.325)",
            });
        }
        return isValid;
    };

    const isSecLastTab = currentTabIndex === tabs.length - 2;
    const isLastTab = currentTabIndex === tabs.length - 1;

    const shouldFormEndHere = isSecLastTab && !data.is_rector_or_above;

    const handleTabChange = (targetTabId) => {
        const targetTabIndex = tabs.findIndex((tab) => tab.id === targetTabId);

        if (targetTabIndex <= currentTabIndex) {
            setActiveTab(targetTabId);
            clearErrors();
            return;
        }

        if (!validateTabs()) return;

        if (targetTabIndex === tabs.length - 1 && !data.is_rector_or_above) {
            Swal.fire({
                icon: "error",
                text: "အထက်လူကြီးဖြစ်မှသာ နောက်ဆုံးအဆင့် (၉ ခုမြှောက် Tab) သို့ သွားရောက်နိုင်ပါသည်။",
                confirmButtonText: "နားလည်ပါပြီ",
                confirmButtonColor: "oklch(0.577 0.245 27.325)",
            });

            return;
        }

        setActiveTab(targetTabId);
    };
    const handleNextStep = (e) => {
        if (e) e.preventDefault();

        if (!validateTabs()) return;

        if (shouldFormEndHere) {
            if (!validateTabs()) return;

            post(route("employees.store"));
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
        if (!validateTabs()) return;

        if (isLastTab || shouldFormEndHere) {
            post(route("employees.update", employee.id));
        }
    };

    const handleFormInput = (e) => {
        if (e.target.tagName.toLowerCase() === "textarea") {
            e.target.style.resize = "none";
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const [imagePreview, setImagePreview] = useState(
        employee.info?.image_path
            ? `/storage/${employee.info.image_path}`
            : null,
    );
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image_path", file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ဝန်ထမ်းအချက်အလက် ပြင်ဆင်ခြင်း
                </h2>
            }
        >
            <Head title={`ဝန်ထမ်းအချက်အလက် ပြင်ဆင်ခြင်း`} />
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    နိုင်ငံ့ဝန်ထမ်း ကိုယ်ရေးမှတ်တမ်း ပြင်ဆင်ရန်
                </h2>

                <div className="flex flex-wrap gap-1.5 mb-6 border-b pb-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => handleTabChange(tab.id)}
                            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab.id ? "bg-black text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form
                    onSubmit={handleSubmit}
                    id="employeeMegaForm"
                    onInput={handleFormInput}
                    className="space-y-6"
                >
                    <EmployeeFormFields
                        activeTab={activeTab}
                        data={data}
                        setData={setData}
                        errors={errors}
                        imagePreview={imagePreview}
                        handleImageChange={handleImageChange}
                        handleDynamicChange={handleDynamicChange}
                        removeRow={removeRow}
                        addRow={addRow}
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

                    {shouldFormEndHere || isLastTab ? (
                        <button
                            type="submit"
                            form="employeeMegaForm"
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow font-bold"
                            onClick={handleSubmit}
                        >
                            {processing ? "ပြင်ဆင်နေပါသည်..." : "ပြင်ဆင်မည်..."}
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-semibold"
                            onClick={(e) => handleNextStep(e)}
                        >
                            နောက်တစ်ဆင့် သို့
                        </button>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
