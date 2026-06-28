import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
    CircleCheckIcon,
    InfoIcon,
    TriangleAlertIcon,
    OctagonXIcon,
    Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "var(--radius)",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    /* 🌟 ဤနေရာတွင် Tailwind data selectors များ သုံးပြီး variant အလိုက် background အရောင်များကို အတင်းပြောင်းခိုင်းလိုက်ပါ */
                    toast: `
            cn-toast group 
            data-[type=error]:!bg-destructive data-[type=error]:!text-destructive-foreground data-[type=error]:!border-destructive
            data-[type=success]:!bg-success data-[type=success]:!text-success-foreground data-[type=success]:!border-success
            data-[type=warning]:!bg-amber-500 data-[type=warning]:!text-white data-[type=warning]:!border-amber-500
            data-[type=info]:!bg-blue-500 data-[type=info]:!text-white data-[type=info]:!border-blue-500
          `,
                    /* Icon အရောင်များကိုပါ စာသားအရောင်အတိုင်း လိုက်ပြောင်းစေရန် */
                    icon: "group-[[data-type=error]]:text-destructive-foreground group-[[data-type=success]]:text-success-foreground group-[[data-type=warning]]:text-white group-[[data-type=info]]:text-white",
                    description:
                        "group-[[data-type=error]]:text-destructive-foreground/90 group-[[data-type=success]]:text-success-foreground/90",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
