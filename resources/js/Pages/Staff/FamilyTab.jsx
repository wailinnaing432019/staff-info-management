import React from 'react';
const RenderFamilyTable = ({ title, relationship_type, data, handleFamilyChange, addFamilyRow, removeFamilyRow }) => {
    const filteredMembers = data.families
        .map((member, originalIndex) => ({ ...member, originalIndex }))
        .filter(item => item.relationship_type === relationship_type);

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
                            <th className="p-2 border w-24">တော်စပ်ပုံ</th>
                            <th className="p-2 border min-w-[100px]">နိုင်ငံသား</th>
                            <th className="p-2 border min-w-[120px]">အလုပ်အကိုင်</th>
                            <th className="p-2 border min-w-[200px]">နေရပ်လိပ်စာ အပြည့်အစုံ</th>
                            <th className="p-2 border min-w-[120px]">မှတ်ချက်</th>
                            <th className="p-2 border w-20 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map((row, i) => (
                            <tr key={row.originalIndex} className="border-b hover:bg-gray-50">
                                <td className="p-2 border text-center w-16 min-w-[64px] bg-gray-50/50">
                                    <span className="font-semibold text-gray-600 block">
                                        {i + 1}
                                    </span>
                                </td>
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.relation_name} onChange={e => handleFamilyChange(row.originalIndex, 'relation_name', e.target.value)} />
                                </td>
                                <td className="p-1 border">
                                    <select className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.gender || 'male'} onChange={e => handleFamilyChange(row.originalIndex, 'gender', e.target.value)}>

                                        <option value="male">ကျား</option>
                                        <option value="female">မ</option>
                                    </select>
                                </td>
                                <td className="p-1 border">
                                    {
                                        relationship_type === "children" ? (
                                            <select className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.family_lineage || 'son'} onChange={e => handleFamilyChange(row.originalIndex, 'family_lineage', e.target.value)}>
                                                <option value="son">သား</option>
                                                <option value="daughter">သမီး</option>
                                                <option value="sonInLaw">သမက်</option>
                                                <option value="daughterInLaw">ချွေးမ</option>
                                            </select>
                                        ) : (
                                            <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.family_lineage} onChange={e => handleFamilyChange(row.originalIndex, 'family_lineage', e.target.value)} />
                                        )
                                    }

                                </td>
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.nationality} onChange={e => handleFamilyChange(row.originalIndex, 'nationality', e.target.value)} />
                                </td>
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.occupation} onChange={e => handleFamilyChange(row.originalIndex, 'occupation', e.target.value)} />
                                </td>
                                <td className="p-1 border">
                                    <textarea rows={1}
                                        className="w-full    border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded"
                                        value={row.address}
                                        onChange={e => handleFamilyChange(row.originalIndex, 'address', e.target.value)}
                                    />

                                </td>
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full    border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.remark} onChange={e => handleFamilyChange(row.originalIndex, 'remark', e.target.value)} />
                                </td>
                                <td className="p-1 border text-center">
                                    <button type="button" onClick={() => removeFamilyRow(row.originalIndex)} className="text-red-500 hover:text-red-700 hover:underline text-xs font-medium">
                                        ဖျက်ရန်
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <button type="button" onClick={() => addFamilyRow(relationship_type)} className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors shadow-sm font-medium">
                + အချက်အလက်ထည့်ရန်
            </button>
        </div>
    );
};

// Main Export Component
export default function FamilyTab({ data, setData }) {

    const addFamilyRow = (relationship_type) => {
        const newRow = { relation_name: '', relationship_type: relationship_type, family_lineage: '', gender: 'male', nationality: '', occupation: '', address: '', remark: '' };
        setData('families', [...data.families, newRow]);
    };

    const removeFamilyRow = (globalIndex) => {
        setData('families', data.families.filter((_, i) => i !== globalIndex));
    };

    const handleFamilyChange = (globalIndex, field, value) => {
        const updatedFamilies = [...data.families];
        updatedFamilies[globalIndex][field] = value;
        setData('families', updatedFamilies);
    };

    return (
        <div className="space-y-4">

            <RenderFamilyTable title="ဝန်းထမ်း၏ အဘနှင့် အဘ၏မောင်နှမအရင်းအချာများ " relationship_type="father_sibling" data={data} handleFamilyChange={handleFamilyChange} addFamilyRow={addFamilyRow} removeFamilyRow={removeFamilyRow} />
            <RenderFamilyTable title="ဝန်းထမ်း၏ အမိနှင့် အမိ၏မောင်နှမအရင်းအချာများ  " relationship_type="mother_sibling" data={data} handleFamilyChange={handleFamilyChange} addFamilyRow={addFamilyRow} removeFamilyRow={removeFamilyRow} />
            <RenderFamilyTable title="ဝန်းထမ်း၏ မောင်နှမအရင်းအချာများ " relationship_type="employee_sibling" data={data} handleFamilyChange={handleFamilyChange} addFamilyRow={addFamilyRow} removeFamilyRow={removeFamilyRow} />
            <RenderFamilyTable title="ဇနီး/ ခင်ပွန်းနှင့် ၎င်း၏မောင်နှမအရင်းအချာများ " relationship_type="spouse_family" data={data} handleFamilyChange={handleFamilyChange} addFamilyRow={addFamilyRow} removeFamilyRow={removeFamilyRow} />
            <RenderFamilyTable title="ဇနီး/ ခင်ပွန်း၏ အဘနှင့်ယင်း၏မောင်နှမအရင်းအချာများ" relationship_type="spouse_father_family" data={data} handleFamilyChange={handleFamilyChange} addFamilyRow={addFamilyRow} removeFamilyRow={removeFamilyRow} />
            <RenderFamilyTable title="ဇနီး/ ခင်ပွန်း၏ အမိနှင့်ယင်း၏မောင်နှမအရင်းအချာများ" relationship_type="spouse_mother_family" data={data} handleFamilyChange={handleFamilyChange} addFamilyRow={addFamilyRow} removeFamilyRow={removeFamilyRow} />
            <RenderFamilyTable title="သား/သမီးများနှင့် ၎င်းတို့၏ ဇနီး/ခင်ပွန်း " relationship_type="children" data={data} handleFamilyChange={handleFamilyChange} addFamilyRow={addFamilyRow} removeFamilyRow={removeFamilyRow} />
            <RenderFamilyTable title="နိုင်ငံခြားတွင် ရောက်ရှိနေကြသည့် ဆွေမျိုးများ" relationship_type="relative_abroad" data={data} handleFamilyChange={handleFamilyChange} addFamilyRow={addFamilyRow} removeFamilyRow={removeFamilyRow} />
        </div>
    );
}