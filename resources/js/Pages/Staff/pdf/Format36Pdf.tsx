import { useEffect } from "react";
import ActionTable from "../components/ActionTable";
import FamilyTable from "../components/FamilyTable";
import toMyanmarNumber from "@/util/numberHelper";

export default function Format36({ data = {} }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 500);

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @page {
                    size: A4;
                    
                    margin: 25mm 20mm 25mm 20mm; 
                    
                    @top-center {
                        content: "လျှို့ဝှက်";  
                        font-size: 14px; 
                    }
                    /* စာမျက်နှာတိုင်း၏ အောက်ဆုံးအလယ်ဗဟိုတွင် "လျှို့ဝှက်" အလိုအလျောက်ထည့်ရန် */
                    @bottom-center {
                        content: "လျှို့ဝှက်";
                          
                        font-size: 14px; 
                    }
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                 
                    .screen-secret {
                        display: none !important;
                    }
                    
                    h4, .table-title {
                        page-break-after: avoid;
                        break-after: avoid;
                    }
                    .keep-together {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                }
            `,
                }}
            />

            <div className="bg-white p-4 md:p-8 max-w-4xl mx-auto my-4 text-black   text-[14px] leading-relaxed select-none print:border-0 print:shadow-none print:p-0 print:m-0 print:max-w-full">
                <div className="flex justify-between items-start mb-6 screen-secret">
                    <div className="   border border-black px-3 py-0.5">
                        ပုံစံ (၃၆)
                    </div>
                    <div className="text-base   tracking-widest border border-black px-4 py-0.5">
                        လျှို့ဝှက်
                    </div>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-xl    tracking-wide  inline-block pb-1 px-6">
                        ကိုယ်ရေးမှတ်တမ်း
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၁။ အမည်</div>
                        <div className="text-center">-</div>
                        <div className="  ">{data.name || "-"}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၂။ ငယ်အမည်</div>
                        <div className="text-center">-</div>
                        <div className="  ">{data.nickname || "-"}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၃။ အခြားအမည်များ (ရှိလျှင်)</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">
                            {data.alternative_name || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၄။ အသက် (မွေးနေ့သက္ကရာဇ်)</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.age ? `${data.age} နှစ် ` : ""}{" "}
                            {data.date_of_birth
                                ? `(${data.date_of_birth})`
                                : "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၅။ မွေးရာဇာတိ</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">
                            {data.birth_place || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၆။ ကိုးကွယ်သည့်ဘာသာ</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.religion || "-"}
                        </div>
                    </div>
                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">
                            ၇။ လူမျိုး <br />{" "}
                            (လူမျိုးစုဖြစ်လျှင်လိုအပ်သလိုဖော်ပြရန်)
                        </div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">{data.race || "-"}</div>
                    </div>
                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၈။ အမျိုးသားမှတ်ပုံတင်အမှတ်</div>
                        <div className="text-center">-</div>
                        <div className="font-medium tracking-wide ">
                            {data.nrc_township || ""}
                            {data.nrc_type && `(${data.nrc_type})`}
                            {data.nrc_number ? ` ${data.nrc_number}` : "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၉။ အရပ်</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.physical?.height || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၁၀။ ကိုယ်အလေးချိန်</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.physical?.weight || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၁၁။ ဆံပင်အရောင်</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.physical?.hair_color || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၁၂။ မျက်စိအရောင်</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.physical?.eye_color || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၁၃။ ထင်ရှားသည့်အမှတ်အသား</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">
                            {data.physical?.distinctive_mark || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၁၄။ အလုပ်အကိုင်နှင့်ဌာန</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">
                            {data.employment?.position || "-"} /{" "}
                            {data.employment?.department || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">၁၅။ အမှုထမ်းသက် (နှစ်၊ လ၊ ရက်)</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.employment?.year_of_service || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">
                            ၁၆။ လက်ရှိနေရပ် လိပ်စာ အပြည့်အစုံ
                        </div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">
                            {data.info?.current_address || "-"}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="  ">
                            ၁၇။ အမြဲတမ်းနေရပ် လိပ်စာ အပြည့်အစုံ
                        </div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">
                            {data.info?.permanent_address || "-"}
                        </div>
                    </div>
                </div>

                <div className="mt-6 mb-6 keep-together">
                    <h4 className=" mb-2">၁၈။ ပညာအရည်အချင်း</h4>
                    <table className="w-full border border-black border-collapse  text-center">
                        <thead>
                            <tr className="bg-gray-50 font-semibold border-b border-black">
                                <th className="border border-black p-2">
                                    ဘွဲ့အမည်
                                </th>
                                <th className="border border-black p-2">
                                    အထူးပြုဘာသာ
                                </th>
                                <th className="border border-black p-2 w-32">
                                    ရရှိသည့်ခုနှစ်
                                </th>
                                <th className="border border-black p-2 w-32">
                                    ရရှိသည့် အဆင့်
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.educations?.length > 0 ? (
                                data.educations.map((edu, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-2 text-left px-3">
                                            {edu.degree_name}
                                        </td>
                                        <td className="border border-black p-2">
                                            {edu.major_subject || "-"}
                                        </td>
                                        <td className="border border-black p-2 ">
                                            {edu.graduation_year || "-"}
                                        </td>
                                        <td className="border border-black p-2">
                                            {edu.degree_level || "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mb-6 keep-together">
                    <h4 className=" mb-2">
                        ၁၉။ ပညာဆည်းပူးခဲ့သောကျောင်း၊ ကောလိပ်၊ တက္ကသိုလ်၊
                        အလုပ်ဌာန၊ သင်တန်း စသည်များ
                    </h4>
                    <table className="w-full border border-black border-collapse  text-center">
                        <tbody>
                            {(() => {
                                const educations =
                                    data.trainings?.filter(
                                        (item) => item.category === "education",
                                    ) || [];
                                return educations.length > 0 ? (
                                    educations.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="border border-black p-2 text-center font-medium">
                                                {toMyanmarNumber(idx + 1)}
                                            </td>
                                            <td className="border border-black p-2 text-left px-3">
                                                {item.learn_course || "-"}
                                            </td>
                                            <td className="border border-black p-2">
                                                {item.learn_from || "-"}
                                            </td>
                                            <td className="border border-black p-2">
                                                {item.learn_to || "-"}
                                            </td>
                                            <td className="border border-black p-2">
                                                {item.location || "-"}
                                            </td>
                                            <td className="border border-black p-2">
                                                {item.rank || "-"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="border border-black p-4 text-gray-400  text-center">
                                            {" "}
                                        </td>
                                        <td className="border border-black p-4 text-gray-400  text-center">
                                            {" "}
                                        </td>
                                        <td className="border border-black p-4 text-gray-400  text-center">
                                            {" "}
                                        </td>
                                        <td className="border border-black p-4 text-gray-400  text-center">
                                            {" "}
                                        </td>
                                        <td className="border border-black p-4 text-gray-400  text-center">
                                            {" "}
                                        </td>
                                    </tr>
                                );
                            })()}
                        </tbody>
                    </table>
                </div>

                <div className="mb-6 keep-together">
                    <h4 className=" mb-2">
                        ၂၀။ နိုင်ငံခြားသို့ရောက်ဖူးခြင်း ရှိ/ မရှိ{" "}
                        {data.abroad_visits?.length > 0 ? "(ရှိ)" : "(မရှိ)"}
                    </h4>
                    <table className="w-full border border-black border-collapse  text-center">
                        <thead>
                            <tr className="bg-gray-50 font-semibold border-b border-black">
                                <th className="border border-black p-2">
                                    မှ <br /> (ရက်/လ/နှစ်)
                                </th>
                                <th className="border border-black p-2">
                                    ထိ <br /> (ရက်/လ/နှစ်)
                                </th>
                                <th className="border border-black p-2">
                                    သွားရောက်သည့်နိုင်ငံများ
                                </th>
                                <th className="border border-black p-2">
                                    သွားရောက်သည့်ကိစ္စ
                                </th>
                                <th className="border border-black p-2">
                                    နိုင်ငံခြားငွေမည်မျှ ထုတ်ယူခဲ့သည်
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.abroad_visits?.length > 0 ? (
                                data.abroad_visits.map((trip, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-2">
                                            {trip.abroad_from || "-"}
                                        </td>
                                        <td className="border border-black p-2">
                                            {trip.abroad_to || "-"}
                                        </td>
                                        <td className="border border-black p-2">
                                            {trip.country_visited || "-"}
                                        </td>
                                        <td className="border border-black p-2 text-left px-3">
                                            {trip.visit_purpose || "-"}
                                        </td>
                                        <td className="border border-black p-2 ">
                                            {trip.foreign_currency_amount ||
                                                "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        မှတ်တမ်းမရှိပါ။
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-6">
                    <div className="keep-together">
                        <FamilyTable
                            title="၂၁။ ဝန်ထမ်း၏ အဘနှင့်အဘ၏ မောင်နှမအရင်းအချာများ။"
                            relationshipType="father_sibling"
                            familiesData={data.family_members}
                        />
                    </div>
                    <div className="keep-together">
                        <FamilyTable
                            title="၂၂။ ဝန်ထမ်း၏ အမိနှင့်အမိ၏ မောင်နှမအရင်းအချာများ။"
                            relationshipType="mother_sibling"
                            familiesData={data.family_members}
                        />
                    </div>
                    <div className="keep-together">
                        <FamilyTable
                            title="၂၃။ ဝန်ထမ်း၏ မောင်နှမအရင်းအချာများ။"
                            relationshipType="employee_sibling"
                            familiesData={data.family_members}
                        />
                    </div>

                    <div className="keep-together">
                        <FamilyTable
                            title="၂၄။ ဇနီးခင်ပွန်းနှင့် ၎င်း၏မောင်နှမအရင်းအချာများ။"
                            relationshipType="spouse_family"
                            familiesData={data.family_members}
                        />
                    </div>

                    <div className="keep-together">
                        <FamilyTable
                            title="၂၅။ ဇနီးခင်ပွန်း၏ အဘနှင့် ယင်း၏မောင်နှမအရင်းအချာများ။"
                            relationshipType="spouse_father_family"
                            familiesData={data.family_members}
                        />
                    </div>
                    <div className="keep-together">
                        <FamilyTable
                            title="၂၆။ ဇနီးခင်ပွန်း၏ အမိနှင့် ယင်း၏ မောင်နှမအရင်းအချာများ။"
                            relationshipType="spouse_mother_family"
                            familiesData={data.family_members}
                        />
                    </div>
                    <div className="keep-together">
                        <FamilyTable
                            title="၂၇။ သားသမီးများနှင့် ယင်း၏ ဇနီးခင်ပွန်း။"
                            relationshipType="children"
                            familiesData={data.family_members}
                        />
                    </div>
                    <div className="keep-together">
                        <FamilyTable
                            title="၂၈။ နိုင်ငံခြားသို့ ရောက်ရှိနေကြသည့် ဆွေမျိုးများ။"
                            relationshipType="relative_abroad"
                            familiesData={data.family_members}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 my-6  keep-together">
                    <ActionTable
                        title="၂၉။ ဌာနဆိုင်ရာ အရေးယူခံရခြင်း ရှိ/ မရှိ"
                        recordType="disciplinary"
                        actionsData={data.court_disciplinary_actions}
                    />
                    <ActionTable
                        title="၃၀။ တရားရုံးတွင် တရားစွဲ ခံရဖူးခြင်း ရှိ/ မရှိ"
                        recordType="court"
                        actionsData={data.court_disciplinary_actions}
                    />
                </div>

                <div className="mb-6 keep-together">
                    <h4 className=" mb-2">
                        ၃၁။ ဘွဲ့/ တံဆိပ် ချီးမြှင့်ခံရဖူးခြင်း ရှိ/ မရှိ{" "}
                        {data.awards_received?.length > 0 ? "(ရှိ)" : "(မရှိ)"}
                    </h4>
                    <table className="w-full border border-black border-collapse  text-center">
                        <thead>
                            <tr className="bg-gray-50 font-semibold border-b border-black">
                                <th className="border border-black p-2">
                                    ချီးမြှင့်ခံရသည့် ကာလ
                                </th>
                                <th className="border border-black p-2">
                                    ချီးမြှင့်ခံရသည့်ဘွဲ့/ တံဆိပ်အမျိုးအစား
                                </th>
                                <th className="border border-black p-2 w-64">
                                    မှတ်ချက်
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {data.awards_received?.length > 0 ? (
                                data.awards_received.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-2">
                                            {item.award_period}
                                        </td>
                                        <td className="border border-black p-2 text-left px-3 ">
                                            {item.award_title || "-"}
                                        </td>
                                        <td className="border border-black p-2 ">
                                            {item.award_remark || "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        {" "}
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        {" "}
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 ">
                                        {" "}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="my-6 keep-together ">
                    <h4 className=" mb-2">
                        ၃၂။ နိုင်ငံခြားသို့သွားရောက်မည့်ကိစ္စ
                    </h4>
                    <table className="w-full border border-black border-collapse  text-center">
                        <thead>
                            <tr className="bg-gray-50 font-semibold border-b border-black">
                                <th className="border border-black p-2">
                                    သင်ကြားမည့်
                                    ဘာသာရပ်နှင့်အဆင့်/တက်ရောက်မည့်သင်တန်း/သို့မဟုတ်
                                    အခြားကိစ္စ
                                </th>
                                <th className="border border-black p-2">
                                    စေလွှတ်သည့် နိုင်ငံ
                                </th>
                                <th className="border border-black p-2">
                                    အချိန်ကာာလ
                                </th>
                                <th className="border border-black p-2">
                                    နိုင်ငံခြားသို့ ရောက်ရမည့်နေ့
                                </th>
                                <th className="border border-black p-2">
                                    မည်သည့် အစိုးရအဖွဲ့အစည်း အထောက်အပံ့
                                </th>
                                <th className="border border-black p-2">
                                    ပြန်လည်ရောက်ရှိလျှင် အမှုထမ်းမည့်ဌာန/ တာဝန်
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black p-2 text-left px-2">
                                    {data.foreign_visited_purpose
                                        ?.training_course || "-"}
                                </td>
                                <td className="border border-black p-2">
                                    {data.foreign_visited_purpose
                                        ?.assigned_country || "-"}
                                </td>
                                <td className="border border-black p-2">
                                    {data.foreign_visited_purpose
                                        ?.time_period || "-"}
                                </td>
                                <td className="border border-black p-2">
                                    {data.foreign_visited_purpose
                                        ?.arrival_date || "-"}
                                </td>
                                <td className="border border-black p-2">
                                    {data.foreign_visited_purpose
                                        ?.supporting_agency || "-"}
                                </td>
                                <td className="border border-black p-2 text-left px-2">
                                    {data.foreign_visited_purpose
                                        ?.return_department || "-"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="grid mt-2 grid-cols-[240px_20px_1fr] items-start">
                        <div className=" ">သွားရောက်မည့်နိုင်ငံ</div>
                        <div className="text-center">-</div>
                        <div className=" ">
                            {data.foreign_visited_purpose
                                ?.destination_country || "-"}
                        </div>
                    </div>
                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className=" ">
                            နိုင်ငံခြားသို့သွားရောက်မည့်
                            ကိစ္စနှင့်အထောက်အထားများ
                        </div>
                        <div className="text-center">-</div>
                        <div className=" ">
                            {data.foreign_visited_purpose
                                ?.foreign_visit_details || "-"}
                        </div>
                    </div>
                </div>

                <div className=" ">
                    <div className="keep-together">
                        <p className="  mb-6 ">
                            "၃၃။ အထက်ပါအချက်အလက်များကို မှန်ကန်စွာ
                            ဖြည့်သွင်းရေးသားထားပါကြောင်း ကိုယ်တိုင်
                            လက်မှတ်ရေးထိုးပါသည်။"
                        </p>
                        <div className="flex   justify-around">
                            <div className="text-[13px] mt-2">ရက်စွဲ -</div>
                            <div className="space-y-2 p-4     rounded-lg print:border-0 print:p-0">
                                <p className="  pb-1 mb-2 print:text-left">
                                    လျှောက်ထားသူလက်မှတ်
                                </p>

                                <div>
                                    <span className="w-36 inline-block">
                                        အမည်{" "}
                                    </span>
                                    -{" "}
                                    <span className="ml-2">
                                        {data.name ||
                                            "............................................"}
                                    </span>
                                </div>
                                <div>
                                    <span className="w-36 inline-block">
                                        ရာထူး{" "}
                                    </span>{" "}
                                    -{" "}
                                    <span className="ml-2">
                                        {data.employment?.position ||
                                            "............................................"}
                                    </span>
                                </div>
                                <div>
                                    <span className="w-36 inline-block">
                                        ဌာန{" "}
                                    </span>{" "}
                                    -{" "}
                                    <span className="ml-2">
                                        {data.employment?.department ||
                                            "............................................"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="keep-together">
                        <p className="  mb-6  ">
                            ၃၄။ ဝန်ထမ်း၏
                            လုပ်ရည်ကိုင်ရည်နှင့်အကျင့်စာရိတ္တထောက်ခံသူ
                        </p>
                        <div className="flex   justify-around">
                            <div className="text-[13px] mt-2">ရက်စွဲ -</div>
                            <div className="space-y-2 p-4     rounded-lg print:border-0 print:p-0">
                                <p className="text-center   pb-1 mb-2 print:text-left">
                                    {" "}
                                    လက်မှတ်
                                </p>

                                <div>
                                    <span className="w-36 inline-block">
                                        အမည်{" "}
                                    </span>
                                    -{" "}
                                    <span className=" ml-2">
                                        {data.referee?.referee_name ||
                                            "............................................"}
                                    </span>
                                </div>
                                <div>
                                    <span className="w-36 inline-block">
                                        ရာထူး{" "}
                                    </span>{" "}
                                    -{" "}
                                    <span className="ml-2">
                                        {data.referee?.referee_position ||
                                            "............................................"}
                                    </span>
                                </div>
                                <div>
                                    <span className="w-36 inline-block">
                                        ဌာန{" "}
                                    </span>{" "}
                                    -{" "}
                                    <span className="ml-2">
                                        {data.referee?.referee_department ||
                                            "............................................"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="keep-together">
                        <p className="  mb-6  ">
                            ၃၅။ ထပ်ဆင့် လက်မှတ်ရေးထိုးပါသည်။
                        </p>
                        <div className="flex   justify-around">
                            <div className="text-[13px] mt-2">ရက်စွဲ -</div>
                            <div className="space-y-2 p-4     rounded-lg print:border-0 print:p-0">
                                <p className="text-center   pb-1 mb-2 print:text-left">
                                    (ပါမောက္ခချုပ်/ ကျောင်းအုပ်ကြီးလက်မှတ်)
                                </p>

                                <div>
                                    <span className="w-36 inline-block">
                                        အမည်{" "}
                                    </span>
                                    -{" "}
                                    <span className=" ml-2">
                                        {data.referee?.rector_name ||
                                            "............................................"}
                                    </span>
                                </div>
                                <div>
                                    <span className="w-36 inline-block">
                                        ရာထူး{" "}
                                    </span>{" "}
                                    -{" "}
                                    <span className="ml-2">
                                        {data.referee?.rector_position ||
                                            "............................................"}
                                    </span>
                                </div>
                                <div>
                                    <span className="w-36 inline-block">
                                        ဌာန{" "}
                                    </span>{" "}
                                    -{" "}
                                    <span className="ml-2">
                                        {data.referee?.rector_department ||
                                            "............................................"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="keep-together">
                        <p className="  mb-6  ">
                            ၃၆။ ထပ်ဆင့် လက်မှတ်ရေးထိုးပါသည်။
                        </p>
                        <div className="flex   justify-around">
                            <div className="text-[13px] mt-2">ရက်စွဲ -</div>
                            <div className="space-y-2 p-4     rounded-lg print:border-0 print:p-0">
                                <p className="text-center   pb-1 mb-2 print:text-left">
                                    (ဌာနအကြီးအကဲ လက်မှတ်)
                                </p>

                                <div>
                                    <span className="w-36 inline-block">
                                        အမည်{" "}
                                    </span>
                                    -{" "}
                                    <span className=" ml-2">
                                        {data.referee?.dept_head_name ||
                                            "............................................"}
                                    </span>
                                </div>
                                <div>
                                    <span className="w-36 inline-block">
                                        ရာထူး{" "}
                                    </span>{" "}
                                    -{" "}
                                    <span className="ml-2">
                                        {data.referee?.dept_head_position ||
                                            "............................................"}
                                    </span>
                                </div>
                                <div>
                                    <span className="w-36 inline-block">
                                        ဌာန{" "}
                                    </span>{" "}
                                    -{" "}
                                    <span className="ml-2">
                                        {data.referee?.dept_head_department ||
                                            "............................................"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-12 screen-secret">
                    <div className="text-base font-semibold  border border-black px-4 py-0.5">
                        လျှို့ဝှက်
                    </div>
                </div>
            </div>
        </>
    );
}
