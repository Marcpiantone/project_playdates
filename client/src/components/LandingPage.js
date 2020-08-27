//A page that welcomes you, gives a pitch of the app

//header to signUp
//Sign with email or googleauth
import React from "react";
import totemsArray from "../assets/tribes-totems/svgarray";
import { totems } from "../assets/tribes-totems/totems";
import { colors } from "./GlobalStyles";
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
          <SVG viewBox={"0 0 24 24"} key={id}>
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

console.log(Math.floor(Math.random() * Object.keys(colors).length));

console.log(Object.keys(colors).length);
const SVG = styled.svg`
  fill: ${Object.values(colors)[
    Math.floor(Math.floor(Math.random() * Object.keys(colors).length))
  ]};
  overflow: visible;
`;

export default LandingPage;
