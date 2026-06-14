import React from 'react';

export default function LegalEditTab({ data, addRow, removeRow, updateRowValue }) {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* ပြစ်ဒဏ်မှတ်တမ်း */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-gray-800">⚖️ (က) ဌာနဆိုင်ရာ အရေးယူမှု / ပြစ်ဒဏ်မှတ်တမ်းများ</h4>
                    <button
                        type="button"
                        onClick={() => addRow('legal_records', { record_type: 'disciplinary', period: '', reason: '', penalty: '', remark: '' })}
                        className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded"
                    >
                        + အရေးယူမှုမှတ်တမ်းထည့်ရန်
                    </button>
                </div>
                <table className="w-full border text-xs text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 w-36">အမျိုးအစား</th>
                            <th className="border p-2">အရေးယူခံရသည့် ကာလ</th>
                            <th className="border p-2">အကြောင်းကိစ္စ / ပုဒ်မ</th>
                            <th className="border p-2">ချမှတ်ခံရသည့် ပြစ်ဒဏ်</th>
                            <th className="border p-2">မှတ်ချက်</th>
                            <th className="border p-2 text-center w-16">ဖျက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.legal_records.map((l, idx) => (
                            <tr key={idx}>
                                <td className="border p-1">
                                    <select value={l.record_type || 'disciplinary'} onChange={e => updateRowValue('legal_records', idx, 'record_type', e.target.value)} className="w-full p-1 text-xs border-0">
                                        <option value="`disciplinary">ဌာနဆိုင်ရာအရေးယူမှု</option>
                                        <option value="court">တရားရုံးပြစ်ဒဏ်</option>
                                    </select>
                                </td>
                                <td className="border p-1"><input type="text" value={l.period} onChange={e => updateRowValue('legal_records', idx, 'period', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                <td className="border p-1"><input type="text" value={l.reason} onChange={e => updateRowValue('legal_records', idx, 'reason', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                <td className="border p-1"><input type="text" value={l.penalty} onChange={e => updateRowValue('legal_records', idx, 'penalty', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                <td className="border p-1"><input type="text" value={l.remark} onChange={e => updateRowValue('legal_records', idx, 'remark', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                <td className="border p-1 text-center">
                                    <button type="button" onClick={() => removeRow('legal_records', idx)} className="text-red-600 font-bold">❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ဘွဲ့တံဆိပ်ဆုများ */}
            <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-gray-800"> (ခ) ဘွဲ့ / တံဆိပ် ချီးမြှင့်ခံရဖူးခြင်း မှတ်တမ်း</h4>
                    <button
                        type="button" n
                        onClick={() => addRow('awards', { award_title: '', award_year: '', award_period: '', award_remark: '' })}
                        className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded"
                    >
                        + ဆုတံဆိပ်အသစ်ထည့်ရန်
                    </button>
                </div>
                <table className="w-full border text-xs text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">ချီးမြှင့်ခံရသည့် ဘွဲ့ / တံဆိပ်အမည်</th>
                            <th className="border p-2">ချီးမြှင့်ခံရသည့် ကာလ</th>
                            <th className="border p-2">အမိန့်အမှတ်/ ခုနှစ်</th>
                            <th className="border p-2">မှတ်ချက်  </th>
                            <th className="border p-2 text-center w-16">ဖျက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.awards.map((aw, idx) => (
                            <tr key={idx}>
                                <td className="border p-1"><input type="text" value={aw.award_title} onChange={e => updateRowValue('awards', idx, 'award_title', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                <td className="border p-1"><input type="text" value={aw.award_year} onChange={e => updateRowValue('awards', idx, 'award_year', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                <td className="border p-1"><input type="text" value={aw.award_period} onChange={e => updateRowValue('awards', idx, 'award_period', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                <td className="border p-1"><input type="text" value={aw.award_remark} onChange={e => updateRowValue('awards', idx, 'award_remark', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                                <td className="border p-1 text-center">
                                    <button type="button" onClick={() => removeRow('awards', idx)} className="text-red-600 font-bold">❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}