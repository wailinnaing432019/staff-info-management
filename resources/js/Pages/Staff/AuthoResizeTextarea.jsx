import React, { useEffect, useRef } from 'react';

// စာရိုက်ရင် အမြင့် Auto လိုက်တိုးမည့် Textarea Component
export default function AutoResizeTextarea({ value, onChange, className, placeholder }) {
    const textareaRef = useRef(null);

    // စာအဝင်အထွက်ရှိတိုင်း အမြင့်ကို တွက်ချက်ပေးခြင်း
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // အမြင့်ကို အရင် reset လုပ်သည်
            textarea.style.height = `${textarea.scrollHeight}px`; // စာအရှည်အလိုက် အမြင့်အသစ် သတ်မှတ်သည်
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            rows={1}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className={`${className} resize-none overflow-hidden min-h-[34px] block w-full py-1.5 px-2 bg-transparent focus:outline-none border-0 focus:ring-1 focus:ring-blue-500 rounded text-sm`}
            style={{ wordBreak: 'break-word' }}
        />
    );
};