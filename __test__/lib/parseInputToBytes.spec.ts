import { describe, it, expect } from "vitest";
import { parseInputToBytes } from "../../src/lib/parseInputToBytes";

describe("parseInputToBytes", () => {
  it("should return the input if it is a Uint8Array", () => {
    const input = new Uint8Array([1, 2, 3]);
    const result = parseInputToBytes(input);
    expect(result).toBe(input);
  });

  it("should return a Uint8Array if the input is an ArrayBuffer", () => {
    const input = new ArrayBuffer(3);
    const result = parseInputToBytes(input);
    expect(result).toBeInstanceOf(Uint8Array);
  });
});
