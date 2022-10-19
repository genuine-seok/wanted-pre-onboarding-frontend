import styled from "styled-components";

type MessageProps = {
  type: "positive" | "negative";
  message: string;
};

const PositiveMessage = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: green;
`;
const NegativeMessage = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: red;
`;

function Message({ type, message }: MessageProps) {
  return type === "positive" ? (
    <PositiveMessage>{message}</PositiveMessage>
  ) : (
    <NegativeMessage>{message}</NegativeMessage>
  );
}

export default Message;
