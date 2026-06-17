export const getMyanmarCurrentDate = () => {
    const monthsInMyanmar = [
        "ဇန်နဝါရီလ",
        "ဖေဖော်ဝါရီလ",
        "မတ်လ",
        "ဧပြီလ",
        "မေလ",
        "ဇွန်လ",
        "ဇူလိုင်လ",
        "သြဂုတ်လ",
        "စက်တင်ဘာလ",
        "အောက်တိုဘာလ",
        "နိုဝင်ဘာလ",
        "ဒီဇင်ဘာလ",
    ];

    const myanmarNumbers = {
        "0": "၀",
        "1": "၁",
        "2": "၂",
        "3": "၃",
        "4": "၄",
        "5": "၅",
        "6": "၆",
        "7": "၇",
        "8": "၈",
        "9": "၉",
    };

    const currentDate = new Date();
    const currentMonthStr = monthsInMyanmar[currentDate.getMonth()];
    const currentYearStr = String(currentDate.getFullYear());

    const currentYearMyanmar = currentYearStr
        .split("")
        .map((char) => myanmarNumbers[char] || char)
        .join("");

    return `${currentMonthStr}-${currentYearMyanmar}`;
};
