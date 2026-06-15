import React from 'react';

export default function StaffSummaryTable({ data = {} }) {
    return (
        <div className="w-full bg-white p-4 overflow-x-auto print:p-0">
            {/* Landscape Title */}
            <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ)</h2>
                <h3 className="text-lg font-bold text-gray-800 mt-1">သင်ကြားရေးဌာနများတွင် တာဝန်ထမ်းဆောင်နေသော ဝန်ထမ်းများ၏ ကိုယ်ရေးအကျဉ်းချုပ်</h3>
                <p className="text-right text-sm font-semibold text-gray-600 mt-2">ဇွန်လ-၂၀၂၆</p>
            </div>

            {/* Scrollable / Printable Landscape Table */}
            <table className="w-full border-collapse border border-black text-[11px] min-w-[1800px] print:min-w-full">
                <thead className="bg-gray-100 text-center font-bold">
                    <tr>
                        <th className="border border-black p-1 w-10">စဉ်</th>
                        <th className="border border-black p-1">အမည်</th>
                        <th className="border border-black p-1">အရည်အချင်း အပြည့်အစုံ</th>
                        <th className="border border-black p-1">မွေးသက္ကရာဇ် <br /> အသက် <br />(ရက်၊လ၊နှစ်)</th>
                        <th className="border border-black p-1">လူမျိုး/ဘာသာ</th>
                        <th className="border border-black p-1">မွေးဖွားရာဇာတိ</th>
                        <th className="border border-black p-1">မှတ်ပုံတင်အမှတ်</th>
                        <th className="border border-black p-1">အဖအမည်  အလုပ်အကိုင်</th>
                        <th className="border border-black p-1">အိမ်ထောင်ရှိ/ မရှိ</th>
                        <th className="border border-black p-1">လက်ရှိရာထူး၊ လစာနှုန်း၊ ဌာန</th>
                        <th className="border border-black p-1">အလုပ်စတင် ဝင်သည့်နေ့</th>
                        <th className="border border-black p-1">လက်ရှိရာထူး<br />ရသည့်နေ့(ရက်၊လ၊နှစ်)</th>
                        <th className="border border-black p-1">လက်ရှိဌာနသို့<br />ရောက်သည့်နေ့</th>
                        <th className="border border-black p-1">ပြစ်ဒဏ်ခံရဖူးခြင်း<br />ရှိ/မရှိ</th>
                        <th className="border border-black p-1">စာချုပ် ချုပ်ဆိုထားခြင်းရှိမရှိ ၊ ရှိပါက စာချုပ်နှစ်၊လျော်ကြေးငွေ</th>
                        <th className="border border-black p-1">နိုင်ငံခြားသို့ ရောက်ဖူးခြင်း ရှိ၊မရှိ</th>
                        <th className="border border-black p-1">နဝတသင်တန်း(ထက်၊အောက်) ပြီး၊မပြီး</th>
                        <th className="border border-black p-1">ပြောင်းရွှေ့ တာဝန်ထမ်းဆောင်ခဲ့ဖူးသော ကျောင်း၊ ဌာန (အဆင့်ဆင့် မှ-ထိ)</th>
                        <th className="border border-black p-1">အမြဲတမ်းနေရပ်လိပ်စာ</th>
                        <th className="border border-black p-1">လက်ရှိနေရပ်လိပ်စာ</th>
                        <th className="border border-black p-1">နယ်ခံ/နယ်ဝေး</th>
                        <th className="border border-black p-1">သင်တန်းတက်ရောက်နေပါက ဖော်ပြရန်(ပြည်တွင်း၊ပြည်ပ)</th>
                        <th className="border border-black p-1">အခြားတက္ကသိုလ် သို့ တွဲဖက်နေပါက ဖော်ပြရန် </th>
                        <th className="border border-black p-1">ကင်းကွာ/တွဲဖက်<br />ဖော်ပြရန်</th>
                        <th className="border border-black p-1">မှတ်ချက်</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50 text-center">
                        <td className="border border-black p-1">{1}</td>
                        <td className="border border-black p-1 text-left font-semibold">{data.name || '-'}</td>
                        <td className="border border-black p-1 text-left">{data.info?.degree}</td>
                        <td className="border border-black p-1">{data.date_of_birth}</td>
                        <td className="border border-black p-1">{data.race || ''} / {data.religion || ''}</td>
                        <td className="border border-black p-1">{data.birth_place || ''}</td>
                        <td className="border border-black p-1 ">{data.nrc_township || ''}
                            {data.nrc_type && `(${data.nrc_type})`}
                            {data.nrc_number ? ` ${data.nrc_number}` : '-'}</td>
                        <td className="border border-black p-1">{data.father_name || ''}/{data.father_job || ''}</td>
                        <td className="border border-black p-1">{data.marital_status}</td>
                        <td className="border border-black p-1 text-left">{data.employment?.position || '-'} / {data.employment?.salary_scale || '-'} / {data.employment?.department || '-'}
                        </td>
                        <td className="border border-black p-1">{data.employment?.employee_start_date_detail}</td>
                        <td className="border border-black p-1">{data.employment?.current_pos_start_date_detail}</td>
                        <td className="border border-black p-1">{data.employment?.current_dept_start_date_detail}</td>
                        <td className="border border-black p-1">{data.employment?.penalty_detail || 'မရှိ'}</td>
                        <td className="border border-black p-1">{data.employment?.contract_agreement_detail || 'မရှိ'}</td>
                        <td className="border border-black p-1">{data.employment?.foreign_detail || '-'}</td>
                        <td className="border border-black p-1 text-left">{data.employment?.training_detail || '-'}</td>
                        <td className="border border-black p-1 text-left">{data.employment?.transfer_detail}</td>
                        <td className="border border-black p-1 text-left">{data.info?.permanent_address}</td>
                        <td className="border border-black p-1 text-left">{data.info?.current_address}</td>
                        <td className="border border-black p-1">{data.info?.not_border || '-'}</td>
                        <td className="border border-black p-1">{data.info?.current_training || '-'}</td>
                        <td className="border border-black p-1">{data.info?.is_accompanied || '-'}</td>
                        <td className="border border-black p-1">{data.info?.separation_date || '-'}</td>
                        <td className="border border-black p-1">{data.info?.remark || '-'}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}