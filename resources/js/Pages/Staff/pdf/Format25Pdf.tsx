import React from 'react';

export default function Format25Pdf({ data }) {
    return (
        <>
            {/* 🖨️ PDF / Print အတွက် A5 Landscape စနစ်နှင့် Layout ညှိယူသည့် CSS */}
            <style dangerouslySetInnerHTML={{
                __html: `
               @page { size: A3 landscape; margin: 15mm 10mm; }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background-color: white;
                    }
                    /* ဇယားတစ်ခုလုံး စာရွက်အကျယ်အတိုင်း ကွက်တိဝင်စေရန် */
                    table {
                        page-break-inside: auto;
                        width: 100% !important;
                        min-width: 100% !important;
                    }
                    tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }
                    thead {
                        display: table-header-group; /* စာမျက်နှာကျော်ပါက ခေါင်းစဉ် အလိုအလျောက်ပြန်ပါရန် */
                    }
                }
            `}} />

            <div className="w-full bg-white p-4 overflow-x-auto print:p-0 print:overflow-visible">
                {/* Landscape Title */}
                <div className="text-center mb-3 print:mb-1">
                    <h2 className="text-lg font-bold text-gray-900 print:text-base">ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ)</h2>
                    <h3 className="text-base font-bold text-gray-800 mt-0.5 print:text-sm">သင်ကြားရေးဌာနများတွင် တာဝန်ထမ်းဆောင်နေသော ဝန်ထမ်းများ၏ ကိုယ်ရေးအကျဉ်းချုပ်</h3>
                    <p className="text-right text-xs font-semibold text-gray-600 mt-1 print:mt-0">ဇွန်လ-၂၀၂၆</p>
                </div>

                {/* Scrollable / Printable Landscape Table */}
                {/* 💡 Web ပေါ်တွင် ပုံမပျက်စေရန် min-w-[1900px] ထားပြီး Print ထုတ်ချိန်တွင် print:text-[7.5px] ဖြင့် A5 မျက်နှာပြင်နှင့် ညှိယူပါသည် */}
                <table className="w-full border-collapse border border-black text-[11px] min-w-[1900px] print:min-w-0 print:text-[7.5px]">
                    <thead className="bg-gray-100 text-center font-bold">
                        <tr className="divide-x divide-black">
                            <th className="border border-black p-0.5 w-8 shrink-0">စဉ်</th>
                            <th className="border border-black p-0.5 min-w-[100px]">အမည်</th>
                            <th className="border border-black p-0.5 min-w-[130px]">အရည်အချင်း အပြည့်အစုံ</th>
                            <th className="border border-black p-0.5 min-w-[80px]">မွေးသက္ကရာဇ်<br />(ရက်၊လ၊နှစ်)</th>
                            <th className="border border-black p-0.5 min-w-[90px]">လူမျိုး/ဘာသာ</th>
                            <th className="border border-black p-0.5 min-w-[100px]">မွေးဖွားရာဇာတိ</th>
                            <th className="border border-black p-0.5 min-w-[120px]">မှတ်ပုံတင်အမှတ်</th>
                            <th className="border border-black p-0.5 min-w-[120px]">အဖအမည်  အလုပ်အကိုင်</th>
                            <th className="border border-black p-0.5 min-w-[70px]">အိမ်ထောင်ရှိ/ မရှိ</th>
                            <th className="border border-black p-0.5 min-w-[160px]">လက်ရှိရာထူး၊ လစာနှုန်း၊ ဌာန</th>
                            <th className="border border-black p-0.5 min-w-[80px]">အလုပ်စတင် ဝင်သည့်နေ့</th>
                            <th className="border border-black p-0.5 min-w-[80px]">လက်ရှိရာထူး<br />ရသည့်နေ့(ရက်၊လ၊နှစ်)</th>
                            <th className="border border-black p-0.5 min-w-[80px]">လက်ရှိဌာနသို့<br />ရောက်သည့်နေ့</th>
                            <th className="border border-black p-0.5 min-w-[80px]">ပြစ်ဒဏ်ခံရဖူးခြင်း<br />ရှိ/မရှိ</th>
                            <th className="border border-black p-0.5 min-w-[140px]">စာချုပ် ချုပ်ဆိုထားခြင်းရှိမရှိ ၊ ရှိပါက စာချုပ်နှစ်၊လျော်ကြေးငွေ</th>
                            <th className="border border-black p-0.5 min-w-[80px]">နိုင်ငံခြားသို့ ရောက်ဖူးခြင်း ရှိ၊မရှိ</th>
                            <th className="border border-black p-0.5 min-w-[90px]">နဝတသင်တန်း(ထက်၊အောက်) ပြီး၊မပြီး</th>
                            <th className="border border-black p-0.5 min-w-[180px]">ပြောင်းရွှေ့ တာဝန်ထမ်းဆောင်ခဲ့ဖူးသော ကျောင်း၊ ဌာန (အဆင့်ဆင့် မှ-ထိ)</th>
                            <th className="border border-black p-0.5 min-w-[140px]">အမြဲတမ်းနေရပ်လိပ်စာ</th>
                            <th className="border border-black p-0.5 min-w-[140px]">လက်ရှိနေရပ်လိပ်စာ</th>
                            <th className="border border-black p-0.5 min-w-[70px]">နယ်ခံ/နယ်ဝေး</th>
                            <th className="border border-black p-0.5 min-w-[100px]">သင်တန်းတက်ရောက်နေပါက ဖော်ပြရန်(ပြည်တွင်း၊ပြည်ပ)</th>
                            <th className="border border-black p-0.5 min-w-[100px]">အခြားတက္ကသိုလ် သို့ တွဲဖက်နေပါက ဖော်ပြရန် </th>
                            <th className="border border-black p-0.5 min-w-[80px]">ကင်းကွာ/တွဲဖက်<br />ဖော်ပြရန်</th>
                            <th className="border border-black p-0.5 min-w-[80px]">မှတ်ချက်</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                        <tr className="hover:bg-gray-50 text-center align-top break-inside-avoid">
                            <td className="border border-black p-0.5">{1}</td>
                            <td className="border border-black p-0.5 text-left font-semibold">{data.name || '-'}</td>
                            <td className="border border-black p-0.5 text-left whitespace-pre-line">{data.info?.degree || '-'}</td>
                            <td className="border border-black p-0.5 whitespace-nowrap">{data.date_of_birth || '-'}</td>
                            <td className="border border-black p-0.5">{data.race || '-'} / {data.religion || '-'}</td>
                            <td className="border border-black p-0.5 text-left">{data.birth_place || '-'}</td>
                            <td className="border border-black p-0.5 font-mono text-[10px] print:text-[7px] whitespace-nowrap">{data.nrc_township || ''}
                                {data.nrc_type && `(${data.nrc_type})`}
                                {data.nrc_number ? ` ${data.nrc_number}` : '-'}</td>
                            <td className="border border-black p-0.5 text-left">{data.father_name || '-'}{data.father_job ? ` (${data.father_job})` : ''}</td>
                            <td className="border border-black p-0.5">{data.marital_status || '-'}</td>
                            <td className="border border-black p-0.5 text-left">
                                {data.employment?.position || '-'} <br />
                                <span className="text-[10px] print:text-[6.5px] text-gray-600">({data.employment?.salary_scale || '-'})</span> <br />
                                {data.employment?.department || '-'}
                            </td>
                            <td className="border border-black p-0.5 whitespace-nowrap">{data.employment?.employee_start_date_detail || '-'}</td>
                            <td className="border border-black p-0.5 whitespace-nowrap">{data.employment?.current_pos_start_date_detail || '-'}</td>
                            <td className="border border-black p-0.5 whitespace-nowrap">{data.employment?.current_dept_start_date_detail || '-'}</td>
                            <td className="border border-black p-0.5 text-left">{data.employment?.penalty_detail || 'မရှိ'}</td>
                            <td className="border border-black p-0.5 text-left">{data.employment?.contract_agreement_detail || 'မရှိ'}</td>
                            <td className="border border-black p-0.5 text-left">{data.employment?.foreign_detail || 'မရှိ'}</td>
                            <td className="border border-black p-0.5 text-left">{data.employment?.training_detail || '-'}</td>
                            <td className="border border-black p-0.5 text-left whitespace-pre-line">{data.employment?.transfer_detail || '-'}</td>
                            <td className="border border-black p-0.5 text-left whitespace-pre-line">{data.info?.permanent_address || '-'}</td>
                            <td className="border border-black p-0.5 text-left whitespace-pre-line">{data.info?.current_address || '-'}</td>
                            <td className="border border-black p-0.5">{data.info?.not_border || '-'}</td>
                            <td className="border border-black p-0.5 text-left">{data.info?.current_training || '-'}</td>
                            <td className="border border-black p-0.5 text-left">{data.info?.is_accompanied || '-'}</td>
                            <td className="border border-black p-0.5 text-left">{data.info?.separation_date || '-'}</td>
                            <td className="border border-black p-0.5 text-left">{data.info?.remark || '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}