/**
 * Formats a JavaScript Date object into a human-readable string.
 * @param {Date | string} date - The date to format.
 * @param {string} locale - The locale string for formatting (e.g., 'en-US').
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date, locale = 'en-US') => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  /**
   * Formats a JavaScript Date object into a time string.
   * @param {Date | string} date - The date to format.
   * @param {string} locale - The locale string for formatting (e.g., 'en-US').
   * @returns {string} - Formatted time string.
   */
  export const formatTime = (date, locale = 'en-US') => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  