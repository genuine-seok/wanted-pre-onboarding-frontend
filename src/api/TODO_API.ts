import axios_preonboarding from "./axios_preonboarding";
import server from "./url";

export type TodoProps = {
  todo: string;
  isCompleted?: boolean;
};

const TODO_API = {
  baseURL() {
    return server.preOnboarding;
  },
  createTodo(data: TodoProps, token: string) {
    return axios_preonboarding.post(this.baseURL() + "todos", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getTodos(token: string) {
    return axios_preonboarding.get(this.baseURL() + "todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateTodo(id: number, data: TodoProps, token: string) {
    return axios_preonboarding.put(this.baseURL() + `todos/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteTodo(id: number, token: string) {
    return axios_preonboarding.delete(this.baseURL() + `todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default TODO_API;
