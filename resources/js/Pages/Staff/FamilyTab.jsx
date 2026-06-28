import toMyanmarNumber from "@/util/numberHelper";
import React, { useState, useRef, useEffect } from "react";

const RenderFamilyTable = ({
    title,
    relationship_type,
    data,
    handleFamilyChange,
    addFamilyRow,
    removeFamilyRow,
    isRelativeAbroad = false,
}) => {
    const filteredMembers = data.families
        .map((member, originalIndex) => ({ ...member, originalIndex }))
        .filter((item) => item.relationship_type === relationship_type);

    const getLineageOptions = () => {
        switch (relationship_type) {
            case "father_sibling":
                return ["အဘ (ဖခင်)"];
            case "mother_sibling":
                return ["အမိ (မိခင်)"];
            case "employee_sibling":
                return ["အစ်ကို", "မမ", "ညီ", "မောင်", "ညီမ"];
            case "spouse_family":
                return ["ဇနီး", "ခင်ပွန်း"];
            case "spouse_father_family":
                return ["ယောက္ခမ (အဘ)"];
            case "spouse_mother_family":
                return ["ယောက္ခမ (အမိ)"];
            case "children":
                return ["သား", "သမီး", "သမက်", "ချွေးမ"];
            case "relative_abroad":
                return ["ဦးလေး", "အဒေါ်", "အစ်ကို"];
            default:
                return ["မိဘ", "မောင်နှမ", "ဆွေမျိုး"];
        }
    };

    const [activeDropdown, setActiveDropdown] = useState(null);
    const containerRefs = useRef({});

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                activeDropdown !== null &&
                containerRefs.current[activeDropdown] &&
                !containerRefs.current[activeDropdown].contains(event.target)
            ) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [activeDropdown]);

    return (
        <div className="mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 pb-2 border-b">
                <h4 className="font-bold text-md text-blue-800">{title}</h4>
            </div>

            <div className="overflow-visible static">
                <table className="w-full border text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="p-2 border w-12 text-center">စဉ်</th>
                            <th className="p-2 border ">အမည်</th>
                            {!isRelativeAbroad && (
                                <th className="p-2 border w-24">ကျား/မ</th>
                            )}
                            <th className="p-2 border  ">တော်စပ်ပုံ</th>
                            <th className="p-2 border  ">နိုင်ငံသား</th>
                            <th className="p-2 border  ">အလုပ်အကိုင်</th>
                            <th className="p-2 border  ">လူမျိုး/ ဘာသာ</th>
                            {isRelativeAbroad ? (
                                <>
                                    <th className="p-2 border  ">
                                        ရောက်ရှိနေသည့် နိုင်ငံ
                                    </th>
                                    <th className="p-2 border  ">
                                        သွားရောက်သည့်ကိစ္စ
                                    </th>
                                    <th className="p-2 border  ">
                                        ပြန်လည်ရောက်ရှိမည့်ကာလ
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th className="p-2 border  ">ဇာတိ</th>
                                    <th className="p-2 border  ">
                                        နေရပ်လိပ်စာ အပြည့်အစုံ
                                    </th>
                                    <th className="p-2 border  ">မှတ်ချက်</th>
                                </>
                            )}
                            <th className="p-2 border w-20 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map((row, i) => (
                            <tr
                                key={row.originalIndex}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-2 border text-center w-16 min-w-[64px] bg-gray-50/50">
                                    <span className="font-semibold text-gray-600 block">
                                        {toMyanmarNumber(i + 1)}
                                    </span>
                                </td>
                                <td className="p-1 border">
                                    <textarea
                                        className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                        value={row.relation_name}
                                        onChange={(e) =>
                                            handleFamilyChange(
                                                row.originalIndex,
                                                "relation_name",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </td>
                                {!isRelativeAbroad && (
                                    <td className="p-1 border">
                                        <select
                                            className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                            value={row.gender || "male"}
                                            onChange={(e) =>
                                                handleFamilyChange(
                                                    row.originalIndex,
                                                    "gender",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="male">ကျား</option>
                                            <option value="female">မ</option>
                                        </select>
                                    </td>
                                )}

                                <td
                                    className="p-1 border relative"
                                    ref={(el) =>
                                        (containerRefs.current[
                                            row.originalIndex
                                        ] = el)
                                    }
                                >
                                    <div className="w-full relative">
                                        <input
                                            type="text"
                                            className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded bg-transparent"
                                            value={row.family_lineage || ""}
                                            placeholder="ရွေးရန် သို့မဟုတ် ရိုက်ရန်"
                                            onFocus={() =>
                                                setActiveDropdown(
                                                    row.originalIndex,
                                                )
                                            }
                                            onChange={(e) =>
                                                handleFamilyChange(
                                                    row.originalIndex,
                                                    "family_lineage",
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        {activeDropdown ===
                                            row.originalIndex && (
                                            <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-xl z-50 max-h-48 overflow-y-auto block">
                                                {getLineageOptions().map(
                                                    (option, optIdx) => (
                                                        <button
                                                            key={optIdx}
                                                            type="button"
                                                            className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 text-gray-700 font-medium transition-colors block border-b border-gray-50 last:border-0"
                                                            onMouseDown={() => {
                                                                handleFamilyChange(
                                                                    row.originalIndex,
                                                                    "family_lineage",
                                                                    option,
                                                                );
                                                                setActiveDropdown(
                                                                    null,
                                                                );
                                                            }}
                                                        >
                                                            {option}
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-1 border">
                                    <textarea
                                        className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                        value={row.nationality}
                                        onChange={(e) =>
                                            handleFamilyChange(
                                                row.originalIndex,
                                                "nationality",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </td>
                                <td className="p-1 border">
                                    <textarea
                                        className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                        value={row.occupation}
                                        onChange={(e) =>
                                            handleFamilyChange(
                                                row.originalIndex,
                                                "occupation",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </td>
                                <td className="p-1 border">
                                    <textarea
                                        className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                        value={row.race_and_religion}
                                        onChange={(e) =>
                                            handleFamilyChange(
                                                row.originalIndex,
                                                "race_and_religion",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </td>

                                {isRelativeAbroad ? (
                                    <>
                                        <td className="p-1 border">
                                            <textarea
                                                className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                                value={row.arrived_country}
                                                onChange={(e) =>
                                                    handleFamilyChange(
                                                        row.originalIndex,
                                                        "arrived_country",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-1 border">
                                            <textarea
                                                className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                                value={row.arrived_purpose}
                                                onChange={(e) =>
                                                    handleFamilyChange(
                                                        row.originalIndex,
                                                        "arrived_purpose",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-1 border">
                                            <textarea
                                                className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                                value={row.return_period}
                                                onChange={(e) =>
                                                    handleFamilyChange(
                                                        row.originalIndex,
                                                        "return_period",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-1 border">
                                            <textarea
                                                className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                                value={row.native_town}
                                                onChange={(e) =>
                                                    handleFamilyChange(
                                                        row.originalIndex,
                                                        "native_town",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-1 border">
                                            <textarea
                                                className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                                value={row.address}
                                                onChange={(e) =>
                                                    handleFamilyChange(
                                                        row.originalIndex,
                                                        "address",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-1 border">
                                            <textarea
                                                className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                                value={row.remark}
                                                onChange={(e) =>
                                                    handleFamilyChange(
                                                        row.originalIndex,
                                                        "remark",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </td>
                                    </>
                                )}
                                <td className="p-1 border text-center">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFamilyRow(row.originalIndex)
                                        }
                                        className="text-red-500 hover:text-red-700 hover:underline text-xs font-medium"
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
                onClick={() => addFamilyRow(relationship_type)}
                className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors shadow-sm font-medium"
            >
                + အချက်အလက်ထည့်ရန်
            </button>
        </div>
    );
};

export default function FamilyTab({ data, setData }) {
    // ပထမဆုံး Option ကို အလိုအလျောက် ကနဦးတန်ဖိုး (Auto Default) အဖြစ် ထည့်ပေးမည့် Helper Logic
    const getDefaultLineage = (relationship_type) => {
        switch (relationship_type) {
            case "father_sibling":
                return "အဘ (ဖခင်)";
            case "mother_sibling":
                return "အမိ (မိခင်)";
            case "employee_sibling":
                return "အစ်ကို";
            case "spouse_family":
                return "ဇနီး";
            case "spouse_father_family":
                return "ယောက္ခမ (အဘ)";
            case "spouse_mother_family":
                return "ယောက္ခမ (အမိ)";
            case "children":
                return "သား";
            case "relative_abroad":
                return "ဦးလေး";
            default:
                return "";
        }
    };

    const addFamilyRow = (relationship_type) => {
        const newRow = {
            relation_name: "",
            relationship_type: relationship_type,
            family_lineage: getDefaultLineage(relationship_type),
            gender:
                relationship_type === "mother_sibling" ||
                relationship_type === "spouse_mother_family"
                    ? "female"
                    : "male",
            nationality: "",
            occupation: "",
            race_and_religion: "",
            native_town: "",
            arrived_country: "",
            arrived_purpose: "",
            return_period: "",
            address: "",
            remark: "",
        };
        setData("families", [...data.families, newRow]);
    };

    const removeFamilyRow = (globalIndex) => {
        setData(
            "families",
            data.families.filter((_, i) => i !== globalIndex),
        );
    };

    const handleFamilyChange = (globalIndex, field, value) => {
        const updatedFamilies = [...data.families];
        updatedFamilies[globalIndex][field] = value;
        setData("families", updatedFamilies);
    };

    return (
        <div className="space-y-4">
            <RenderFamilyTable
                title="ဝန်းထမ်း၏ အဘနှင့် အဘ၏မောင်နှမအရင်းအချာများ"
                relationship_type="father_sibling"
                data={data}
                handleFamilyChange={handleFamilyChange}
                addFamilyRow={addFamilyRow}
                removeFamilyRow={removeFamilyRow}
            />
            <RenderFamilyTable
                title="ဝန်းထမ်း၏ အမိနှင့် အမိ၏မောင်နှမအရင်းအချာများ"
                relationship_type="mother_sibling"
                data={data}
                handleFamilyChange={handleFamilyChange}
                addFamilyRow={addFamilyRow}
                removeFamilyRow={removeFamilyRow}
            />
            <RenderFamilyTable
                title="ဝန်းထမ်း၏ မောင်နှမအရင်းအချာများ"
                relationship_type="employee_sibling"
                data={data}
                handleFamilyChange={handleFamilyChange}
                addFamilyRow={addFamilyRow}
                removeFamilyRow={removeFamilyRow}
            />
            <RenderFamilyTable
                title="ဇနီး/ ခင်ပွန်းနှင့် ၎င်း၏မောင်နှမအရင်းအချာများ"
                relationship_type="spouse_family"
                data={data}
                handleFamilyChange={handleFamilyChange}
                addFamilyRow={addFamilyRow}
                removeFamilyRow={removeFamilyRow}
            />
            <RenderFamilyTable
                title="ဇနီး/ ခင်ပွန်း၏ အဘနှင့်ယင်း၏မောင်နှမအရင်းအချာများ"
                relationship_type="spouse_father_family"
                data={data}
                handleFamilyChange={handleFamilyChange}
                addFamilyRow={addFamilyRow}
                removeFamilyRow={removeFamilyRow}
            />
            <RenderFamilyTable
                title="ဇနီး/ ခင်ပွန်း၏ အမိနှင့်ယင်း၏မောင်နှမအရင်းအချာများ"
                relationship_type="spouse_mother_family"
                data={data}
                handleFamilyChange={handleFamilyChange}
                addFamilyRow={addFamilyRow}
                removeFamilyRow={removeFamilyRow}
            />
            <RenderFamilyTable
                title="သား/သမီးများနှင့် ၎င်းတို့၏ ဇနီး/ခင်ပွန်း"
                relationship_type="children"
                data={data}
                handleFamilyChange={handleFamilyChange}
                addFamilyRow={addFamilyRow}
                removeFamilyRow={removeFamilyRow}
            />
            <RenderFamilyTable
                title="နိုင်ငံခြားတွင် ရောက်ရှိနေကြသည့် ဆွေမျိုးများ"
                relationship_type="relative_abroad"
                data={data}
                handleFamilyChange={handleFamilyChange}
                addFamilyRow={addFamilyRow}
                removeFamilyRow={removeFamilyRow}
                isRelativeAbroad={true}
            />
        </div>
    );
}
