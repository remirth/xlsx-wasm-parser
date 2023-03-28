import { describe, expect, it } from "vitest";
import { getParsedRows } from "../../src/node/getParsedRows";
import { readFileSync } from "fs";
import { join } from "path";
import { testSchema } from "../testutils/schemas";

const testFile = readFileSync(join("__test__", "testData", "file10.xlsx"));

describe("getParsedRows", () => {
  it("should exists", () => {
    expect(getParsedRows).toBeInstanceOf(Function);
  });

  it("should return an array of objects", () => {
    const result = getParsedRows(testFile, testSchema);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeDefined();
    expect(result[0]).toBeTypeOf("object");
  });

  it("should return an array of objects with the keys from the schema", () => {
    const result = getParsedRows(testFile, testSchema);
    const keys = Object.keys(result[0]);
    expect(keys).toEqual(
      expect.arrayContaining(testSchema.map((tuple) => tuple[1]))
    );
  });
});
