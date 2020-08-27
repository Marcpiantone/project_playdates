//A page that welcomes you, gives a pitch of the app

//header to signUp
//Sign with email or googleauth

import totemsArray from "../assets/tribes-totems/svgarray";
import { totems } from "../assets/tribes-totems/totems";

import React from "react";
import styled from "styled-components";

const LandingPage = () => {
  const totemStyle = {};
  //const svgArray = [component1];
  return (
    <DIV>
      Landing Page HERE
      {/* {totemsArray.map((totem) => {
        return totem;
      })} */}
      {Object.keys(totems).map((id) => {
        return (
          <SVG viewBox={"5 21 80% 80%"} preserveAspectRatio={"none"} key={id}>
            {totems[id]}
          </SVG>
        );
      })}
    </DIV>
  );
};

const DIV = styled.div`
  color: black;
`;

const SVG = styled.svg`
  width: 10%;
  height: 10%;
  background-color: grey;
  fill: blue;
  overflow: visible;
  padding-bottom: 2%;
`;

export default LandingPage;
