import React from 'react';

export default function TrainingEditTab({ data, addRow, removeRow, updateRowValue }) {
    return (
        <div className="space-y-4 pt-4 border-t">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-gray-800">🏫 (ခ) တက်ရောက်ခဲ့ဖူးသော သင်တန်းများ</h4>
                <button
                    type="button"
                    onClick={() => addRow('trainings', { learn_course: '', from_date: '', to_date: '', location: '', category: 'local_training' })}
                    className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded"
                >
                    + သင်တန်းအသစ်ထည့်ရန်
                </button>
            </div>
            <table className="w-full border text-xs text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">သင်တန်းအမည် / အမှတ်စဉ်</th>
                        <th className="border p-2">စတင်သည့်ရက်</th>
                        <th className="border p-2">ပြီးဆုံးသည့်ရက်</th>
                        <th className="border p-2">ဖွင့်လှစ်သည့် နေရာ / ကျောင်း</th>
                        <th className="border p-2 w-28">အမျိုးအစား</th>
                        <th className="border p-2 text-center w-16">ဖျက်</th>
                    </tr>
                </thead>
                <tbody>
                    {data.trainings.map((t, idx) => (
                        <tr key={idx}>
                            <td className="border p-1"><input type="text" value={t.learn_course} onChange={e => updateRowValue('trainings', idx, 'learn_course', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                            <td className="border p-1"><input type="text" value={t.learn_from} onChange={e => updateRowValue('trainings', idx, 'learn_from', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                            <td className="border p-1"><input type="text" value={t.learn_to} onChange={e => updateRowValue('trainings', idx, 'learn_to', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                            <td className="border p-1"><input type="text" value={t.location} onChange={e => updateRowValue('trainings', idx, 'location', e.target.value)} className="w-full p-1 text-xs border-0" /></td>
                            <td className="border p-1">
                                <select value={t.category || 'local_training'} onChange={e => updateRowValue('trainings', idx, 'category', e.target.value)} className="w-full p-1 text-xs border-0">
                                    <option value="local_training">ပြည်တွင်းသင်တန်း</option>
                                    <option value="foreign_training">ပြည်ပသင်တန်း</option>
                                    <option value="education">ပညာဆည်းပူးခဲ့သော ကျောင်း...</option>
                                </select>
                            </td>
                            <td className="border p-1 text-center">
                                <button type="button" onClick={() => removeRow('trainings', idx)} className="text-red-600 font-bold">❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}