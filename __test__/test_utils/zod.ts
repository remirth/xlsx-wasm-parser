import { z } from "zod";

export const cellSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.undefined(),
]);

export const sheetSchema = z.array(z.array(cellSchema));

export const testRowSchema = z.tuple([
  z.literal("_"),
  z.number(),
  z.string(),
  z.literal("_"),
  z.string(),
  z.coerce.date(),
  z.literal("_"),
  z.coerce.date(),
  z.number(),
  z.string(),
]);
