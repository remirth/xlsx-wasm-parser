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

export const testParsingSchema = z.object({
  rowNo: z.number(),
  id: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  amount: z.number(),
  description: z.string(),
});
