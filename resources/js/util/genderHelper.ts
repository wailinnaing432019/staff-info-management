export const getGenderMyanmar = (gender) => {
    const genderMap = {
        'male': 'ကျား',
        'female': 'မ'
    };

    return genderMap[gender] || gender || '-';
};