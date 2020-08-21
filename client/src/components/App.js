import React from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";

function App() {
  return (
    <div>
      <StyledPageWrapper>
        <GlobalStyles />
        <Header />
        <StyledContainer>Content</StyledContainer>
      </StyledPageWrapper>
    </div>
  );
}

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  background: #fafafa;
  min-height: 400px;
  padding: 14px;
`;

export default App;
