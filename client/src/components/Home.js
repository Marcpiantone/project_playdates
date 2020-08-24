//My tribes... My events...

import React, { useEffect } from "react";
import styled from "styled-components";
import TribesGrid from "./TribesGrid";
import { useDispatch, useSelector } from "react-redux";
import { getAppUser } from "../store/reducers/user.reducer";
import { receiveTribes } from "../store/actions/tribes";
import { getTribes } from "../store/reducers/tribes.reducer";
import Loading from "./Loading";
import LandingPage from "./LandingPage";

const Home = () => {
  const dispatch = useDispatch();
  const appUser = useSelector(getAppUser);
  const user = appUser.user ? appUser.user : null;
  const userUid = appUser.user ? user.uid : null;
  const tribesState = useSelector(getTribes);
  const isLoading = tribesState.status === "loading";

  const handleTribes = (userUid) => {
    fetch(`/tribes/${userUid}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveTribes(json.data));
      })
      .catch((err) => console.log(err));
  };
  console.log(!user);
  useEffect(() => {
    if (!user) {
      return;
    }
    handleTribes(userUid);
  }, [userUid, TribesGrid]);

  return (
    <DIV className={"PageWrapper"}>
      {!user ? (
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
