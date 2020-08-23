import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { numbers } from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import LandingPage from "./LandingPage";
import Profile from "./Profile";
import About from "./About";

function App() {
  return (
    <StyledPageWrapper>
      <GlobalStyles />
      <Router>
        <Header />
        <StyledPage>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/landing">
              <LandingPage />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </StyledPage>
        <Footer />
      </Router>
    </StyledPageWrapper>
  );
}

const StyledPageWrapper = styled.div`
  position: relative;
  height: 100vh;
`;

const StyledPage = styled.div`
  /* height: calc(100vh- (2 * ${numbers.headerFooterHeight})); */
  height : 600px;
`;

export default App;
