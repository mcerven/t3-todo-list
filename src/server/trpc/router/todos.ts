import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { todos } from "../todoData";
import { todoInputSchema } from "../todoTypes";

export const todosRouter = router({
  getTodos: publicProcedure.query(() => {
    return {
      todos,
    };
  }),
  addTodo: publicProcedure.input(todoInputSchema).mutation((req) => {
    const { input } = req;
    const todo = { ...input, id: `${Math.random()}` };
    todos.push(todo);
    return todo;
  }),
  updateTodo: publicProcedure
    .input(z.object({ id: z.string(), todoInput: todoInputSchema }))
    .mutation((req) => {
      const todo = todos.find((t) => t.id === req.input.id);
      if (todo == null) return null;

      Object.assign(todo, req.input.todoInput);
      return todo;
    }),
});
