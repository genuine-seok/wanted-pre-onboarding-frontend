import { useEffect } from "react";

import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId?: number;
};
type TodosState = Todo[];
type TodoListState = TodosState | null;

type TodoListProps = {
  getTodos: () => void;
  todos: TodoListState;
};

const TodoList = ({ getTodos, todos }: TodoListProps) => {
  useEffect(() => {}, [todos]);

  if (!todos) return <div>...로딩중입니다</div>;

  return (
    <ul>
      {todos.map((todoData) => (
        <TodoItem getTodos={getTodos} key={todoData.id} data={todoData} />
      ))}
    </ul>
  );
};

export default TodoList;
