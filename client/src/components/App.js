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
import Fourofour from "./Fourofour";

function App() {
  return (
    <StyledPageWrapper className={"PageWrapper"}>
      <GlobalStyles />
      <Router>
        <Header />
        <StyledPage>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/about" component={About} />
            <Route component={Fourofour} />
          </Switch>
        </StyledPage>
        <Footer />
      </Router>
    </StyledPageWrapper>
  );
}

const StyledPageWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const StyledPage = styled.div`
  min-height: calc(100vh - ${numbers.headerFooterHeight}*2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
