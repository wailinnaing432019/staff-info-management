import React from 'react';

export default function FamilyTab({ data, setData }) {

    // ဇယားတစ်ခုချင်းစီအတွက် row အသစ်တိုးပေးမည့် Helper
    // နှိပ်လိုက်သည့် ဇယားအလိုက် သက်ဆိုင်ရာ relationType ပါတစ်ခါတည်း သတ်မှတ်ပေးမည်
    const addFamilyRow = (relationType) => {
        const newRow = {
            relation_name: '',
            relationship_type: relationType, // UI ကနေ တန်းသတ်မှတ်ပေးမည့် hidden value
            family_lineage: '',
            gender: 'ကျား',
            nationality: 'မြန်မာ',
            occupation: '',
            address: '',
            remark: ''
        };
        setData('families', [...data.families, newRow]);
    };

    // ဒေတာ Row တစ်ခုချင်းစီကို ဖျက်မည့် Helper
    const removeFamilyRow = (globalIndex) => {
        setData('families', data.families.filter((_, i) => i !== globalIndex));
    };

    // ဇယားကွက်ထဲမှ field တစ်ခုချင်းစီပြောင်းလဲလျှင် State အပ်ဒိတ်လုပ်မည့် Helper
    const handleFamilyChange = (globalIndex, field, value) => {
        const updatedFamilies = [...data.families];
        updatedFamilies[globalIndex][field] = value;
        setData('families', updatedFamilies);
    };

    // Reusable Table Component - တစ်ခုတည်းသော array ထဲမှ သက်ဆိုင်ရာ type အလိုက် စစ်ထုတ်ပြသပေးမည်
    const RenderFamilyTable = ({ title, relationType }) => {
        // data.families ထဲကမှ လက်ရှိဇယားနဲ့ သက်ဆိုင်တဲ့ ဒေတာတွေကို Index မပျောက်အောင် တွဲပြီး Filter လုပ်ခြင်း
        const filteredMembers = data.families
            .map((member, originalIndex) => ({ ...member, originalIndex }))
            .filter(item => item.relationship_type === relationType);

        return (
            <div className="mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 pb-2 border-b">
                    <h4 className="font-bold text-md text-blue-800">{title}</h4>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="p-2 border w-12 text-center">စဉ်</th>
                                <th className="p-2 border min-w-[150px]">အမည်</th>
                                <th className="p-2 border w-24">ကျား/မ</th>
                                <th className="p-2 border min-w-[100px]">နိုင်ငံသား</th>
                                <th className="p-2 border min-w-[120px]">အလုပ်အကိုင်</th>
                                <th className="p-2 border min-w-[200px]">နေရပ်လိပ်စာ အပြည့်အစုံ</th>
                                <th className="p-2 border min-w-[120px]">မှတ်ချက်</th>
                                <th className="p-2 border w-20 text-center">လုပ်ဆောင်ချက်</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map((row, i) => (
                                <tr key={row.originalIndex} className="border-b hover:bg-gray-50">
                                    {/* စဉ် (family_lineage) */}
                                    <td className="p-1 border text-center">
                                        <input type="text" className="w-full border-0 p-1 text-center bg-transparent focus:ring-0" value={row.family_lineage} onChange={e => handleFamilyChange(row.originalIndex, 'family_lineage', e.target.value)} placeholder={`${i + 1}`} />
                                    </td>
                                    {/* အမည် */}
                                    <td className="p-1 border">
                                        <input type="text" className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.relation_name} onChange={e => handleFamilyChange(row.originalIndex, 'relation_name', e.target.value)} />
                                    </td>
                                    {/* ကျား/မ */}
                                    <td className="p-1 border">
                                        <select className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.gender} onChange={e => handleFamilyChange(row.originalIndex, 'gender', e.target.value)}>
                                            <option value="ကျား">ကျား</option>
                                            <option value="မ">မ</option>
                                        </select>
                                    </td>
                                    {/* နိုင်ငံသား */}
                                    <td className="p-1 border">
                                        <input type="text" className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.nationality} onChange={e => handleFamilyChange(row.originalIndex, 'nationality', e.target.value)} />
                                    </td>
                                    {/* အလုပ်အကိုင် */}
                                    <td className="p-1 border">
                                        <input type="text" className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.occupation} onChange={e => handleFamilyChange(row.originalIndex, 'occupation', e.target.value)} />
                                    </td>
                                    {/* နေရပ်လိပ်စာ */}
                                    <td className="p-1 border">
                                        <input type="text" className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.address} onChange={e => handleFamilyChange(row.originalIndex, 'address', e.target.value)} />
                                    </td>
                                    {/* မှတ်ချက် */}
                                    <td className="p-1 border">
                                        <input type="text" className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.remark} onChange={e => handleFamilyChange(row.originalIndex, 'remark', e.target.value)} />
                                    </td>
                                    {/* လုပ်ဆောင်ချက် (ဖျက်ရန်) */}
                                    <td className="p-1 border text-center">
                                        <button type="button" onClick={() => removeFamilyRow(row.originalIndex)} className="text-red-500 hover:text-red-700 hover:underline text-xs font-medium">
                                            ဖျက်ရန်
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredMembers.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="p-4 text-center text-gray-400 bg-gray-50 italic">ဤဇယားအတွက် ထည့်သွင်းထားသော ဒေတာမရှိသေးပါ။</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* သက်ဆိုင်ရာ ဇယားအလိုက် သတ်မှတ်ထားသော Type ကို function ထဲသို့ လှမ်းပို့ပေးခြင်း */}
                <button type="button" onClick={() => addFamilyRow(relationType)} className="mt-2 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3   rounded transition-colors shadow-sm font-medium">
                    + အချက်အလက်ထည့်ရန်
                </button>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h3 className="font-bold text-lg text-blue-900 mb-1">၅။ မိသားစုဝင်များနှင့် ဆွေမျိုးတော်စပ်သူများ၏ အသေးစိတ်အချက်အလက်</h3>
                <p className="text-xs text-red-600 font-medium">
                    * (ဖော်မတ် ၃၆ ပါ - ဆွေမျိုး/မျိုးရိုးစဉ်ဇယားများအားလုံးကို အောက်ပါ သက်ဆိုင်ရာ ဇယားကွက်များအလိုက် ခွဲခြားဖြည့်သွင်းနိုင်ပါသည်)
                </p>
            </div>

            {/* ဇယား ၁ - အဘ၏မောင်နှမအရင်း */}
            <RenderFamilyTable title="၁။ အဘ၏မောင်နှမအရင်းများဇယား (Father Siblings)" relationType="father_sibling" />

            {/* ဇယား ၂ - အမိ၏မောင်နှမအရင်း */}
            <RenderFamilyTable title="၂။ အမိ၏မောင်နှမအရင်းများဇယား (Mother Siblings)" relationType="mother_sibling" />

            {/* ဇယား ၃ - ဝန်ထမ်း၏မောင်နှမအရင်း */}
            <RenderFamilyTable title="၃။ ဝန်ထမ်း၏မောင်နှမအရင်းများဇယား (Employee Siblings)" relationType="employee_sibling" />

            {/* ဇယား ၄ - အိမ်ထောင်ဖက်မိသားစု */}
            <RenderFamilyTable title="၄။ အိမ်ထောင်ဖက်မိသားစုဇယား (Spouse Family)" relationType="spouse_family" />

            {/* ဇယား ၅ - ယောက္ခမအဘဘက်မှမိသားစု */}
            <RenderFamilyTable title="၅။ ယောက္ခမအဘဘက်မှမိသားစုဇယား (Spouse Father Family)" relationType="spouse_father_family" />

            {/* ဇယား ၆ - ယောက္ခမအမိဘက်မှမိသားစု */}
            <RenderFamilyTable title="၆။ ယောက္ခမအမိဘက်မှမိသားစုဇယား (Spouse Mother Family)" relationType="spouse_mother_family" />

            {/* ဇယား ၇ - ဝန်ထမ်း၏သားသမီးမိသားစု */}
            <RenderFamilyTable title="၇။ ဝန်ထမ်း၏သားသမီးမိသားစုဇယား (Employee Children Family)" relationType="children_family" />

            {/* ဇယား ၈ - ပြည်ပရှိဆွေမျိုးများ */}
            <RenderFamilyTable title="၈။ ပြည်ပရှိဆွေမျိုးများဇယား (Relative Abroad)" relationType="relative_abroad" />
        </div>
    );
}