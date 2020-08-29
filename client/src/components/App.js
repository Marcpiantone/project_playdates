import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import { numbers } from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Profile from "./Profile";
import About from "./About";
import Fourofour from "./Fourofour";
import NewTribe from "./NewTribe";
import Tribe from "./Tribe";

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
            <Route exact path="/tribe/:id" component={Tribe} />
            <Route exact path="/newtribe" component={NewTribe} />
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

const StyledPage = styled.div``;

export default App;
