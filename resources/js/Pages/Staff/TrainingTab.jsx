import React from 'react';

// Reusable Table Component - တစ်ခုတည်းသော array ထဲမှ သက်ဆိုင်ရာ category အလိုက် စစ်ထုတ်ပြသပေးမည်
const RenderTrainingTable = ({ title, trainingCategory, data, handleTrainingChange, addTrainingRow, removeTrainingRow }) => {
    // data.trainings ထဲကမှ လက်ရှိဇယားနဲ့ သက်ဆိုင်တဲ့ ဒေတာတွေကို Index မပျောက်အောင် တွဲပြီး Filter လုပ်ခြင်း
    const filteredTrainings = data.trainings
        .map((training, originalIndex) => ({ ...training, originalIndex }))
        .filter(item => item.category === trainingCategory);

    return (
        <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-bold text-md text-blue-800 mb-3 pb-2 border-b">{title}</h4>

            <div className="overflow-x-auto">
                <table className="w-full border text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="p-2 border min-w-[200px]">သင်တန်းအမည်</th>
                            <th className="p-2 border min-w-[120px]">မှ (ရက်စွဲ)</th>
                            <th className="p-2 border min-w-[120px]">ထိ (ရက်စွဲ)</th>
                            <th className="p-2 border min-w-[180px]">ကျောင်း/နေရာ</th>
                            <th className="p-2 border min-w-[120px]">အဆင့်/အမှတ်စဉ်</th>
                            <th className="p-2 border w-20 text-center">လုပ်ဆောင်ချက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrainings.map((row, i) => (
                            <tr key={row.originalIndex} className="border-b hover:bg-gray-50">
                                {/* သင်တန်းအမည် */}
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.learn_course} onChange={e => handleTrainingChange(row.originalIndex, 'learn_course', e.target.value)} />
                                </td>
                                {/* မှ (ရက်စွဲ) */}
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.learn_from} onChange={e => handleTrainingChange(row.originalIndex, 'learn_from', e.target.value)} placeholder="ရက်/လ/နှစ် သို့ ကာလ" />
                                </td>
                                {/* ထိ (ရက်စွဲ) */}
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.learn_to} onChange={e => handleTrainingChange(row.originalIndex, 'learn_to', e.target.value)} />
                                </td>
                                {/* ကျောင်း/နေရာ */}
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.location} onChange={e => handleTrainingChange(row.originalIndex, 'location', e.target.value)} />
                                </td>
                                {/* အဆင့်/အမှတ်စဉ် */}
                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.rank} onChange={e => handleTrainingChange(row.originalIndex, 'rank', e.target.value)} />
                                </td>
                                {/* လုပ်ဆောင်ချက် (ဖျက်ရန်) */}
                                <td className="p-1 border text-center">
                                    <button type="button" onClick={() => removeTrainingRow(row.originalIndex)} className="text-red-500 hover:text-red-700 hover:underline text-xs font-medium">
                                        ဖျက်ရန်
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredTrainings.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-400 bg-gray-50 italic">ဤဇယားအတွက် ထည့်သွင်းထားသော သင်တန်းမှတ်တမ်းမရှိသေးပါ။</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* သက်ဆိုင်ရာ ဇယားအလိုက် သတ်မှတ်ထားသော Category ကို function ထဲသို့ လှမ်းပို့ပေးခြင်း */}
            <button type="button" onClick={() => addTrainingRow(trainingCategory)} className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors shadow-sm font-medium">
                + သင်တန်းထည့်ရန်
            </button>
        </div>
    );
};
export default function TrainingTab({ data, setData }) {

    // ဇယားတစ်ခုချင်းစီအတွက် row အသစ်တိုးပေးမည့် Helper
    // နှိပ်လိုက်သည့် ဇယားအလိုက် သက်ဆိုင်ရာ category ပါတစ်ခါတည်း သတ်မှတ်ပေးမည်
    const addTrainingRow = (trainingCategory) => {
        const newRow = {
            learn_course: '',
            category: trainingCategory, // UI ကနေ တန်းသတ်မှတ်ပေးမည့် hidden value
            learn_from: '',
            learn_to: '',
            location: '',
            rank: ''
        };
        setData('trainings', [...data.trainings, newRow]);
    };

    // ဒေတာ Row တစ်ခုချင်းစီကို ဖျက်မည့် Helper
    const removeTrainingRow = (globalIndex) => {
        setData('trainings', data.trainings.filter((_, i) => i !== globalIndex));
    };

    // ဇယားကွက်ထဲမှ field တစ်ခုချင်းစီပြောင်းလဲလျှင် State အပ်ဒိတ်လုပ်မည့် Helper
    const handleTrainingChange = (globalIndex, field, value) => {
        const updatedTrainings = [...data.trainings];
        updatedTrainings[globalIndex][field] = value;
        setData('trainings', updatedTrainings);
    };



    return (
        <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">တက်ရောက်ခဲ့ဖူးသော သင်တန်းမှတ်တမ်းများ</h3>
                <p className="text-xs text-gray-500">
                    (ပြည်တွင်း၊ ပြည်ပ နှင့် လက်ရှိတက်ရောက်ဆဲ သင်တန်းမှတ်တမ်းများကို သက်ဆိုင်ရာ ဇယားကွက်အလိုက် ခွဲခြားဖြည့်သွင်းပါ)
                </p>
            </div>

            <RenderTrainingTable title="၁။ ပြည်တွင်းသင်တန်းမှတ်တမ်း (Local Training)" trainingCategory="local_training" data={data} handleTrainingChange={handleTrainingChange} addTrainingRow={addTrainingRow} removeTrainingRow={removeTrainingRow} />
            <RenderTrainingTable title="၂။ ပြည်ပသင်တန်းမှတ်တမ်း (Foreign Training)" trainingCategory="foreign_training" data={data} handleTrainingChange={handleTrainingChange} addTrainingRow={addTrainingRow} removeTrainingRow={removeTrainingRow} />
            <RenderTrainingTable title="၃။ လက်ရှိတက်ရောက်ဆဲသင်တန်းမှတ်တမ်း (Current Training)" trainingCategory="education" data={data} handleTrainingChange={handleTrainingChange} addTrainingRow={addTrainingRow} removeTrainingRow={removeTrainingRow} />        </div>
    );
}