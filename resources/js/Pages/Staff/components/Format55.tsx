import toMyanmarNumber from "@/util/numberHelper";
import { Printer } from "lucide-react";
import FamilyTable55 from "../components/FamilyTable55";
import PrintButton from "./PrintButton";
export default function Format55({ data = {} }) {
    const familyList = data.family_members || [];

    const trainingList = data.trainings || [];
    const localForeignTrainings = trainingList.filter(
        (m) => m.category !== "education",
    );
    console.log("trainingList", trainingList);
    console.log("localForeignTrainings", localForeignTrainings);
    const fatherInfo = familyList.find(
        (m) =>
            m.family_lineage === "အဘ (ဖခင်)" &&
            m.relationship_type === "father_sibling",
    );

    const motherInfo = familyList.find(
        (m) =>
            m.family_lineage === "အမိ (မိခင်)" &&
            m.relationship_type === "mother_sibling",
    );

    const spouseInfo = familyList.filter(
        (m) =>
            m.relationship_type === "spouse_family" &&
            (m.family_lineage === "ဇနီး" || m.family_lineage === "ခင်ပွန်း"),
    );

    const siblings = familyList.filter(
        (m) => m.relationship_type === "employee_sibling",
    );
    const childrens = familyList.filter(
        (m) =>
            m.relationship_type === "children" &&
            (m.family_lineage === "သား" || m.family_lineage === "သမီး"),
    );

    const fatherSiblings = familyList.filter(
        (m) =>
            m.relationship_type === "father_sibling" &&
            m.family_lineage !== "အဘ (ဖခင်)",
    );

    // ၆။ အမိ၏ ညီအစ်ကိုမောင်နှမများ (mother_sibling)
    const motherSiblings = familyList.filter(
        (m) =>
            m.relationship_type === "mother_sibling" &&
            m.family_lineage !== "အမိ (မိခင်)",
    );

    const spouseSiblings = familyList.filter(
        (m) =>
            m.relationship_type === "spouse_family" &&
            m.family_lineage !== "ဇနီး" &&
            m.family_lineage !== "ခင်ပွန်း",
    );

    const spouseFather = familyList.filter(
        (m) => m.relationship_type === "spouse_father_family",
    ); // done
    const spouseMother = familyList.filter(
        (m) => m.relationship_type === "spouse_mother_family",
    ); // done

    const pastJobsList = data.past_jobs || [];
    const pastJobsNormal = pastJobsList.filter((m) => m.type === "normal");
    const pastJobsHigh = pastJobsList.filter((m) => m.type === "high");
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                table th, table td {
                    border: 1px solid black !important;
                    padding: 6px 4px !important;
                }
            `,
                }}
            />

            <div className="bg-white p-4 md:p-8 max-w-4xl mx-auto my-4 text-black leading-relaxed select-none print:border-0 print:shadow-none print:p-0 print:m-0 print:max-w-full">
                <div className="text-right ">ပုံစံ (၁)</div>

                <div className="flex flex-col items-center relative mb-6">
                    <h2 className="text-center">ကိုယ်ရေးမှတ်တမ်း</h2>
                    <p className="mt-1 text-center">[ နည်းဥပဒေ ၂၄ (ခ)]</p>
                </div>

                <div className="space-y-2.5">
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁။ အမည်</div>
                        <div>-</div>
                        <div>{data.name || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၂။ ငယ်နာမည်</div>
                        <div>-</div>
                        <div>{data.nickname || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၃။ အခြားအမည်</div>
                        <div>-</div>
                        <div>{data.alternative_name || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၄။ အသက် (မွေးသက္ကရာဇ်)</div>
                        <div>-</div>
                        <div>
                            {data.age ? `${toMyanmarNumber(data.age)}  ` : ""}
                            {data.date_of_birth
                                ? `(${data.date_of_birth})`
                                : "(ရက် - လ - နှစ်)"}
                        </div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၅။ လူမျိုးနှင့်ကိုးကွယ်သည့်ဘာသာ</div>
                        <div>-</div>
                        <div>
                            {data.race || ""}၊ {data.religion || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၆။ အရပ်အမြင့်</div>
                        <div>-</div>
                        <div>{data.physical?.height || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၇။ ဆံပင်အရောင်</div>
                        <div>-</div>
                        <div>{data.physical?.hair_color || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၈။ မျက်စိအရောင်</div>
                        <div>-</div>
                        <div>{data.physical?.eye_color || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၉။ ထင်ရှားသည့်အမှတ်အသား</div>
                        <div>-</div>
                        <div>{data.physical?.distinctive_mark || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၀။ အသားအရောင်</div>
                        <div>-</div>
                        <div>{data.details?.skin_color || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၁။ ကိုယ်အလေးချိန်</div>
                        <div>-</div>
                        <div>{data.physical?.weight || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၂။ မွေးရာဇာတိ</div>
                        <div>-</div>
                        <div>{data.birth_place || ""}</div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၃။ နိုင်ငံသားစိစစ်ရေးကတ်ပြားအမှတ်</div>
                        <div>-</div>
                        <div>
                            {data.nrc_state || ""}/{data.nrc_township || ""}
                            {data.nrc_type && `(${data.nrc_type})`}
                            {data.nrc_number ? ` ${data.nrc_number}` : "-"}
                        </div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၄။ ယခုနေရပ်လိပ်စာအပြည့်အစုံ</div>
                        <div>-</div>
                        <div className="break-words">
                            {data.info?.current_address || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>၁၅။ အမြဲတမ်းနေရပ်လိပ်စာအပြည့်အစုံ</div>
                        <div>-</div>
                        <div className="break-words">
                            {data.info?.permanent_address || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[280px_20px_1fr] items-start">
                        <div>
                            ၁၆။ ယခင်နေထိုင်ခဲ့ဖူးသောဒေသနှင့်
                            <br />
                            နေရပ်လိပ်စာများအပြည့်အစုံ
                            <br />
                            <span>
                                (တပ်မတော်သားဖြစ်ကတပ်လိပ်စာဖော်ပြရန်မလိုပါ)
                            </span>
                        </div>
                        <div>-</div>
                        <div className="break-words">
                            {data.details?.previous_address || ""}
                        </div>
                    </div>

                    <div className="col-span-3">
                        ၁၇။ တပ်မတော်သို့ဝင်ခဲ့ဖူးလျှင်/တပ်မတော်သားဖြစ်လျှင် -
                    </div>
                    <div className="pl-6">
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(က) ကိုယ်ပိုင်အမှတ်</div>
                            <div>-</div>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(ခ) တပ်သို့ဝင်သည့်နေ့</div>
                            <div>-</div>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(ဂ) ဗိုလ်လောင်းသင်တန်းအမှတ်စဉ်</div>
                            <div>-</div>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(ဃ) ပြန်တမ်းဝင်ဖြစ်သည့်နေ့</div>
                            <div>-</div>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(င) တပ်ထွက်သည့်နေ့</div>
                            <div>-</div>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(စ) ထွက်သည့်အကြောင်း</div>
                            <div>-</div>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(ဆ) အမှုထမ်းဆောင်ခဲ့သောတပ်များ</div>
                            <div>-</div>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(ဇ) တပ်တွင်းရာဇဝင်အကျဉ်း/ပြစ်မှု</div>
                            <div>-</div>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-[254px_20px_1fr] items-start">
                            <div>(ဈ) အငြိမ်းစားလစာ</div>
                            <div>-</div>
                            <div></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mt-4">
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၁၈။ ပညာအရည်အချင်း</div>
                        <div>-</div>
                        <div>{data.info?.degree || "-"}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>
                            ၁၉။ အဘအမည်၊ လူမျိုး၊ ကိုးကွယ်သည့်ဘာသာ၊ ဇာတိနှင့်
                            အလုပ်အကိုင်
                        </div>
                        <div>-</div>
                        <div>
                            {[
                                fatherInfo?.relation_name,
                                fatherInfo?.race_and_religion,
                                fatherInfo?.native_town,
                                fatherInfo?.occupation,
                            ]
                                .filter(Boolean)
                                .join("၊ ")}
                        </div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၀။ ၎င်း၏နေရပ်လိပ်စာအပြည့်အစုံ</div>
                        <div>-</div>
                        <div className="break-words">
                            {data.details?.father_address_detail || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>
                            ၂၁။ အမိအမည်၊ လူမျိုး၊ ကိုးကွယ်သည့်ဘာသာ၊ ဇာတိနှင့်
                            အလုပ်အကိုင်
                        </div>
                        <div>-</div>
                        <div>
                            <div>
                                {[
                                    motherInfo?.relation_name,
                                    motherInfo?.race_and_religion,
                                    motherInfo?.native_town,
                                    motherInfo?.occupation,
                                ]
                                    .filter(Boolean)
                                    .join("၊ ")}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၂။ ၎င်း၏နေရပ်လိပ်စာအပြည့်အစုံ</div>
                        <div>-</div>
                        <div className="break-words">
                            {data.details?.mother_address_detail || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>
                            ၂၃။ ကာယကံရှင်မွေးဖွားချိန်၌ မိဘနှစ်ပါးသည်
                            နိုင်ငံသားဟုတ်/မဟုတ်
                        </div>
                        <div>-</div>
                        <div>
                            {data.details?.is_parent_season_at_birth || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၄။ လက်ရှိအလုပ်အကိုင်နှင့်အဆင့်</div>
                        <div>-</div>
                        <div>{data.employment?.position || ""}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၅။ လက်ရှိရာထူးရသည့်နေ့</div>
                        <div>-</div>
                        <div>
                            {data.employment?.current_pos_start_date_detail ||
                                ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၆။ လက်ရှိအလုပ်အကိုင်ရလာပုံ</div>
                        <div>-</div>
                        <div>
                            {data.details?.reason_for_current_occupation || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၇။ ပြိုင်အရွေးခံ(သို့)တိုက်ရိုက်ခန့်</div>
                        <div>-</div>
                        <div>{data.details?.selection_type || ""}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၈။ လစာဝင်ငွေ</div>
                        <div>-</div>
                        <div>{data.employment?.salary_rate || ""}</div>
                    </div>
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၂၉။ ဌာန၊ နေရာ</div>
                        <div>-</div>
                        <div>{data.employment?.department || ""}</div>
                    </div>

                    <div className="pt-4 keep-together">
                        <p className=" mb-2">
                            ၃၀။ ချီးမြှင့်ခံရသည့် ဘွဲ့ထူး၊ ဂုဏ်ထူး တံဆိပ်
                            လက်မှတ်များ
                        </p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 ">
                                    <th className="w-12">စဉ်</th>
                                    <th>ချီးမြှင့်ခံရသည့် ကာလ</th>
                                    <th>ချီးမြှင့်သည့်ဘွဲ့/တံဆိပ်အမျိုးအစား</th>
                                    <th>
                                        ဆုတံဆိပ်အမှတ် အမိန့်စာနှင့်
                                        ရရှိသည့်ရက်စွဲ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.awards_received?.length > 0 ? (
                                    data.awards_received.map((award, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNumber(idx + 1)}</td>
                                            <td>{award.award_period || "-"}</td>
                                            <td>{award.award_title || "-"}</td>
                                            <td>{award.award_year || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="pt-4 keep-together">
                        <p className=" mb-2">၃၁။ တက်ရောက်ခဲ့သည့် သင်တန်းများ</p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 ">
                                    <th className="w-12" rowSpan={2}>
                                        စဉ်
                                    </th>
                                    <th colSpan={2}>ကာလ</th>
                                    <th rowSpan={2}>သင်တန်းအကြောင်းအရာ</th>
                                    <th rowSpan={2}>တည်နေရာ</th>
                                    <th rowSpan={2}>အဆင့်</th>
                                </tr>
                                <tr className="bg-gray-50 ">
                                    <th>နေ့ရက်မှ</th>
                                    <th>နေ့ရက်ထိ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {localForeignTrainings?.length > 0 ? (
                                    localForeignTrainings.map((t, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNumber(idx + 1)}</td>
                                            <td>{t.learn_from || "-"}</td>
                                            <td>{t.learn_to || "-"}</td>
                                            <td>{t.learn_course || "-"}</td>
                                            <td>{t.location || "-"}</td>
                                            <td>{t.rank || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td></td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-[320px_20px_1fr] items-start">
                        <div>၃၂။ အလုပ်အကိုင်အတွက်ထောက်ခံသူများ</div>
                        <div>-</div>
                        <div>{data.details?.employment_reference || ""}</div>
                    </div>

                    <div className="keep-together">
                        <p className=" mb-2">
                            ၃၃။ ယခင်လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင်
                        </p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 ">
                                    <th className="w-12">စဉ်</th>
                                    <th>အဆင့်</th>
                                    <th>တပ်/ဌာန</th>
                                    <th>နေရာ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastJobsNormal.length > 0 ? (
                                    pastJobsNormal.map((job, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNumber(idx + 1)}</td>
                                            <td>{job.prev_rank || "-"}</td>
                                            <td>{job.prev_dept || "-"}</td>
                                            <td>{job.prev_location || "-"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        <tr>
                                            <td></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <FamilyTable55
                        familiesData={siblings}
                        title="၃၄။ ညီအစ်ကိုမောင်နှမများ"
                    />
                    <FamilyTable55
                        familiesData={fatherSiblings}
                        title="၃၅။ အဘ၏ညီအစ်ကိုမောင်နှမများ"
                    />
                    <FamilyTable55
                        familiesData={motherSiblings}
                        title="၃၆။ အမိ၏ညီအစ်ကိုမောင်နှမများ"
                    />
                </div>

                <div className="space-y-4 mt-4">
                    <FamilyTable55
                        familiesData={spouseInfo}
                        title="၃၇။ ခင်ပွန်း/ ဇနီးသည်"
                    />
                    <FamilyTable55
                        familiesData={childrens}
                        title="၃၈။ သားသမီးများ"
                    />
                    <FamilyTable55
                        familiesData={spouseSiblings}
                        title="၃၉။ ခင်ပွန်း/ဇနီးသည်၏ ညီအစ်ကိုမောင်နှမများ"
                    />
                    <FamilyTable55
                        familiesData={spouseFather}
                        title="၄၀။ ခင်ပွန်း/ဇနီးသည်၏အဘနှင့်ညီအစ်ကိုမောင်နှမများ"
                    />
                </div>

                <div className="space-y-4 mt-4">
                    <FamilyTable55
                        familiesData={spouseMother}
                        title="၄၁။ ခင်ပွန်း/ဇနီးသည်၏အမိနှင့်ညီအစ်ကိုမောင်နှမများ"
                    />

                    <div className="grid grid-cols-[340px_20px_1fr] items-start">
                        <div>
                            ၄၄။ မိမိနှင့် မိမိ၏ဇနီးခင်ပွန်းတို့၏မိဘ၊
                            ညီအစ်ကိုမောင်နှမများ၊ သားသမီးများသည်
                            နိုင်ငံရေးပါတီများတွင် ဝင်ရောက်ဆောင်ရွက်မှု ရှိ/
                            မရှိ (ရှိကအသေးစိတ်ဖော်ပြရန်)
                        </div>
                        <div>-</div>
                        <div>{data.details?.is_party_member || ""}</div>
                    </div>
                    <div className="page-break font-semibold text-center  py-2">
                        ငယ်စဉ်မှ ယခုအချိန်ထိကိုယ်ရေးရာဇဝင်
                    </div>

                    <div className="space-y-3">
                        <div className="grid grid-cols-[340px_20px_1fr] items-start">
                            <div>
                                ၁။ နေခဲ့ဖူးသောကျောင်းများ <br /> (ခုနှစ်၊
                                သက္ကရာဇ်ဖော်ပြရန်)
                            </div>
                            <div>-</div>
                            <div>{data.details?.previous_school || ""}</div>
                        </div>

                        <div className="grid grid-cols-[340px_20px_1fr] items-start">
                            <div>
                                ၂။ နောက်ဆုံးအောင်မြင်ခဲ့သည့်ကျောင်း/ အတန်း၊
                                ခုံအမှတ်၊ ဘာသာရပ်
                                <br /> အတိအကျဖော်ပြရန်
                            </div>
                            <div>-</div>
                            <div>{data.details?.last_school || ""}</div>
                        </div>

                        <div className="grid grid-cols-[340px_20px_1fr] items-start">
                            <div>
                                ၃။ ကျောင်းသားဘဝတွင် နိုင်ငံရေး/ <br />
                                မြို့ရေး/ရွာရေးဆောင်ရွက်မှု များနှင့် <br />{" "}
                                အဆင့်အတန်း၊တာဝန်
                            </div>
                            <div>-</div>
                            <div>{data.details?.student_level || ""}</div>
                        </div>

                        <div className="grid grid-cols-[340px_20px_1fr] items-start">
                            <div>
                                ၄။ ဝါသနာပါပြီးလေ့လာလိုက်စားခဲ့ <br />
                                သောကျန်းမာရေးကစားခုန်စားမှုများ၊
                                <br />
                                အနုပညာဆိုင်ရာအတီးအမှုတ်များ၊ <br />{" "}
                                ပညာရေးစက်မှုလက်မှု
                            </div>
                            <div>-</div>
                            <div>{data.details?.hobby || ""}</div>
                        </div>

                        <div className="keep-together pt-2">
                            <p className=" mb-2">
                                ၅။
                                လုပ်ကိုင်ခဲ့သောအလုပ်အကိုင်များနှင့်ဌာန/မြို့နယ်-
                            </p>
                            <table className="w-full border-collapse text-center">
                                <thead>
                                    <tr className="bg-gray-50 ">
                                        <th>ရာထူး</th>
                                        <th>ဌာန</th>
                                        <th>နေရာ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pastJobsHigh.length > 0 ? (
                                        pastJobsHigh.map((j, idx) => (
                                            <tr key={idx}>
                                                <td>{j.prev_position}</td>
                                                <td>{j.prev_dept}</td>
                                                <td>{j.prev_location}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>
                            ၆။
                            တောခိုခဲ့ဖူးလျှင်(သို့)သောင်းကျန်းသူများကြီးစိုးသောနယ်မြေတွင်
                            နေခဲ့ဖူးလျှင် လုပ်ကိုင်ဆောင်ရွက်ချက်များကိုဖော်ပြပါ
                        </div>
                        <div>-</div>
                        <div className="break-words">
                            {data.details?.referee_status || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>
                            ၇။ အလုပ်အကိုင်ပြောင်းရွှေ့ခဲ့သော
                            အကြောင်းအကျိုးနှင့်လစာ
                        </div>
                        <div>-</div>
                        <div className="break-words">
                            {data.details?.reason_for_transfer || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>
                            ၈။
                            အမှုထမ်းနေစဉ်(သို့)ကိုယ်ပိုင်အလုပ်အကိုင်ဆောင်ရွက်နေစဉ်
                            နိုင်ငံရေး၊ မြို့/ရွာရေးဆောင်ရွက်မှုများ
                            ၊ဆောင်ရွက်နေစဉ် အဆင့်အတန်းနှင့်တာဝန်
                        </div>
                        <div>-</div>
                        <div className="break-words">
                            {data.details?.service_rank || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>
                            ၉။ စစ်ဘက်/နယ်ဘက်/ရဲဘက်နှင့်နိုင်ငံရေးဘက်တွင်
                            ခင်မင်ရင်းနှီးသောမိတ်ဆွေများ ရှိ/မရှိ
                        </div>
                        <div>-</div>
                        <div>{data.details?.close_friend || ""}</div>
                    </div>

                    <div className="keep-together pt-2">
                        <p className=" mb-2">
                            ၁၀။ နိုင်ငံခြားသို့ သွားရောက်ခဲ့ဖူးလျှင်
                        </p>
                        <table className="w-full border-collapse text-center">
                            <thead>
                                <tr className="bg-gray-50 ">
                                    <th className="w-12">စဉ်</th>
                                    <th>သွားရောက်ခဲ့သည့်နိုင်ငံ</th>
                                    <th>သွားရောက်သည့်အကြောင်း</th>
                                    <th>
                                        တွေ့ဆုံခဲ့သည့်ကုမ္ပဏီ/လူပုဂ္ဂိုလ်ဌာန
                                    </th>
                                    <th>သွား/ပြန်သည့်နေ့ရက်</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.abroad_visits?.length > 0 ? (
                                    data.abroad_visits?.map((t, idx) => (
                                        <tr key={idx}>
                                            <td>{toMyanmarNumber(idx + 1)}</td>
                                            <td>{t.country_visited || ""}</td>
                                            <td>{t.visit_purpose || ""}</td>
                                            <td>{t.person_met || ""}</td>
                                            <td>
                                                {t.abroad_from || ""} -{" "}
                                                {t.abroad_to || ""}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td></td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-[350px_20px_1fr] items-start pt-2">
                        <div>
                            ၁၁။ မိမိနှင့်ခင်မင်ရင်းနှီးသောနိုင်ငံခြားသား
                            ရှိ/မရှိ၊ ရှိကမည်သည့်အလုပ်အကိုင်၊ လူမျိုး၊
                            တိုင်းပြည်၊ မည်ကဲ့သို့ရင်းနှီးသည်
                        </div>
                        <div>-</div>
                        <div className="break-words">
                            {data.details?.close_foreign_friend || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>
                            ၁၂။ မိမိအားထောက်ခံသည့်ပုဂ္ဂိုလ်
                            (စစ်ဘက်/နယ်ဘက်အရာရှိ၊
                            မြို့နယ်/ကျေးရွာ/ရပ်ကွက်အုပ်ချုပ်ရေးမှူး)
                        </div>
                        <div>-</div>
                        <div className="break-words">
                            {data.details?.supporter || ""}
                        </div>
                    </div>
                    <div className="grid grid-cols-[350px_20px_1fr] items-start">
                        <div>၁၃။ ရာဇဝတ်ပြစ်မှုခံရခြင်းရှိ/မရှိ</div>
                        <div>-</div>
                        <div>{data.details?.crime_victim_status || ""}</div>
                    </div>

                    <div className="pt-8 keep-together">
                        <p className="text-justify indent-8 font-medium">
                            အထက်ပါဇယားကွက်များတွင်
                            ဖြည့်စွက်ရေးသွင်းထားသောအကြောင်းအရာများအား
                            မှန်ကန်ကြောင်း တာဝန်ခံလက်မှတ်ရေးထိုးပါသည်။
                        </p>

                        <div className="flex justify-center mt-8">
                            <div className="space-y-2 text-left min-w-[340px]">
                                <div className="grid grid-cols-[140px_20px_1fr] items-start">
                                    <div>လက်မှတ်</div>
                                    <div>၊</div>
                                    <div> </div>
                                </div>

                                <div className="grid grid-cols-[140px_20px_1fr] items-start">
                                    <div>
                                        ကိုယ်ပိုင်အမှတ် (သို့မဟုတ်) <br />
                                        နိုင်ငံသားစိစစ်ရေးကတ်ပြားအမှတ်
                                    </div>
                                    <div>၊</div>
                                    <div>
                                        {data.nrc_state || ""}/
                                        {data.nrc_township || ""}
                                        {data.nrc_type && `(${data.nrc_type})`}
                                        {data.nrc_number
                                            ? ` ${data.nrc_number}`
                                            : "-"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-[140px_20px_1fr] items-start">
                                    <div>အဆင့်၊ ရာထူး</div>
                                    <div>၊</div>
                                    <div>
                                        <span className="">
                                            {data.employment?.position || ""}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-[140px_20px_1fr] items-start">
                                    <div>အမည်</div>
                                    <div>၊</div>
                                    <div>
                                        <span className="">
                                            {data.name || ""}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-[140px_20px_1fr] items-start">
                                    <div>တပ်/ဌာန</div>
                                    <div>၊</div>
                                    <div>
                                        <span className="">
                                            {data.employment?.department || ""}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-[140px_20px_1fr] items-start pt-2">
                                    <div>ရက်စွဲ</div>
                                    <div>၊</div>
                                    <div>
                                        ............ ခုနှစ်၊
                                        ......................... လ (
                                        ............ )ရက်
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PrintButton
                        employeeId={data.id}
                        formatType="format55pdf"
                    />
                </div>
            </div>
        </>
    );
}
