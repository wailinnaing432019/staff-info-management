export const validateHelperTabs = (activeTab, data) => {
    let localErrors = {};
    let isValid = true;

    if (activeTab === "personal") {
        const personalFields = [
            "name",
            "gender",
            "date_of_birth",
            "age",
            "birth_place",
            "race",
            "religion",
            "blood_type",
            "marital_status",
            "height",
            "weight",
            "hair_color",
            "eye_color",
            "distinctive_mark",
            "father_name",
            "mother_name",
            "nrc_state",
            "nrc_township",
            "nrc_number",
            "nrc_type",
        ];

        personalFields.forEach((field) => {
            if (!data[field] || String(data[field]).trim() === "") {
                localErrors[field] = "ဤအချက်အလက်အား ဖြည့်စွက်ရန် လိုအပ်ပါသည်။";
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
            "foreign_detail",
            "penalty_detail",
            "training_detail",
            "not_border",
            "current_address",
            "permanent_address",
            "email",
            "mobile_phno",
            "contract_agreement_detail",
        ];

        employmentFields.forEach((field) => {
            if (!data[field] || String(data[field]).trim() === "") {
                localErrors[field] = "ဤအချက်အလက်အား ဖြည့်စွက်ရန် လိုအပ်ပါသည်။";
                isValid = false;
            }
        });
    }

    if (activeTab === "detail_history") {
        const detailsFields = [
            "skin_color",
            "previous_address",
            "father_address_detail",
            "mother_address_detail",
            "is_parent_season_at_birth",
            "selection_type",
            "current_dept_start_date_detail",
            "reason_for_current_occupation",
        ];

        detailsFields.forEach((field) => {
            if (!data[field] || String(data[field]).trim() === "") {
                localErrors[field] = "ဤအချက်အလက်အား ဖြည့်စွက်ရန် လိုအပ်ပါသည်။";
                isValid = false;
            }
        });
    }

    return { isValid, localErrors };
};
