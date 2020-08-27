import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FiPlusSquare } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { totems } from "../assets/tribes-totems/totems";
import { totemColors, colorSelector } from "./GlobalStyles";

const TribesGrid = ({ tribes }) => {
  console.log(tribes);

  console.log(tribes.logo);
  return (
    <Row className={"GRID"}>
      <Grid>
        {console.log(tribes)}
        {tribes !== [] &&
          tribes.map((tribe) => {
            const color = colorSelector(totemColors, tribe.color);
            const fill = color;
            console.log(tribe._id);
            return (
              <Tribe key={tribe.name} to={`/tribe/${tribe._id}`}>
                <LogoSVG viewBox={"0 0 24 24"} style={{ fill }}>
                  {totems[tribe.logo]}
                </LogoSVG>
                <NameDIV style={{ color }}>{tribe.name}</NameDIV>
              </Tribe>
            );
          })}
        <CreateTribeTile to="/newtribe">
          <Plus /> Create a new Tribe
        </CreateTribeTile>
      </Grid>
    </Row>
  );
};

const Row = styled.div`
  width: 100%;
  margin: auto;
`;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: space-around;
  text-align: center;
  color: black;
  align-items: right;
  margin: auto;
`;

const Tribe = styled(NavLink)`
  border-radius: 20px;
  width: 200px;
  height: 200px;
  margin: 30px;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 1);
  -moz-box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 1);
  box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 1);
  text-decoration: none;
  background: none;
  border: none;
  &:hover {
    opacity: 0.5;
  }
`;

const NameDIV = styled.div`
  font-size: 1em;
`;

const LogoSVG = styled.svg`
  width: 120px;
  height: 120px;
`;

const CreateTribeTile = styled(NavLink)`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  margin: 30px;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 1);
  -moz-box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 1);
  box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 1);
  text-decoration: none;
  opacity: 0.2;
  border: dashed grey 2px;
  &:hover {
    opacity: 0.5;
  }
`;

const Plus = styled(FiPlusSquare)`
  font-size: 80px;
`;

export default TribesGrid;
