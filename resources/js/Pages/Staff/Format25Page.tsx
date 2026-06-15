import React, { useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Printer } from 'lucide-react';
import toMyanmarNumber from '@/util/numberHelper';

export default function Format25Page({ employees = [] }) {
    // 💡 Grab Scroll လုပ်ရန် Div အား လှမ်းဖမ်းမည့် Ref တစ်ခု တည်ဆောက်ခြင်း
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const slider = scrollContainerRef.current;
        if (!slider) return;

        let isDown = false;
        let startX;
        let startY;
        let scrollLeft;
        let scrollTop;

        const handleMouseDown = (e) => {
            isDown = true;
            slider.classList.add('active-grab');
            // မောက်စ်စထောက်သည့် နေရာကို မှတ်သားခြင်း
            startX = e.pageX - slider.offsetLeft;
            startY = e.pageY - slider.offsetTop;
            scrollLeft = slider.scrollLeft;
            scrollTop = slider.scrollTop;
        };

        const handleMouseLeave = () => {
            isDown = false;
            slider.classList.remove('active-grab');
        };

        const handleMouseUp = () => {
            isDown = false;
            slider.classList.remove('active-grab');
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            // မောက်စ်ရွေ့သွားသည့် အကွာအဝေးကို တွက်ချက်ခြင်း
            const x = e.pageX - slider.offsetLeft;
            const y = e.pageY - slider.offsetTop;
            const walkX = (x - startX) * 1.5; // အမြန်နှုန်း 1.5 ဆဖြင့် လျှောတိုက်ခြင်း
            const walkY = (y - startY) * 1.5;

            slider.scrollLeft = scrollLeft - walkX;
            slider.scrollTop = scrollTop - walkY;
        };

        // Event listeners များ ချိတ်ဆက်ခြင်း
        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);

        // Component ဖျက်သည့်အခါ clean up ပြန်လုပ်ခြင်း
        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <AuthenticatedLayout

        >
            <Head title="ဝန်ထမ်းကိုယ်ရေးအကျဉ်းချုပ်" />
            <button
                onClick={() => window.print()}
                className="fixed bottom-10 hover:text-blue-900 print:hidden right-20 rounded-full hover:bg-blue-300 p-4 text-sm font-bold    text-black  bg-blue-500"
            >
                <Printer />
            </button>
            {/* 💡 Print Layout အတွက် CSS Style settings */}
            <style dangerouslySetInnerHTML={{
                __html: `
                /* Web App ပေါ်တွင် မောက်စ် ဖိဆွဲနိုင်ရန် cursor ပုံစံ ပြောင်းလဲခြင်း */
                .grab-container {
                    cursor: grab;
                    user-select: none;
                }
                .active-grab {
                    cursor: grabbing !important;
                }
                @media print {
                    nav, sidebar, header, .print\\:hidden, [role="navigation"] {
                        display: none !important;
                    }
                    body, .w-full, main, div {
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        overflow: visible !important;
                        height: auto !important;
                    }
                    @page {
                        size: A4 landscape;
                        margin: 10mm; 
                    }
                    table {
                        page-break-inside: auto;
                        width: 100% !important;
                        min-w-full !important;
                    }
                    tr {
                        page-break-inside: avoid !important;
                        page-break-after: auto;
                    }
                }
            `}} />

            <div className="w-full bg-slate-100 p-4 print:p-0 print:bg-white transition-all">
                <div className="mx-auto w-full bg-white rounded-xl shadow-sm p-4 print:shadow-none print:p-0">

                    {/* Title */}
                    <div className="text-center mb-5 print:mb-6">
                        <h2 className="text-xl font-bold text-gray-900">ကွန်ပျူတာတက္ကသိုလ်(မိတ္ထီလာ)</h2>
                        <h3 className="text-lg font-bold text-gray-800 mt-1">သင်ကြားရေးဌာနများတွင် တာဝန်ထမ်းဆောင်နေသော ဝန်ထမ်းများ၏ ကိုယ်ရေးအကျဉ်းချုပ်</h3>
                        <p className="text-right text-sm font-semibold text-gray-600 mt-2 print:mt-1">ဇွန်လ-၂၀၂၆</p>
                    </div>

                    {/* 💡 Ref ချိတ်ဆက်ထားပြီး grab-container class ထည့်သွင်းထားသော Scroll Box */}
                    <div
                        ref={scrollContainerRef}
                        className="w-full h-[calc(100vh-240px)] overflow-auto border border-slate-200 rounded-lg shadow-inner bg-slate-50 custom-scrollbar grab-container print:h-auto print:overflow-visible print:border-none print:shadow-none"
                    >
                        <table className="w-full border-separate border-spacing-0 text-[11px] min-w-[2500px] print:min-w-full print:border-collapse">
                            <thead className="bg-slate-100 text-center font-bold sticky top-0 z-20 print:table-header-group print:relative print:top-auto">
                                <tr>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 w-12 sticky top-0 border-t border-l">စဉ်</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[130px] sticky top-0 border-t">အမည်</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[160px] sticky top-0 border-t">အရည်အချင်း အပြည့်အစုံ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[110px] sticky top-0 border-t">မွေးသက္ကရာဇ်<br />(ရက်၊လ၊နှစ်)</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[110px] sticky top-0 border-t">လူမျိုး/ဘာသာ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[130px] sticky top-0 border-t">မွေးဖွားရာဇာတိ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[150px] sticky top-0 border-t">မှတ်ပုံတင်အမှတ်</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[160px] sticky top-0 border-t">အဖအမည် အလုပ်အကိုင်</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[100px] sticky top-0 border-t">အိမ်ထောင်ရှိ/ မရှိ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[220px] sticky top-0 border-t">လက်ရှိရာထူး၊ လစာနှုန်း၊ ဌာန</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[110px] sticky top-0 border-t">အလုပ်စတင် ဝင်သည့်နေ့</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[110px] sticky top-0 border-t">လက်ရှိရာထူး<br />ရသည့်နေ့(ရက်၊လ၊နှစ်)</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[110px] sticky top-0 border-t">လက်ရှိဌာနသို့<br />ရောက်သည့်နေ့</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[110px] sticky top-0 border-t">ပြစ်ဒဏ်ခံရဖူးခြင်း<br />ရှိ/မရှိ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[220px] sticky top-0 border-t">စာချုပ် ချုပ်ဆိုထားခြင်းရှိမရှိ ၊ ရှိပါက စာချုပ်နှစ်၊လျော်ကြေးငွေ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[130px] sticky top-0 border-t">နိုင်ငံခြားသို့ ရောက်ဖူးခြင်း ရှိ၊မရှိ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[160px] sticky top-0 border-t">နဝတသင်တန်း(ထက်၊အောက်) ပြီး၊မပြီး</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[220px] sticky top-0 border-t">ပြောင်းရွှေ့ တာဝန်ထမ်းဆောင်ခဲ့ဖူးသော ကျောင်း၊ ဌာန (အဆင့်ဆင့် မှ-ထိ)</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[190px] sticky top-0 border-t">အမြဲတမ်းနေရပ်လိပ်စာ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[190px] sticky top-0 border-t">လက်ရှိနေရပ်လိပ်စာ</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[90px] sticky top-0 border-t">နယ်ခံ/နယ်ဝေး</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[160px] sticky top-0 border-t">သင်တန်းတက်ရောက်နေပါက ဖော်ပြရန်(ပြည်တွင်း၊ပြည်ပ)</th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[160px] sticky top-0 border-t">အခြားတက္ကသိုလ် သို့ တွဲဖက်နေပါက ဖော်ပြရန် </th>
                                    <th className="border-b border-r border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[100px] sticky top-0 border-t">ကင်းကွာ/တွဲဖက်<br />ဖော်ပြရန်</th>
                                    <th className="border-b border-black p-2 bg-slate-100 font-bold text-gray-900 min-w-[130px] sticky top-0 border-t">မှတ်ချက်</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-black">
                                {employees.length === 0 ? (
                                    <tr>
                                        <td colSpan="25" className="border border-black p-6 text-center text-gray-500 italic bg-gray-50">
                                            ပြသရန် ဝန်ထမ်းစာရင်း မရှိသေးပါဗျာ။
                                        </td>
                                    </tr>
                                ) : (
                                    employees.map((emp, idx) => (
                                        <tr key={emp.id} className="hover:bg-indigo-50/50 odd:bg-white even:bg-slate-50/60 text-center transition-colors duration-150 print:bg-white">
                                            <td className="border-b border-r border-black p-1.5  bg-slate-50/50 print:bg-white border-l">{toMyanmarNumber(idx + 1)}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left font-bold text-slate-900">{emp.name || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.info?.degree || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 whitespace-nowrap">{emp.date_of_birth || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5">{emp.race || ''} / {emp.religion || ''}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.birth_place || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5  whitespace-nowrap">{emp.nrc_township || ''}
                                                {emp.nrc_type && `(${emp.nrc_type})`}
                                                {emp.nrc_number ? ` ${emp.nrc_number}` : '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.father_name || '-'} {emp.father_job ? `(${emp.father_job})` : ''}</td>
                                            <td className="border-b border-r border-black p-1.5">{emp.marital_status || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">
                                                <span className="font-semibold text-slate-900">{emp.employment?.position || '-'}</span>
                                                {emp.employment?.salary_scale && <span> ({emp.employment.salary_scale})</span>}
                                                <br />
                                                <span className="text-xs text-indigo-600 font-medium">{emp.employment?.department || '-'}</span>
                                            </td>
                                            <td className="border-b border-r border-black p-1.5 whitespace-nowrap">{emp.employment?.employee_start_date_detail || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 whitespace-nowrap">{emp.employment?.current_pos_start_date_detail || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 whitespace-nowrap">{emp.employment?.current_dept_start_date_detail || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.employment?.penalty_detail || 'မရှိ'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.employment?.contract_agreement_detail || 'မရှိ'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.employment?.foreign_detail || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.employment?.training_detail || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.employment?.transfer_detail || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.info?.permanent_address || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.info?.current_address || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5">{emp.info?.not_border || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.info?.current_training || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 text-left">{emp.info?.is_accompanied || '-'}</td>
                                            <td className="border-b border-r border-black p-1.5 whitespace-nowrap">{emp.info?.separation_date || '-'}</td>
                                            <td className="border-b border-black p-1.5 text-left">{emp.info?.remark || '-'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}