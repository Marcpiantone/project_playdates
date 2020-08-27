import React, { useEffect } from "react";

import styled, { keyframes } from "styled-components";
import { getTribe } from "../store/reducers/tribe.reducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { requestTribe, receiveTribe } from "../store/actions/tribe";
import Loading from "./Loading";

const Tribe = () => {
  const params = useParams();
  const tribeId = params.id;

  const dispatch = useDispatch();

  const handleTribe = (tribeId) => {
    console.log(tribeId);
    dispatch(requestTribe());
    console.log("requesting");
    fetch(`/tribes/tribe/${tribeId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        dispatch(receiveTribe(json.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleTribe(tribeId);
  }, []);

  const tribeState = useSelector(getTribe);

  const isLoading = tribeState.status === "loading";
  const tribe = tribeState.tribe;

  console.log(tribe);

  return (
    <DIV>
      {isLoading && <Loading />} {!isLoading && <div>{tribe.name}</div>}
    </DIV>
  );
};

const DIV = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export default Tribe;
