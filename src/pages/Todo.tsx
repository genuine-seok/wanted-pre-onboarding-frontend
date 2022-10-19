import { useNavigate } from "react-router-dom";
import { TodoForm, TodoList } from "../components/Todo";
import { TodosState } from "../contexts/TodosContext";
import {
  useLoginState,
  useLoginDispatch,
  ACCESS_TOKEN,
} from "../contexts/LoginContext";
import { useEffect, useState } from "react";
import useLocalStorage from "../lib/useLocalStorage";
import TODO_API from "../api/TODO_API";
import axios from "axios";
import Message from "../components/common/Message";
import PageTitle from "../components/common/PageTitle";
import Layout from "../components/common/Layout";
import Button from "../components/common/Button";

type GetTodoSuccessState = {
  statusCode: number;
  statusText: string;
  data: TodosState;
};
type GetTodoErrorState = {
  statusCode: number;
  statusText: string;
  message?: string;
};

type GetTodoResultState = GetTodoSuccessState | GetTodoErrorState;

type TodoMessageState = {
  display: boolean;
  message: string;
};

const initialTodoMessage: TodoMessageState = {
  display: false,
  message: "",
};

function Todo() {
  const navigate = useNavigate();
  const loginState = useLoginState();
  const loginDispatch = useLoginDispatch();
  const [accessToken, setAccessToken] = useLocalStorage(ACCESS_TOKEN, "");
  const [todos, setTodos] = useState<TodosState | null>(null);
  const [todoMessage, setTodoMessage] =
    useState<TodoMessageState>(initialTodoMessage);

  const { isLoggedIn } = loginState;
  const { display, message } = todoMessage;

  const fetchTodos = async (): Promise<GetTodoResultState | unknown> => {
    try {
      const res = await TODO_API.getTodos(accessToken);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        data: res.data,
      } as GetTodoSuccessState;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return {
          statusCode: e.response?.status,
          statusText: e.response?.statusText,
          data: e.response?.data,
        } as GetTodoErrorState;
      } else {
        console.error(e);
      }
    }
  };

  const getTodos = async () => {
    const fetched = (await fetchTodos()) as GetTodoResultState;
    if (fetched.statusCode === 200) {
      const successTodos = fetched as GetTodoSuccessState;
      setTodos(successTodos.data);
    } else {
      const errorTodos = fetched as GetTodoErrorState;
      const todoErrorMessage = {
        display: true,
        message: `${errorTodos.message}`,
      };
      setTodoMessage(todoErrorMessage);
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const logout = () => {
    loginDispatch({ type: "LOGOUT" });
    setAccessToken("");
    goHome();
  };

  useEffect(() => {
    if (!isLoggedIn) goHome();

    getTodos();
  }, []);

  return (
    <Layout>
      <PageTitle>할 일 목록</PageTitle>
      {display ? <Message type="negative" message={message} /> : null}
      <TodoForm getTodos={getTodos} />
      <TodoList getTodos={getTodos} todos={todos} />
      <Button onClick={logout}>로그아웃</Button>
    </Layout>
  );
}

export default Todo;
