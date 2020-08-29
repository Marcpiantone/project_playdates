//A page that welcomes you, gives a pitch of the app

//header to signUp
//Sign with email or googleauth
import React from "react";
import { getRandomTotem } from "../assets/tribes-totems/totems";

import styled, { keyframes } from "styled-components";
import { numbers } from "./GlobalStyles";

const LandingPage = () => {
  const totems = getRandomTotem(500, "50px");

  return (
    <DIV>
      <TotemsDIV>
        {totems.map((totem, index) => {
          return <AnotherDiv key={index}>{totem}</AnotherDiv>;
        })}
      </TotemsDIV>
    </DIV>
  );
};

const DIV = styled.div`
  max-height: calc(100vh - ${numbers.headerFooterHeight}*2);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 200vw;
  overflow: hidden;
`;

const AnotherDiv = styled.div`
  padding: 5px;
`;

const scrollDown = keyframes`
  from {
    transform : translateY(0px);
  }
  to {
    transform :translateY(-500px);
  }`;

const TotemsDIV = styled.div`
  justify-content: center;
  align-items: center;
  z-index: -1;
  display: flex;
  flex-wrap: wrap;
  animation: ${scrollDown} 10000ms infinite linear;
  overflow: hidden;
`;

export default LandingPage;
