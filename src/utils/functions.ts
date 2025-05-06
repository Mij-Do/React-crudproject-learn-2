/**
 * Slices a given text to a specified maximum length and appends ellipsis ("...") if necessary.
 *
 * @param {string} txt - The text string to be sliced.
 * @param {number} [max=80] - The maximum number of characters allowed before slicing. Defaults to 80.
 * @returns {string} - The original text if its length is within the limit, or a sliced version ending with "..." if it exceeds the limit.
 *
 * @example
 * txtSlicer("Hello world!", 5); // returns "Hello..."
 * txtSlicer("Short text");      // returns "Short text"
 */

export function txtSlicer(txt: string, max: number = 80) {
    if (txt.length >= max) {
        return `${txt.slice(0, max)}...`;
    } else {
        return txt;
    }
}


export function uuid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}