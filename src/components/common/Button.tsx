import { ReactNode } from "react";
import styled from "styled-components";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ButtonBlock = styled.button`
  background: #e9edef;
  color: #48515b;
  width: 100%;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: #e1e5e9;
    color: #48515b;
  }

  &:disabled {
    background: #eeeeee;
    color: #bdbdbd;
    cursor: not-allowed;
  }
`;

function Button({
  children,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <ButtonBlock type={type} disabled={disabled} onClick={onClick}>
      {children}
    </ButtonBlock>
  );
}

export default Button;
