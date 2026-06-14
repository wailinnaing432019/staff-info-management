import React from 'react';
import FamilyTable from './FamilyTable';
import ActionTable from './ActionTable';
import { Printer } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Format36({ data = {} }) {
    return (
        <div className="bg-white p-6 md:p-12 border border-gray-300 shadow-xl rounded-xl max-w-4xl mx-auto my-6 text-black font-serif text-[13px] print:border-0 print:shadow-none print:p-0 print:m-0 print:max-w-full">

            {/* စာမျက်နှာတိုင်းရဲ့ ထိပ်ဆုံး "လျှို့ဝှက်" အဆင့်သတ်မှတ်ချက် */}
            <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-bold border border-black px-3 py-0.5 bg-gray-50">ပုံစံ (၃၆)</div>
                <div className="text-base font-bold tracking-widest border-2 border-black px-4 py-0.5 bg-gray-50">လျှို့ဝှက်</div>
            </div>

            {/* ပင်မခေါင်းစဉ်ကြီး */}
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold tracking-wide border-b-2 border-black inline-block pb-1 px-6">
                    ကိုယ်ရေးမှတ်တမ်း
                </h2>
            </div>

            {/* အပိုင်း (၁) - အခြေခံကိုယ်ရေးအချက်အလက်များ (နံပါတ် ၁ မှ ၁၇ အထိ အကွက်စနစ်) */}
            {/* 💡 border များနှင့် divide-y များကို အကုန်လုံး ဖြုတ်လိုက်ပါသည် */}
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

                {/* 💡 အစ်ကိုပြဿနာတက်နေတဲ့ အပိုင်း ၁၇ ကို Grid သုံးပြီး အောက်ဆင်းလည်း ပုံမပျက်အောင် ညှိထားပါတယ် */}
                <div className="grid grid-cols-[240px_20px_1fr] items-start">
                    <div className="font-bold text-gray-800">၁၇။ အမြဲတမ်းနေရပ် လိပ်စာ အပြည့်အစုံ</div>
                    <div className="text-center">-</div>
                    <div className="text-gray-900 break-words">{data.info?.permanent_address || '-'}</div>
                </div>
            </div>

            {/* ၁၈။ ပညာအရည်အချင်း ဇယား */}
            <div className="mb-6">
                <h4 className="font-bold text-sm mb-2">၁၈။ ပညာအရည်အချင်း</h4>
                <table className="w-full border-2 border-black border-collapse text-xs text-center">
                    <thead>
                        <tr className="bg-gray-100 font-bold divide-x divide-black border-b-2 border-black">
                            <th className="border border-black p-2">ဘွဲ့အမည်</th>
                            <th className="border border-black p-2">အထူးပြုဘာသာ</th>
                            <th className="border border-black p-2">ရရှိသည့်ခုနှစ်</th>
                            <th className="border border-black p-2">ရရှိသည့် အဆင့်</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                        {data.educations?.length > 0 ? (
                            data.educations.map((edu, idx) => (
                                <tr key={idx}>
                                    <td className="border border-black p-2 text-left">{edu.degree_name}</td>
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
            <div className="mb-6">
                <h4 className="font-bold text-sm mb-2">၁၉။ ပညာဆည်းပူးခဲ့သောကျောင်း၊ ကောလိပ်၊ တက္ကသိုလ်၊ အလုပ်ဌာန၊ သင်တန်း စသည်များ</h4>
                <table className="w-full border-2 border-black border-collapse text-xs text-center">
                    <thead>
                        <tr className="bg-gray-100 font-bold border-b-2 border-black">
                            <th className="border border-black p-2 w-12">စဉ်</th>
                            <th className="border border-black p-2">ကျောင်း / ဌာန / သင်တန်းအမည်</th>
                            <th className="border border-black p-2">ကာလ (မှ - ထိ)</th>
                            <th className="border border-black p-2">ရရှိသည့် အောင်လက်မှတ်/မှတ်ချက်</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black">

                        {(() => {
                            // ၁။ နိုင်ငံခြားသင်တန်း (foreign_training) များကိုသာ သီးသန့် Filter လုပ်ပြီး စစ်ထုတ်လိုက်ပါသည်
                            const educations = data.trainings?.filter(item => item.category === "education") || [];

                            // ၂။ စစ်ထုတ်ထားသော Array ကိုပဲ အခြေခံပြီး ဒေတာ ရှိ/မရှိ စစ်ဆေးပါမည်
                            return educations.length > 0 ? (
                                educations.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50">
                                        {/* 💡 စစ်ထုတ်ပြီးသား Array ရဲ့ အခန်းနံပါတ်ဖြစ်လို့ Real Count (၁၊ ၂၊ ၃) အမှန်အတိုင်း ထွက်လာပါပြီ */}
                                        <td className="border border-black p-1.5 text-center font-medium">{idx + 1}</td>
                                        <td className="border border-black p-1.5 text-left">{item.learn_course || '-'}</td>
                                        <td className="border border-black p-1.5">{item.learn_from || '-'}</td>
                                        <td className="border border-black p-1.5">{item.learn_to || '-'}</td>
                                        <td className="border border-black p-1.5">{item.location || '-'}</td>
                                        <td className="border border-black p-1.5">{item.rank || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                // ၃။ တကယ်လို့ နိုင်ငံခြားသင်တန်း လုံးဝမရှိရင် 'မှတ်တမ်းမရှိပါ' ဆိုပြီး ကွက်တိပြပေးပါလိမ့်မယ်
                                <tr>
                                    {/* ကော်လံ ၅ ခု (စဉ်၊ သင်တန်း၊ မှ၊ ထိ၊ နေရာ) ရှိသောကြောင့် colSpan={5} ဟု ပြောင်းလဲပေးရပါမည် */}
                                    <td className="border border-black p-4 text-gray-400 italic text-center">
                                        -
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 italic text-center">
                                        -
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 italic text-center">
                                        -
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 italic text-center">
                                        -
                                    </td>
                                    <td className="border border-black p-4 text-gray-400 italic text-center">
                                        -
                                    </td>
                                </tr>
                            );
                        })()}

                    </tbody>
                </table>
            </div>

            {/* ၂၀။ နိုင်ငံခြားသို့ရောက်ဖူးခြင်း ရှိ/မရှိ ဇယား */}
            <div className="mb-6">
                <h4 className="font-bold text-sm mb-2">၂၀။ နိုင်ငံခြားသို့ရောက်ဖူးခြင်း ရှိ/မရှိ</h4>
                <table className="w-full border-2 border-black border-collapse text-xs text-center">
                    <thead>
                        <tr className="bg-gray-100 font-bold border-b-2 border-black">
                            <th className="border border-black p-2" colSpan={2}>ကာလ (ရက်/လ/နှစ်)</th>
                            <th className="border border-black p-2" rowSpan={2}>သွားရောက်သည့်နိုင်ငံများ</th>
                            <th className="border border-black p-2" rowSpan={2}>သွားရောက်သည့်ကိစ္စ</th>
                            <th className="border border-black p-2" rowSpan={2}>နိုင်ငံခြားငွေမည်မျှ ထုတ်ယူခဲ့သည်</th>
                        </tr>
                        <tr className="bg-gray-100 font-bold border-b-2 border-black">
                            <th className="border border-black p-1.5">မှ</th>
                            <th className="border border-black p-1.5">ထိ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                        {data.abroad_visits?.length > 0 ? (
                            data.abroad_visits.map((trip, idx) => (
                                <tr key={idx}>
                                    <td className="border border-black p-2">{trip.abroad_from || '-'}</td>
                                    <td className="border border-black p-2">{trip.abroad_to || '-'}</td>
                                    <td className="border border-black p-2">{trip.country_visited || '-'}</td>
                                    <td className="border border-black p-2 text-left">{trip.visit_purpose || '-'}</td>
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

            {/* ၂၁ မှ ၂၆ အထိ မိသားစုဝင်များနှင့် မောင်နှမအရင်းအချာများ ပေါင်းစည်းဇယား (PDF Standard Format) */}
            <FamilyTable
                title="၂၁။ ဝန်ထမ်း၏ အဘနှင့်အဘ၏ မောင်နှမအရင်းအချာများ။"
                relationshipType="father_sibling"
                familiesData={data.families}
            />

            <FamilyTable
                title="၂၂။ ဝန်ထမ်း၏ အမိနှင့်အမိ၏ မောင်နှမအရင်းအချာများ။"
                relationshipType="mother_sibling"
                familiesData={data.families}
            />
            <FamilyTable
                title="၂၃။ ဝန်ထမ်း၏  မောင်နှမအရင်းအချာများ။"
                relationshipType="employee_sibling"
                familiesData={data.families}
            />
            <FamilyTable
                title="၂၄။ ဇနီးခင်ပွန်းနှင့် ယင်း၏မောင်နှမအရင်းအချာများ။"
                relationshipType="spouse_family"
                familiesData={data.families}
            />
            <FamilyTable
                title="၂၅။ ဇနီးခင်ပွန်း၏ အဘနှင့် ယင်း၏မောင်နှမအရင်းအချာများ။"
                relationshipType="spouse_father_family"
                familiesData={data.families}
            />
            <FamilyTable
                title="၂၆။ ဇနီးခင်ပွန်း၏ အမိနှင့် ယင်း၏ မောင်နှမအရင်းအချာများ။"
                relationshipType="spouse_mother_family"
                familiesData={data.families}
            />
            <FamilyTable
                title="၂၇။ သားသမီးများနှင့် ယင်း၏ ဇနီးခင်ပွန်း။"
                relationshipType="children"
                familiesData={data.families}
            />
            <FamilyTable
                title="၂၈။ နိုင်ငံခြားသို့ ရောက်ရှိနေကြသည့် ဆွေမျိုးများ။"
                relationshipType="relative_abroad"
                familiesData={data.families}
            />

            {/* ၂၉။ ဌာနဆိုင်ရာ အရေးယူခံရခြင်း ရှိ/မရှိ */}
            <div className="grid grid-cols-1 gap-6 mb-6 print:grid-cols-2">
                {/* ၂၉။ ဌာနဆိုင်ရာ အရေးယူမှတ်တမ်း */}
                <ActionTable
                    title="၂၉။ ဌာနဆိုင်ရာ အရေးယူခံရခြင်း ရှိ/မရှိ"
                    recordType="disciplinary"
                    actionsData={data.court_disciplinary_actions}
                />

                {/* ၃၀။ တရားရုံး ပြစ်ဒဏ်မှတ်တမ်း */}
                <ActionTable
                    title="၃၀။ တရားရုံးတွင် တရားစွဲ ခံရဖူးခြင်း ရှိ/မရှိ"
                    recordType="court"
                    actionsData={data.court_disciplinary_actions}
                />
            </div>

            <div>
                <h4 className="text-sm font-bold mb-2">၃၀။ ဘွဲ့ တံဆိပ် ချီးမြှင့်ခံရဖူးခြင်း ရှိ/မရှိ</h4>
                <table className="w-full border-2 border-black border-collapse text-xs text-center">
                    <thead>
                        <tr className="bg-gray-100 font-bold border-b-2 border-black">
                            <th className="border border-black p-1.5  ">စဉ်</th>
                            <th className="border border-black p-1.5  ">ဘွဲ့ထူး၊ ဂုဏ်ထူးတံဆိပ်</th>
                            <th className="border border-black p-1.5  ">အမိန့်အမှတ် / ခုနှစ် </th>
                        </tr>

                    </thead>
                    <tbody className="divide-y divide-black">
                        {data.awards_received?.length > 0 ? (
                            data.awards_received.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="border border-black p-1.5">{idx + 1}</td>

                                    <td className="border border-black p-1.5 font-semibold">{item.award_title || '-'}</td>
                                    <td className="border border-black p-1.5 font-semibold">{item.award_year || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="border border-black p-4 text-green-700 font-semibold italic">ပြစ်မှုမှတ်တမ်း လုံးဝမရှိပါ။</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="my-6">
                <h4 className="font-bold text-sm mb-2">၃၂။ နိုင်ငံခြားသို့သွားရောက်မည့်ကိစ္စ</h4>
                <table className="w-full border-2 border-black border-collapse text-xs text-center">
                    <thead>
                        <tr className="bg-gray-100 font-bold border-b-2 border-black">
                            <th className="border border-black p-2"  >သင်ကြားမည့် ဘာသာရပ်နှင့်အဆင့်/တက်ရောက်မည့်သင်တန်း/သို့မဟုတ် အခြားကိစ္စ</th>
                            <th className="border border-black p-2"  >စေလွှတ်သည့် နိုင်ငံ</th>
                            <th className="border border-black p-2" >အချိန်ကာာလ</th>
                            <th className="border border-black p-2" >နိုင်ငံခြားသို့ ရောက်ရမည့်နေ့</th>
                            <th className="border border-black p-1.5">မည်သည့် အစိုးရအဖွဲ့အစည်း အထောက်အပံ့</th>
                            <th className="border border-black p-1.5">ပြန်လည်ရောက်ရှိလျှင် အမှုထမ်းမည့်ဌာန/ တာဝန်</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                        <tr>
                            <td className="border border-black p-2">{data.foreign_visited_purpose?.training_course || '-'}</td>
                            <td className="border border-black p-2">{data.foreign_visited_purpose?.assigned_country || '-'}</td>
                            <td className="border border-black p-2">{data.foreign_visited_purpose?.time_period || '-'}</td>
                            <td className="border border-black p-2 text-left">{data.foreign_visited_purpose?.arrival_date || '-'}</td>
                            <td className="border border-black p-2 font-mono">{data.foreign_visited_purpose?.supporting_agency || '-'}</td>
                            <td className="border border-black p-2 font-mono">{data.foreign_visited_purpose?.return_department || '-'}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            {/* ၃၃။ ဝန်ခံကတိပြုချက်နှင့် လျှောက်ထားသူလက်မှတ် */}
            <div className="mt-8 border-t border-black pt-4">
                <p className="text-sm font-semibold italic mb-6 text-center">
                    "၃၃။ အထက်ပါအချက်အလက်များကို မှန်ကန်စွာ ဖြည့်သွင်းရေးသားထားပါကြောင်း ကိုယ်တိုင် လက်မှတ်ရေးထိုးပါသည်။"
                </p>

                <div className="grid grid-cols-2 gap-12 text-sm mt-4">
                    <div className="space-y-1 bg-gray-50 p-4 border border-dashed border-gray-400 rounded-lg">
                        <p className="font-bold text-center border-b pb-1 mb-2">လျှောက်ထားသူ</p>
                        <p><strong className='w-24 inline-block shrink-0'>လက်မှတ်:</strong> ............................................</p>
                        <p><strong className='w-24 inline-block shrink-0'>အမည်:</strong> {data.name || '-'}</p>
                        <p><strong className='w-24 inline-block shrink-0'>ရာထူး:</strong> {data.employment?.position || '-'}</p>
                        <p><strong className='w-24 inline-block shrink-0'>ဌာန:</strong> {data.employment?.department || '-'}</p>
                        <p><strong className='w-24 inline-block shrink-0'>ရက်စွဲ:</strong> .............. ခုနှစ်၊ .................... လ၊ ........... ရက်</p>
                    </div>

                    <div className="space-y-1 bg-gray-50 p-4 border border-dashed border-gray-400 rounded-lg">
                        <p className="font-bold text-center border-b pb-1 mb-2">ထပ်ဆင့်အတည်ပြုချက်</p>
                        <p><strong className='w-24 inline-block shrink-0'>လက်မှတ်:</strong> ............................................</p>
                        <p><strong className='w-24 inline-block shrink-0'>အမည်:</strong>............................................</p>
                        <p><strong className='w-24 inline-block shrink-0'>ရာထူး:</strong> ............................................</p>
                        <p><strong className='w-24 inline-block shrink-0'>ဌာန:</strong> ............................................</p>
                        {/* <p className="text-xs text-gray-600">(ပါမောက္ခချုပ် / ကျောင်းအုပ်ကြီး / ဌာနအကြီးအကဲ)</p> */}
                        <p><strong className='w-24 inline-block shrink-0'>တက္ကသိုလ်:</strong> ကွန်ပျူတာတက္ကသိုလ် (မိတ္ထီလာ)</p>
                        <p><strong>ရက်စွဲ:</strong> ......... ခုနှစ်၊ .................... လ၊ ........... ရက်</p>
                    </div>
                </div>
            </div>

            {/* အောက်ခြေ "လျှို့ဝှက်" အဆင့်သတ်မှတ်ချက် ထပ်မံအတည်ပြုခြင်း */}
            <div className="flex justify-end mt-12 print:mt-16">
                <div className="text-base font-bold tracking-widest border-2 border-black px-4 py-0.5 bg-gray-50">လျှို့ဝှက်</div>
            </div>
            <Link href={`/employees/${data.id}/format36pdf`} className="fixed bottom-10 text-blue-400 right-20 rounded-full bg-red-100 p-4 text-sm font-bold   hover:text-black">
                <Printer />
            </Link>
        </div>
    );
}