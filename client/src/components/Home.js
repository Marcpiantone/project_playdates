import React, { useEffect } from "react";
import styled from "styled-components";
import TribesGrid from "./TribesGrid";
import { useDispatch, useSelector } from "react-redux";
import { getAppUser } from "../store/reducers/user.reducer";
import { receiveTribes, requestTribes } from "../store/actions/tribes";
import { getTribes } from "../store/reducers/tribes.reducer";
import Loading from "./Loading";
import LandingPage from "./LandingPage";

const Home = () => {
  const dispatch = useDispatch();
  const appUser = useSelector(getAppUser);
  const userUid = appUser ? appUser.uid : null;
  const tribesState = useSelector(getTribes);
  const isLoading = tribesState.status === "loading";

  const handleTribes = (userUid) => {
    dispatch(requestTribes());
    fetch(`/tribes/${userUid}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveTribes(json.data));
      })
      .catch((err) => console.log(err));
  };
  console.log(userUid);
  console.log(!userUid);

  useEffect(() => {
    if (!userUid) {
      return;
    }
    handleTribes(userUid);
  }, [userUid]);

  return (
    <DIV className={"PageWrapper"}>
      {!userUid ? (
        <LandingPage />
      ) : isLoading ? (
        <Loading />
      ) : (
        <TribesGrid tribes={tribesState.tribes}></TribesGrid>
      )}
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export default Home;
