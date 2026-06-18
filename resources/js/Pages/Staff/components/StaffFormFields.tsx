import NRCInputFields from "./NRCInputFields";
import nrcData from "@/constant/NRCData";
import FamilyTab from "../FamilyTab";
import TrainingTab from "../TrainingTab";
import LegalTab from "../LegalTab";
import Referee from "./Referee";

const InputField = ({
    label,
    value,
    onChange,
    error,
    type = "text",
    required = true,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            className={`mt-1 block w-full rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                error ? "border-red-500" : "border-gray-300"
            }`}
            value={value || ""}
            onChange={onChange}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);
const TextareaField = ({
    label,
    value,
    onChange,
    error,
    rows = 1,
    required = true,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            rows={rows}
            className={`mt-1 block w-full rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                error ? "border-red-500" : "border-gray-300"
            }`}
            value={value || ""}
            onChange={onChange}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);
export default function EmployeeFormFields({
    activeTab,
    data,
    setData,
    errors,
    imagePreview,
    handleImageChange,
    handleDynamicChange,
    removeRow,
    addRow,
}) {
    return (
        <>
            {activeTab === "personal" && (
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
                                        <span className="text-[10px] font-bold text-gray-600">
                                            လိုင်စင်ပုံ
                                        </span>
                                        <span className="text-[9px] text-gray-500">
                                            (2" x 2")
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <span className="block text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition">
                                    {imagePreview
                                        ? "ဓာတ်ပုံအသစ် ရွေးချယ်ရန်"
                                        : "လိုင်စင်ဓာတ်ပုံ တင်ရန်"}
                                </span>
                                <p className="mt-1 text-xs text-gray-500">
                                    PNG, JPG (အကြံပြု)
                                </p>
                            </div>
                        </label>
                    </div>

                    {/* Personal Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField
                            label="အမည်"
                            value={data.name}
                            error={errors.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputField
                            label="ငယ်အမည်"
                            value={data.nickname}
                            error={errors.nickname}
                            required={false}
                            onChange={(e) =>
                                setData("nickname", e.target.value)
                            }
                        />
                        <InputField
                            label="အခြားအမည်များ (ရှိလျှင်)"
                            value={data.alternative_name}
                            error={errors.alternative_name}
                            required={false}
                            onChange={(e) =>
                                setData("alternative_name", e.target.value)
                            }
                        />
                        <InputField
                            label="ဝန်ထမ်းအမှတ်"
                            value={data.staff_number}
                            error={errors.staff_number}
                            required={false}
                            onChange={(e) =>
                                setData("staff_number", e.target.value)
                            }
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                ကျား/ မ <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={`mt-1 block w-full rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                                value={data.gender || ""}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                            >
                                <option value="">ရွေးချယ်ရန်</option>
                                <option value="male">ကျား</option>
                                <option value="female">မ</option>
                            </select>
                            {errors.gender && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.gender}
                                </p>
                            )}
                        </div>

                        <InputField
                            label="မွေးနေ့ (ရက်၊ လ၊ နှစ်)"
                            value={data.date_of_birth}
                            error={errors.date_of_birth}
                            onChange={(e) =>
                                setData("date_of_birth", e.target.value)
                            }
                        />
                        <InputField
                            label="အသက်"
                            value={data.age}
                            error={errors.age}
                            onChange={(e) => setData("age", e.target.value)}
                        />
                        <TextareaField
                            label="မွေးဖွားရာဇာတိ"
                            value={data.birth_place}
                            error={errors.birth_place}
                            onChange={(e) =>
                                setData("birth_place", e.target.value)
                            }
                        />
                        <InputField
                            label="လူမျိုး (လူမျိုးစုဖြစ်လျှင်လိုအပ်သလိုဖော်ပြရန်)"
                            value={data.race}
                            error={errors.race}
                            onChange={(e) => setData("race", e.target.value)}
                        />

                        {/* NRC Input Field */}
                        <div className="col-span-1 md:col-span-2 mt-1">
                            <label className="block text-sm font-medium text-gray-700">
                                အမျိုးသားမှတ်ပုံတင်အမှတ်
                            </label>
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

                        <InputField
                            label="ကိုးကွယ်သည့်ဘာသာ"
                            value={data.religion}
                            error={errors.religion}
                            onChange={(e) =>
                                setData("religion", e.target.value)
                            }
                        />
                        <InputField
                            label="သွေးအုပ်စု"
                            value={data.blood_type}
                            error={errors.blood_type}
                            onChange={(e) =>
                                setData("blood_type", e.target.value)
                            }
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                အိမ်ထောင်ရှိ/ မရှိ{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={`mt-1 block w-full rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.marital_status ? "border-red-500" : "border-gray-300"}`}
                                value={data.marital_status || ""}
                                onChange={(e) =>
                                    setData("marital_status", e.target.value)
                                }
                            >
                                <option value="">ရွေးချယ်ရန်</option>
                                <option value="ရှိ">ရှိ</option>
                                <option value="မရှိ">မရှိ</option>
                            </select>
                            {errors.marital_status && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.marital_status}
                                </p>
                            )}
                        </div>
                        <InputField
                            label="ဇနီး/ ခင်ပွန်း အမည်"
                            value={data.spouse_name}
                            error={errors.spouse_name}
                            required={false}
                            onChange={(e) =>
                                setData("spouse_name", e.target.value)
                            }
                        />
                        <InputField
                            label="အရပ်"
                            value={data.height}
                            error={errors.height}
                            onChange={(e) => setData("height", e.target.value)}
                        />
                        <InputField
                            label="ကိုယ်အလေးချိန်"
                            value={data.weight}
                            error={errors.weight}
                            onChange={(e) => setData("weight", e.target.value)}
                        />
                        <InputField
                            label="ဆံပင်အရောင်"
                            value={data.hair_color}
                            error={errors.hair_color}
                            onChange={(e) =>
                                setData("hair_color", e.target.value)
                            }
                        />
                        <InputField
                            label="မျက်စိအရောင်"
                            value={data.eye_color}
                            error={errors.eye_color}
                            onChange={(e) =>
                                setData("eye_color", e.target.value)
                            }
                        />
                        <InputField
                            label="ထင်ရှားသည့်အမှတ်အသား"
                            value={data.distinctive_mark}
                            error={errors.distinctive_mark}
                            onChange={(e) =>
                                setData("distinctive_mark", e.target.value)
                            }
                        />
                        <InputField
                            label="သား/ သမီး အမည်"
                            value={data.childrens}
                            error={errors.childrens}
                            required={false}
                            onChange={(e) =>
                                setData("childrens", e.target.value)
                            }
                        />

                        <div className="md:col-span-3 border-t pt-4 mt-2 font-bold text-gray-700 text-base">
                            မိဘအချက်အလက်များ
                        </div>
                        <InputField
                            label="အဘအမည်"
                            value={data.father_name}
                            error={errors.father_name}
                            onChange={(e) =>
                                setData("father_name", e.target.value)
                            }
                        />
                        <InputField
                            label="အဘ၏အလုပ်အကိုင်"
                            value={data.father_job}
                            error={errors.father_job}
                            required={false}
                            onChange={(e) =>
                                setData("father_job", e.target.value)
                            }
                        />
                        <InputField
                            label="အမိအမည်"
                            value={data.mother_name}
                            error={errors.mother_name}
                            onChange={(e) =>
                                setData("mother_name", e.target.value)
                            }
                        />
                    </div>
                </div>
            )}

            {activeTab === "employment" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                        label="ပညာအရည်အချင်း အပြည့်အစုံ"
                        value={data.degree}
                        error={errors.degree}
                        onChange={(e) => setData("degree", e.target.value)}
                    />
                    <InputField
                        label="လက်ရှိရာထူး"
                        value={data.position}
                        error={errors.position}
                        onChange={(e) => setData("position", e.target.value)}
                    />
                    <InputField
                        label="လက်ရှိဌာန"
                        value={data.department}
                        error={errors.department}
                        onChange={(e) => setData("department", e.target.value)}
                    />
                    <InputField
                        label="လက်ရှိလစာနှုန်း"
                        value={data.salary_rate}
                        error={errors.salary_rate}
                        onChange={(e) => setData("salary_rate", e.target.value)}
                    />
                    <InputField
                        label="အလုပ်စတင်ဝင်ရောက်သည့်နေ့ (ရက်၊ လ၊ နှစ်)"
                        value={data.employee_start_date_detail}
                        error={errors.employee_start_date_detail}
                        onChange={(e) =>
                            setData(
                                "employee_start_date_detail",
                                e.target.value,
                            )
                        }
                    />
                    <InputField
                        label="လက်ရှိရာထူးရသည့်နေ့ (ရက်၊ လ၊ နှစ်)"
                        value={data.current_pos_start_date_detail}
                        error={errors.current_pos_start_date_detail}
                        onChange={(e) =>
                            setData(
                                "current_pos_start_date_detail",
                                e.target.value,
                            )
                        }
                    />
                    <InputField
                        label="လက်ရှိဌာနသို့ရောက်သည့်နေ့ (ရက်၊ လ၊ နှစ်)"
                        value={data.current_dept_start_date_detail}
                        error={errors.current_dept_start_date_detail}
                        onChange={(e) =>
                            setData(
                                "current_dept_start_date_detail",
                                e.target.value,
                            )
                        }
                    />
                    <InputField
                        label="အမှုထမ်းသက်တမ်း (နှစ်၊ လ၊ ရက်)"
                        value={data.year_of_service}
                        error={errors.year_of_service}
                        onChange={(e) =>
                            setData("year_of_service", e.target.value)
                        }
                    />
                    <InputField
                        label="ကင်းကွာသည့် ရက်စွဲ"
                        value={data.separation_date}
                        error={errors.separation_date}
                        required={false}
                        onChange={(e) =>
                            setData("separation_date", e.target.value)
                        }
                    />

                    {/* Full Width Textareas */}
                    <div className="md:col-span-3">
                        <TextareaField
                            label="ပြောင်းရွှေ့ တာဝန်ထမ်းဆောင်ခဲ့ဖူးသော ကျောင်း/ ဌာန (အဆင့်ဆင့် မှ-ထိ)"
                            value={data.transfer_detail}
                            error={errors.transfer_detail}
                            required={false}
                            onChange={(e) =>
                                setData("transfer_detail", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <TextareaField
                            label="နိုင်ငံခြား ရောက်ဖူးခြင်း ရှိ/ မရှိ ရှိပါက သွားရောက်သည့် နိုင်ငံ ကာလ (မှ - ထိ)"
                            value={data.foreign_detail}
                            error={errors.foreign_detail}
                            onChange={(e) =>
                                setData("foreign_detail", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <TextareaField
                            label="ပြစ်ဒဏ် ခံရဖူးခြင်းရှိ/ မရှိ (ရှိလျှင် ဖော်ပြရန်)"
                            value={data.penalty_detail}
                            error={errors.penalty_detail}
                            onChange={(e) =>
                                setData("penalty_detail", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <TextareaField
                            label="နဝတသင်တန်း (ထက်/ အောက်) ပြီး/ မပြီး၊ သင်တန်းတက်ရောက်ခဲ့ဖူးလျှင် သင်တန်းအမည်နှင့် အမှတ်စဉ်"
                            value={data.training_detail}
                            error={errors.training_detail}
                            onChange={(e) =>
                                setData("training_detail", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <TextareaField
                            label="သင်တန်းတက်ရောက်နေပါက ဖော်ပြရန် (ပြည်တွင်း/ ပြည်ပ)"
                            value={data.current_training}
                            error={errors.current_training}
                            required={false}
                            onChange={(e) =>
                                setData("current_training", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <TextareaField
                            label="အခြားတက္ကသိုလ်နှင့် တွဲဖက်နေပါက ဖော်ပြရန်"
                            value={data.is_accompanied}
                            error={errors.is_accompanied}
                            required={false}
                            onChange={(e) =>
                                setData("is_accompanied", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                နယ်ခံ/ နယ်ဝေး{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={`mt-1 block w-full rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.not_border ? "border-red-500" : "border-gray-300"}`}
                                value={data.not_border || ""}
                                onChange={(e) =>
                                    setData("not_border", e.target.value)
                                }
                            >
                                <option value="">ရွေးချယ်ရန်</option>
                                <option value="နယ်ခံ">နယ်ခံ</option>
                                <option value="နယ်ဝေး">နယ်ဝေး</option>
                            </select>
                            {errors.not_border && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.not_border}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <TextareaField
                            label="လက်ရှိနေရပ်လိပ်စာ"
                            value={data.current_address}
                            error={errors.current_address}
                            rows={2}
                            onChange={(e) =>
                                setData("current_address", e.target.value)
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <TextareaField
                            label="အမြဲတမ်းနေရပ်လိပ်စာ"
                            value={data.permanent_address}
                            error={errors.permanent_address}
                            rows={2}
                            onChange={(e) =>
                                setData("permanent_address", e.target.value)
                            }
                        />
                    </div>

                    <div className="md:col-span-3">
                        <TextareaField
                            label="စာချုပ်ချုပ်ဆိုထားခြင်း ရှိ/ မရှိ၊ ရှိပါက စာချုပ်နှစ်၊ လျော်ကြေးငွေ"
                            value={data.contract_agreement_detail}
                            error={errors.contract_agreement_detail}
                            rows={2}
                            onChange={(e) =>
                                setData(
                                    "contract_agreement_detail",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                    <div className="md:col-span-3">
                        <TextareaField
                            label="မှတ်ချက်"
                            value={data.remark}
                            required={false}
                            error={errors.remark}
                            rows={2}
                            onChange={(e) => setData("remark", e.target.value)}
                        />
                    </div>
                    <InputField
                        label="Email"
                        type="email"
                        value={data.email}
                        error={errors.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputField
                        label="ဖုန်းနံပါတ်"
                        value={data.mobile_phno}
                        error={errors.mobile_phno}
                        onChange={(e) => setData("mobile_phno", e.target.value)}
                    />
                </div>
            )}

            {activeTab === "education" && (
                <div className="space-y-6">
                    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">
                            ပညာအရည်အချင်း
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">
                                            ဘွဲ့အမည်{" "}
                                        </th>
                                        <th className="p-2 border">
                                            အထူးပြုဘာသာ
                                        </th>
                                        <th className="p-2 border">
                                            ရရှိသည့်ခုနှစ်
                                        </th>
                                        <th className="p-2 border">
                                            ရရှိသည့် အဆင့်
                                        </th>{" "}
                                        <th className="p-2 border"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.educations.map((row, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.degree_name}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "educations",
                                                            i,
                                                            "degree_name",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.major_subject}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "educations",
                                                            i,
                                                            "major_subject",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.graduation_year}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "educations",
                                                            i,
                                                            "graduation_year",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.degree_level}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "educations",
                                                            i,
                                                            "degree_level",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRow(
                                                            "educations",
                                                            i,
                                                        )
                                                    }
                                                    className="text-red-500 hover:underline"
                                                >
                                                    ဖျက်ရန်
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                addRow("educations", {
                                    degree_name: "",
                                    major_subject: "",
                                    graduation_year: "",
                                    degree_level: "",
                                })
                            }
                            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            + ထည့်မည်
                        </button>
                    </div>

                    <TrainingTab data={data} setData={setData} />
                </div>
            )}

            {activeTab === "service" && (
                <>
                    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">
                            နိုင်ငံ့ဝန်ထမ်းတာဝန်ထမ်းဆောင်မှုမှတ်တမ်း (စစ်ဘက်/
                            နယ်ဘက်)
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th
                                            rowSpan={2}
                                            className="p-2 border border-slate-400"
                                        >
                                            ရာထူး{" "}
                                        </th>
                                        <th
                                            rowSpan={2}
                                            className="p-2 border border-slate-400"
                                        >
                                            ဌာန{" "}
                                        </th>
                                        <th
                                            colSpan={2}
                                            className="p-2 border border-slate-400"
                                        >
                                            တာဝန်ထမ်းဆောင်သည့် ကာလ
                                        </th>
                                        <th
                                            rowSpan={2}
                                            className="p-2 border border-slate-400"
                                        >
                                            ရုံးစိုက်ရာဒေသ/နေရာ
                                        </th>
                                        <th
                                            rowSpan={2}
                                            className="p-2 border border-slate-400"
                                        ></th>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-slate-400">
                                            မှ{" "}
                                        </th>
                                        <th className="p-2 border border-slate-400">
                                            ထိ{" "}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.service_records.map((row, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-1 border border-x-slate-400  ">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.service_position}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "service_records",
                                                            i,
                                                            "service_position",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border border-r-slate-400">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={
                                                        row.service_department
                                                    }
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "service_records",
                                                            i,
                                                            "service_department",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border border-r-slate-400">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.service_from}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "service_records",
                                                            i,
                                                            "service_from",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border border-r-slate-400">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.service_to}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "service_records",
                                                            i,
                                                            "service_to",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border border-r-slate-400">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.service_location}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "service_records",
                                                            i,
                                                            "service_location",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border border-r-slate-400 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRow(
                                                            "service_records",
                                                            i,
                                                        )
                                                    }
                                                    className="text-red-500 hover:underline"
                                                >
                                                    ဖျက်ရန်
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                addRow("service_records", {
                                    service_position: "",
                                    service_department: "",
                                    service_from: "",
                                    service_to: "",
                                    service_location: "",
                                })
                            }
                            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            + ထည့်မည်
                        </button>
                    </div>
                </>
            )}

            {activeTab === "family" && (
                <FamilyTab data={data} setData={setData} />
            )}

            {activeTab === "foreign" && (
                <>
                    <div>
                        <h3 className="font-bold text-md mb-2 text-gray-700">
                            နိုင်ငံခြားသို့ သွားရောက်မည့်ကိစ္စ{" "}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    သွားရောက်မည့် နိုင်ငံ
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                    value={data.destination_country}
                                    onChange={(e) =>
                                        setData(
                                            "destination_country",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    စေလွှတ်သည့်နိုင်ငံ
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                    value={data.assigned_country}
                                    onChange={(e) =>
                                        setData(
                                            "assigned_country",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    အချိန်ကာလ
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                    value={data.time_period}
                                    onChange={(e) =>
                                        setData("time_period", e.target.value)
                                    }
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    သင်ကြားမည့် ဘာသာရပ် နှင့်အဆင့်/
                                    တက်ရောက်မည့်သင်တန်း/သို့မဟုတ် အခြားကိစ္စ
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                    value={data.training_course}
                                    onChange={(e) =>
                                        setData(
                                            "training_course",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    နိုင်ငံခြားသို့ ရောက်ရမည့်နေ့
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                    value={data.arrival_date}
                                    onChange={(e) =>
                                        setData("arrival_date", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    မည်သည့် အစိုးရအဖွဲ့စည်း အထောက်အပံ့
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                    value={data.supporting_agency}
                                    onChange={(e) =>
                                        setData(
                                            "supporting_agency",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    ပြန်လည်ရောက်ရှိလျှင် အမှုထမ်းမည့် ဌာန/ တာဝန်
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                    value={data.return_department}
                                    onChange={(e) =>
                                        setData(
                                            "return_department",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    နိုင်ငံခြားသို့သွားရောက်မည့်
                                    ကိစ္စနှင့်အထောက်အထားများ
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                                    value={data.foreign_visit_details}
                                    onChange={(e) =>
                                        setData(
                                            "foreign_visit_details",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-md mb-2 text-gray-700">
                            နိုင်ငံခြားသို့ ရောက်ဖူးခြင်းရှိ/ မရှိ{" "}
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">
                                            မှ
                                            <br />
                                            (ရက်၊လ၊နှစ်)
                                        </th>
                                        <th className="p-2 border">
                                            ထိ <br />
                                            (ရက်၊လ၊နှစ်)
                                        </th>
                                        <th className="p-2 border">
                                            သွားရောက်သည့် နိုင်ငံများ
                                        </th>
                                        <th className="p-2 border">
                                            သွားရောက်သည့်ကိစ္စ
                                        </th>
                                        <th className="p-2 border">
                                            နိုင်ငံခြားငွေ မည်မျှ ထုတ်ယူခဲ့သည်
                                        </th>
                                        <th className="p-2 border"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.abroad_visits.map((row, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.abroad_from}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "abroad_visits",
                                                            i,
                                                            "abroad_from",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.abroad_to}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "abroad_visits",
                                                            i,
                                                            "abroad_to",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.country_visited}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "abroad_visits",
                                                            i,
                                                            "country_visited",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.visit_purpose}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "abroad_visits",
                                                            i,
                                                            "visit_purpose",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>

                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={
                                                        row.foreign_currency_amount
                                                    }
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "abroad_visits",
                                                            i,
                                                            "foreign_currency_amount",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRow(
                                                            "abroad_visits",
                                                            i,
                                                        )
                                                    }
                                                    className="text-red-500 hover:underline"
                                                >
                                                    ဖျက်ရန်
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                addRow("abroad_visits", {
                                    abroad_from: "",
                                    abroad_to: "",
                                    visit_purpose: "",
                                    country_visited: "",
                                    foreign_currency_amount: "",
                                })
                            }
                            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            + ထည့်မည်
                        </button>
                    </div>
                </>
            )}

            {activeTab === "legal_awards" && (
                <div className="space-y-6">
                    <LegalTab data={data} setData={setData} />

                    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">
                            ပြစ်မှုမှတ်တမ်း
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th rowSpan={2} className="p-2 border">
                                            ပြစ်ဒဏ်
                                        </th>
                                        <th rowSpan={2} className="p-2 border">
                                            ပြစ်ဒဏ် ချခံရသည့် အကြောင်းအရင်း
                                        </th>
                                        <th colSpan={2} className="p-2 border">
                                            ပြစ်ဒဏ်ချမှတ်သည့်ကာလ{" "}
                                        </th>
                                        <th
                                            rowSpan={2}
                                            className="p-2 border"
                                        ></th>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border"> မှ </th>
                                        <th className="p-2 border"> ထိ </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.criminal_records.map((row, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.criminalPenalty}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "criminal_records",
                                                            i,
                                                            "criminalPenalty",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.reasonPelanty}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "criminal_records",
                                                            i,
                                                            "reasonPelanty",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.criminalFrom}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "criminal_records",
                                                            i,
                                                            "criminalFrom",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.criminalTo}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "criminal_records",
                                                            i,
                                                            "criminalTo",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRow(
                                                            "criminal_records",
                                                            i,
                                                        )
                                                    }
                                                    className="text-red-500 hover:underline"
                                                >
                                                    ဖျက်ရန်
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                addRow("criminal_records", {
                                    criminalPenalty: "",
                                    reasonPelanty: "",
                                    criminalFrom: "",
                                    criminalTo: "",
                                })
                            }
                            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            + ထည့်မည်
                        </button>
                    </div>

                    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">
                            ချီးမြှင့်ခံရသည့် ဘွဲ့ထူး၊ ဂုဏ်ထူးတံဆိပ် များ
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">
                                            ချီးမြှင့်ခံရသည့် ဘွဲ့/တံဆိပ် အမည်
                                        </th>
                                        <th className="p-2 border">
                                            ချီးမြှင့်ခံရသည့် ကာလ
                                        </th>
                                        <th className="p-2 border">
                                            အမိန့်အမှတ်/ ခုနှစ်
                                        </th>
                                        <th className="p-2 border">မှတ်ချက်</th>
                                        <th className="p-2 border"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.awards.map((row, i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.award_title}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "awards",
                                                            i,
                                                            "award_title",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.award_period}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "awards",
                                                            i,
                                                            "award_period",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.award_year}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "awards",
                                                            i,
                                                            "award_year",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border">
                                                <textarea
                                                    rows={1}
                                                    className="w-full border-0 p-1"
                                                    value={row.award_remark}
                                                    onChange={(e) =>
                                                        handleDynamicChange(
                                                            "awards",
                                                            i,
                                                            "award_remark",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="p-1 border text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRow("awards", i)
                                                    }
                                                    className="text-red-500 hover:underline"
                                                >
                                                    ဖျက်ရန်
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                addRow("awards", {
                                    award_title: "",
                                    award_period: "",
                                    award_year: "",
                                    award_remark: "",
                                })
                            }
                            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            + ထည့်မည်
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "referee" && (
                <div className="space-y-6">
                    <Referee data={data} setData={setData} />
                </div>
            )}
        </>
    );
}
