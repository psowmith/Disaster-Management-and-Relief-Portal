/**
 * Validates if the input is an email.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if the input is a valid email.
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validates if the input meets password strength criteria.
   * @param {string} password - The password string to validate.
   * @returns {boolean} - True if the password is strong.
   */
  export const isValidPassword = (password) => {
    // Example criteria: at least 8 characters, 1 uppercase, 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  /**
   * Validates if the input is not empty or null.
   * @param {string} input - The input to validate.
   * @returns {boolean} - True if the input is valid.
   */
  export const isNonEmpty = (input) => input && input.trim() !== '';
  