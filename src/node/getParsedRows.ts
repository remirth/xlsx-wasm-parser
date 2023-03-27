import { get_parsed_rows } from "xlsx-wasm-node";
import type { Cell } from "../types";
import { parseByteInput } from "../lib/parseByteInput";

/**
 * @description Parses the given XLSX-file to an array of Rows,
 * where each row will be parsed according to the given schema,
 * which is an array of tuples where the first value is the index of the column,
 * and the second is the key the column should be parsed as.
 * @param {Uint8Array | ArrayBuffer} bytes - The XLSX-file to parse
 * @param {[number | string][]} schema - An array of tuples where the first value is the index of the column,
 * and the second is the key the column should be parsed as.
 * @returns {Record<string, Cell>[]} An array of rows, where each row is an object with the keys from the schema
 */
export function getParsedRows(
  bytes: Uint8Array | ArrayBuffer,
  schema: [number, string][]
): Record<string, Cell>[] {
  return get_parsed_rows(parseByteInput(bytes), schema);
}
