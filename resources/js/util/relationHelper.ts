export const getRelationMyanmar = (lineage) => {
    const lineageMap = {
        'son': 'သား',
        'daughter': 'သမီး',
        'sonInLaw': 'သမက်',
        'daughterInLaw': 'ချွေးမ'
    };

    return lineageMap[lineage] || lineage || '-';
};