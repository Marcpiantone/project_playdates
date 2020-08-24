import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FiPlusSquare } from "react-icons/fi";

const TribesGrid = ({ tribes }) => {
  console.log(tribes);
  return (
    <Row className={"GRID"}>
      <Grid>
        {console.log(tribes)}
        {tribes !== [] &&
          tribes.map((tribe) => {
            return <Tribe key={tribe.name}>{tribe.name}</Tribe>;
          })}
        <CreateTribeTile>
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

const Tribe = styled.button`
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

const CreateTribeTile = styled.button`
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
