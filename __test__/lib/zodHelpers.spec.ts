import { describe, it, expect } from "vitest";
import { buildZodReducer } from "../../src/lib/validationHelpers";
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
    const result = buildZodReducer(schema);
    expect(result).toBeInstanceOf(Function);
  });

  it("should return a reducer function that returns an array of objects", () => {
    const result = input.reduce(buildZodReducer(schema), []);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeDefined();
    expect(result[0]).toBeTypeOf("object");
  });

  it("should return a reducer function that returns an array of objects that pass the schema", () => {
    const result = input.reduce(buildZodReducer(schema), []);
    const safeParseResult = z.array(schema).safeParse(result);
    if (!safeParseResult.success) {
      console.error(safeParseResult.error);
    }
    expect(safeParseResult.success).toBe(true);
  });
});
