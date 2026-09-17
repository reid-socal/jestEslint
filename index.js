
  @param {string} input
 * @returns {string}
 */
function capitalizeWords(input) {
  if (typeof input !== "string" || input.length === 0) {
    return "";
  }
 
  return input
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
 
/**
 * Filters an array of user objects, returning only those with isActive: true.
 *
 * @param {Array<{name: string, isActive: boolean}>} users
 * @returns {Array<{name: string, isActive: boolean}>}
 */
function filterActiveUsers(users) {
  if (!Array.isArray(users)) {
    return [];
  }
  return users.filter((user) => user && user.isActive === true);
}
 
/**
 * Logs (and returns) a string describing an action performed by a user,
 * including an ISO timestamp.
 *
 * @param {string} action
 * @param {string} username
 * @returns {string}
 */
function logAction(action, username) {
  const timestamp = new Date().toISOString();
  const safeAction = action || "unknown action";
  const safeUsername = username || "unknown user";
 
  const message = `User ${safeUsername} performed ${safeAction} at ${timestamp}`;
  console.log(message);
  return message;
}
 
module.exports = { capitalizeWords, filterActiveUsers, logAction };