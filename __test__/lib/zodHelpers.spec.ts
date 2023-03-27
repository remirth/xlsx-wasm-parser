import { describe, it, expect } from "vitest";
import { buildRowValidater } from "../../src/lib/validationHelpers";
import { z } from "zod";

const schema = z.object({
  rowNo: z.number(),
  id: z.string(),
});

const input = [
  { rowNo: 1, id: "1" },
  { rowNo: 2, id: "2" },
  { rowNo: "3", id: "3" },
  { rowNo: 4, id: 4 },
  { rowNo: 5, id: "5", extra: "extra" },
];

describe("buildRowParser", () => {
  it("should return a function", () => {
    const result = buildRowValidater(schema);
    expect(result).toBeInstanceOf(Function);
  });

  it("should return a function that parses an array of objects and returns an array of those that pass the schema", () => {
    const parseRow = buildRowValidater(schema);

    const result = parseRow(input, []);
    expect(result).toEqual([
      { rowNo: 1, id: "1" },
      { rowNo: 2, id: "2" },
      { rowNo: 5, id: "5" },
    ]);
  });

  it("should return a function that parses an array of objects and returns an array of those that pass the schema", () => {
    const result = buildRowValidater(schema)(input, []);

    const safeParseResult = z.array(schema).safeParse(result);

    if (!safeParseResult.success) {
      console.error(safeParseResult.error);
    } else {
      expect(safeParseResult.success).toBe(true);
    }
  });
});
