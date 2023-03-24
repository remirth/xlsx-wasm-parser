import { describe, it, expect } from "vitest";
import { getAllRows } from "../../src";
import { readFileSync } from "fs";
import { join } from "path";

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
});
