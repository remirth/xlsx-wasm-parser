import type { SafeParseReturnType, ZodTypeAny, infer as zodInfer } from "zod";
import type { Cell } from "../types";

type ZodReducer<
  TSchema extends ZodTypeAny,
  TObj extends Record<string, Cell>
> = (acc: zodInfer<TSchema>[], row: TObj) => zodInfer<TSchema>[];
export function buildZodReducer<
  TSchema extends ZodTypeAny,
  TObj extends Record<string, Cell>
>(schema: TSchema): ZodReducer<TSchema, TObj> {
  return (acc: zodInfer<TSchema>[], row: TObj) => {
    return handleParseResult(schema.safeParse(row), acc);
  };
}

const handleParseResult = <TSchema extends ZodTypeAny, TIn, TOut>(
  result: SafeParseReturnType<TIn, TOut>,
  acc: zodInfer<TSchema>[]
) => {
  if (result.success) {
    acc.push(result.data);
  }

  return acc;
};
