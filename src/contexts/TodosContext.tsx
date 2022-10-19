// TODO: Redux-saga or React-Query를 이용한 비동기 통신 관리하기

import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

export type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId?: number;
};

export type TodosState = Todo[];

const TodosStateContext = createContext<TodosState | undefined>(undefined);

type Action =
  | { type: "SETUP"; state: TodosState }
  | { type: "CREATE"; todo: string }
  | { type: "TOGGLE"; id: number }
  | { type: "UPDATE"; todo: string; id: number }
  | { type: "REMOVE"; id: number };

type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined
);

function todoReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case "SETUP":
      return action.state;
    case "CREATE":
      const nextId = Math.max(...state.map((todo) => todo.id)) + 1;
      return state.concat({
        id: nextId,
        todo: action.todo,
        isCompleted: false,
      });
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, todo: action.todo } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error("unhandled action");
  }
}

export function TodosContextProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}

export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error("TodosProvider not found");
  return dispatch;
}
