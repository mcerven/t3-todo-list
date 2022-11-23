import { trpc } from "../../utils/trpc";
import { TodoList } from "../../components/TodoList";

export default function Page() {
  const todosResult = trpc.todos.getTodos.useQuery();

  return (
    <div>
      <h2>Todos</h2>
      <div>
        {todosResult.data && <TodoList todos={todosResult.data.todos} />}
      </div>
    </div>
  );
}
