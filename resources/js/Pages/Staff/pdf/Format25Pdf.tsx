import { getMyanmarCurrentDate } from "@/util/getCurrentMonth";
import toMyanmarNumber from "@/util/numberHelper";
import React, { useEffect } from "react";
import Format25 from "../components/Format25";
import { Head } from "@inertiajs/react";

export default function Format25Pdf({ data }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head title={`ပုံစံ-၂၅`} />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    @import url('https://cdn.jsdelivr.net/npm/@myanmar-tools/fonts/pyidaungsu.css');

                    @page { 
                        size: legal landscape; 
                        margin: 10mm 10mm 10mm 10mm;  
                    
                        @top-center {
                        content: "";
                        } 
                        @bottom-center {
                        content: "";
                        } 
                    }

                    @media print {
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                            background-color: white;
                            color: black;
                            font-family: 'Pyidaungsu', sans-serif !important;
                        }
                    }

                    * {
                        font-family: 'Pyidaungsu', sans-serif !important;
                    }
 
                    table th, table td {
                        border: 1px solid black !important;
                        padding: 3px 2px !important;
                        line-height: 1.2 !important;
                        word-break: break-word;  
                    }
                    `,
                }}
            />

            <div className="w-full bg-white p-2">
                <div className="text-center mb-2">
                    <h2 className="text-sm font-bold text-gray-900">
                        ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ)၊ သင်ကြားရေးဌာနများတွင်
                        တာဝန်ထမ်းဆောင်နေသော ဝန်ထမ်း၏ ကိုယ်ရေးအကျဉ်းချုပ်
                    </h2>

                    <p className="text-right text-sm font-semibold text-gray-600 mt-2">
                        {getMyanmarCurrentDate()}
                    </p>
                </div>

                <table className="w-full border-collapse border border-black text-[9px] print:text-[7px]">
                    <thead className="bg-gray-100 text-center font-bold">
                        <tr className="divide-x divide-black">
                            <th className="w-[2%]">စဉ်</th>
                            <th className="w-[3%]">အမည်</th>
                            <th className="w-[3%]">
                                ပညာ <br />
                                အရည်အချင်း
                                <br />
                                အပြည့်အစုံ
                            </th>
                            <th className="w-[3%]">
                                မွေးသက္ကရာဇ်
                                <br />
                                အသက်
                                <br />
                                (ရက်၊လ၊နှစ်)
                            </th>
                            <th className="w-[3%]">လူမျိုး/ဘာသာ</th>
                            <th className="w-[3%]">မွေးဖွားရာဇာတိ</th>
                            <th className="w-[3%]">
                                မှတ်ပုံတင် <br />
                                အမှတ်
                            </th>
                            <th className="w-[3%]">
                                အဖအမည်
                                <br />
                                အလုပ်အကိုင်
                            </th>
                            <th className="w-[3%]">
                                အိမ်ထောင်ရှိ/
                                <br />
                                မရှိ
                            </th>

                            <th className="w-[7%]">
                                လက်ရှိရာထူး၊ လစာနှုန်း၊ ဌာန
                            </th>
                            <th className="w-[3%]">
                                အလုပ်စတင်
                                <br />
                                ဝင်ရောက်သည့်နေ့
                                <br /> (ရက်၊ လ၊ နှစ်)
                            </th>
                            <th className="w-[3%]">
                                လက်ရှိရာထူး
                                <br />
                                ရသည့်နေ့
                                <br /> (ရက်၊ လ၊ နှစ်)
                            </th>
                            <th className="w-[3%]">
                                လက်ရှိဌာန
                                <br />
                                ရောက်သည့်နေ့
                                <br /> (ရက်၊ လ၊ နှစ်)
                            </th>
                            <th className="w-[3%]">
                                ပြစ်ဒဏ်ခံရဖူးခြင်း
                                <br />
                                ရှိ/မရှိ
                                <br /> (ရှိလျှင် ဖော်ပြရန်)
                            </th>
                            <th className="w-[3%]">
                                စာချုပ် ချုပ်ဆိုထားခြင်းရှိမရှိ ၊ ရှိပါက
                                <br />
                                စာချုပ်နှစ်၊လျော်ကြေးငွေ
                            </th>
                            <th className="w-[4%]">
                                နိုင်ငံခြားသို့ ရောက်ဖူးခြင်း
                                <br />
                                ရှိ၊မရှိ ရှိပါက သွားရောက်ခဲ့သည့်နိုင်ငံ ကာလ
                                <br /> (မှ၊ ထိ)
                            </th>
                            <th className="w-[5%]">
                                နဝတသင်တန်း(ထက်၊အောက်)
                                <br />
                                ပြီး/ မပြီး၊ သင်တန်းတက်ရောက်ခဲ့ဖူးလျှင်
                                သင်တန်းအမည်နှင့် အမှတ်စဉ်
                            </th>
                            <th className="w-[7%]">
                                ပြောင်းရွှေ့ တာဝန်ထမ်းဆောင်ခဲ့ဖူးသော ကျောင်း၊
                                <br />
                                ဌာန (အဆင့်ဆင့် မှ-ထိ)
                            </th>

                            <th className="w-[5%]">အမြဲတမ်းနေရပ်လိပ်စာ</th>
                            <th className="w-[5%]">လက်ရှိနေရပ်လိပ်စာ</th>
                            <th className="w-[3%]">နယ်ခံ/နယ်ဝေး</th>
                            <th className="w-[4%]">
                                သင်တန်းတက်ရောက်နေပါက
                                <br />
                                ဖော်ပြရန်(ပြည်တွင်း၊ပြည်ပ)
                            </th>

                            <th className="w-[6%]">
                                အခြားတက္ကသိုလ် သို့
                                <br />
                                တွဲဖက်နေပါက ဖော်ပြရန်
                            </th>
                            <th className="w-[10%]">ကင်းကွာသည့် ရက်စွဲ</th>
                            <th className="w-[4%]">မှတ်ချက်</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                        <tr className="text-center">
                            {[...Array(25)].map((_, index) => (
                                <td key={index}>
                                    {toMyanmarNumber(index + 1)}
                                </td>
                            ))}
                        </tr>
                        <tr className="text-center align-top">
                            <td>{toMyanmarNumber(1)}</td>
                            <td className="text-left font-semibold">
                                {data.name || "-"}
                            </td>
                            <td className="text-left whitespace-pre-line">
                                {data.info?.degree || "-"}
                            </td>
                            <td>
                                {data.age || ""}
                                <br /> {data.date_of_birth || "-"}
                            </td>
                            <td>
                                {data.race || "-"}၊ {data.religion || "-"}
                            </td>
                            <td className="text-left">
                                {data.birth_place || "-"}
                            </td>
                            <td className="text-left">
                                {data.nrc_state || ""}/{data.nrc_township || ""}
                                {data.nrc_type && `(${data.nrc_type})`}
                                {data.nrc_number ? ` ${data.nrc_number}` : "-"}
                            </td>
                            <td className="text-left">
                                {data.father_name || "-"} <br />
                                {data.father_job ? ` (${data.father_job})` : ""}
                            </td>
                            <td>{data.marital_status || "-"}</td>
                            <td className="text-left">
                                {data.employment?.position || "-"}၊ <br />
                                {data.employment?.salary_rate || "-"}၊
                                <br />
                                {data.employment?.department || "-"}
                            </td>
                            <td>
                                {data.employment?.employee_start_date_detail ||
                                    "-"}
                            </td>
                            <td>
                                {data.employment
                                    ?.current_pos_start_date_detail || "-"}
                            </td>
                            <td>
                                {data.employment
                                    ?.current_dept_start_date_detail || "-"}
                            </td>
                            <td className="text-left">
                                {data.employment?.penalty_detail || "-"}
                            </td>
                            <td className="text-left">
                                {data.employment?.contract_agreement_detail ||
                                    "-"}
                            </td>
                            <td className="text-left">
                                {data.employment?.foreign_detail || "-"}
                            </td>
                            <td className="text-left">
                                {data.employment?.training_detail || "-"}
                            </td>
                            <td className="text-left whitespace-pre-line">
                                {data.employment?.transfer_detail || "-"}
                            </td>
                            <td className="text-left whitespace-pre-line">
                                {data.info?.permanent_address || "-"}
                            </td>
                            <td className="text-left whitespace-pre-line">
                                {data.info?.current_address || "-"}
                            </td>
                            <td>{data.info?.not_border || "-"}</td>
                            <td className="text-left">
                                {data.info?.current_training || "-"}
                            </td>
                            <td className="text-left">
                                {data.info?.is_accompanied || "-"}
                            </td>
                            <td className="text-left">
                                {data.info?.separation_date || "-"}
                            </td>
                            <td className="text-left">
                                {data.info?.remark || "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
