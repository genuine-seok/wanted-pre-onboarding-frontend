import { useEffect } from "react";
import styled from "styled-components";

import TodoItem from "./TodoItem";

const TodoListBlock = styled.ul`
  padding: 2rem 0;
  list-style: none;
`;

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
    <TodoListBlock>
      {todos.map((todoData) => (
        <TodoItem getTodos={getTodos} key={todoData.id} data={todoData} />
      ))}
    </TodoListBlock>
  );
};

export default TodoList;
