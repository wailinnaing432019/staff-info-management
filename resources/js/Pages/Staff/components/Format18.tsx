import { getGenderMyanmar } from "@/util/genderHelper";
import toMyanmarNumber from "@/util/numberHelper";
import { Printer } from "lucide-react";

export default function Format18({ data = {} }) {
    return (
        <div className="bg-white p-6 md:p-12 max-w-4xl mx-auto my-6 text-black  select-none print:border-0 print:shadow-none print:p-0 print:m-0 print:max-w-full relative">
            <div className="flex justify-between items-end mb-6 pt-2 relative">
                <div className="w-[100px] hidden md:block print:block"></div>

                <div className="text-center flex-1">
                    <h2 className="text-[14px] -ml-40 font-bold tracking-wide  inline-block pb-1 px-4">
                        ကိုယ်ရေးမှတ်တမ်း
                    </h2>
                </div>

                <div className="absolute top-0 right-5 w-[100px] h-[100px] border-1 border-slate-400 flex flex-col items-center justify-center bg-gray-50 shrink-0 overflow-hidden shadow-sm print:shadow-none">
                    {data.info?.image_path ? (
                        <img
                            src={`/storage/${data.info.image_path}`}
                            alt="Profile"
                            className="w-full h-full object-cover object-top"
                        />
                    ) : (
                        <div className="text-gray-400 font-bold flex flex-col items-center justify-center gap-1 leading-tight text-[10px] p-1 text-center select-none">
                            <span className="text-gray-600 font-bold">
                                ဓာတ်ပုံ
                            </span>
                            <span className="text-gray-400 text-[8px] font-medium">
                                (၂ လက်မ ပတ်လည်)
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-[14px] space-y-2.5 py-2">
                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၁။ အမည် (ကျား/မ)</div>
                    <div className="text-center">-</div>
                    <div className="">{data.name || "-"}</div>
                </div>
                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className=""></div>
                    <div className="text-center">-</div>
                    <div className="">{getGenderMyanmar(data.gender)}</div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၂။ ဝန်ထမ်းအမှတ်</div>
                    <div className="text-center">-</div>
                    <div className="">
                        {data.staff_number || data.id || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၃။ မွေးနေ့ (ရက်၊ လ၊ နှစ်)</div>
                    <div className="text-center">-</div>
                    <div className="text-gray-900">
                        {data.date_of_birth || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၄။ လူမျိုး / ဘာသာ</div>
                    <div className="text-center">-</div>
                    <div className="text-gray-900">
                        {data.race || "-"} ၊ {data.religion || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၅။ အဘအမည်</div>
                    <div className="text-center">-</div>
                    <div className="text-gray-900">
                        {data.father_name || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၆။ အမိအမည်</div>
                    <div className="text-center">-</div>
                    <div className="text-gray-900">
                        {data.mother_name || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၇။ နိုင်ငံသားစိစစ်ရေးအမှတ်</div>
                    <div className="text-center">-</div>
                    <div className="font-medium">
                        {data.nrc_state || ""}/{data.nrc_township || ""}
                        {data.nrc_type && `(${data.nrc_type})`}
                        {data.nrc_number ? ` ${data.nrc_number}` : "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၈။ ဇနီး/ ခင်ပွန်းအမည်</div>
                    <div className="text-center">-</div>
                    <div className="text-gray-900">
                        {data.spouse_name || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၉။ သား/ သမီးအမည်</div>
                    <div className="text-center">-</div>
                    <div className="break-words">
                        {data.info?.childrens || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၁၀။ လိပ်စာ</div>
                    <div className="text-center">-</div>
                    <div className="break-words">
                        {data.info?.permanent_address || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၁၁။ ပညာအရည်အချင်း</div>
                    <div className="text-center">-</div>
                    <div className="break-words">
                        {data.info?.degree || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၁၂။ လက်ရှိရာထူး/ လစာနှုန်း/ ဌာန</div>
                    <div className="text-center">-</div>
                    <div className="break-words">
                        {data.employment?.position || "-"}၊{" "}
                        {data.employment?.salary_rate || "-"}၊{" "}
                        {data.employment?.department || "-"}
                    </div>
                </div>

                <div className="grid grid-cols-[200px_20px_1fr] items-start">
                    <div className="">၁၃။ သွေးအုပ်စု</div>
                    <div className="text-center">-</div>
                    <div className="">{data.physical?.blood_type || "-"}</div>
                </div>
            </div>

            <div className="space-y-6 mt-6">
                <div className="keep-together">
                    <h4 className="text-sm  mb-2">
                        ၁၄။ နိုင်ငံ့ဝန်ထမ်းတာဝန်ထမ်းဆောင်မှုမှတ်တမ်း (စစ်ဘက်/
                        နယ်ဘက်)
                    </h4>
                    <table className="w-full border-1 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5 w-12"
                                >
                                    စဉ်
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    ရာထူး/ ဌာန
                                </th>
                                <th
                                    colSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    တာဝန်ထမ်းဆောင်သည့် ကာလ{" "}
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    နေရာ/ ဒေသ
                                </th>
                            </tr>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th className="border border-black p-1.5">
                                    {" "}
                                    မှ{" "}
                                </th>
                                <th className="border border-black p-1.5">
                                    ထိ
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {data.service_records?.length > 0 ? (
                                data.service_records.map((item, idx) => (
                                    <tr key={idx} className="align-middle">
                                        <td className="border border-black p-1.5">
                                            {toMyanmarNumber(idx + 1)}
                                        </td>
                                        <td className="border border-black p-1.5 text-left px-2">
                                            {item.service_position} ၊{" "}
                                            {item.service_department}
                                        </td>
                                        <td className="border border-black p-1.5">
                                            {item.service_from || "-"}
                                        </td>
                                        <td className="border border-black p-1.5">
                                            {item.service_to || "-"}
                                        </td>
                                        <td className="border border-black p-1.5">
                                            {item.service_location || "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="keep-together">
                    <h4 className="text-sm  mb-2">
                        ၁၅။ ပြည်တွင်းသင်တန်းများ တက်ရောက်မှု
                    </h4>
                    <table className="w-full border-1 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5 w-12"
                                >
                                    စဉ်
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    သင်တန်းအမည်
                                </th>
                                <th
                                    colSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    တက်ရောက်သည့်ကာလ{" "}
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    နေရာ/ ဒေသ
                                </th>
                            </tr>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th className="border border-black p-1.5">
                                    {" "}
                                    မှ{" "}
                                </th>
                                <th className="border border-black p-1.5">
                                    ထိ
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {(() => {
                                const localTraining =
                                    data.trainings?.filter(
                                        (item) =>
                                            item.category === "local_training",
                                    ) || [];
                                return localTraining.length > 0 ? (
                                    localTraining.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="border border-black p-1.5 text-center font-medium">
                                                {toMyanmarNumber(idx + 1)}
                                            </td>
                                            <td className="border border-black p-1.5 text-left px-2">
                                                {item.learn_course || "-"}
                                            </td>
                                            <td className="border border-black p-1.5">
                                                {item.learn_from || "-"}
                                            </td>
                                            <td className="border border-black p-1.5">
                                                {item.learn_to || "-"}
                                            </td>
                                            <td className="border border-black p-1.5">
                                                {item.location || "-"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                    </tr>
                                );
                            })()}
                        </tbody>
                    </table>
                </div>

                <div className="keep-together">
                    <h4 className="text-sm  mb-2">
                        ၁၆။ ပြည်ပသင်တန်းများ တက်ရောက်မှု
                    </h4>
                    <table className="w-full border-1 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5 w-12"
                                >
                                    စဉ်
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    သင်တန်းအမည်
                                </th>
                                <th
                                    colSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    တက်ရောက်သည့်ကာလ{" "}
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    နေရာ/ ဒေသ
                                </th>
                            </tr>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th className="border border-black p-1.5">
                                    {" "}
                                    မှ{" "}
                                </th>
                                <th className="border border-black p-1.5">
                                    ထိ
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {(() => {
                                const foreignTrainings =
                                    data.trainings?.filter(
                                        (item) =>
                                            item.category ===
                                            "foreign_training",
                                    ) || [];
                                return foreignTrainings.length > 0 ? (
                                    foreignTrainings.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="border border-black p-1.5 text-center font-medium">
                                                {toMyanmarNumber(idx + 1)}
                                            </td>
                                            <td className="border border-black p-1.5 text-left px-2">
                                                {item.learn_course || "-"}
                                            </td>
                                            <td className="border border-black p-1.5">
                                                {item.learn_from || "-"}
                                            </td>
                                            <td className="border border-black p-1.5">
                                                {item.learn_to || "-"}
                                            </td>
                                            <td className="border border-black p-1.5">
                                                {item.location || "-"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                        <td className="border border-black p-4 italic">
                                            -
                                        </td>
                                    </tr>
                                );
                            })()}
                        </tbody>
                    </table>
                </div>

                <div className="keep-together">
                    <h4 className="text-sm  mb-2">၁၇။ ပြစ်မှုမှတ်တမ်း</h4>
                    <table className="w-full border-1 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    ပြစ်ဒဏ်
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    ပြစ်ဒဏ်ချမှတ်ခံရသည့် အကြောင်းအရင်း
                                </th>
                                <th
                                    colSpan={2}
                                    className="border border-black p-1.5"
                                >
                                    ပြစ်ဒဏ်ချမှတ်သည့် ကာလ
                                </th>
                            </tr>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th className="border border-black p-1.5">
                                    မှ
                                </th>
                                <th className="border border-black p-1.5">
                                    ထိ
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {data.criminal_records?.length > 0 ? (
                                data.criminal_records.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-1.5">
                                            {item.criminalPenalty}
                                        </td>
                                        <td className="border border-black p-1.5">
                                            {item.reasonPelanty || "-"}
                                        </td>
                                        <td className="border border-black p-1.5">
                                            {item.criminalFrom || "-"}
                                        </td>
                                        <td className="border border-black p-1.5">
                                            {item.criminalTo || "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="keep-together">
                    <h4 className="text-sm  mb-2">
                        ၁၈။ ချီးမြှင့်ခံရသည့် ဘွဲ့ထူး၊ ဂုဏ်ထူးတံဆိပ်များ
                    </h4>
                    <table className="w-full border-1 border-black border-collapse text-xs text-center">
                        <thead>
                            <tr className="bg-gray-100 font-bold border-b-1 border-black">
                                <th className="border border-black p-1.5 w-12">
                                    စဉ်
                                </th>
                                <th className="border border-black p-1.5">
                                    ဘွဲ့ထူး၊ ဂုဏ်ထူးတံဆိပ် အမည်
                                </th>
                                <th className="border border-black p-1.5 w-1/3">
                                    အမိန့်အမှတ်/ ခုနှစ်
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black">
                            {data.awards_received?.length > 0 ? (
                                data.awards_received.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black p-1.5">
                                            {toMyanmarNumber(idx + 1)}
                                        </td>
                                        <td className="border border-black p-1.5 text-left px-3">
                                            {item.award_title || "-"}
                                        </td>
                                        <td className="border border-black p-1.5">
                                            {item.award_year || "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                    <td className="border border-black p-4 italic">
                                        -
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-[13px] leading-relaxed keep-together">
                    <p className="  mb-6">
                        အထက်ပါ ဖြည့်စွက်ချက်များ မှန်ကန်ကြောင်း
                        လက်မှတ်ရေးထိုးပါသည်။
                    </p>

                    <div className="  mt-4">
                        <div className="w-80 mx-auto space-y-3">
                            <div className="flex">
                                <div className="w-44 shrink-0">လက်မှတ်</div>
                                <div className="px-1">၊</div>
                                <div className="flex-1  "></div>
                            </div>
                            <div className="flex">
                                <div className="w-44 shrink-0">အမည်</div>
                                <div className="px-1">၊</div>
                                <div className="flex-1   ">
                                    {data.name || ""}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-44 shrink-0">ရာထူး</div>
                                <div className="px-1">၊</div>
                                <div className="flex-1  ">
                                    {data.employment?.position || ""}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-44 shrink-0">
                                    ဖုန်းနံပါတ် (ရုံး/လက်ကိုင်ဖုန်း)
                                </div>
                                <div className="px-1">၊</div>
                                <div className="flex-1  ">
                                    {data.info?.mobile_phno || ""}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-44 shrink-0">အီးမေးလ်</div>
                                <div className="px-1">၊</div>
                                <div className="flex-1  ">
                                    {data.info?.email || ""}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mt-8 gap-1 pt-2">
                            <span> ရက်စွဲ၊</span>
                            <span className="w-16 border-b border-black text-center inline-block"></span>
                            <span> ခုနှစ်၊</span>{" "}
                            <span className="w-16 border-b border-black text-center inline-block"></span>
                            <span>လ (</span>
                            <span className="w-10 border-b border-black text-center inline-block"></span>
                            <span>) ရက်</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-8 screen-secret">
                <div className="text-base font-bold tracking-widest border border-black px-4 py-0.5">
                    လျှို့ဝှက်
                </div>
            </div>
        </div>
    );
}
