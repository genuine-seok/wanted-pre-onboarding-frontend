import styled from "styled-components";

export const InputField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    margin-right: 1rem;
  }

  & + & {
    margin-top: 1rem;
  }
`;

export const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  flex: 1;

  &::placeholder {
    color: #bdbdbd;
  }
`;
