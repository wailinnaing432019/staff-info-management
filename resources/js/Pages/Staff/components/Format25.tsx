import { getMyanmarCurrentDate } from "@/util/getCurrentMonth";
import toMyanmarNumber from "@/util/numberHelper";
import PrintButton from "./PrintButton";
import React, { useRef, useEffect } from "react";

export default function Format25({ data = {} }) {
    // 💡 Table ရဲ့ အပြင်ဘက် Container Div ကို လှမ်းချုပ်ရန် Ref ဆောက်ခြင်း
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            container.classList.add("cursor-grabbing");
            container.classList.remove("cursor-grab");
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            container.classList.remove("cursor-grabbing");
            container.classList.add("cursor-grab");
        };

        const handleMouseUp = () => {
            isDown = false;
            container.classList.remove("cursor-grabbing");
            container.classList.add("cursor-grab");
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5; // ဆွဲတဲ့အရှိန်နှုန်း (Speed multiplier)
            container.scrollLeft = scrollLeft - walk;
        };

        // Event များ ချိတ်ဆက်ခြင်း
        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseleave", handleMouseLeave);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("mousemove", handleMouseMove);

        // Component ဖြုတ်တဲ့အခါ Event များ ပြန်ဖျက်ခြင်း
        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mouseleave", handleMouseLeave);
            container.removeEventListener("mouseup", handleMouseUp);
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            {/* 💡 custom style အနေနဲ့ user-select: none ထည့်ပေးထားလို့ drag ဆွဲတဲ့အခါ စာသားတွေ blue highlight အတင်းလိုက်မဝင်တော့ပါဘူး */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    .drag-scroll-container {
                        cursor: grab;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }
                    .drag-scroll-container:active {
                        cursor: grabbing;
                    }
                    @media print {
                        .drag-scroll-container {
                            cursor: default !important;
                            overflow: visible !important;
                        }
                    }
                `,
                }}
            />

            {/* 💡 Ref ချိတ်ဆက်လိုက်ပြီး class ထဲမှာ drag-scroll-container ထည့်သွင်းထားပါတယ် */}
            <div
                ref={scrollContainerRef}
                className="drag-scroll-container w-full bg-white p-4 overflow-x-auto print:p-0 select-none"
            >
                {/* Landscape Title */}
                <div className="text-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900">
                        ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ)၊ သင်ကြားရေးဌာနများတွင်
                        တာဝန်ထမ်းဆောင်နေသော ဝန်ထမ်း၏ ကိုယ်ရေးအကျဉ်းချုပ်
                    </h2>

                    <p className="text-right text-sm font-semibold text-gray-600 mt-2">
                        {getMyanmarCurrentDate()}
                    </p>
                </div>

                <table className="w-full border-collapse border border-black text-[11px] min-w-[1800px] print:min-w-full">
                    <thead className="bg-gray-100 border text-center font-bold">
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
                                <br />
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
                            <th className="w-[8%]">ကင်းကွာသည့် ရက်စွဲ</th>
                            <th className="w-[4%]">မှတ်ချက်</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center">
                            {[...Array(25)].map((_, index) => (
                                <td
                                    key={index}
                                    className="border border-black p-1 bg-gray-50 font-semibold"
                                >
                                    {toMyanmarNumber(index + 1)}
                                </td>
                            ))}
                        </tr>
                        <tr className="hover:bg-gray-50 text-center">
                            <td className="border border-black p-1">{1}</td>
                            <td className="border border-black p-1 text-left font-semibold">
                                {data.name || "-"}
                            </td>
                            <td className="border border-black p-1 text-left">
                                {data.info?.degree}
                            </td>
                            <td className="border border-black p-1">
                                {data.age || ""} <br />
                                {data.date_of_birth || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.race || ""}၊ {data.religion || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.birth_place || ""}
                            </td>
                            <td className="border border-black p-1 ">
                                {data.nrc_township || ""}
                                {data.nrc_type && `(${data.nrc_type})`}
                                {data.nrc_number ? ` ${data.nrc_number}` : "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.father_name || ""}၊{" "}
                                {data.father_job || ""}
                            </td>
                            <td className="border border-black p-1">
                                {data.marital_status || ""}
                            </td>
                            <td className="border border-black p-1 text-left">
                                {data.employment?.position || "-"}၊{" "}
                                {data.employment?.salary_rate || "-"}၊
                                {data.employment?.department || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.employment?.employee_start_date_detail ||
                                    "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.employment
                                    ?.current_pos_start_date_detail || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.employment
                                    ?.current_dept_start_date_detail || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.employment?.penalty_detail || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.employment?.contract_agreement_detail ||
                                    "မရှိ"}
                            </td>
                            <td className="border border-black p-1">
                                {data.employment?.foreign_detail || "-"}
                            </td>
                            <td className="border border-black p-1 text-left">
                                {data.employment?.training_detail || "-"}
                            </td>
                            <td className="border border-black p-1 text-left">
                                {data.employment?.transfer_detail}
                            </td>
                            <td className="border border-black p-1 text-left">
                                {data.info?.permanent_address}
                            </td>
                            <td className="border border-black p-1 text-left">
                                {data.info?.current_address}
                            </td>
                            <td className="border border-black p-1">
                                {data.info?.not_border || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.info?.current_training || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.info?.is_accompanied || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.info?.separation_date || "-"}
                            </td>
                            <td className="border border-black p-1">
                                {data.info?.remark || "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <PrintButton employeeId={data.id} formatType="format25pdf" />
            </div>
        </>
    );
}
