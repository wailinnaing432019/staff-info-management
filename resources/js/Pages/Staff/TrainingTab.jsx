import React from 'react';

// Reusable Table Component - တစ်ခုတည်းသော array ထဲမှ သက်ဆိုင်ရာ category အလိုက် စစ်ထုတ်ပြသပေးမည်
const RenderTrainingTable = ({ title, trainingCategory, data, handleTrainingChange, addTrainingRow, removeTrainingRow, education = false }) => {
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
                            <th className="p-2 border min-w-[120px]">စတင်တက်ရောက်သည့်နေ့</th>
                            <th className="p-2 border min-w-[120px]">ပြီးဆုံးသည့်နေ့</th>
                            <th className="p-2 border min-w-[180px]">နေရာ/ ဒေသ</th>
                            {education && <th className="p-2 border min-w-[120px]">အဆင့်/အမှတ်စဉ်</th>}
                            <th className="p-2 border w-20 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrainings.map((row, i) => (
                            <tr key={row.originalIndex} className="border-b hover:bg-gray-50">

                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.learn_course} onChange={e => handleTrainingChange(row.originalIndex, 'learn_course', e.target.value)} />
                                </td>

                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.learn_from} onChange={e => handleTrainingChange(row.originalIndex, 'learn_from', e.target.value)} />
                                </td>

                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.learn_to} onChange={e => handleTrainingChange(row.originalIndex, 'learn_to', e.target.value)} />
                                </td>

                                <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.location} onChange={e => handleTrainingChange(row.originalIndex, 'location', e.target.value)} />
                                </td>

                                {education && <td className="p-1 border">
                                    <textarea rows={1} className="w-full border-0 p-1 focus:ring-1 focus:ring-blue-500 rounded" value={row.rank} onChange={e => handleTrainingChange(row.originalIndex, 'rank', e.target.value)} />
                                </td>
                                }

                                <td className="p-1 border text-center">
                                    <button type="button" onClick={() => removeTrainingRow(row.originalIndex)} className="text-red-500 hover:text-red-700 hover:underline text-xs font-medium">
                                        ဖျက်ရန်
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button type="button" onClick={() => addTrainingRow(trainingCategory)} className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors shadow-sm font-medium">
                + သင်တန်းထည့်ရန်
            </button>
        </div>
    );
};
export default function TrainingTab({ data, setData }) {


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


    const removeTrainingRow = (globalIndex) => {
        setData('trainings', data.trainings.filter((_, i) => i !== globalIndex));
    };


    const handleTrainingChange = (globalIndex, field, value) => {
        const updatedTrainings = [...data.trainings];
        updatedTrainings[globalIndex][field] = value;
        setData('trainings', updatedTrainings);
    };



    return (
        <div className="space-y-4">


            <RenderTrainingTable title="ပညာဆည်းပူးခဲ့သောကျောင်း၊ ကောလိပ်၊ တက္ကသိုလ်၊ အလုပ်ဌာန၊ သင်တန်း စသည်များ" trainingCategory="education" data={data} handleTrainingChange={handleTrainingChange} addTrainingRow={addTrainingRow} removeTrainingRow={removeTrainingRow} education={true} />
            <RenderTrainingTable title="ပြည်တွင်းသင်တန်းများ တက်ရောက်မှု " trainingCategory="local_training" data={data} handleTrainingChange={handleTrainingChange} addTrainingRow={addTrainingRow} removeTrainingRow={removeTrainingRow} />
            <RenderTrainingTable title="ပြည်ပသင်တန်းများ တက်ရောက်မှု " trainingCategory="foreign_training" data={data} handleTrainingChange={handleTrainingChange} addTrainingRow={addTrainingRow} removeTrainingRow={removeTrainingRow} />
        </div>
    );
}