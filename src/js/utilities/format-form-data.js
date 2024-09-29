/**
 * @description Turns provided form data into an object
 * 
 * @param {FormDataEvent} event
 * @returns {Object}
 */
export default function formatFormData(event) {
    const formData = new FormData(event.target)

    return Object.fromEntries(formData.entries())
}