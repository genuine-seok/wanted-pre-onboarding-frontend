import { Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { TodosContextProvider } from "./contexts/TodosContext";

function App() {
  return (
    <TodosContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </TodosContextProvider>
  );
}

export default App;
