// src/Pages/Employees/Edit.tsx
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { tabs } from "@/constant/Tabs";
import EmployeeFormFields from "./components/StaffFormFields";

export default function EditEmployee({ employee }) {
    const [activeTab, setActiveTab] = useState("personal");
    const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const isLastTab = currentTabIndex === tabs.length - 1;

    const { data, setData, post, errors, setError, clearErrors, processing } =
        useForm({
            _method: "PUT",
            staff_number: employee.staff_number || "",
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

            educations:
                employee.educations?.length > 0
                    ? employee.educations
                    : [
                          {
                              degree_name: "",
                              major_subject: "",
                              graduation_year: "",
                              degree_level: "",
                          },
                      ],
            trainings:
                employee.trainings?.length > 0
                    ? employee.trainings
                    : [
                          {
                              learn_course: "",
                              from_date: "",
                              to_date: "",
                              location: "",
                              category: "local_trainig",
                          },
                      ],
            service_records:
                employee.service_records?.length > 0
                    ? employee.service_records
                    : [
                          {
                              position_held: "",
                              department_name: "",
                              start_date: "",
                              end_date: "",
                              location_region: "",
                          },
                      ],
            families:
                employee.family_members?.length > 0
                    ? employee.family_members
                    : [
                          {
                              relation_name: "",
                              relationship_type: "",
                              gender: "ကျား",
                              nationality: "",
                              occupation: "",
                              address: "",
                          },
                      ],
            foreign_visits:
                employee.foreign_visits?.length > 0
                    ? employee.foreign_visits
                    : [
                          {
                              destination_country: "",
                              assigned_country: "",
                              time_period: "",
                              arrival_date: "",
                              training_course: "",
                              supporting_agency: "",
                              return_department: "",
                              foreign_visit_details: "",
                          },
                      ],
            abroad_visits:
                employee.abroad_visits?.length > 0
                    ? employee.abroad_visits
                    : [
                          {
                              employee_id: "",
                              country_visited: "",
                              visit_purpose: "",
                              abroad_from: "",
                              abroad_to: "",
                              foreign_currency_amount: "",
                          },
                      ],
            legal_records:
                employee.court_disciplinary_actions?.length > 0
                    ? employee.court_disciplinary_actions
                    : [
                          {
                              record_type: "disciplinary",
                              period: "",
                              reason: "",
                              penalty: "",
                          },
                      ],
            criminal_records:
                employee.criminal_records?.length > 0
                    ? employee.criminal_records
                    : [
                          {
                              criminalPenalty: "",
                              reasonPelanty: "",
                              criminalFrom: "",
                              criminalTo: "",
                          },
                      ],
            awards:
                employee.awards_received?.length > 0
                    ? employee.awards_received
                    : [{ award_name: "", award_year: "", description: "" }],
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
        let localErrors = {};
        let isValid = true;
        if (activeTab === "personal") {
            const personalFields = [
                "staff_number",
                "name",
                "nickname",
                "alternative_name",
                "gender",
                "date_of_birth",
                "age",
                "birth_place",
                "race",
                "religion",
                "blood_type",
                "marital_status",
                "spouse_name",
                "height",
                "weight",
                "hair_color",
                "eye_color",
                "distinctive_mark",
                "childrens",
                "father_name",
                "father_job",
                "mother_name",
            ];

            personalFields.forEach((field) => {
                if (!data[field] || String(data[field]).trim() === "") {
                    localErrors[field] =
                        "ဤအချက်အလက်အား ဖြည့်စွက်ရန် လိုအပ်ပါသည်။";
                    isValid = false;
                }
            });
        }

        if (activeTab === "employment") {
            const employmentFields = [
                "degree",
                "position",
                "department",
                "salary_rate",
                "employee_start_date_detail",
                "current_pos_start_date_detail",
                "current_dept_start_date_detail",
                "year_of_service",
                "separation_date",
                "transfer_detail",
                "foreign_detail",
                "penalty_detail",
                "training_detail",
                "current_training",
                "is_accompanied",
                "not_border",
                "current_address",
                "permanent_address",
                "email",
                "mobile_phno",
                "contract_agreement_detail",
                "remark",
            ];

            employmentFields.forEach((field) => {
                if (!data[field] || String(data[field]).trim() === "") {
                    localErrors[field] =
                        "ဤအချက်အလက်အား ဖြည့်စွက်ရန် လိုအပ်ပါသည်။";
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
        const targetTabIndex = tabs.findIndex((tab) => tab.id === targetTabId);

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
        if (currentTabIndex > 0) setActiveTab(tabs[currentTabIndex - 1].id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLastTab) {
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
                    {!isLastTab ? (
                        <button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-semibold"
                            onClick={(e) => handleNextStep(e)}
                        >
                            နောက်တစ်ဆင့် သို့
                        </button>
                    ) : (
                        <button
                            type="submit"
                            form="employeeMegaForm"
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow font-bold"
                        >
                            {processing
                                ? "ပြင်ဆင်နေပါသည်..."
                                : "အချက်အလက်များအားလုံး ပြင်ဆင်မည်"}
                        </button>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
