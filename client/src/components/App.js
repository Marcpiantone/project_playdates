import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Avatar from "./Avatar";

import { googleSignIn, signOut } from "../store/actions/auth";
import { getAppUser } from "../store/reducers/user.reducer";

function App() {
  const appUser = useSelector(getAppUser);
  console.log(appUser);

  const dispatch = useDispatch();

  return (
    <div>
      <StyledPageWrapper>
        <StyledHeader>
          {appUser && appUser.email ? (
            <StyledUserContainer>
              <Avatar src={appUser.photoURL} />
              <p>
                {appUser.displayName} ({appUser.email})
              </p>
              <button onClick={() => dispatch(signOut())}>Sign Out</button>
            </StyledUserContainer>
          ) : (
            <button onClick={() => dispatch(googleSignIn())}>Sign In</button>
          )}
        </StyledHeader>
        <StyledContainer>Content</StyledContainer>
      </StyledPageWrapper>
    </div>
  );
}

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const StyledContainer = styled.div`
  background: #fafafa;
  min-height: 400px;
  padding: 14px;
`;

export default App;
