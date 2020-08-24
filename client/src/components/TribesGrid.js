import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const TribesGrid = ({ tribes }) => {
  return (
    <Grid>
      {console.log(tribes)}
      {tribes.map((tribe) => {
        return <Tribe>{tribe.name}</Tribe>;
      })}
    </Grid>
  );
};

const Grid = styled.section`
  color: black;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  justify-content: space-between;
  text-align: center;
`;

const Tribe = styled.div``;

export default TribesGrid;
