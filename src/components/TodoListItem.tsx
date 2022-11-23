import Link from "next/link";
import type { Todo } from "../server/trpc/todoTypes";
import { trpc } from "../utils/trpc";

interface TodoListItemProps {
  todo: Todo;
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  const utils = trpc.useContext();
  const updateTodo = trpc.todos.updateTodo.useMutation({
    onSettled() {
      // Sync with server once mutation has settled
      utils.todos.getTodos.invalidate();
    },
  });

  const handleChange = () => {
    const { id, ...todoInput } = todo;
    todoInput.complete = !todoInput.complete;
    updateTodo.mutate({ id, todoInput });
  };

  return (
    <div>
      <label htmlFor=""></label>
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.complete}
        onChange={handleChange}
      />
      <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
    </div>
  );
}
