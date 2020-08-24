import React from "react";

import styled, { keyframes } from "styled-components";

import logo from "../assets/logo_black.png";
import { colors } from "./GlobalStyles";
import { ReactComponent as Quatrecentquatre } from "../assets/404.svg";

const Fourofour = () => {
  return (
    <Wrapper>
      <DIV>
        <Fourhundredfour />
        <Message>Oh no ! Page not found</Message>
      </DIV>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const DIV = styled.div`
  padding-left: 75px;
  padding-right: 75px;
  text-align: center;
`;

const multicolor = keyframes`
0% {
  fill: ${colors.primary};
  color:${colors.primary}
}
25% {
  fill: ${colors.secondary};
  color:${colors.secondary}
}
50% {
  fill: ${colors.buttons};
  color:${colors.buttons}
}
75% {
  fill: ${colors.darktext};
  color:${colors.darktext}
}
100% {
  fill: ${colors.accent};
  color:${colors.accent};
}`;

const Fourhundredfour = styled(Quatrecentquatre)`
  animation: ${multicolor} 5000ms infinite linear;
  height: 100px;
`;

const Message = styled.div`
  animation: ${multicolor} 5000ms infinite linear;
  font-size: 1.5em;
`;

export default Fourofour;
