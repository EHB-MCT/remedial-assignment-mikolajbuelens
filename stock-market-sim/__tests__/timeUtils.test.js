// Jest test
import { getTimeLabels } from "../src/app/utils/timeUtils";

describe("getTimeLabels", () => {
  it("should return the correct labels for hours", () => {
    const labels = getTimeLabels("hours", 5);
    expect(labels).toHaveLength(5);
    expect(labels[0]).toMatch(/\d{1,2}:\d{2}/); // Check time format
  });

  it("should return the correct labels for days", () => {
    const labels = getTimeLabels("days", 3);
    expect(labels).toHaveLength(3);
    expect(labels[0]).toMatch(/\d{1,2}\/\d{1,2}\/\d{2,4}/); // Check date format
  });

  it("should return the correct labels for months", () => {
    const labels = getTimeLabels("months", 2);
    expect(labels).toHaveLength(2);
    expect(labels[0]).toMatch(/\w+ \d{2,4}/); // Check month format
  });

  it("should throw an error for invalid time unit", () => {
    expect(() => getTimeLabels("invalid", 5)).toThrow("Invalid time unit"); // Check invalid time unit
  });

  it("should throw an error for invalid time range", () => {
    expect(() => getTimeLabels("days", -1)).toThrow("Invalid time range"); // Check invalid time range
  });
});
