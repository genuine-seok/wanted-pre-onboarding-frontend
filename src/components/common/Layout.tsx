import { ReactNode } from "react";
import styled from "styled-components";

const LayoutBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  border: 1px solid lightgray;
  border-radius: 2rem;
  width: 512px;
  margin: auto;
  margin-top: 6rem;
  overflow: hidden;
`;

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return <LayoutBlock>{children}</LayoutBlock>;
}

export default Layout;
