import { XlsxSchema } from "../../types";
import { parseInputToBytes } from "../../lib/parseInputToBytes";
import { buildRowValidater } from "../../lib/validationHelpers";
import { get_parsed_rows } from "xlsx-wasm-node";
import type { ZodTypeAny, infer as ZodInfer } from "zod";
/**
 * @description Gets all the rows from the given XLSX-file,
 * parses them with the given schema and then validates them with the given Zod-schema, only
 * returning the rows that pass the Zod-schema.
 * @param {Uint8Array | ArrayBuffer} bytes - The XLSX-file as a Uint8Array or ArrayBuffer
 * @param {XlsxSchema } schema - The schema to parse the rows with
 * @param {TSchema} zodSchema - The Zod-schema to validate the rows with
 * @returns {ZodInfer<TSchema>[]} An array of rows that passed the Zod-schema
 */
export function getParsedRowsWithZodSchema<TSchema extends ZodTypeAny>(
  bytes: Uint8Array | ArrayBuffer,
  schema: XlsxSchema,
  zodSchema: TSchema
): ZodInfer<TSchema>[] {
  return buildRowValidater(zodSchema)(
    get_parsed_rows(parseInputToBytes(bytes), schema),
    []
  );
}
