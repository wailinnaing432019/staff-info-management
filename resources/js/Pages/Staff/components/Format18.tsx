import { Link } from '@inertiajs/react';
import { Printer } from 'lucide-react';
import React from 'react';

export default function Format18({ data = {} }) {
    return (
        <div className="bg-white p-6 md:p-12 border border-gray-300 shadow-xl rounded-xl max-w-4xl mx-auto my-6 text-black font-serif print:border-0 print:shadow-none print:p-0 print:m-0 print:max-w-full">

            {/* လျှို့ဝှက် အဆင့် သတ်မှတ်ချက် ခေါင်းစဉ်ပိုင်း */}
            <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-bold border-2 border-black px-4 py-0.5">ပုံစံ (၁၈)</div>
                <div className="text-base font-bold tracking-widest border border-black px-3 py-0.5 bg-gray-50">လျှို့ဝှက်</div>
            </div>

            {/* 💡 ခေါင်းစဉ်နှင့် ဓာတ်ပုံကို ဘေးချင်းယှဉ်ပြီး PDF အတိုင်း နေရာချခြင်း */}
            <div className="flex justify-between items-end mb-6 relative">
                {/* ဘယ်ဘက်ခြမ်း နေရာလွတ် ချန်ရန် (ခေါင်းစဉ်အလယ်ကျစေရန်) */}
                <div className="w-[100px] hidden md:block"></div>

                {/* ပင်မခေါင်းစဉ်ကြီး */}
                <div className="text-center flex-1">
                    <h2 className="text-xl font-bold tracking-wide border-b-2 border-black inline-block pb-1 px-4">
                        ကိုယ်ရေးမှတ်တမ်း
                    </h2>
                </div>

                {/* ဓာတ်ပုံနေရာကို ခေါင်းစဉ်ရဲ့ ညာဘက်အစွန်မှာ သေးသေးလေးအဖြစ် ထားရှိခြင်း */}
                <div className="w-[100px] h-[100px] border-2 border-black flex flex-col items-center justify-center bg-gray-50 shrink-0 overflow-hidden shadow-sm">
                    {data.info?.image_path ? (
                        <img
                            /* 💡 အရှေ့ကနေ /storage/ ခံပြီး လမ်းကြောင်း အပြည့်အစုံ ပေးလိုက်ခြင်း ဖြစ်ပါတယ် */
                            src={`/storage/${data.info.image_path}`}
                            alt="Profile"
                            /* 💡 object-cover နှင့် w-full h-full ကြောင့် ပုံက မပြဲဘဲ လိုင်စင်ကွက်ထဲ ကွက်တိ ဖြတ်ညှပ်ပေးပါလိမ့်မယ် */
                            className="w-full h-full object-cover object-top"
                        />
                    ) : (
                        <div className="text-gray-400 font-bold flex flex-col items-center justify-center gap-1 leading-tight text-[10px] p-1 text-center select-none">
                            <span className="text-gray-600 font-bold">ဓာတ်ပုံ</span>
                            <span className="text-gray-400 text-[8px] font-medium">(၂ လက်မ ပတ်လည်)</span>
                        </div>
                    )}
                </div>
            </div>

            {/* အပိုင်း (၁) - အချက်အလက်များ ဇယားကွက် (Full Width ပုံစံပြောင်းလဲထားသည်) */}
            {/* 💡 အပြင်ဘောင်များ ဖြုတ်လိုက်ပြီး စာသားလုံးဝ မကပ်စေရန် padding နည်းနည်း ထည့်ထားပါသည် */}
            <div className="text-[13px] space-y-2.5 py-2">

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၁။ အမည် (ကျား/မ)</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="font-mono text-gray-900">{data.name || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၂။ ဝန်ထမ်းအမှတ်</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="font-mono text-gray-900">{data.staff_number || data.id || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၃။ မွေးနေ့ (ရက်၊ လ၊ နှစ်)</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="text-gray-900">{data.date_of_birth || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၄။ လူမျိုး / ဘာသာ</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="text-gray-900">{data.race || '-'} / {data.religion || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၅။ အဘအမည်</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="text-gray-900">{data.father_name || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၆။ အမိအမည်</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="text-gray-900">{data.mother_name || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၇။ နိုင်ငံသားစိစစ်ရေးအမှတ်</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="font-medium text-gray-900">{data.nrc_township || ''}
                        {data.nrc_type && `(${data.nrc_type})`}
                        {data.nrc_number ? ` ${data.nrc_number}` : '-'} </div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၈။ ဇနီး/ခင်ပွန်းအမည်</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="text-gray-900">{data.spouse_name || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၉။ သား / သမီးအမည်</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="break-words text-gray-900 flex-1">{data.info?.childrens || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၁၀။ လိပ်စာ</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="break-words text-gray-900 flex-1">{data.info?.permanent_address || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၁၁။ ပညာအရည်အချင်း</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="break-words text-gray-900 flex-1">{data.info?.degree || '-'}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၁၂။ လက်ရှိရာထူး/လစာနှုန်း/ဌာန</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="break-words text-gray-900 flex-1">
                        {data.employment?.position || '-'} / {data.employment?.salary_scale || '-'} / {data.employment?.department || '-'}
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-48 font-bold text-gray-700 shrink-0">၁၃။ သွေးအုပ်စု</div>
                    <div className="px-2 shrink-0">-</div>
                    <div className="font-mono text-gray-900">{data.physical?.blood_type || '-'}</div>
                </div>

            </div>

            {/* အောက်ခြေ ဇယားကွက်များဆီ ဆက်ရန်... */}
            {/* <div className="text-center mt-4 text-xs text-gray-400 italic"> */}
            {/* အပိုင်း (၂) - ဇယားကွက်များ (PDF ဒုတိယပိုင်း) */}
            <div className="space-y-6 mt-8">

                {/* ၁၄။ နိုင်ငံ့ဝန်ထမ်းတာဝန်ထမ်းဆောင်မှုမှတ်တမ်း */}
                <div>
                    <h4 className="text-sm font-bold mb-2">၁၄။ နိုင်ငံ့ဝန်ထမ်းတာဝန်ထမ်းဆောင်မှုမှတ်တမ်း (စစ်ဘက် / နယ်ဘက်)</h4>
                    <table className="w-full border-2 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold divide-x divide-black border-b-2 border-black">
                                <th rowSpan={2} className="border border-black p-1.5 w-12">စဉ်</th>
                                <th rowSpan={2} className="border border-black p-1.5">ရာထူး / ဌာန</th>
                                <th colSpan={2} className="border border-black p-1.5 col-span-2">တာဝန်ထမ်းဆောင်သည့် ကာလ (မှ - ထိ)</th>
                                <th rowSpan={2} className="border border-black p-1.5">နေရာ / ဒေသ</th>
                            </tr>
                            <tr className="bg-gray-100 font-bold divide-x divide-black border-b-2 border-black">
                                <th className="border border-black p-1.5 col-span-2"> မှ </th>
                                <th className="border border-black p-1.5">ထိ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {data.service_records?.length > 0 ? (
                                data.service_records.map((item, idx) => (
                                    <tr key={idx} className="align-middle">
                                        <td className="border border-black p-1.5">{idx + 1}</td>
                                        <td className="border border-black p-1.5 text-left">{item.service_position} / {item.service_department}</td>
                                        <td className="border border-black p-1.5">{item.service_from || '-'}  </td>
                                        <td className="border border-black p-1.5">  {item.service_to || 'ယနေ့ထိ'}</td>
                                        <td className="border border-black p-1.5">{item.service_location || '-'}</td>
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

                {/* ၁၅။ ပြည်တွင်းသင်တန်းများ တက်ရောက်မှု */}
                <div>
                    <h4 className="text-sm font-bold mb-2">၁၅။ ပြည်တွင်းသင်တန်းများ တက်ရောက်မှု</h4>
                    <table className="w-full border-2 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold border-b-2 border-black">
                                <th rowSpan={2} className="border border-black p-1.5 w-12">စဉ်</th>
                                <th rowSpan={2} className="border border-black p-1.5">သင်တန်းအမည်</th>
                                <th colSpan={2} className="border border-black p-1.5">တက်ရောက်သည့်ကာလ (မှ - ထိ)</th>
                                <th rowSpan={2} className="border border-black p-1.5">နေရာ / ဒေသ</th>
                            </tr>
                            <tr className="bg-gray-100 font-bold border-b-2 border-black">
                                <th className="border border-black p-1.5"> မှ </th>
                                <th className="border border-black p-1.5">ထိ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {(() => {
                                // ၁။ နိုင်ငံခြားသင်တန်း (foreign_training) များကိုသာ သီးသန့် Filter လုပ်ပြီး စစ်ထုတ်လိုက်ပါသည်
                                const localTraining = data.trainings?.filter(item => item.category === "local_training") || [];

                                // ၂။ စစ်ထုတ်ထားသော Array ကိုပဲ အခြေခံပြီး ဒေတာ ရှိ/မရှိ စစ်ဆေးပါမည်
                                return localTraining.length > 0 ? (
                                    localTraining.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50">
                                            {/* 💡 စစ်ထုတ်ပြီးသား Array ရဲ့ အခန်းနံပါတ်ဖြစ်လို့ Real Count (၁၊ ၂၊ ၃) အမှန်အတိုင်း ထွက်လာပါပြီ */}
                                            <td className="border border-black p-1.5 text-center font-medium">{idx + 1}</td>
                                            <td className="border border-black p-1.5 text-left">{item.learn_course || '-'}</td>
                                            <td className="border border-black p-1.5">{item.learn_from || '-'}</td>
                                            <td className="border border-black p-1.5">{item.learn_to || '-'}</td>
                                            <td className="border border-black p-1.5">{item.location || '-'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    // ၃။ တကယ်လို့ နိုင်ငံခြားသင်တန်း လုံးဝမရှိရင် 'မှတ်တမ်းမရှိပါ' ဆိုပြီး ကွက်တိပြပေးပါလိမ့်မယ်
                                    <tr>
                                        {/* ကော်လံ ၅ ခု (စဉ်၊ သင်တန်း၊ မှ၊ ထိ၊ နေရာ) ရှိသောကြောင့် colSpan={5} ဟု ပြောင်းလဲပေးရပါမည် */}
                                        <td colSpan={5} className="border border-black p-4 text-gray-400 italic text-center">
                                            ပြည်ပသင်တန်း တက်ရောက်ခဲ့သည့် မှတ်တမ်းမရှိပါ။
                                        </td>
                                    </tr>
                                );
                            })()}
                        </tbody>
                    </table>
                </div>

                {/* ၁၆။ ပြည်ပသင်တန်းများ တက်ရောက်မှု */}
                <div>
                    <h4 className="text-sm font-bold mb-2">၁၆။ ပြည်ပသင်တန်းများ တက်ရောက်မှု</h4>
                    <table className="w-full border-2 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold border-b-2 border-black">
                                <th rowSpan={2} className="border border-black p-1.5 w-12">စဉ်</th>
                                <th rowSpan={2} className="border border-black p-1.5">သင်တန်းအမည်</th>
                                <th colSpan={2} className="border border-black p-1.5">တက်ရောက်သည့်ကာလ (မှ - ထိ)</th>
                                <th rowSpan={2} className="border border-black p-1.5">နေရာ / ဒေသ</th>
                            </tr>
                            <tr className="bg-gray-100 font-bold border-b-2 border-black">
                                <th className="border border-black p-1.5"> မှ </th>
                                <th className="border border-black p-1.5">ထိ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {(() => {
                                // ၁။ နိုင်ငံခြားသင်တန်း (foreign_training) များကိုသာ သီးသန့် Filter လုပ်ပြီး စစ်ထုတ်လိုက်ပါသည်
                                const foreignTrainings = data.trainings?.filter(item => item.category === "foreign_training") || [];

                                // ၂။ စစ်ထုတ်ထားသော Array ကိုပဲ အခြေခံပြီး ဒေတာ ရှိ/မရှိ စစ်ဆေးပါမည်
                                return foreignTrainings.length > 0 ? (
                                    foreignTrainings.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50">
                                            {/* 💡 စစ်ထုတ်ပြီးသား Array ရဲ့ အခန်းနံပါတ်ဖြစ်လို့ Real Count (၁၊ ၂၊ ၃) အမှန်အတိုင်း ထွက်လာပါပြီ */}
                                            <td className="border border-black p-1.5 text-center font-medium">{idx + 1}</td>
                                            <td className="border border-black p-1.5 text-left">{item.learn_course || '-'}</td>
                                            <td className="border border-black p-1.5">{item.learn_from || '-'}</td>
                                            <td className="border border-black p-1.5">{item.learn_to || '-'}</td>
                                            <td className="border border-black p-1.5">{item.location || '-'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    // ၃။ တကယ်လို့ နိုင်ငံခြားသင်တန်း လုံးဝမရှိရင် 'မှတ်တမ်းမရှိပါ' ဆိုပြီး ကွက်တိပြပေးပါလိမ့်မယ်
                                    <tr>
                                        {/* ကော်လံ ၅ ခု (စဉ်၊ သင်တန်း၊ မှ၊ ထိ၊ နေရာ) ရှိသောကြောင့် colSpan={5} ဟု ပြောင်းလဲပေးရပါမည် */}
                                        <td colSpan={5} className="border border-black p-4 text-gray-400 italic text-center">
                                            ပြည်ပသင်တန်း တက်ရောက်ခဲ့သည့် မှတ်တမ်းမရှိပါ။
                                        </td>
                                    </tr>
                                );
                            })()}
                        </tbody>
                    </table>
                </div>

                {/* ၁၇။ ပြစ်မှုမှတ်တမ်း */}
                <div>
                    <h4 className="text-sm font-bold mb-2">၁၇။ ပြစ်မှုမှတ်တမ်း</h4>
                    <table className="w-full border-2 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold border-b-2 border-black">
                                <th rowSpan={2} className="border border-black p-1.5  ">ပြစ်ဒဏ်</th>
                                <th rowSpan={2} className="border border-black p-1.5  ">ပြစ်ဒဏ်ချမှတ်ခံရသည့် အကြောင်းအရင်း </th>
                                <th colSpan={2} className="border border-black p-1.5  ">ပြစ်ဒဏ်ချမှတ်သည့် ကာလ  </th>
                            </tr>
                            <tr className="bg-gray-100 font-bold border-b-2 border-black">
                                <th className="border border-black p-1.5">မှ</th>
                                <th className="border border-black p-1.5">ထိ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {data.criminal_records?.length > 0 ? (
                                data.criminal_records.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-1.5">{item.criminalPenalty}</td>

                                        <td className="border border-black p-1.5 font-mono">{item.reasonPelanty || '-'}</td>
                                        <td className="border border-black p-1.5 font-mono">{item.criminalFrom || '-'}</td>
                                        <td className="border border-black p-1.5 font-mono">{item.criminalTo || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="border border-black p-4 text-green-700 font-mono italic">ပြစ်မှုမှတ်တမ်း လုံးဝမရှိပါ။</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4 className="text-sm font-bold mb-2">၁၈။ ချီးမြှင့်ခံရသည့် ဘွဲ့ထူး၊ ဂုဏ်ထူးတံဆိပ်များ</h4>
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

                                        <td className="border border-black p-1.5 font-mono">{item.award_title || '-'}</td>
                                        <td className="border border-black p-1.5 font-mono">{item.award_year || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="border border-black p-4 text-green-700 font-mono italic">ပြစ်မှုမှတ်တမ်း လုံးဝမရှိပါ။</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="mt-6 text-[13px] leading-relaxed">
                        <p className="font-semibold mb-6">အထက်ပါ ဖော်ပြချက်များသည် မှန်ကန်ကြောင်း ဝန်ခံကတိပြုလက်မှတ်ရေးထိုးပါသည်။</p>

                        <div className="flex justify-between items-start mt-4">
                            {/* ဘယ်ဘက်ခြမ်း - ရက်စွဲ */}
                            <div className="flex items-center gap-1 pt-2">
                                <span>ရက်စွဲ၊ jojo ခုနှစ်၊</span>
                                <span className="w-16 border-b border-black text-center inline-block"></span>
                                <span>လ (</span>
                                <span className="w-10 border-b border-black text-center inline-block"></span>
                                <span>) ရက်</span>
                            </div>

                            {/* ညာဘက်ခြမ်း - ဝန်ထမ်းလက်မှတ် ရိုက်ရန်နေရာ (Flex စနစ်ဖြင့် ညီညာအောင် ညှိထားသည်) */}
                            <div className="w-80 space-y-3">
                                <div className="flex">
                                    <div className="w-32 shrink-0">လက်မှတ်</div>
                                    <div className="px-1">-</div>
                                    <div className="flex-1 border-b border-black"></div>
                                </div>
                                <div className="flex">
                                    <div className="w-32 shrink-0">အမည်</div>
                                    <div className="px-1">-</div>
                                    <div className="flex-1 border-b border-black font-semibold">{data.name || ''}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-32 shrink-0">ရာထူး</div>
                                    <div className="px-1">-</div>
                                    <div className="flex-1 border-b border-black">{data.employment?.position || ''}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-32 shrink-0">ဖုန်းနံပါတ် (ရုံး/လက်ကိုင်ဖုန်း)</div>
                                    <div className="px-1">-</div>
                                    <div className="flex-1 border-b border-black">{data.info?.mobile_phno || ''}</div>
                                </div>
                                <div className="flex">
                                    <div className="w-32 shrink-0">အီးမေးလ်</div>
                                    <div className="px-1">-</div>
                                    <div className="flex-1 border-b border-black">{data.info?.email || ''}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link href={`/employees/${data.id}/format18pdf`} className="fixed bottom-10 text-blue-400 right-20 rounded-full bg-red-100 p-4 text-sm font-bold   hover:text-black">
                <Printer />
            </Link>

        </div>
    );
}