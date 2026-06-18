import React from "react";

export default function ActionTable({ title, recordType, actionsData = [] }) {
    const filteredActions =
        actionsData?.filter((item) => item.record_type === recordType) || [];

    return (
        <div>
            <h4 className=" mb-2">
                {title} {filteredActions.length > 0 ? "(ရှိ)" : "(မရှိ)"}{" "}
            </h4>
            <table className="w-full border-1 border-black border-collapse  text-center">
                <thead>
                    <tr className="bg-gray-100 font-bold border-b-1 border-black">
                        <th className="border border-black p-2 w-1/4">
                            {recordType === "court"
                                ? "တရားစွဲခြင်းခံရသည့်ကာလ"
                                : "အရေးယူခံရသည့် ကာလ"}{" "}
                        </th>
                        <th className="border border-black p-2">
                            {recordType === "court"
                                ? "တရားစွဲခြင်းခံရသည့် အကြောင်းကိစ္စနှင့် စွဲဆိုခံရသည့် ဥပဒေပုဒ်မ"
                                : "အရေးယူခံရသည့် အကြောင်းကိစ္စ"}{" "}
                        </th>
                        <th className="border border-black p-2 w-1/3">
                            ချမှတ်ခံရသည့် ပြစ်ဒဏ်
                        </th>
                        <th className="border border-black p-2 w-1/4">
                            မှတ်ချက်
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-black">
                    {filteredActions.length > 0 ? (
                        filteredActions.map((act, i) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                                <td className="border border-black p-2">
                                    {act.period || "-"}
                                </td>
                                <td className="border border-black p-2 text-left">
                                    {act.reason || "-"}
                                </td>
                                <td className="border border-black p-2  ">
                                    {act.penalty || "-"}
                                </td>
                                <td className="border border-black p-2 ">
                                    {act.remark || "-"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="border border-black p-2 text-left"></td>
                            <td className="border border-black p-2 text-left"></td>
                            <td className="border border-black p-2 text-left"></td>
                            <td className="border border-black p-2 text-left"></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
