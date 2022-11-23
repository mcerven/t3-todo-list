import { useState } from "react";
import type { Todo } from "../server/trpc/todoTypes";
import { trpc } from "../utils/trpc";

export function TodoList({ todos }: { todos: Todo[] }) {
  const [title, setTitle] = useState("");

  const utils = trpc.useContext();
  const addTodo = trpc.todos.addTodo.useMutation({
    onSettled() {
      // Sync with server once mutation has settled
      utils.todos.getTodos.invalidate();
    },
  });

  return (
    <div>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
      <input
        className="text-black"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo.mutate({ title, complete: false });
            setTitle("");
          }
        }}
      />
    </div>
  );
}
interface TodoListItemProps {
  todo: Todo;
}

function TodoListItem({ todo }: TodoListItemProps) {
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
      {todo.title}
    </div>
  );
}
