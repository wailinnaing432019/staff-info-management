import { usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

export default function Message() {
    const { props } = usePage();
    const flash = props.flash;
    const errors = props.errors;

    const errorMessage = flash?.error || errors?.error;
    const successMessage = flash?.success;

    const lastSuccessRef = useRef(null);
    const lastErrorRef = useRef(null);

    useEffect(() => {
        if (successMessage && successMessage !== lastSuccessRef.current) {
            Swal.fire({
                icon: "success",
                title: "အောင်မြင်ပါသည်",
                text: successMessage,
                position: "center",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            });

            lastSuccessRef.current = successMessage;
        }

        if (errorMessage && errorMessage !== lastErrorRef.current) {
            Swal.fire({
                icon: "error",
                title: "လုပ်ဆောင်ချက် မအောင်မြင်ပါ။",
                text: errorMessage,
                position: "center",
                confirmButtonText: "အိုကေ",
                confirmButtonColor: "#ef4444",
            });
            lastErrorRef.current = errorMessage;
        }

        if (!successMessage) lastSuccessRef.current = null;
        if (!errorMessage) lastErrorRef.current = null;
    }, [props]);

    return null;
}
