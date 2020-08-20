//Login + Navlinks
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Avatar from "./Avatar";

import { googleSignIn, signOut } from "../store/actions/auth";
import { getAppUser } from "../store/reducers/user.reducer";

const Header = () => {
  const dispatch = useDispatch();
  const appUser = useSelector(getAppUser);
  return (
    <StyledHeader>
      {appUser.user && appUser.user.email ? (
        <StyledUserContainer>
          <Avatar src={appUser.user.photoURL} />
          <p>
            {appUser.user.displayName} ({appUser.user.email})
          </p>
          <button onClick={() => dispatch(signOut())}>Sign Out</button>
        </StyledUserContainer>
      ) : (
        <button onClick={() => dispatch(googleSignIn())}>
          Sign In using Google
        </button>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.nav`
  background: #eaeaea;
  padding: 6px 14px;
  min-height: 48px;
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

export default Header;
