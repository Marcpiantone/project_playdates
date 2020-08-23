import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const TribesGrid = () => {
  return (
    <Grid>
      {
        //map.someshit}
      }
    </Grid>
  );
};

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  justify-content: space-between;
  text-align: center;
`;

export default TribesGrid;
