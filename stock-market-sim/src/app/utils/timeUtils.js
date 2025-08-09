/**
 * Return an array of the last few hours, days or months based on the time range
 * @param {'hours' | 'days' | 'months'} timeUnit - The time unit (e.g., 'hours', 'days', 'months').
 * @param {number} timeRange - The range of time (e.g., last 24 hours, last 30 days).
 * @returns {string[]} - An array of formatted time labels.
 */

export function getTimeLabels(timeRange, timeUnit) {
  const now = new Date();
  const labels = [];

  if (timeRange <= 0) {
    throw new Error("Invalid time range");
  }

  switch (timeUnit) {
    case "hours":
      for (let i = 0; i < timeRange; i++) {
        const label = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.unshift(
          label.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      }
      break;
    case "days":
      for (let i = 0; i < timeRange; i++) {
        const label = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.unshift(label.toLocaleDateString());
      }
      break;
    case "months":
      for (let i = 0; i < timeRange; i++) {
        const label = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.unshift(
          label.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })
        );
      }
      break;
    default:
      throw new Error(
        "Invalid time unit: must be 'hours', 'days', or 'months'"
      );
  }

  return labels;
}
