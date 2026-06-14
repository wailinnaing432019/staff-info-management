import InputError from "@/Components/InputError";
import { useState, useEffect } from "react";

interface Props {
    nrcData: Record<string, string[]>;
    state?: string;
    township?: string;
    type?: string;
    number?: string;
    errors?: Record<string, string>;
    onChange: (key: string, value: string) => void;
    isDisabled: boolean;
}

export default function NRCInputFields({
    nrcData,
    state,
    township,
    type,
    number,
    errors,
    onChange,
    isDisabled,
}: Props) {
    // ပြည်နယ် ပြောင်းသွားရင် အဲဒီပြည်နယ်အောက်မှာရှိတဲ့ မြို့နယ်စာရင်းကို သိမ်းထားရန်
    const [townshipsList, setTownshipsList] = useState<string[]>([]);

    useEffect(() => {
        if (state && nrcData[state]) {
            setTownshipsList(nrcData[state]);
        } else {
            setTownshipsList([]);
        }
    }, [state, nrcData]);

    return (
        <div>
            <div className="flex gap-2 max-w-xl text-xs">
                {/* ၁။ ပြည်နယ်/တိုင်းအမှတ် (State Select) */}
                <div className="flex-1 min-w-[80px]">
                    <select
                        value={state || ""}
                        disabled={isDisabled}
                        onChange={(e) => {
                            onChange("nrc_state", e.target.value);
                            onChange("nrc_township", ""); // ပြည်နယ်ပြောင်းရင် မြို့နယ်ကို reset ချရန်
                        }}
                        className="h-9 text-xs w-full border rounded px-2 bg-white disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="">ပြည်နယ်</option>
                        {Object.keys(nrcData)
                            .sort((a, b) => Number(a) - Number(b))
                            .map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                    </select>
                </div>

                {/* ၂။ မြို့နယ်အတိုကောက် (Township Select) */}
                <div className="flex-[2] min-w-[120px]">
                    <select
                        value={township || ""}
                        disabled={isDisabled || !state}
                        onChange={(e) => onChange("nrc_township", e.target.value)}
                        className="h-9 text-xs w-full border rounded px-2 bg-white disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="">မြို့နယ်</option>
                        {townshipsList.map((ts) => (
                            <option key={ts} value={ts}>
                                {ts}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ၃။ နိုင်ငံသားအမျိုးအစား (Type Select) */}
                <div className="flex-1 min-w-[70px]">
                    <select
                        value={type || "နိုင်"}
                        disabled={isDisabled}
                        onChange={(e) => onChange("nrc_type", e.target.value)}
                        className="h-9 text-xs w-full border rounded px-2 bg-white disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="နိုင်">နိုင်</option>
                        <option value="ပြု">ပြု</option>
                        <option value="ဧည့်">ဧည့်</option>
                    </select>
                </div>

                {/* ၄။ မှတ်ပုံတင်ဂဏန်းအမှတ် (Number Input) */}
                <div className="flex-[2] min-w-[100px]">
                    <input
                        type="text"
                        disabled={isDisabled}
                        value={number || ""}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            onChange("nrc_number", val);
                        }}
                        placeholder="၁၂၃၄၅၆"
                        className="h-9 text-xs w-full border rounded px-3 bg-white disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        maxLength={6}
                    />
                </div>
            </div>

            {/* Errors ပြသမည့်အပိုင်း */}
            <div className="mt-1">
                <InputError message={errors?.nrc_state} />
                <InputError message={errors?.nrc_township} />
                <InputError message={errors?.nrc_type} />
                <InputError message={errors?.nrc_number} />
            </div>
        </div>
    );
}