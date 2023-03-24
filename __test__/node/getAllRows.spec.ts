import { describe, it, expect } from "vitest";
import { getAllRows } from "../../src/node";
import { readFileSync } from "fs";
import { join } from "path";
import { sheetSchema, testRowSchema } from "../test_utils/zod";

import { z } from "zod";

const testFile = readFileSync(join("__test__", "test_data", "file10.xlsx"));
describe("getAllRows", () => {
  it("should return a 2d array of cells", () => {
    const rows = getAllRows(testFile);
    expect(rows).toBeTypeOf("object");
    expect(rows).toBeInstanceOf(Array);
    expect(rows.length).toBeDefined();

    const firstRow = rows[0];
    expect(firstRow).toBeTypeOf("object");
    expect(firstRow).toBeInstanceOf(Array);
    expect(firstRow.length).toBeDefined();
  });

  it("should be able to parse arraybuffers", () => {
    const rows = getAllRows(testFile.buffer);
    expect(rows).toBeTypeOf("object");
    expect(rows).toBeInstanceOf(Array);
    expect(rows.length).toBeDefined();

    const firstRow = rows[0];
    expect(firstRow).toBeTypeOf("object");
    expect(firstRow).toBeInstanceOf(Array);
    expect(firstRow.length).toBeDefined();
  });

  it("should return a valid sheet", () => {
    const rows = getAllRows(testFile);
    const result = sheetSchema.safeParse(rows);
    if (!result.success) {
      console.error(result.error);
    }

    expect(result.success).toBe(true);
  });

  it("should return an array where the first row is the first row of the file", () => {
    const rows = getAllRows(testFile);
    const result = testRowSchema.safeParse(rows[0]);
    if (!result.success) {
      console.error(result.error);
    }

    expect(result.success).toBe(true);
  });

  it("all rows should be valid", () => {
    const rows = getAllRows(testFile);
    const result = z.array(testRowSchema).safeParse(rows);
    if (!result.success) {
      console.error(result.error);
    }

    expect(result.success).toBe(true);
  });
});
