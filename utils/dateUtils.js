import moment from 'moment';

/**
 * Format a date to a specified format.
 * @param {Date|string} date - The date to format.
 * @param {string} format - The format to use (default: 'YYYY-MM-DD').
 * @returns {string} - The formatted date string.
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}

/**
 * Parse a date string to a JavaScript Date object.
 * @param {string} dateString - The date string to parse.
 * @param {string} format - The format of the date string (default: 'YYYY-MM-DD').
 * @returns {Date} - The parsed Date object.
 */
export function parseDate(dateString, format = 'YYYY-MM-DD') {
  return moment(dateString, format).toDate();
}

/**
 * Get the difference between two dates.
 * @param {Date|string} date1 - The first date.
 * @param {Date|string} date2 - The second date.
 * @param {string} unit - The unit of difference (e.g., 'days', 'months', 'years').
 * @returns {number} - The difference between the two dates in the specified unit.
 */
export function dateDifference(date1, date2, unit = 'days') {
  return moment(date1).diff(moment(date2), unit);
}

/**
 * Add a specified amount of time to a date.
 * @param {Date|string} date - The date to modify.
 * @param {number} amount - The amount of time to add.
 * @param {string} unit - The unit of time to add (e.g., 'days', 'months', 'years').
 * @returns {Date} - The modified date.
 */
export function addTime(date, amount, unit = 'days') {
  return moment(date).add(amount, unit).toDate();
}

/**
 * Subtract a specified amount of time from a date.
 * @param {Date|string} date - The date to modify.
 * @param {number} amount - The amount of time to subtract.
 * @param {string} unit - The unit of time to subtract (e.g., 'days', 'months', 'years').
 * @returns {Date} - The modified date.
 */
export function subtractTime(date, amount, unit = 'days') {
  return moment(date).subtract(amount, unit).toDate();
}

/**
 * Get the current date and time.
 * @param {string} format - The format to use (default: 'YYYY-MM-DD HH:mm:ss').
 * @returns {string} - The current date and time.
 */
export function getCurrentDateTime(format = 'YYYY-MM-DD HH:mm:ss') {
  return moment().format(format);
}

/**
 * Calculate the time ago (relative time) from a given date.
 * @param {Date|string} date - The date to calculate time ago from.
 * @returns {string} - The relative time string (e.g., '2 days ago').
 */
export function timeAgo(date) {
  return moment(date).fromNow();
}

/**
 * Convert a datetime to UTC.
 * @param {Date|string} date - The date to convert.
 * @returns {string} - The UTC datetime string.
 */
export function convertToUTC(date) {
  return moment(date).utc().format('YYYY-MM-DD HH:mm:ss');
}