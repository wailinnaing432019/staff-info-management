import { useEffect } from "react";

import Format55 from "../components/Format55";
import { Head } from "@inertiajs/react";

export default function Format1Pdf({ data = {} }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head title={`ပုံစံ-၅၅`} />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @import url('https://cdn.jsdelivr.net/npm/@myanmar-tools/fonts/pyidaungsu.css');
                
                @page {
size: A4;
                    
                    margin: 25mm 20mm 25mm 20mm; 
    
    @top-center {
        content: counter(page, myanmar);  
        font-size: 12px;
        font-family: 'Pyidaungsu', sans-serif;
    }
 
    @top-right {
        content: "ပုံစံ (၁) အဆက်";
        font-size: 12px;
        font-family: 'Pyidaungsu', sans-serif;
    }
         @bottom-center {
                        content: "";  
                        font-size: 12px; 
                    }
 
 
}

 
@page :first {
    @top-right {
        content: ""; 
    }
}
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background-color: white;
                        color: black;
                    }
                    .page-break {
                        page-break-before: always;
                        break-before: page;
                    }
                    .keep-together {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                    h2, h3, h4 {
                        page-break-after: avoid;
                        break-after: avoid;
                    }
                }
                * {
                    font-family: 'Pyidaungsu', sans-serif !important;
                    font-size: 14px !important;
                }
                .dotted-line {
                    border-bottom: 1px dotted #000;
                    padding-left: 6px;
                    padding-right: 6px;
                    display: inline-block;
                    min-width: 150px;
                }
                table th, table td {
                    border: 1px solid black !important;
                    padding: 6px 4px;
                }
            `,
                }}
            />
            <Format55 data={data} />
        </>
    );
}
