import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/common/Message";
import useInputs from "../lib/useInputs";
import AUTH_API, { UserInfoProps } from "../api/AUTH_API";
import axios from "axios";
import { isValidEmail, isValidPassword } from "../lib/validation";

type SignUpSuccessState = {
  statusCode?: number;
  statusText?: string;
  message?: string;
};
type SignUpErrorState = {
  statusCode?: number;
  statusText?: string;
  message?: string;
};

type SignUpResultState = SignUpSuccessState | SignUpErrorState;

type SignupMessageState = {
  display: boolean;
  type: "negative" | "positive";
  message: string;
};

const initialInputState: UserInfoProps = {
  email: "",
  password: "",
};

const initialSignupMessage: SignupMessageState = {
  display: false,
  type: "negative",
  message: "",
};

function SignUp() {
  const navigate = useNavigate();
  const [inputsState, onChange] = useInputs(initialInputState);
  const [signupMessage, setSignupMessage] = useState(initialSignupMessage);

  const { email, password } = inputsState;
  const { display, type, message } = signupMessage;

  const goBack = () => navigate(-1);

  async function signUpUser(): Promise<any> {
    try {
      const res = await AUTH_API.signUp(inputsState);
      return {
        statusCode: res.status,
        statusText: res.statusText,
        message: res.data.message,
      } as SignUpSuccessState;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return {
          statusCode: e.response?.status,
          statusText: e.response?.statusText,
          message: e.response?.data.message,
        } as SignUpErrorState;
      }
      console.error(e);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = (await signUpUser()) as SignUpResultState;
    if (status.statusCode === 201) {
      const signupMessage = {
        display: true,
        type: "positive",
        message: `계정이 생성되었습니다!`,
      } as SignupMessageState;
      setSignupMessage(signupMessage);
    } else {
      const errorStatus = status as SignUpErrorState;
      const signupMessage = {
        display: true,
        type: "negative",
        message: `${errorStatus.message}`,
      } as SignupMessageState;
      setSignupMessage(signupMessage);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
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
        {display ? <Message type={type} message={message} /> : null}
        <button
          type="submit"
          disabled={!isValidEmail(email) || !isValidPassword(password)}
        >
          등록
        </button>
      </form>
      <button type="button" onClick={goBack}>
        뒤로
      </button>
    </div>
  );
}

export default SignUp;