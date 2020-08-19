import React, { useContext } from "react";
import styled from "styled-components";

import "./App.css";

import { AppContext } from "./AppContext";

import Avatar from "./components/Avatar";

function App() {
  const { appUser, signInWithGoogle } = useContext(AppContext);
  console.log(appUser);
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
            </StyledUserContainer>
          ) : (
            <button onClick={signInWithGoogle}>Sign In</button>
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
