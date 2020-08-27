//A page that welcomes you, gives a pitch of the app

//header to signUp
//Sign with email or googleauth
import React from "react";
import totemsArray from "../assets/tribes-totems/svgarray";
import { totems } from "../assets/tribes-totems/totems";
import { totemColors, randomColorSelector } from "./GlobalStyles";
import styled from "styled-components";

const LandingPage = () => {
  const totemStyle = {};
  //const svgArray = [component1];
  return (
    <DIV>
      <div>Landing Page HERE</div>
      {/* {totemsArray.map((totem) => {
        return totem;
      })} */}
      <TotemsDIV>
        {Object.keys(totems).map((id) => {
          const fill = randomColorSelector(totemColors);
          return (
            <SVG viewBox={"0 0 24 24"} style={{ fill }} key={id}>
              {totems[id]}
            </SVG>
          );
        })}
      </TotemsDIV>
    </DIV>
  );
};

const DIV = styled.div`
  color: black;
`;

const SVG = styled.svg`
  overflow: visible;
  width: 100px;
  height: 100px;
`;

const TotemsDIV = styled.div`
  display: flex;
`;

export default LandingPage;
