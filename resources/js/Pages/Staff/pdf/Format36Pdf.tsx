import React from 'react';
import ActionTable from '../components/ActionTable';
import FamilyTable from '../components/FamilyTable';

export default function Format36({ data = {} }) {
    return (
        <>
            {/* PDF Print စနစ်ကို စာသားများနှင့် ထပ်မနေစေရန် standard CSS page boxes ဖြင့် အဆင့်မြှင့်တင်ခြင်း */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @page {
                    size: A4;
                    /* ထိပ်နှင့် အောက်ခြေ Margin ကို ပိုချန်ပေးထားပြီး "လျှို့ဝှက်" ကို ပင်မစာသားများနှင့် လုံးဝမထပ်အောင် စီမံထားပါသည် */
                    margin: 25mm 20mm 25mm 20mm; 
                    
                    /* စာမျက်နှာတိုင်း၏ ထိပ်ဆုံးအလယ်ဗဟိုတွင် "လျှို့ဝှက်" အလိုအလျောက်ထည့်ရန် */
                    @top-center {
                        content: "လျှို့ဝှက်";
                        font-family: serif;
                        font-weight: bold;
                        font-size: 16px;
                        letter-spacing: 0.25em;
                    }
                    /* စာမျက်နှာတိုင်း၏ အောက်ဆုံးအလယ်ဗဟိုတွင် "လျှို့ဝှက်" အလိုအလျောက်ထည့်ရန် */
                    @bottom-center {
                        content: "လျှို့ဝှက်";
                        font-family: serif;
                        font-weight: bold;
                        font-size: 16px;
                        letter-spacing: 0.25em;
                    }
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    /* ကွန်ပျူတာ screen ပေါ်က "လျှို့ဝှက်" div များကို print ထုတ်ချိန်တွင် အပြီးတိုင်ဖျောက်ထားရန် */
                    .screen-secret {
                        display: none !important;
                    }
                    /* ခေါင်းစဉ်များ စာမျက်နှာအောက်ခြေတွင် တစ်ကောင်တည်း ကျန်မနေစေရန် (Page Break အလိုအလျောက်ထိန်းညှိခြင်း) */
                    h4, .table-title {
                        page-break-after: avoid;
                        break-after: avoid;
                    }
                    .keep-together {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                }
            `}} />

            <div className="bg-white p-4 md:p-8 max-w-4xl mx-auto my-4 text-black font-serif text-[14px] leading-relaxed select-none print:border-0 print:shadow-none print:p-0 print:m-0 print:max-w-full">

                {/* 🖥️ Screen ပေါ်မှာကြည့်ရင် မြင်ရမည့် ထိပ်ဆုံးအပိုင်း (Print မှာ အလိုအလျောက် ပျောက်သွားပါမည်) */}
                <div className="flex justify-between items-start mb-6 screen-secret">
                    <div className="text-sm font-bold border border-black px-3 py-0.5">ပုံစံ (၃၆)</div>
                    <div className="text-base font-bold tracking-widest border border-black px-4 py-0.5">လျှို့ဝှက်</div>
                </div>

                {/* Print ထုတ်တဲ့အခါ ဘယ်ဘက်ထိပ်မှာ ပုံစံ (၃၆) သီးသန့်လေး ကျန်ခဲ့စေရန် */}
                <div className="hidden print:block text-sm font-bold border border-black px-3 py-0.5 w-fit mb-6">
                    ပုံစံ (၃၆)
                </div>

                {/* ပင်မခေါင်းစဉ်ကြီး */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold tracking-wide border-b border-black inline-block pb-1 px-6">
                        ကိုယ်ရေးမှတ်တမ်း
                    </h2>
                </div>

                {/* အပိုင်း (၁) - အခြေခံကိုယ်ရေးအချက်အလက်များ */}
                <div className="space-y-4">
                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁။ အမည်</div>
                        <div className="text-center">-</div>
                        <div className="font-semibold text-gray-900">{data.name || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၂။ ငယ်အမည်</div>
                        <div className="text-center">-</div>
                        <div className="font-semibold text-gray-900">{data.nickname || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၃။ အခြားအမည်များ (ရှိလျှင်)</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">{data.alternative_name || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၅။ အသက် (မွေးနေ့သက္ကရာဇ်)</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.age ? `${data.age} နှစ် ` : ''} {data.date_of_birth ? `(${data.date_of_birth})` : '-'}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၆။ မွေးရာဇာတိ</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">{data.birth_place || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၇။ လူမျိုး / ကိုးကွယ်သည့်ဘာသာ</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">
                            {data.race || '-'} {data.sub_race ? `(${data.sub_race})` : ''} / {data.religion || '-'}
                        </div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၈။ အမျိုးသားမှတ်ပုံတင်အမှတ်</div>
                        <div className="text-center">-</div>
                        <div className="font-medium tracking-wide text-gray-900">{data.nrc_township || ''}
                            {data.nrc_type && `(${data.nrc_type})`}
                            {data.nrc_number ? ` ${data.nrc_number}` : '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၉။ အရပ်</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">{data.physical?.height || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁၀။ ကိုယ်အလေးချိန်</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">{data.physical?.weight || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁၁။ ဆံပင်အရောင်</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">{data.physical?.hair_color || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁၂။ မျက်စိအရောင်</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">{data.physical?.eye_color || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁၃။ ထင်ရှားသည့်အမှတ်အသား</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">{data.physical?.distinctive_mark || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁၄။ အလုပ်အကိုင်နှင့်ဌာန</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">{data.employment?.position || '-'} / {data.employment?.department || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁၅။ အမှုထမ်းသက် (နှစ်၊ လ၊ ရက်)</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900">{data.employment?.year_of_service || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁၆။ လက်ရှိနေရပ် လိပ်စာ အပြည့်အစုံ</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">{data.info?.current_address || '-'}</div>
                    </div>

                    <div className="grid grid-cols-[240px_20px_1fr] items-start">
                        <div className="font-bold text-gray-800">၁၇။ အမြဲတမ်းနေရပ် လိပ်စာ အပြည့်အစုံ</div>
                        <div className="text-center">-</div>
                        <div className="text-gray-900 break-words">{data.info?.permanent_address || '-'}</div>
                    </div>
                </div>

                {/* ၁၈။ ပညာအရည်အချင်း ဇယား */}
                <div className="mt-6 mb-6 keep-together">
                    <h4 className="font-bold text-sm mb-2">၁၈။ ပညာအရည်အချင်း</h4>
                    <table className="w-full border border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-50 font-bold border-b border-black">
                                <th className="border border-black p-2">ဘွဲ့အမည်</th>
                                <th className="border border-black p-2">အထူးပြုဘာသာ</th>
                                <th className="border border-black p-2 w-32">ရရှိသည့်ခုနှစ်</th>
                                <th className="border border-black p-2 w-32">ရရှိသည့် အဆင့်</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.educations?.length > 0 ? (
                                data.educations.map((edu, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-2 text-left px-3">{edu.degree_name}</td>
                                        <td className="border border-black p-2">{edu.major_subject || '-'}</td>
                                        <td className="border border-black p-2 font-mono">{edu.graduation_year || '-'}</td>
                                        <td className="border border-black p-2">{edu.degree_level || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="border border-black p-4 text-gray-400 italic">မှတ်တမ်းမရှိပါ။</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ၁၉။ ပညာဆည်းပူးခဲ့သောကျောင်း/သင်တန်းများ */}
                <div className="mb-6 keep-together">
                    <h4 className="font-bold text-sm mb-2">၁၉။ ပညာဆည်းပူးခဲ့သောကျောင်း၊ ကောလိပ်၊ တက္ကသိုလ်၊ အလုပ်ဌာန၊ သင်တန်း စသည်များ</h4>
                    <table className="w-full border border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-50 font-bold border-b border-black">
                                <th className="border border-black p-2 w-12">စဉ်</th>
                                <th className="border border-black p-2">ကျောင်း / ဌာန / သင်တန်းအမည်</th>
                                <th className="border border-black p-2 w-48">ကာလ (မှ - ထိ)</th>
                                <th className="border border-black p-2">ရရှိသည့် အောင်လက်မှတ်/မှတ်ချက်</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                const educations = data.trainings?.filter(item => item.category === "education") || [];
                                return educations.length > 0 ? (
                                    educations.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="border border-black p-2 text-center font-medium">{idx + 1}</td>
                                            <td className="border border-black p-2 text-left px-3">{item.learn_course || '-'}</td>
                                            <td className="border border-black p-2">
                                                {item.learn_from || '-'} {item.learn_to ? ` မှ ${item.learn_to} ထိ` : ''}
                                            </td>
                                            <td className="border border-black p-2">{item.rank || item.location || '-'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="border border-black p-4 text-gray-400 italic text-center">
                                            မှတ်တမ်းမရှိပါ။
                                        </td>
                                    </tr>
                                );
                            })()}
                        </tbody>
                    </table>
                </div>

                {/* ၂၀။ နိုင်ငံခြားသို့ရောက်ဖူးခြင်း ရှိ/မရှိ ဇယား */}
                <div className="mb-6 keep-together">
                    <h4 className="font-bold text-sm mb-2">၂၀။ နိုင်ငံခြားသို့ရောက်ဖူးခြင်း ရှိ/မရှိ</h4>
                    <table className="w-full border border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-50 font-bold border-b border-black">
                                <th className="border border-black p-2" colSpan={2}>ကာလ (ရက်/လ/နှစ်)</th>
                                <th className="border border-black p-2" rowSpan={2}>သွားရောက်သည့်နိုင်ငံများ</th>
                                <th className="border border-black p-2" rowSpan={2}>သွားရောက်သည့်ကိစ္စ</th>
                                <th className="border border-black p-2" rowSpan={2}>နိုင်ငံခြားငွေမည်မျှ ထုတ်ယူခဲ့သည်</th>
                            </tr>
                            <tr className="bg-gray-50 font-bold border-b border-black">
                                <th className="border border-black p-1.5 w-24">မှ</th>
                                <th className="border border-black p-1.5 w-24">ထိ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.abroad_visits?.length > 0 ? (
                                data.abroad_visits.map((trip, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-2">{trip.abroad_from || '-'}</td>
                                        <td className="border border-black p-2">{trip.abroad_to || '-'}</td>
                                        <td className="border border-black p-2">{trip.country_visited || '-'}</td>
                                        <td className="border border-black p-2 text-left px-3">{trip.visit_purpose || '-'}</td>
                                        <td className="border border-black p-2 font-mono">{trip.foreign_currency_amount || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="border border-black p-4 text-gray-400 italic">နိုင်ငံခြားသို့ သွားရောက်ဖူးခြင်း မရှိပါ။</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* မိသားစုဝင်များနှင့် မောင်နှမအရင်းအချာများ ဇယားများ */}
                {/* ခေါင်းစဉ်နှင့် ဇယားများ စာမျက်နှာအစွန်းတွင် တစ်စစီပြတ်မသွားစေရန် keep-together class ထည့်သွင်းထားပါသည် */}
                <div className="space-y-6">
                    <div className="keep-together"><FamilyTable title="၂၁။ ဝန်ထမ်း၏ အဘနှင့်အဘ၏ မောင်နှမအရင်းအချာများ။" relationshipType="father_sibling" familiesData={data.family_members} /></div>
                    <div className="keep-together"><FamilyTable title="၂၂။ ဝန်ထမ်း၏ အမိနှင့်အမိ၏ မောင်နှမအရင်းအချာများ။" relationshipType="mother_sibling" familiesData={data.family_members} /></div>
                    <div className="keep-together"><FamilyTable title="၂၃။ ဝန်ထမ်း၏ မောင်နှမအရင်းအချာများ။" relationshipType="employee_sibling" familiesData={data.family_members} /></div>

                    {/* ပြဿနာဖြစ်နေသော ခေါင်းစဉ် (၂၄) ကို စာမျက်နှာအသစ်သို့ အလိုအလျောက်တွန်းပို့ရန် ထိန်းညှိထားပါသည် */}
                    <div className="keep-together"><FamilyTable title="၂၄။ ဇနီးခင်ပွန်းနှင့် ယင်း၏မောင်နှမအရင်းအချာများ။" relationshipType="spouse_family" familiesData={data.family_members} /></div>

                    <div className="keep-together"><FamilyTable title="၂၅။ ဇနီးခင်ပွန်း၏ အဘနှင့် ယင်း၏မောင်နှမအရင်းအချာများ။" relationshipType="spouse_father_family" familiesData={data.family_members} /></div>
                    <div className="keep-together"><FamilyTable title="၂၆။ ဇနီးခင်ပွန်း၏ အမိနှင့် ယင်း၏ မောင်နှမအရင်းအချာများ။" relationshipType="spouse_mother_family" familiesData={data.family_members} /></div>
                    <div className="keep-together"><FamilyTable title="၂၇။ သားသမီးများနှင့် ယင်း၏ ဇနီးခင်ပွန်း။" relationshipType="children" familiesData={data.family_members} /></div>
                    <div className="keep-together"><FamilyTable title="၂၈။ နိုင်ငံခြားသို့ ရောက်ရှိနေကြသည့် ဆွေမျိုးများ။" relationshipType="relative_abroad" familiesData={data.family_members} /></div>
                </div>

                {/* ၂၉၊ ၃၀။ ဌာနဆိုင်ရာ အရေးယူမှုနှင့် တရားရုံးမှတ်တမ်း */}
                <div className="grid grid-cols-1 gap-6 my-6  keep-together">
                    <ActionTable title="၂၉။ ဌာနဆိုင်ရာ အရေးယူခံရခြင်း ရှိ/မရှိ" recordType="disciplinary" actionsData={data.court_disciplinary_actions} />
                    <ActionTable title="၃၀။ တရားရုံးတွင် တရားစွဲ ခံရဖူးခြင်း ရှိ/မရှိ" recordType="court" actionsData={data.court_disciplinary_actions} />
                </div>

                {/* ၃၁။ ဘွဲ့ တံဆိပ် ချီးမြှင့်ခံရဖူးခြင်း ရှိ/မရှိ */}
                <div className="mb-6 keep-together">
                    <h4 className="text-sm font-bold mb-2">၃၁။ ဘွဲ့ တံဆိပ် ချီးမြှင့်ခံရဖူးခြင်း ရှိ/မရှိ</h4>
                    <table className="w-full border border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-50 font-bold border-b border-black">
                                <th className="border border-black p-2 w-16">စဉ်</th>
                                <th className="border border-black p-2">ဘွဲ့ထူး၊ ဂုဏ်ထူးတံဆိပ်</th>
                                <th className="border border-black p-2 w-64">အမိန့်အမှတ် / ခုနှစ်</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {data.awards_received?.length > 0 ? (
                                data.awards_received.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-2">{idx + 1}</td>
                                        <td className="border border-black p-2 text-left px-3 font-semibold">{item.award_title || '-'}</td>
                                        <td className="border border-black p-2 font-semibold">{item.award_year || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="border border-black p-4 text-gray-400 italic">ချီးမြှင့်ခံရသည့် ဘွဲ့ထူး၊ ဂုဏ်ထူးတံဆိပ် မှတ်တမ်းမရှိပါ။</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ၃၂။ နိုင်ငံခြားသို့သွားရောက်မည့်ကိစ္စ */}
                <div className="my-6 keep-together">
                    <h4 className="font-bold text-sm mb-2">၃၂။ နိုင်ငံခြားသို့သွားရောက်မည့်ကိစ္စ</h4>
                    <table className="w-full border border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-50 font-bold border-b border-black">
                                <th className="border border-black p-2">သင်ကြားမည့် ဘာသာရပ်နှင့်အဆင့်/တက်ရောက်မည့်သင်တန်း/သို့မဟုတ် အခြားကိစ္စ</th>
                                <th className="border border-black p-2">စေလွှတ်သည့် နိုင်ငံ</th>
                                <th className="border border-black p-2">အချိန်ကာာလ</th>
                                <th className="border border-black p-2">နိုင်ငံခြားသို့ ရောက်ရမည့်နေ့</th>
                                <th className="border border-black p-2">မည်သည့် အစိုးရအဖွဲ့အစည်း အထောက်အပံ့</th>
                                <th className="border border-black p-2">ပြန်လည်ရောက်ရှိလျှင် အမှုထမ်းမည့်ဌာန/ တာဝန်</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black p-2 text-left px-2">{data.foreign_visited_purpose?.training_course || '-'}</td>
                                <td className="border border-black p-2">{data.foreign_visited_purpose?.assigned_country || '-'}</td>
                                <td className="border border-black p-2">{data.foreign_visited_purpose?.time_period || '-'}</td>
                                <td className="border border-black p-2">{data.foreign_visited_purpose?.arrival_date || '-'}</td>
                                <td className="border border-black p-2">{data.foreign_visited_purpose?.supporting_agency || '-'}</td>
                                <td className="border border-black p-2 text-left px-2">{data.foreign_visited_purpose?.return_department || '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ၃၃။ ဝန်ခံကတိပြုချက်နှင့် လျှောက်ထားသူလက်မှတ် (ပုံစံ-၁ ၏ လိုအပ်ချက်များအတိုင်း ပြင်ဆင်ပြီး) */}
                <div className="mt-8 border-t border-black pt-4 keep-together">
                    <p className="text-sm font-semibold italic mb-6 text-center">
                        "၃၃။ အထက်ပါအချက်အလက်များကို မှန်ကန်စွာ ဖြည့်သွင်းရေးသားထားပါကြောင်း ကိုယ်တိုင် လက်မှတ်ရေးထိုးပါသည်။"
                    </p>

                    <div className="grid grid-cols-2 gap-8 text-sm mt-4 print:gap-12">
                        {/* လျှောက်ထားသူအပိုင်း (ပုံစံ-၁ ၏ အပြင်အဆင်အတိုင်း ကွက်တိဖြည့်သွင်းထားပါသည်) */}
                        <div className="space-y-2 p-4 border border-dotted border-gray-500 rounded-lg print:border-0 print:p-0">
                            <p className="font-bold text-center border-b border-black pb-1 mb-2 print:text-left">လျှောက်ထားသူ</p>
                            <div className="flex border-b border-dotted border-gray-600 h-6"><strong>လက်မှတ်:</strong></div>
                            <div><strong>အမည်:</strong> <span className="font-semibold">{data.name || '............................................'}</span></div>
                            <div><strong>ရာထူး:</strong> <span>{data.employment?.position || '............................................'}</span></div>
                            <div><strong>ဖုန်းနံပါတ် (ရုံး/လက်ကိုင်ဖုန်း):</strong> <span>{data.phone || '............................................'}</span></div>
                            <div><strong>အီးမေးလ်:</strong> <span>{data.email || '............................................'}</span></div>
                            <div className="text-[13px] mt-2"><strong>ရက်စွဲ:</strong> ဝင်္ဂဒ ခုနှစ်၊ .................... လ၊ ........... ရက်</div>
                        </div>

                        {/* ထပ်ဆင့်အတည်ပြုချက်အပိုင်း */}
                        <div className="space-y-2 p-4 border border-dotted border-gray-500 rounded-lg print:border-0 print:p-0">
                            <p className="font-bold text-center border-b border-black pb-1 mb-2 print:text-left">ထပ်ဆင့်အတည်ပြုချက်</p>
                            <div className="flex border-b border-dotted border-gray-600 h-6"><strong>လက်မှတ်:</strong></div>
                            <div className="flex border-b border-dotted border-gray-600 h-6"><strong>အမည်:</strong></div>
                            <div className="flex border-b border-dotted border-gray-600 h-6"><strong>ရာထူး:</strong></div>
                            <div className="flex border-b border-dotted border-gray-600 h-6"><strong>ဌာန:</strong></div>
                            <div><strong>တက္ကသိုလ်:</strong> ကွန်ပျူတာတက္ကသိုလ် (မိတ္ထီလာ)</div>
                            <div className="text-[13px] mt-2"><strong>ရက်စွဲ:</strong> ဝင်္ဂဒ ခုနှစ်၊ .................... လ၊ ........... ရက်</div>
                        </div>
                    </div>
                </div>

                {/* 🖥️ Screen ပေါ်မှာကြည့်ရင် မြင်ရမည့် အောက်ဆုံးအပိုင်း (Print ထုတ်လျှင် ပျောက်သွားပါမည်) */}
                <div className="flex justify-end mt-12 screen-secret">
                    <div className="text-base font-bold tracking-widest border border-black px-4 py-0.5">လျှို့ဝှက်</div>
                </div>

            </div>
        </>
    );
}