/**
 * Return an array of the last few hours, days or months based on the time range
 * @param {'D' | 'M' | 'Y'} timeUnit - The unit of time to return labels for ('D' for days, 'M' for months, 'Y' for years).
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
    case "D": // Alias for days
      if (timeRange === 1) {
        // From midnight to now
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        const hoursSinceMidnight = Math.floor(
          (now - startOfDay) / (1000 * 60 * 60)
        );

        for (let i = 0; i <= hoursSinceMidnight; i++) {
          const label = new Date(startOfDay.getTime() + i * 60 * 60 * 1000);
          labels.push(
            label.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          );
        }
      } else {
        for (let i = 0; i < timeRange; i++) {
          const label = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          labels.unshift(label.toLocaleDateString());
        }
      }
      break;

    case "W": // Alias for weeks
      if (timeRange === 1) {
        // From the start of the week to now
        const startOfWeek = new Date(now);
        // Set to the first day of the week (Monday)
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        for (let i = 0; i < 7; i++) {
          const label = new Date(
            startOfWeek.getTime() + i * 24 * 60 * 60 * 1000
          );
          labels.push(label.toLocaleDateString());
        }
      } else {
        for (let i = 0; i < timeRange; i++) {
          const label = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
          labels.unshift(
            label.toLocaleDateString("default", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })
          );
        }
      }
      break;

    case "M": // Alias for months
      if (timeRange === 1) {
        // From the start of the month to now
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const daysInMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();

        for (let i = 0; i < daysInMonth; i++) {
          const label = new Date(
            startOfMonth.getTime() + i * 24 * 60 * 60 * 1000
          );
          labels.push(label.toLocaleDateString());
        }
      } else {
        for (let i = 0; i < timeRange; i++) {
          const label = new Date(now.getFullYear(), now.getMonth() - i, 1);
          labels.unshift(
            label.toLocaleDateString("default", {
              month: "long",
              year: "numeric",
            })
          );
        }
      }
      break;
    case "Y": // Alias for years
      if (timeRange === 1) {
        // From the start of the year to now
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const daysInYear = new Date(now.getFullYear(), 12, 0).getDate();

        for (let i = 0; i < daysInYear; i++) {
          const label = new Date(
            startOfYear.getTime() + i * 24 * 60 * 60 * 1000
          );
          labels.push(label.toLocaleDateString());
        }
      } else {
        for (let i = 0; i < timeRange; i++) {
          const label = new Date(now.getFullYear() - i, 0, 1);
          labels.unshift(
            label.toLocaleDateString("default", {
              year: "numeric",
            })
          );
        }
      }
      break;
    default:
      throw new Error(
        "Invalid time unit: must be 'D (days)', 'M (months)', or 'Y (years)'"
      );
  }
  return labels;
}

/**
 * Split the timeRange and timeUnit string into an obj in order to use it in the getTimeLabels function
 * @param {string} timeString - The time string to split (e.g., "7D", "3M", "1Y").
 * @returns {Object} - An object containing the unit and duration.
 */
export function splitTimeString(timeString) {
  const match = timeString.match(/^(\d+)([a-zA-Z]+)$/);
  if (!match) return { unit: null, duration: null };
  const [, duration, unit] = match;
  return { unit, duration: Number(duration) };
}
