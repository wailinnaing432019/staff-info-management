import React from 'react';

export default function ActionTable({ title, recordType, actionsData = [] }) {
    // record_type အလိုက် 'disciplinary' သို့မဟုတ် 'court' ကို filter စစ်ထုတ်ပါတယ်
    const filteredActions = actionsData?.filter(item => item.record_type === recordType) || [];

    return (
        <div>
            <h4 className="font-bold text-sm mb-2">{title}</h4>
            <table className="w-full border-2 border-black border-collapse text-xs text-center">
                <thead>
                    <tr className="bg-gray-100 font-bold border-b-2 border-black">
                        <th className="border border-black p-2 w-1/4">အရေးယူခံရသည့် ကာလ</th>
                        <th className="border border-black p-2">အရေးယူခံရသည့် အကြောင်းကိစ္စ </th>
                        <th className="border border-black p-2 w-1/3">ချမှတ်ခံရသည့် ပြစ်ဒဏ်</th>
                        <th className="border border-black p-2 w-1/4">မှတ်ချက်</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-black">
                    {filteredActions.length > 0 ? (
                        filteredActions.map((act, i) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                                <td className="border border-black p-2">{act.period || '-'}</td>
                                <td className="border border-black p-2 text-left">{act.reason || '-'}</td>
                                <td className="border border-black p-2  ">{act.penalty || '-'}</td>
                                <td className="border border-black p-2 ">{act.remark || '-'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="border border-black p-4 text-green-700 font-semibold italic">
                                အရေးယူခံရခြင်း မရှိပါ။
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}