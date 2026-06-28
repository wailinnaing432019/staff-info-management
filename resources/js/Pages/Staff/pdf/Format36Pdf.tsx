import { useEffect } from "react";
import ActionTable from "../components/ActionTable";
import FamilyTable from "../components/FamilyTable";
import toMyanmarNumber from "@/util/numberHelper";
import Format36 from "../components/Format36";
import { Head } from "@inertiajs/react";

export default function Format36Pdf({ data = {} }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 500);

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Head title={`ပုံစံ-၃၆`} />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @page {
                    size: A4;
                    
                    margin: 25mm 20mm 25mm 20mm; 
                    
                    @top-center {
                        content: "လျှို့ဝှက်";  
                        font-size: 13px; 
                    }
                    /* စာမျက်နှာတိုင်း၏ အောက်ဆုံးအလယ်ဗဟိုတွင် "လျှို့ဝှက်" အလိုအလျောက်ထည့်ရန် */
                    @bottom-center {
                        content: "လျှို့ဝှက်";
                          
                        font-size: 13px; 
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
            <Format36 data={data} />
        </>
    );
}
