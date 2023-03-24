import { get_all_rows } from "xlsx-wasm-node";
import type { Cell } from "../types";

export function getAllRows(bytes: Uint8Array | ArrayBuffer): Cell[][] {
  if (bytes instanceof Uint8Array) {
    return get_all_rows(bytes);
  }

  return get_all_rows(new Uint8Array(bytes));
}

export default getAllRows;
