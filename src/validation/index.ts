/**
 * Validates a product object to ensure that its properties meet specified criteria.
 *
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product. Must be between 10 and 80 characters.
 * @param {string} product.price - The price of the product as a string. Must be a valid number.
 * @param {string} product.description - The description of the product. Must be between 10 and 900 characters.
 * @param {string} product.imageURL - The image URL of the product. Must be a valid URL.
 *
 * @returns {{ title: string; price: string; description: string; imageURL: string }} 
 * An object containing validation error messages for each field. If a field is valid, its error message will be an empty string.
 */



export const productValidation = (product: {
    title: string;
    price: string;
    description: string;
    imageURL: string;
    colors: string[];
}) => {
    const errors = {
        title: '',
        price: '',
        description: '',
        imageURL: '',
        colors: '',
    }

    const validateURL = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = 'The Product Title characters should be more than 10 && less than 80!';
    }
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = 'The Product Description characters should be more than 10 && less than 900!';
    }
    if (!product.imageURL.trim() || !validateURL) {
        errors.imageURL = 'Image URL not Valid!';
    }
    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = 'Price is Not Valid!';
    }
    if (product.colors.length === 0) {
        errors.colors = 'You should choose a Color, Please!';
    }
    return errors;
}