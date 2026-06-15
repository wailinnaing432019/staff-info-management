// src/utils/numberHelper.js

/**
 *  
 * @param {string|number} input 
 * @returns {string} 
 */
export default function toMyanmarNumber(input: number) {
    if (input === null || input === undefined) return '-';

    const myanmarDigits = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

    return input.toString().replace(/[0-9]/g, (digit) => myanmarDigits[digit]);
}