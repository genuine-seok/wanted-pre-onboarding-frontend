import React, { useReducer } from "react";
import { UserInfoProps } from "../api/AUTH_API";

type LoginAction = HTMLInputElement;

function inputReducer(
  state: UserInfoProps,
  action: LoginAction
): UserInfoProps {
  return {
    ...state,
    [action.name]: action.value,
  };
}

function useInputs(
  initialForms: UserInfoProps
): [UserInfoProps, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [state, dispatch] = useReducer(inputReducer, initialForms);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, onChange];
}

export default useInputs;
