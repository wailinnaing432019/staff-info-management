import React from 'react';



export default function FamilyTable({ title, relationshipType, familiesData = [] }) {
    // သက်ဆိုင်ရာ relationship_type အလိုက် Filter အရင်လုပ်ပါတယ်
    const filteredFamilies = familiesData?.filter(item => item.relationship_type === relationshipType) || [];

    return (
        <div className="mb-6">
            {/* ဇယားခေါင်းစဉ် */}
            <h4 className="font-bold text-sm mb-2">{title}</h4>

            <table className="w-full border-2 border-black border-collapse text-xs text-center">
                <thead>
                    <tr className="bg-gray-100 font-bold border-b-2 border-black">
                        <th className="border border-black p-2">အမည် (အခြားအမည်ရှိလျှင်လည်းဖော်ပြရန်)</th>
                        <th className="border border-black p-2 w-32">တော်စပ်ပုံ</th>
                        <th className="border border-black p-2 w-20">ကျား/မ</th>
                        <th className="border border-black p-2 w-32">မည်သည့်နိုင်ငံသား</th>
                        <th className="border border-black p-2">အလုပ်အကိုင်</th>
                        <th className="border border-black p-2">နေရပ်</th>
                        <th className="border border-black p-2">မှတ်ချက်</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-black">
                    {filteredFamilies.length > 0 ? (
                        filteredFamilies.map((fam, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                                <td className="border border-black p-2 text-left font-semibold">{fam.relation_name || '-'}</td>
                                {/* တော်စပ်ပုံကို မြန်မာလိုပြပေးပါမည်၊ မရှိပါက DB text ပြပါမည် */}
                                <td className="border border-black p-2">
                                    {fam.family_lineage || '-'}
                                </td>
                                <td className="border border-black p-2">{fam.gender || '-'}</td>
                                <td className="border border-black p-2">{fam.nationality || '-'}</td>
                                <td className="border border-black p-2 text-left">{fam.occupation || '-'}</td>
                                <td className="border border-black p-2 text-left break-words">{fam.address || '-'}</td>
                                <td className="border border-black p-2">{fam.remark || '-'}</td>
                            </tr>
                        ))
                    ) : (
                        /* 💡 ပြင်ဆင်ချက် - ကော်လံ ၇ ခု ရှိသောကြောင့် colSpan={7} ဖြင့် တစ်ကွက်တည်း သန့်ရှင်းစွာ ပြသပါမည် */
                        <tr>
                            <td colSpan={7} className="border border-black p-4 text-gray-400 italic text-center">
                                မှတ်တမ်းမရှိပါ။
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}