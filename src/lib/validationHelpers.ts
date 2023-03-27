import type { SafeParseReturnType, ZodTypeAny, infer as zodInfer } from "zod";
import type { Cell } from "../types";

type ParseRowsCallback<
  TSchema extends ZodTypeAny,
  TObj extends Record<string, Cell>
> = (rows: TObj[], acc: zodInfer<TSchema>[]) => zodInfer<TSchema>[];
export function buildRowValidater<
  TSchema extends ZodTypeAny,
  TObj extends Record<string, Cell>
>(schema: TSchema): ParseRowsCallback<TSchema, TObj> {
  const handleParseResult = (
    result: SafeParseReturnType<any, any>,
    acc: zodInfer<TSchema>[]
  ) => {
    if (result.success) {
      acc.push(result.data);
    }

    return acc;
  };

  const validateRows: ParseRowsCallback<TSchema, TObj> = (
    rows: TObj[],
    acc: zodInfer<TSchema>[]
  ) => {
    if (!rows.length) return acc;

    return validateRows(
      rows.slice(1),
      handleParseResult(schema.safeParse(rows[0]), acc)
    );
  };

  return validateRows;
}
