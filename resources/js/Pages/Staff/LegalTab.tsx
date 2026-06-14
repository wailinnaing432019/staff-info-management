import React from 'react';

// Reusable Table Component (အပြင်မှာ ထားပါမယ်)
const RenderLegalTable = ({ title, recordType, data, handleLegalChange, addLegalRow, removeLegalRow }) => {
    const filteredRecords = data.legal_records
        .map((row, originalIndex) => ({ ...row, originalIndex }))
        .filter(item => item.record_type === recordType);

    return (
        <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">{title}</h4>
            <div className="overflow-x-auto">
                <table className="w-full border text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="p-2 border min-w-[120px]">ကာလ (Period)</th>
                            <th className="p-2 border min-w-[250px]">အကြောင်းရင်း / ဥပဒေပုဒ်မ</th>
                            <th className="p-2 border min-w-[250px]">ချမှတ်ခံရသည့်ပြစ်ဒဏ် (Penalty)</th>
                            <th className="p-2 border min-w-[180px]">မှတ်ချက်</th>
                            <th className="p-2 border w-20 text-center">လုပ်ဆောင်ချက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((row) => (
                            <tr key={row.originalIndex} className="border-b hover:bg-gray-50">
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full resize-none overflow-hidden border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded text-sm bg-transparent block min-h-[34px]" value={row.period || ''} onChange={e => handleLegalChange(row.originalIndex, 'period', e.target.value)} placeholder="e.g. ၂၀၂၅-၂၀၂၆" />
                                </td>
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full resize-none overflow-hidden border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded text-sm bg-transparent block min-h-[34px]" value={row.reason || ''} onChange={e => handleLegalChange(row.originalIndex, 'reason', e.target.value)} />
                                </td>
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full resize-none overflow-hidden border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded text-sm bg-transparent block min-h-[34px]" value={row.penalty || ''} onChange={e => handleLegalChange(row.originalIndex, 'penalty', e.target.value)} />
                                </td>
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full resize-none overflow-hidden border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded text-sm bg-transparent block min-h-[34px]" value={row.remark || ''} onChange={e => handleLegalChange(row.originalIndex, 'remark', e.target.value)} />
                                </td>
                                <td className="p-1 border text-center">
                                    <button type="button" onClick={() => removeLegalRow(row.originalIndex)} className="text-red-500 hover:text-red-700 hover:underline text-xs font-medium">ဖျက်ရန်</button>
                                </td>
                            </tr>
                        ))}
                        {filteredRecords.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-400 bg-gray-50 italic">ဤဇယားအတွက် ထည့်သွင်းထားသော မှတ်တမ်းမရှိသေးပါ။</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button type="button" onClick={() => addLegalRow(recordType)} className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors shadow-sm font-medium">+ ဒေတာထပ်ထည့်ရန်</button>
        </div>
    );
};

// ✅ အခုဆိုရင် တကယ့် Tab မှာ { data, setData } နှစ်ခုတည်းပဲ လက်ခံပါတော့တယ်
export default function LegalAwardsTab({ data, setData }) {

    // ဇယားအလိုက် Row အသစ်တိုးပေးမည့် Helper
    const addLegalRow = (recordType) => {
        const newRow = { record_type: recordType, period: '', reason: '', penalty: '', remark: '' };
        setData('legal_records', [...(data.legal_records || []), newRow]);
    };

    // Row ဖျက်မည့် Helper
    const removeLegalRow = (globalIndex) => {
        setData('legal_records', data.legal_records.filter((_, i) => i !== globalIndex));
    };

    // State Update လုပ်မည့် Helper
    const handleLegalChange = (globalIndex, field, value) => {
        const updatedRecords = [...data.legal_records];
        updatedRecords[globalIndex][field] = value;
        setData('legal_records', updatedRecords);
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-800 mb-1">၇။ ဌာနဆိုင်ရာအရေးယူမှု၊ တရားစွဲဆိုမှုနှင့် ပြစ်မှုမှတ်တမ်းများ</h3>
            </div>

            <RenderLegalTable title="၁။ ဌာနဆိုင်ရာ အရေးယူခံရခြင်းမှတ်တမ်း (Disciplinary Actions)" recordType="disciplinary" data={data} handleLegalChange={handleLegalChange} addLegalRow={addLegalRow} removeLegalRow={removeLegalRow} />
            <RenderLegalTable title="၂။ တရားရုံးတွင် တရားစွဲဆိုခံရခြင်းမှတ်တမ်း (Court Actions)" recordType="court" data={data} handleLegalChange={handleLegalChange} addLegalRow={addLegalRow} removeLegalRow={removeLegalRow} />
        </div>
    );
}