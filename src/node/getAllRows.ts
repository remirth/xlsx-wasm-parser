import { get_all_rows } from "xlsx-wasm-node";
import type { Cell } from "../types";
import { parseInputToBytes } from "../lib/parseInputToBytes";

/**
 * @description Gets all rows from the given XLSX-file and returns them as a 2D array.
 * @param {Uint8Array | ArrayBuffer}bytes - The XLSX-file to parse
 * @returns {Cell[][]} An array of rows, where each row is an array of cells
 */
export function getAllRows(bytes: Uint8Array | ArrayBuffer): Cell[][] {
  return get_all_rows(parseInputToBytes(bytes));
}

export default getAllRows;
