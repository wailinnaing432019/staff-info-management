import React from 'react';

export default function Format25Portait({ data = {} }) {
    const staffList = Array.isArray(data) ? data : [data];

    return (
        <>
            {/* 🖨️ PDF / Print အတွက် A5 Landscape သို့မဟုတ် စိတ်ကြိုက်စာရွက်အတွက် စာမျက်နှာအကူး အလှဆင်သည့် CSS */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @page {
                    size: A5 landscape;
                    margin: 10mm;
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background-color: white;
                    }
                    /* ကတ်တစ်ခုချင်းစီကို Print ထုတ်ရင် စာမျက်နှာအလယ်ကနေ ပြတ်မသွားစေရန် */
                    .staff-card {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                }
            `}} />

            <div className="w-full bg-white p-4 max-w-[1200px] mx-auto print:p-0">
                {/* 🏛️ ခေါင်းစဉ်ပိုင်း */}
                <div className="text-center mb-6 print:mb-4 border-b-2 border-black pb-3">
                    <h2 className="text-xl font-bold text-gray-900">ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ)</h2>
                    <h3 className="text-base font-bold text-gray-800 mt-1">သင်ကြားရေးဌာနများတွင် တာဝန်ထမ်းဆောင်နေသော ဝန်ထမ်းများ၏ ကိုယ်ရေးအကျဉ်းချုပ်</h3>
                    <p className="text-right text-xs font-semibold text-gray-600 mt-2">ဇွန်လ-၂၀၂၆</p>
                </div>

                {/* 🗂️ ဝန်ထမ်းကတ်များ စာရင်း */}
                <div className="space-y-6 print:space-y-4">
                    {staffList.map((item, index) => (
                        <div
                            key={index}
                            className="staff-card border border-black rounded-sm p-4 bg-white shadow-sm print:shadow-none print:bg-transparent"
                        >
                            {/* ကတ်၏ အပေါ်ဆုံးပိုင်း (အမည်နှင့် ရာထူး) */}
                            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3 print:pb-1 print:mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                                        စဉ် {index + 1}
                                    </span>
                                    <h4 className="text-base font-bold text-black">
                                        {item.name || '-'}
                                    </h4>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-gray-900">
                                        {item.employment?.position || '-'}
                                    </span>
                                    <span className="text-xs text-gray-600 block print:inline print:ml-2">
                                        ({item.employment?.salary_scale || '-'})
                                    </span>
                                </div>
                            </div>

                            {/* 📋 အချက်အလက်များကို အပိုင်း (၃) ပိုင်းခွဲ၍ ပြသခြင်း */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-[12px] print:text-[11px] text-gray-800">

                                {/* 👤 အပိုင်း (၁) - ကိုယ်ရေးအချက်အလက် */}
                                <div className="space-y-1.5">
                                    <p><strong className="text-black">အရည်အချင်း:</strong> {item.info?.degree || '-'}</p>
                                    <p><strong className="text-black">မွေးသက္ကရာဇ်:</strong> {item.date_of_birth || '-'}</p>
                                    <p><strong className="text-black">လူမျိုး / ဘာသာ:</strong> {item.race || '-'} / {item.religion || '-'}</p>
                                    <p><strong className="text-black">မွေးဖွားရာဇာတိ:</strong> {item.birth_place || '-'}</p>
                                    <p><strong className="text-black">မှတ်ပုံတင်အမှတ်:</strong> <span className="font-mono">
                                        {item.nrc_township || ''}
                                        {item.nrc_type && `(${item.nrc_type})`}
                                        {item.nrc_number ? ` ${item.nrc_number}` : '-'}</span></p>
                                    <p><strong className="text-black">အဖအမည်/အလုပ်:</strong> {item.father_name || '-'}{item.father_job ? ` (${item.father_job})` : ''}</p>
                                    <p><strong className="text-black">အိမ်ထောင်ရှိ/မရှိ:</strong> {item.marital_status || '-'}</p>
                                </div>

                                {/* 💼 အပိုင်း (၂) - ဝန်ထမ်းရေးရာနှင့် ရာထူး */}
                                <div className="space-y-1.5 border-t pt-2 md:border-t-0 md:pt-0 md:border-x md:px-4 border-gray-200">
                                    <p><strong className="text-black">လက်ရှိဌာန:</strong> {item.employment?.department || '-'}</p>
                                    <p><strong className="text-black">အလုပ်စတင်ဝင်ရက်:</strong> {item.employment?.employee_start_date_detail || '-'}</p>
                                    <p><strong className="text-black">ရာထူးရသည့်ရက်:</strong> {item.employment?.current_pos_start_date_detail || '-'}</p>
                                    <p><strong className="text-black">ဌာနသို့ရောက်ရက်:</strong> {item.employment?.current_dept_start_date_detail || '-'}</p>
                                    <p><strong className="text-black">ပြစ်ဒဏ်ခံရဖူးခြင်း:</strong> <span className={item.employment?.penalty_detail ? "text-red-600" : ""}>{item.employment?.penalty_detail || 'မရှိ'}</span></p>
                                    <p><strong className="text-black">စာချုပ်ချုပ်ဆိုမှု:</strong> {item.employment?.contract_agreement_detail || 'မရှိ'}</p>
                                    <p><strong className="text-black">နိုင်ငံခြားရောက်ဖူးခြင်း:</strong> {item.employment?.foreign_detail || 'မရှိ'}</p>
                                </div>

                                {/* 📍 အပိုင်း (၃) - သင်တန်း၊ လိပ်စာနှင့် အခြားအချက်အလက် */}
                                <div className="space-y-1.5 border-t pt-2 md:border-t-0 md:pt-0">
                                    <p><strong className="text-black">နဝတသင်တန်း:</strong> {item.employment?.training_detail || '-'}</p>
                                    <p><strong className="text-black">နယ်ခံ / နယ်ဝေး:</strong> {item.info?.not_border || '-'}</p>
                                    <p><strong className="text-black">လက်ရှိတက်ဆဲသင်တန်း:</strong> {item.info?.current_training || '-'}</p>
                                    <p><strong className="text-black">တွဲဖက်တက္ကသိုလ်:</strong> {item.info?.is_accompanied || '-'}</p>
                                    <p><strong className="text-black">ကင်းကွာ / တွဲဖက်:</strong> {item.info?.separation_date || '-'}</p>
                                    <p><strong className="text-black">အမြဲတမ်းလိပ်စာ:</strong> {item.info?.permanent_address || '-'}</p>
                                    <p><strong className="text-black">လက်ရှိလိပ်စာ:</strong> {item.info?.current_address || '-'}</p>
                                </div>
                            </div>

                            {/* ပြောင်းရွှေ့မှုမှတ်တမ်းနှင့် မှတ်ချက် (စာသားရှည်လျားတတ်သဖြင့် ကတ်၏ အောက်ခြေတွင် သီးသန့်ထားပါသည်) */}
                            <div className="mt-3 pt-2 border-t border-dashed border-gray-200 text-[11px] print:text-[10px] space-y-1">
                                <p><strong className="text-black">ပြောင်းရွှေ့တာဝန်ထမ်းဆောင်ခဲ့ဖူးသောကျောင်း/ဌာန:</strong> {item.employment?.transfer_detail || '-'}</p>
                                {item.info?.remark && <p><strong className="text-black">မှတ်ချက်:</strong> {item.info?.remark}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}