import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { testSchema } from "../testutils/schemas";
import { z } from "zod";
import { getParsedRowsWithZodSchema } from "../../src/node/validation/getParsedRowsFromSchema";
import { testParsingSchema } from "../testutils/zod";

const testFile = readFileSync(join("__test__", "testData", "zodTestfile.xlsx"));

describe("getParsedRowsWithZodSchema", () => {
  it("should exists", () => {
    expect(getParsedRowsWithZodSchema).toBeInstanceOf(Function);
  });

  it("should return an array of objects", () => {
    const result = getParsedRowsWithZodSchema(
      testFile,
      testSchema,
      testParsingSchema
    );
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeDefined();
    expect(result[0]).toBeTypeOf("object");
  });

  it("should return an array of objects that pass the schema", () => {
    const result = getParsedRowsWithZodSchema(
      testFile,
      testSchema,
      testParsingSchema
    );
    const safeParseResult = z.array(testParsingSchema).safeParse(result);
    if (!safeParseResult.success) {
      console.error(safeParseResult.error);
    }

    expect(safeParseResult.success).toBe(true);
  });
});
