import { getGenderMyanmar } from "@/util/genderHelper";
import toMyanmarNumber from "@/util/numberHelper";
import { useEffect } from "react";
import Format18 from "../components/Format18";
import { Head } from "@inertiajs/react";

export default function Format18Pdf({ data = {} }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 500);

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Head title={`ပုံစံ-၁၈`} />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @page {
                    size: A4; 
                    margin: 25mm 20mm 25mm 20mm; 
                
                    @top-center {
                        content: "လျှို့ဝှက်";
                        font-size: 12px; 
                    } 
                    @bottom-center {
                        content: "လျှို့ဝှက်";  
                        font-size: 12px; 
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
                    
                    .keep-together, table, tr {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                    h4 {
                        page-break-after: avoid;
                        break-after: avoid;
                    }
                }
            `,
                }}
            />
            <Format18 data={data} />
        </>
    );
}
