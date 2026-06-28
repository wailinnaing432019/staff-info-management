import { useEffect } from "react";

export default function Format1Pdf({ data = {} }) {
    useEffect(() => {
        // Component တက်လာတာနဲ့ Print Box တန်းခေါ်ပေးမယ့် စနစ်
        const timer = setTimeout(() => {
            window.print();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // ကိန်းဂဏန်းများကို မြန်မာလိုပြောင်းရန် Helper
    const toMyanmarNo = (num) => {
        if (!num && num !== 0) return "";
        const myanmarNumbers = {
            '0': '၀', '1': '၁', '2': '၂', '3': '၃', '4': '၄',
            '5': '၅', '6': '၆', '7': '၈', '8': '၈', '9': '၉'
        };
        return String(num).split('').map(char => myanmarNumbers[char] || char).join('');
    };

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @page {
                    size: A4;
                    margin: 20mm 15mm 20mm 15mm; 
                    @top-center {
                        content: "လျှို့ဝှက်";  
                        font-size: 14px;
                        font-weight: bold;
                    }
                    @bottom-center {
                        content: "လျှို့ဝှက်";
                        font-size: 14px;
                        font-weight: bold;
                    }
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background-color: white;
                        color: black;
                    }
                    .page-break {
                        page-break-before: always;
                        break-before: page;
                    }
                    .keep-together {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                    h2, h3, h4 {
                        page-break-after: avoid;
                        break-after: avoid;
                    }
                }
                .dotted-line {
                    border-bottom: 1px dotted #000;
                    padding-left: 6px;
                    padding-right: 6px;
                    display: inline-block;
                    min-width: 150px;
                }
                table th, table td {
                    border: 1px solid black !important;
                    padding: 6px 4px;
                    font-size: 14px;
                }
            `,
                }}
            />

            <div className="bg-white p-4 md:p-8 max-w-4xl mx-auto my-4 text-black text-[15px] leading-relaxed select-none print:border-0 print:shadow-none print:p-0 print:m-0 print:max-w-full font-padauk">
                
                {/* ================= စာမျက်နှာ (၁) ================= */}
                <div className="text-right text-[14px] font-bold">ပုံစံ (၁)</div>
                
                <div className="flex flex-col items-center relative mb-6">
                    <h2 className="text-[18px] font-bold tracking-wide text-center">ကိုယ်ရေးမှတ်တမ်း</h2>
                    <p className="text-[13px] font-medium mt-1 text-center">[ နည်းဥပဒေ ၂၄ (ခ)]</p>
                </div>

                <div className="space-y-2.5">
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁။ အမည်</div><div>-</div>
                        <div className="font-semibold">{data.name || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၂။ ငယ်နာမည်</div><div>-</div>
                        <div>{data.nickname || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၃။ အခြားအမည်</div><div>-</div>
                        <div>{data.alternative_name || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၄။ အသက် (မွေးသက္ကရာဇ်)</div><div>-</div>
                        <div>
                            {data.age ? `${toMyanmarNo(data.age)} နှစ် ` : "............ နှစ် "} 
                            {data.date_of_birth ? `(${data.date_of_birth})` : "(ရက် - လ - နှစ်)"}
                        </div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၅။ လူမျိုးနှင့်ကိုးကွယ်သည့်ဘာသာ</div><div>-</div>
                        <div>{data.race || "..........................."} / {data.religion || "..........................."}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၆။ အရပ်အမြင့်</div><div>-</div>
                        <div>{data.physical?.height || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၇။ ဆံပင်အရောင်</div><div>-</div>
                        <div>{data.physical?.hair_color || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၈။ မျက်စိအရောင်</div><div>-</div>
                        <div>{data.physical?.eye_color || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၉။ ထင်ရှားသည့်အမှတ်အသား</div><div>-</div>
                        <div>{data.physical?.distinctive_mark || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၀။ အသားအရောင်</div><div>-</div>
                        <div>{data.physical?.skin_color || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၁။ ကိုယ်အလေးချိန်</div><div>-</div>
                        <div>{data.physical?.weight || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၂။ မွေးရာဇာတိ</div><div>-</div>
                        <div>{data.birth_place || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၃။ နိုင်ငံသားစိစစ်ရေးကတ်ပြားအမှတ်</div><div>-</div>
                        <div>{data.nrc || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၄။ ယခုနေရပ်လိပ်စာအပြည့်အစုံ</div><div>-</div>
                        <div className="break-words">{data.current_address || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၅။ အမြဲတမ်းနေရပ်လိပ်စာအပြည့်အစုံ</div><div>-</div>
                        <div className="break-words">{data.permanent_address || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၆။ ယခင်နေထိုင်ခဲ့ဖူးသောဒေသနှင့်<br />နေရပ်လိပ်စာများအပြည့်အစုံ<br /><span className="text-[12px] font-normal">(တပ်မတော်သားဖြစ်ကတပ်လိပ်စာဖော်ပြရန်မလိုပါ)</span></div><div>-</div>
                        <div className="break-words">{data.previous_addresses || "............................................"}</div>
                    </div>

                    <div className="col-span-3 font-semibold pt-2">၁၇။ တပ်မတော်သို့ဝင်ခဲ့ဖူးလျှင်/တပ်မတော်သားဖြစ်လျှင် -</div>
                    <div className="pl-6 space-y-2">
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(က) ကိုယ်ပိုင်အမှတ်</div><div>-</div><div>{data.military?.serial_no || "..................."}</div></div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(ခ) တပ်သို့ဝင်သည့်နေ့</div><div>-</div><div>{data.military?.joined_date || "..................."}</div></div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(ဂ) ဗိုလ်လောင်းသင်တန်းအမှတ်စဉ်</div><div>-</div><div>{data.military?.intake_no || "..................."}</div></div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(ဃ) ပြန်တမ်းဝင်ဖြစ်သည့်နေ့</div><div>-</div><div>{data.military?.commissioned_date || "..................."}</div></div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(င) တပ်ထွက်သည့်နေ့</div><div>-</div><div>{data.military?.resigned_date || "..................."}</div></div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(စ) ထွက်သည့်အကြောင်း</div><div>-</div><div>{data.military?.resign_reason || "..................."}</div></div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(ဆ) အမှုထမ်းဆောင်ခဲ့သောတပ်များ</div><div>-</div><div>{data.military?.served_units || "..................."}</div></div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(ဇ) တပ်တွင်းရာဇဝင်အကျဉ်း/ပြစ်မှု</div><div>-</div><div>{data.military?.disciplinary_record || "..................."}</div></div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start"><div>(ဈ) အငြိမ်းစားလစာ</div><div>-</div><div>{data.military?.pension || "..................."}</div></div>
                    </div>
                </div>

                {/* ================= စာမျက်နှာ (၂) ================= */}
                <div className="page-break pt-4 text-right text-[14px] font-bold">၂</div>
                <div className="space-y-3 mt-4">
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၁၈။ ပညာအရည်အချင်း</div><div>-</div>
                        <div>{data.education_summary || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၁၉။ အဘအမည်၊ လူမျိုး၊ ကိုးကွယ်သည့်ဘာသာ၊ ဇာတိနှင့် အလုပ်အကိုင်</div><div>-</div>
                        <div>{data.father?.detail || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၀။ ၎င်း၏နေရပ်လိပ်စာအပြည့်အစုံ</div><div>-</div>
                        <div className="break-words">{data.father?.address || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၁။ အမိအမည်၊ လူမျိုး၊ ကိုးကွယ်သည့်ဘာသာ၊ ဇာတိနှင့် အလုပ်အကိုင်</div><div>-</div>
                        <div>{data.mother?.detail || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၂။ ၎င်း၏နေရပ်လိပ်စာအပြည့်အစုံ</div><div>-</div>
                        <div className="break-words">{data.mother?.address || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၃။ ကာယကံရှင်မွေးဖွားချိန်၌ မိဘနှစ်ပါးသည် နိုင်ငံသားဟုတ်/မဟုတ်</div><div>-</div>
                        <div>{data.parents_citizenship_at_birth || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၄။ လက်ရှိအလုပ်အကိုင်နှင့်အဆင့်</div><div>-</div>
                        <div>{data.employment?.position_level || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂五။ လက်ရှိရာထူးရသည့်နေ့</div><div>-</div>
                        <div>{data.employment?.promotion_date || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၆။ လက်ရှိအလုပ်အကိုင်ရလာပုံ</div><div>-</div>
                        <div>{data.employment?.getting_method || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၇။ ပြိုင်အရွေးခံ(သို့)တိုက်ရိုက်ခန့်</div><div>-</div>
                        <div>{data.employment?.appointment_type || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၈။ လစာဝင်ငွေ</div><div>-</div>
                        <div>{data.employment?.salary || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၉။ ဌာန၊ နေရာ</div><div>-</div>
                        <div>{data.employment?.department_place || "............................................"}</div>
                    </div>

                    {/* ၃၀။ ချီးမြှင့်ခံရသည့် ဘွဲ့ထူးဇယား */}
                    <div className="pt-4 keep-together">
                        <p className="font-semibold mb-2">၃၀။ ချီးမြှင့်ခံရသည့် ဘွဲ့ထူး၊ ဂုဏ်ထူး တံဆိပ် လက်မှတ်များ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>ချီးမြှင့်ခံရသည့် ကာလ</th>
                                    <th>ချီးမြှင့်သည့်ဘွဲ့/တံဆိပ်အမျိုးအစား</th>
                                    <th>ဆုတံဆိပ်အမှတ် အမိန့်စာနှင့် ရရှိသည့်ရက်စွဲ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.awards?.length > 0 ? (
                                    data.awards.map((award, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{award.period || "-"}</td>
                                            <td>{award.type || "-"}</td>
                                            <td>{award.order_and_date || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>၁</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ၃၁။ သင်တန်းများဇယား */}
                    <div className="pt-4 keep-together">
                        <p className="font-semibold mb-2">၃၁။ တက်ရောက်ခဲ့သည့် သင်တန်းများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12" rowspan="2">စဉ်</th>
                                    <th colspan="2">ကာလ</th>
                                    <th rowspan="2">သင်တန်းအကြောင်းအရာ</th>
                                    <th rowspan="2">တည်နေရာ</th>
                                    <th rowspan="2">အဆင့်</th>
                                </tr>
                                <tr className="bg-gray-50 font-semibold">
                                    <th>နေ့ရက်မှ</th>
                                    <th>နေ့ရက်ထိ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.trainings?.length > 0 ? (
                                    data.trainings.map((t, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{t.start_date || "-"}</td>
                                            <td>{t.end_date || "-"}</td>
                                            <td>{t.title || "-"}</td>
                                            <td>{t.location || "-"}</td>
                                            <td>{t.grade || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>၁</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= စာမျက်နှာ (၃) ================= */}
                <div className="page-break pt-4 flex justify-between items-center text-[14px] font-bold">
                    <span>ပုံစံ (၁) အဆက်</span>
                    <span>၃</span>
                </div>

                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၃၂။ အလုပ်အကိုင်အတွက်ထောက်ခံသူများ</div><div>-</div>
                        <div>{data.referees_summary || "............................................"}</div>
                    </div>

                    {/* ၃၃။ ယခင်လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင် */}
                    <div className="keep-together">
                        <p className="font-semibold mb-2">၃၃။ ယခင်လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင်</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အဆင့်</th>
                                    <th>တပ်/ဌာန</th>
                                    <th>နေရာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.past_jobs?.length > 0 ? (
                                    data.past_jobs.map((job, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{job.rank || "-"}</td>
                                            <td>{job.department || "-"}</td>
                                            <td>{job.location || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        <tr><td>၁</td><td>-</td><td>-</td><td>-</td></tr>
                                        <tr><td>၂</td><td>-</td><td>-</td><td>-</td></tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ၃၄။ ညီအစ်ကိုမောင်နှမများ */}
                    <div className="keep-together pt-2">
                        <p className="font-semibold mb-2">၃၄။ ညီအစ်ကိုမောင်နှမများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အမည်</th>
                                    <th>လူမျိုး/ဘာသာ</th>
                                    <th>ဇာတိ</th>
                                    <th>အလုပ်အကိုင်</th>
                                    <th>နေရပ်လိပ်စာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.siblings?.length > 0 ? (
                                    data.siblings.map((s, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{s.name}</td>
                                            <td>{s.race_religion}</td>
                                            <td>{s.birth_place}</td>
                                            <td>{s.job}</td>
                                            <td>{s.address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ၃၅။ အဘ၏ညီအစ်ကိုမောင်နှမများ */}
                    <div className="keep-together pt-2">
                        <p className="font-semibold mb-2">၃၅။ အဘ၏ညီအစ်ကိုမောင်နှမများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အမည်</th>
                                    <th>လူမျိုး/ဘာသာ</th>
                                    <th>ဇာတိ</th>
                                    <th>အလုပ်အကိုင်</th>
                                    <th>နေရပ်လိပ်စာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.father_siblings?.length > 0 ? (
                                    data.father_siblings.map((s, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{s.name}</td>
                                            <td>{s.race_religion}</td>
                                            <td>{s.birth_place}</td>
                                            <td>{s.job}</td>
                                            <td>{s.address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ၃၆။ အမိ၏ညီအစ်ကိုမောင်နှမများ */}
                    <div className="keep-together pt-2">
                        <p className="font-semibold mb-2">၃၆။ အမိ၏ညီအစ်ကိုမောင်နှမများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အမည်</th>
                                    <th>လူမျိုး/ဘာသာ</th>
                                    <th>ဇာတိ</th>
                                    <th>အလုပ်အကိုင်</th>
                                    <th>နေရပ်လိပ်စာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.mother_siblings?.length > 0 ? (
                                    data.mother_siblings.map((s, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{s.name}</td>
                                            <td>{s.race_religion}</td>
                                            <td>{s.birth_place}</td>
                                            <td>{s.job}</td>
                                            <td>{s.address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= စာမျက်နှာ (၄) ================= */}
                <div className="page-break pt-4 flex justify-between items-center text-[14px] font-bold">
                    <span>ပုံစံ (၁) အဆက်</span>
                    <span>၄</span>
                </div>

                <div className="space-y-4 mt-4">
                    {/* ၃၇။ ခင်ပွန်း/ဇနီးသည် */}
                    <div className="keep-together">
                        <p className="font-semibold mb-2">၃၇။ ခင်ပွန်း/ဇနီးသည်</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အမည်</th>
                                    <th>လူမျိုး/ဘာသာ</th>
                                    <th>ဇာတိ</th>
                                    <th>အလုပ်အကိုင်</th>
                                    <th>နေရပ်လိပ်စာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.spouse_info ? (
                                    <tr>
                                        <td>၁</td>
                                        <td>{data.spouse_info.name}</td>
                                        <td>{data.spouse_info.race_religion}</td>
                                        <td>{data.spouse_info.birth_place}</td>
                                        <td>{data.spouse_info.job}</td>
                                        <td>{data.spouse_info.address}</td>
                                    </tr>
                                ) : (
                                    <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ၃၈။ သားသမီးများ */}
                    <div className="keep-together">
                        <p className="font-semibold mb-2">၃၈။ သားသမီးများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အမည်</th>
                                    <th>လူမျိုး/ဘာသာ</th>
                                    <th>ဇာတိ</th>
                                    <th>အလုပ်အကိုင်</th>
                                    <th>နေရပ်လိပ်စာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.children?.length > 0 ? (
                                    data.children.map((c, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{c.name}</td>
                                            <td>{c.race_religion}</td>
                                            <td>{c.birth_place}</td>
                                            <td>{c.job}</td>
                                            <td>{c.address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ၃၉။ ခင်ပွန်း/ဇနီးသည်၏ ညီအစ်ကိုမောင်နှမများ */}
                    <div className="keep-together">
                        <p className="font-semibold mb-2">၃၉။ ခင်ပွန်း/ဇနီးသည်၏ ညီအစ်ကိုမောင်နှမများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အမည်</th>
                                    <th>လူမျိုး/ဘာသာ</th>
                                    <th>ဇာတိ</th>
                                    <th>အလုပ်အကိုင်</th>
                                    <th>နေရပ်လိပ်စာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.spouse_siblings?.length > 0 ? (
                                    data.spouse_siblings.map((s, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{s.name}</td>
                                            <td>{s.race_religion}</td>
                                            <td>{s.birth_place}</td>
                                            <td>{s.job}</td>
                                            <td>{s.address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ၄၀။ ခင်ပွန်း/ဇနီးသည်၏အဘနှင့်ညီအစ်ကိုမောင်နှမများ */}
                    <div className="keep-together">
                        <p className="font-semibold mb-2">၄၀။ ခင်ပွန်း/ဇနီးသည်၏အဘနှင့်ညီအစ်ကိုမောင်နှမများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အမည်</th>
                                    <th>လူမျိုး/ဘာသာ</th>
                                    <th>ဇာတိ</th>
                                    <th>အလုပ်အကိုင်</th>
                                    <th>နေရပ်လိပ်စာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.spouse_father_side?.length > 0 ? (
                                    data.spouse_father_side.map((s, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{s.name}</td>
                                            <td>{s.race_religion}</td>
                                            <td>{s.birth_place}</td>
                                            <td>{s.job}</td>
                                            <td>{s.address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= စာမျက်နှာ (၅) ================= */}
                <div className="page-break pt-4 flex justify-between items-center text-[14px] font-bold">
                    <span>ပုံစံ (၁) အဆက်</span>
                    <span>၅</span>
                </div>

                <div className="space-y-4 mt-4">
                    {/* ၄၁။ ခင်ပွန်း/ဇနီးသည်၏အမိနှင့်ညီအစ်ကိုမောင်နှမများ */}
                    <div className="keep-together">
                        <p className="font-semibold mb-2">၄၁။ ခင်ပွန်း/ဇနီးသည်၏အမိနှင့်ညီအစ်ကိုမောင်နှမများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>အမည်</th>
                                    <th>လူမျိုး/ဘာသာ</th>
                                    <th>ဇာတိ</th>
                                    <th>အလုပ်အကိုင်</th>
                                    <th>နေရပ်လိပ်စာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.spouse_mother_side?.length > 0 ? (
                                    data.spouse_mother_side.map((s, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{s.name}</td>
                                            <td>{s.race_religion}</td>
                                            <td>{s.birth_place}</td>
                                            <td>{s.job}</td>
                                            <td>{s.address}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-[380px_20px_1fr] items-start pt-2">
                        <div>၄၂။ မိမိနှင့် မိမိ၏ဇနီး/ခင်ပွန်းတို့၏ မိဘ၊ ညီအစ်ကိုမောင်နှမများ၊ သားသမီးများသည် နိုင်ငံရေးပါတီများတွင်ဝင်ရောက်ဆောင်ရွက်မှု ရှိ/မရှိ (ရှိကအသေးစိတ်ဖော်ပြရန်)</div>
                        <div>-</div>
                        <div className="break-words">{data.political_involvement || "............................................"}</div>
                    </div>

                    <hr className="border-black my-4" />

                    {/* ငယ်စဉ်မှ ယခုအချိန်ထိကိုယ်ရေးရာဇဝင်ခေါင်းစဉ် */}
                    <div className="text-center font-bold text-[16px] py-2 underline">
                        ငယ်စဉ်မှ ယခုအချိန်ထိကိုယ်ရေးရာဇဝင်
                    </div>

                    <div className="space-y-3">
                        <div className="grid grid-cols-[340px_20px_1fr] items-start">
                            <div>၁။ နေခဲ့ဖူးသောကျောင်းများ (ခုနှစ်၊ သက္ကရာဇ်ဖော်ပြရန်)</div><div>-</div>
                            <div>{data.history?.schools || "............................................"}</div>
                        </div>
                        <div className="grid grid-cols-[340px_20px_1fr] items-start">
                            <div>၂။ နောက်ဆုံးအောင်မြင်ခဲ့သည့်ကျောင်း/အတန်း၊ ခုံအမှတ်၊ ဘာသာရပ် အတိအကျဖော်ပြရန်</div><div>-</div>
                            <div>{data.history?.last_degree_detail || "............................................"}</div>
                        </div>
                        <div className="grid grid-cols-[340px_20px_1fr] items-start">
                            <div>၃။ ကျောင်းသားဘဝတွင် နိုင်ငံရေး/မြို့ရေး/ရွာရေးဆောင်ရွက်မှုများနှင့် အဆင့်အတန်း၊တာဝန်</div><div>-</div>
                            <div>{data.history?.student_politics || "............................................"}</div>
                        </div>
                        <div className="grid grid-cols-[340px_20px_1fr] items-start">
                            <div>၄။ ဝါသနာပါပြီးလေ့လာလိုက်စားခဲ့သောကျန်းမာရေးကစားခုန်စားမှုများ၊ အနုပညာဆိုင်ရာအတီးအမှုတ်များ၊ ပညာရေးစက်မှုလက်မှု</div><div>-</div>
                            <div>{data.history?.hobbies || "............................................"}</div>
                        </div>

                        {/* ၅။ လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင်များနှင့်ဌာန */}
                        <div className="keep-together pt-2">
                            <p className="font-semibold mb-2">၅။ လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင်များနှင့်ဌာန/မြို့နယ်-</p>
                            <table className="w-full border-collapse text-center">
                                <thead>
                                    <tr className="bg-gray-50 font-semibold">
                                        <th>ရာထူး</th>
                                        <th>ဌာန</th>
                                        <th>နေရာ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.history?.jobs?.length > 0 ? (
                                        data.history.jobs.map((j, idx) => (
                                            <tr key={idx}>
                                                <td>{j.position}</td>
                                                <td>{j.department}</td>
                                                <td>{j.location}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td>-</td><td>-</td><td>-</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ================= စာမျက်နှာ (၆) ================= */}
                <div className="page-break pt-4 flex justify-between items-center text-[14px] font-bold">
                    <span>ပုံစံ (၁) အဆက်</span>
                    <span>၆</span>
                </div>

                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>၆။ တောခိုခဲ့ဖူးလျှင်(သို့)သောင်းကျန်းသူများကြီးစိုးသောနယ်မြေတွင် နေခဲ့ဖူးလျှင် လုပ်ကိုင်ဆောင်ရွက်ချက်များကိုဖော်ပြပါ</div><div>-</div>
                        <div className="break-words">{data.history?.rebel_area_stay || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>၇။ အလုပ်အကိုင်ပြောင်းရွှေ့ခဲ့သော အကြောင်းအကျိုးနှင့်လစာ</div><div>-</div>
                        <div className="break-words">{data.history?.job_change_reason || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>၈။ အမှုထမ်းနေစဉ်(သို့)ကိုယ်ပိုင်အလုပ်အကိုင်ဆောင်ရွက်နေစဉ် နိုင်ငံရေး၊ မြို့/ရွာရေးဆောင်ရွက်မှုများ ၊ဆောင်ရွက်နေစဉ် အဆင့်အတန်းနှင့်တာဝန်</div><div>-</div>
                        <div className="break-words">{data.history?.work_era_politics || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>၉။ စစ်ဘက်/နယ်ဘက်/ရဲဘက်နှင့်နိုင်ငံရေးဘက်တွင် ခင်မင်ရင်းနှီးသောမိတ်ဆွေများ ရှိ/မရှိ</div><div>-</div>
                        <div>{data.history?.close_friends_status || "............................................"}</div>
                    </div>

                    {/* ၁၀။ နိုင်ငံခြားသို့ သွားရောက်ခဲ့ဖူးလျှင် */}
                    <div className="keep-together pt-2">
                        <p className="font-semibold mb-2">၁၀။ နိုင်ငံခြားသို့ သွားရောက်ခဲ့ဖူးလျှင်</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 font-semibold">
                                    <th className="w-12">စဉ်</th>
                                    <th>သွားရောက်ခဲ့သည့်နိုင်ငံ</th>
                                    <th>သွားရောက်သည့်အကြောင်း</th>
                                    <th>တွေ့ဆုံခဲ့သည့်ကုမ္ပဏီ/လူပုဂ္ဂိုလ်ဌာန</th>
                                    <th>သွား/ပြန်သည့်နေ့ရက်</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.history?.abroad_trips?.length > 0 ? (
                                    data.history.abroad_trips.map((t, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNo(idx + 1)}</td>
                                            <td>{t.country}</td>
                                            <td>{t.reason}</td>
                                            <td>{t.met_person}</td>
                                            <td>{t.dates}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td>၁</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-[350px_20px_1fr] items-start pt-2">
                        <div>၁၁။ မိမိနှင့်ခင်မင်ရင်းနှီးသောနိုင်ငံခြားသား ရှိ/မရှိ၊ ရှိကမည်သည့်အလုပ်အကိုင်၊ လူမျိုး၊ တိုင်းပြည်၊ မည်ကဲ့သို့ရင်းနှီးသည်</div><div>-</div>
                        <div className="break-words">{data.history?.foreign_friends || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>၁၂။ မိမိအားထောက်ခံသည့်ပုဂ္ဂိုလ် (စစ်ဘက်/နယ်ဘက်အရာရှိ၊ မြို့နယ်/ကျေးရွာ/ရပ်ကွက်အုပ်ချုပ်ရေးမှူး)</div><div>-</div>
                        <div className="break-words">{data.history?.guarantor || "............................................"}</div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>၁၃။ ရာဇဝတ်ပြစ်မှုခံရခြင်းရှိ/မရှိ</div><div>-</div>
                        <div>{data.history?.criminal_record || "............................................"}</div>
                    </div>

                    {/* ကတိဝန်ခံချက်နှင့် လက်မှတ် */}
                    <div className="pt-8 keep-together">
                        <p className="text-justify indent-8 font-medium">
                            အထက်ပါဇယားကွက်များတွင် ဖြည့်စွက်ရေးသွင်းထားသောအကြောင်းအရာများအား မှန်ကန်ကြောင်း တာဝန်ခံလက်မှတ်ရေးထိုးပါသည်။
                        </p>
                        
                        <div className="flex justify-end mt-8">
                            <div className="space-y-2 text-left min-w-[340px]">
                                <div>လက်မှတ် - ....................................................</div>
                                <div>ကိုယ်ပိုင်အမှတ် (သို့မဟုတ်) ၊<br />နိုင်ငံသားစိစစ်ရေးကတ်ပြားအမှတ် - .............................</div>
                                <div>အဆင့်၊ ရာထူး - <span className="dotted-line">{data.employment?.position || ""}</span></div>
                                <div>အမည် - <span className="dotted-line font-bold">{data.name || ""}</span></div>
                                <div>တပ်/ဌာန - <span className="dotted-line">{data.employment?.department || ""}</span></div>
                                <div className="pt-2">ရက်စွဲ၊ ၂၀၂၆ ခုနှစ်၊ ......................... လ ( ............ )ရက်</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}