// Jest test
import { getTimeLabels } from "../src/app/utils/timeUtils";

describe("getTimeLabels", () => {
  it("should return the correct labels for days", () => {
    const labels = getTimeLabels(3, "D");
    expect(labels).toHaveLength(3);
    expect(labels[0]).toMatch(/\d{1,2}\/\d{1,2}\/\d{2,4}/); // Check date format
  });

  it("should return the correct labels for months", () => {
    const labels = getTimeLabels(2, "M");
    expect(labels).toHaveLength(2);
    expect(labels[0]).toMatch(/\w+ \d{2,4}/); // Check month format
  });

  it("should return the correct labels for years", () => {
    const labels = getTimeLabels(5, "Y");
    expect(labels).toHaveLength(1);
    expect(labels[0]).toMatch(/\d{4}/); // Check year format
  });

  it("should throw an error for invalid time unit", () => {
    expect(() => getTimeLabels(5, "invalid")).toThrow("Invalid time unit"); // Check invalid time unit
  });

  it("should throw an error for invalid time range", () => {
    expect(() => getTimeLabels(-1, "D")).toThrow("Invalid time range"); // Check invalid time range
  });
});
