import React from 'react';

export default function FamilyEditTab({ data, addRow, removeRow, updateRowValue }) {
    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-gray-800">👥 ၅။ မိသားစုဝင်များနှင့် မောင်နှမအရင်းအချာများ စာရင်း</h4>
                <button
                    type="button"
                    onClick={() => addRow('families', { relation_name: '', relationship_type: 'father_sibling', gender: 'ကျား', nationality: '', occupation: '', address: '' })}
                    className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded"
                >
                    + မိသားစုဝင်အသစ်ထည့်ရန်
                </button>
            </div>

            <table className="w-full border text-xs text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">အမည်</th>
                        <th className="border p-2">တော်စပ်ပုံ</th>
                        <th className="border p-2 w-20">ကျား/မ</th>
                        <th className="border p-2">နိုင်ငံသား</th>
                        <th className="border p-2">အလုပ်အကိုင်</th>
                        <th className="border p-2">နေရပ်လိပ်စာ</th>
                        <th className="border p-2 text-center w-16">ဖျက်</th>
                    </tr>
                </thead>
                <tbody>
                    {data.families && data.families.map((fam, idx) => (
                        <tr key={idx}>
                            {/* ၁။ အမည် */}
                            <td className="border p-1">
                                <input
                                    type="text"
                                    value={fam.relation_name || ''}
                                    onChange={e => updateRowValue('families', idx, 'relation_name', e.target.value)}
                                    className="w-full p-1 text-xs border-0 focus:ring-0"
                                />
                            </td>

                            {/* ၂။ တော်စပ်ပုံ (Database တန်ဖိုးနှင့် Auto ချိတ်ဆက်ပြီး Default ပေါ်စေခြင်း) */}
                            <td className="border p-1">
                                <select
                                    value={fam.relationship_type || 'father_sibling'}
                                    onChange={e => updateRowValue('families', idx, 'relationship_type', e.target.value)}
                                    className="w-full p-1 text-xs border-0 focus:ring-0 bg-transparent"
                                >
                                    <option value="father_sibling">အဘ၏မောင်နှမအရင်းများဇယား</option>
                                    <option value="mother_sibling">အမိ၏မောင်နှမအရင်းများဇယား</option>
                                    <option value="employee_sibling">ဝန်ထမ်း၏မောင်နှမအရင်းများဇယား</option>
                                    <option value="spouse_family">အိမ်ထောင်ဖက်မိသားစုဇယား</option>
                                    <option value="spouse_father_family">ယောက္ခမအဘဘက်မှမိသားစုဇယား</option>
                                    <option value="spouse_mother_family">ယောက္ခမအမိဘက်မှမိသားစုဇယား</option>
                                    {/* 💡 ရှေ့က Error ထဲက ENUM သတ်မှတ်ချက်အရ 'children' ဟု တိုက်ရိုက်သုံးရပါမည် */}
                                    <option value="children">ဝန်ထမ်း၏သားသမီးမိသားစုဇယား</option>
                                    <option value="relative_abroad">ပြည်ပရှိဆွေမျိုးများဇယား</option>
                                </select>
                            </td>

                            {/* ၃။ ကျား/မ (Database တန်ဖိုးနှင့် Auto ချိတ်ဆက်ပြီး Default ပေါ်စေခြင်း) */}
                            <td className="border p-1">
                                <select
                                    value={fam.gender || 'ကျား'}
                                    onChange={e => updateRowValue('families', idx, 'gender', e.target.value)}
                                    className="w-full p-1 text-xs border-0 focus:ring-0 bg-transparent"
                                >
                                    <option value="ကျား">ကျား</option>
                                    <option value="မ">မ</option>
                                </select>
                            </td>

                            {/* ၄။ နိုင်ငံသား */}
                            <td className="border p-1">
                                <input
                                    type="text"
                                    value={fam.nationality || ''}
                                    onChange={e => updateRowValue('families', idx, 'nationality', e.target.value)}
                                    className="w-full p-1 text-xs border-0 focus:ring-0"
                                />
                            </td>

                            {/* ၅။ အလုပ်အကိုင် */}
                            <td className="border p-1">
                                <input
                                    type="text"
                                    value={fam.occupation || ''}
                                    onChange={e => updateRowValue('families', idx, 'occupation', e.target.value)}
                                    className="w-full p-1 text-xs border-0 focus:ring-0"
                                />
                            </td>

                            {/* ၆။ နေရပ်လိပ်စာ */}
                            <td className="border p-1">
                                <input
                                    type="text"
                                    value={fam.address || ''}
                                    onChange={e => updateRowValue('families', idx, 'address', e.target.value)}
                                    className="w-full p-1 text-xs border-0 focus:ring-0"
                                />
                            </td>

                            {/* ၇။ ဖျက်ရန်ခလုတ် */}
                            <td className="border p-1 text-center">
                                <button
                                    type="button"
                                    onClick={() => removeRow('families', idx)}
                                    className="text-red-600 font-bold hover:text-red-800 transition-colors"
                                >
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}