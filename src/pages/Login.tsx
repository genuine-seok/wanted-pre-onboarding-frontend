import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import useInputs from "../lib/useInputs";
import useLocalStorage from "../lib/useLocalStorage";
import {
  ACCESS_TOKEN,
  useLoginDispatch,
  useLoginState,
} from "../contexts/LoginContext";
import AUTH_API from "../api/AUTH_API";
import { isValidEmail, isValidPassword } from "../lib/validation";

import Message from "../components/common/Message";

type LoginSuccessState = {
  statusCode?: number;
  statusText?: string;
  message?: string;
  accessToken: string;
};
type LoginErrorState = {
  statusCode?: number;
  statusText?: string;
  message?: string;
};
type LoginResultState = LoginSuccessState | LoginErrorState;

type LoginMessageState = {
  display: boolean;
  message: string;
};

const initialInputState = {
  email: "",
  password: "",
};

const initialLoginMessage: LoginMessageState = {
  display: false,
  message: "",
};

function Login() {
  const navigate = useNavigate();
  const loginState = useLoginState();
  const loginDispatch = useLoginDispatch();
  const [inputState, onChange] = useInputs(initialInputState);
  const [accessToken, setAccessToken] = useLocalStorage(ACCESS_TOKEN, "");
  const [loginMessage, setloginMessage] =
    useState<LoginMessageState>(initialLoginMessage);

  const { isLoggedIn } = loginState;
  const { email, password } = inputState;
  const { display, message } = loginMessage;

  async function login(): Promise<LoginResultState | unknown> {
    try {
      const res = await AUTH_API.signIn(inputState);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        message: res.data.message,
        accessToken: res.data.access_token,
      } as LoginSuccessState;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return {
          statusCode: e.response?.status,
          statusText: e.response?.statusText,
          message: e.response?.data.message,
        } as LoginErrorState;
      } else {
        console.error(e);
      }
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = (await login()) as LoginResultState;

    if (status.statusCode === 200) {
      const successStatus = status as LoginSuccessState;
      const { accessToken } = successStatus;
      setAccessToken(accessToken);
      loginDispatch({ type: "LOGIN" });
      setloginMessage({ display: false, message: "" });
    } else {
      const errorStatus = status as LoginErrorState;
      const loginErrorMessage = {
        display: true,
        message: `${errorStatus.message}`,
      };
      setloginMessage(loginErrorMessage);
    }
  };

  const goSignUp = () => {
    navigate("/signup");
  };

  const goTodo = () => {
    navigate("/todo");
  };

  useEffect(() => {
    if (accessToken !== "") {
      loginDispatch({ type: "LOGIN" });
    }

    if (isLoggedIn) goTodo();
  }, [isLoggedIn]);

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">아이디</label>
        <input name="email" type="text" value={email} onChange={onChange} />
        <label htmlFor="password">비밀번호</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        {display ? <Message type="negative" message={message} /> : null}
        <button type="submit" onClick={goSignUp}>
          회원가입
        </button>
        <button
          type="submit"
          disabled={!isValidEmail(email) || !isValidPassword(password)}
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
