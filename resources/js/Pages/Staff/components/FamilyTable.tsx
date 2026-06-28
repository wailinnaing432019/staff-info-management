import { getGenderMyanmar } from "@/util/genderHelper";
import { getRelationMyanmar } from "@/util/relationHelper";

export default function FamilyTable({
    title,
    relationshipType,
    familiesData = [],
}) {
    const filteredFamilies =
        familiesData?.filter(
            (item) => item.relationship_type === relationshipType,
        ) || [];
    const isAbroad = relationshipType === "relative_abroad";
    return (
        <div className="mb-6">
            <h4 className=" mb-2">{title}</h4>

            <table className="w-full border-1 border-black border-collapse  text-center">
                <thead>
                    <tr className="bg-gray-100 font-bold border-b-1 border-black">
                        <th className="border border-black p-2">
                            အမည် (အခြားအမည်ရှိလျှင်လည်းဖော်ပြရန်)
                        </th>
                        <th className="border border-black p-2 ">တော်စပ်ပုံ</th>
                        {isAbroad ? (
                            <>
                                <th className="border border-black p-2  ">
                                    မည်သည့်နိုင်ငံသား
                                </th>
                                <th className="border border-black p-2">
                                    အလုပ်အကိုင်
                                </th>
                                <th className="border border-black p-2">
                                    ရောက်ရှိနေသည့်နိုင်ငံ
                                </th>
                                <th className="border border-black p-2">
                                    သွားရောက်သည့်ကိစ္စ
                                </th>
                                <th className="border border-black p-2">
                                    ပြန်လည်ရောက်ရှိမည့်ကာလ
                                </th>
                            </>
                        ) : (
                            <>
                                <th className="border border-black p-2  ">
                                    ကျား/မ
                                </th>
                                <th className="border border-black p-2  ">
                                    မည်သည့်နိုင်ငံသား
                                </th>
                                <th className="border border-black p-2">
                                    အလုပ်အကိုင်
                                </th>
                                <th className="border border-black p-2">
                                    နေရပ်
                                </th>
                                <th className="border border-black p-2">
                                    မှတ်ချက်
                                </th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-black">
                    {filteredFamilies.length > 0 ? (
                        filteredFamilies.map((fam, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                                <td className="border border-black p-2 text-left ">
                                    {fam.relation_name || "-"}
                                </td>

                                <td className="border border-black p-2">
                                    {getRelationMyanmar(fam.family_lineage) ||
                                        "-"}
                                </td>
                                {isAbroad ? (
                                    <>
                                        <td className="border border-black p-2">
                                            {fam.nationality || "-"}
                                        </td>
                                        <td className="border border-black p-2 text-left">
                                            {fam.occupation || "-"}
                                        </td>
                                        <td className="border border-black p-2 text-left">
                                            {fam.arrived_country || "-"}
                                        </td>
                                        <td className="border border-black p-2 text-left break-words">
                                            {fam.arrived_purpose || "-"}
                                        </td>
                                        <td className="border border-black p-2">
                                            {fam.return_period || "-"}
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border border-black p-2">
                                            {getGenderMyanmar(fam.gender) ||
                                                "-"}
                                        </td>
                                        <td className="border border-black p-2">
                                            {fam.nationality || "-"}
                                        </td>
                                        <td className="border border-black p-2 text-left">
                                            {fam.occupation || "-"}
                                        </td>
                                        <td className="border border-black p-2 text-left break-words">
                                            {fam.address || "-"}
                                        </td>
                                        <td className="border border-black p-2">
                                            {fam.remark || "-"}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="border border-black p-4 text-gray-400 italic text-center">
                                -
                            </td>
                            <td className="border border-black p-4 text-gray-400 italic text-center">
                                -
                            </td>
                            <td className="border border-black p-4 text-gray-400 italic text-center">
                                -
                            </td>
                            <td className="border border-black p-4 text-gray-400 italic text-center">
                                -
                            </td>
                            <td className="border border-black p-4 text-gray-400 italic text-center">
                                -
                            </td>
                            <td className="border border-black p-4 text-gray-400 italic text-center">
                                -
                            </td>
                            <td className="border border-black p-4 text-gray-400 italic text-center">
                                -
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
