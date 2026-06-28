import React from "react";

// မြန်မာဂဏန်း ပြောင်းပေးသည့် Function
const toMyanmarNumber = (num) => {
    const myanmarNumbers = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
    return num
        .toString()
        .split("")
        .map((ch) => (isNaN(ch) ? ch : myanmarNumbers[parseInt(ch)]))
        .join("");
};

const RenderPastJobTable = ({
    title,
    jobCategory, // "normal" သို့မဟုတ် "high"
    data,
    handleDynamicChange,
    addPastJobRow,
    removePastJobRow,
}) => {
    const filteredJobs = (data.past_jobs || [])
        .map((job, originalIndex) => ({ ...job, originalIndex }))
        .filter((item) => item.type === jobCategory);

    const isNormal = jobCategory === "normal";

    return (
        <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">
                {title}
            </h4>

            <div className="overflow-x-auto">
                <table className="w-full border text-sm text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-700">
                        {isNormal ? (
                            <tr>
                                <th className="p-2 border w-16 text-center">
                                    စဉ်
                                </th>
                                <th className="p-2 border min-w-[150px]">
                                    အဆင့်
                                </th>
                                <th className="p-2 border min-w-[180px]">
                                    တပ်/ ဌာန
                                </th>
                                <th className="p-2 border min-w-[150px]">
                                    နေရာ
                                </th>
                                <th className="p-2 border w-20 text-center"></th>
                            </tr>
                        ) : (
                            <tr>
                                <th className="p-2 border min-w-[150px]">
                                    ရာထူး
                                </th>
                                <th className="p-2 border min-w-[180px]">
                                    ဌာန
                                </th>
                                <th className="p-2 border min-w-[150px]">
                                    နေရာ
                                </th>
                                <th className="p-2 border w-20 text-center"></th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {filteredJobs.map((row, i) => (
                            <tr
                                key={row.originalIndex}
                                className="border-b hover:bg-gray-50"
                            >
                                {isNormal && (
                                    <td className="p-2 border text-center font-medium text-gray-600">
                                        {toMyanmarNumber(i + 1)}
                                    </td>
                                )}

                                {/* အဆင့် သို့မဟုတ် ရာထူး Field ခွဲခြားပြသခြင်း */}
                                <td className="p-1 border">
                                    <textarea
                                        rows={1}
                                        className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                        value={
                                            isNormal
                                                ? row.prev_rank || ""
                                                : row.prev_position || ""
                                        }
                                        onChange={(e) =>
                                            handleDynamicChange(
                                                row.originalIndex,
                                                isNormal
                                                    ? "prev_rank"
                                                    : "prev_position",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </td>

                                {/* တပ်/ဌာန သို့မဟုတ် ဌာန Field */}
                                <td className="p-1 border">
                                    <textarea
                                        rows={1}
                                        className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                        value={row.prev_dept || ""}
                                        onChange={(e) =>
                                            handleDynamicChange(
                                                row.originalIndex,
                                                "prev_dept",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </td>

                                {/* နေရာ Field */}
                                <td className="p-1 border">
                                    <textarea
                                        rows={1}
                                        className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                        value={row.prev_location || ""}
                                        onChange={(e) =>
                                            handleDynamicChange(
                                                row.originalIndex,
                                                "prev_location",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </td>

                                <td className="p-1 border text-center">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removePastJobRow(row.originalIndex)
                                        }
                                        className="text-red-500 hover:text-red-700 hover:underline text-xs font-medium"
                                    >
                                        ဖျက်ရန်
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filteredJobs.length === 0 && (
                            <tr>
                                <td
                                    colSpan={isNormal ? 5 : 4}
                                    className="p-3 text-center text-gray-400 text-xs"
                                >
                                    ဒေတာမရှိသေးပါ။
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <button
                type="button"
                onClick={() => addPastJobRow(jobCategory)}
                className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors shadow-sm font-medium"
            >
                + ထည့်မည်
            </button>
        </div>
    );
};

export default function PastJobsTab({ data, setData }) {
    // 💡 Laravel Schema အတိုင်း Field တိုင်း ပါဝင်အောင် တိုက်ရိုက် ပြင်ဆင်လိုက်ပါသည်
    const addPastJobRow = (jobCategory) => {
        const newRow = {
            type: jobCategory,
            prev_position: "",
            prev_dept: "",
            prev_location: "",
            prev_rank: "",
        };

        setData("past_jobs", [...(data.past_jobs || []), newRow]);
    };

    const removePastJobRow = (globalIndex) => {
        setData(
            "past_jobs",
            data.past_jobs.filter((_, i) => i !== globalIndex),
        );
    };

    const handleDynamicChange = (globalIndex, field, value) => {
        const updatedJobs = [...data.past_jobs];
        updatedJobs[globalIndex][field] = value;
        setData("past_jobs", updatedJobs);
    };

    return (
        <div className="space-y-4">
            {/* ဇယား (၁) ယခင်လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင် (Type: normal -> အဆင့် အတွက်) */}
            <RenderPastJobTable
                title="ယခင်လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင်"
                jobCategory="normal"
                data={data}
                handleDynamicChange={handleDynamicChange}
                addPastJobRow={addPastJobRow}
                removePastJobRow={removePastJobRow}
            />

            {/* ဇယား (၂) လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင်များနှင့်ဌာန/ မြို့နယ် (Type: high -> ရာထူး အတွက်) */}
            <RenderPastJobTable
                title="လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင်များနှင့်ဌာန/ မြို့နယ်"
                jobCategory="high"
                data={data}
                handleDynamicChange={handleDynamicChange}
                addPastJobRow={addPastJobRow}
                removePastJobRow={removePastJobRow}
            />
        </div>
    );
}
