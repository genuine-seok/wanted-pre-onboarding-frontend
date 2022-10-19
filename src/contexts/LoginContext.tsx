import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

export type LoginState = {
  isLoggedIn: boolean;
};

export const ACCESS_TOKEN = "access_token";

const LoginStateContext = createContext<LoginState | undefined>(undefined);

type Action = { type: "LOGIN" } | { type: "LOGOUT" };

type LoginDispath = Dispatch<Action>;

const LoginDispatchContext = createContext<LoginDispath | undefined>(undefined);

function loginReducer(state: LoginState, action: Action): LoginState {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        isLoggedIn: false,
      };
    default:
      throw new Error("unhandled login action");
  }
}

export function LoginContextProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, dispatch] = useReducer(loginReducer, {
    isLoggedIn: false,
  });

  useEffect(() => {
    // console.log("login context provider 생성");
  }, []);

  return (
    <LoginDispatchContext.Provider value={dispatch}>
      <LoginStateContext.Provider value={isLoggedIn}>
        {children}
      </LoginStateContext.Provider>
    </LoginDispatchContext.Provider>
  );
}

export function useLoginState() {
  const state = useContext(LoginStateContext);
  if (!state) throw new Error("LoginProvider not found");
  return state;
}

export function useLoginDispatch() {
  const dispatch = useContext(LoginDispatchContext);
  if (!dispatch) throw new Error("LoginProvider not found");
  return dispatch;
}
