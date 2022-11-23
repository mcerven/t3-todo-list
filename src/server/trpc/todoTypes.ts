import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  complete: z.boolean(),
});
export const todoInputSchema = todoSchema.omit({ id: true });

export type Todo = z.infer<typeof todoSchema>;
export type TodoInput = z.infer<typeof todoInputSchema>;
