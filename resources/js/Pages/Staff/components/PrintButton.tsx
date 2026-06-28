import { Printer } from "lucide-react";

export default function PrintButton({
    employeeId,
    formatType,
    className = "",
}) {
    return (
        <a
            target="_blank"
            href={`/employees/${employeeId}/${formatType}`}
            className={`fixed bottom-10 right-20 text-blue-400 print:hidden rounded-full bg-red-100 p-4 text-sm font-bold shadow-md transition-all hover:text-black hover:bg-red-200 ${className}`}
        >
            <Printer />
        </a>
    );
}
