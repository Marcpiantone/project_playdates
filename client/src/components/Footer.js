import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { colors, numbers } from "./GlobalStyles";

const Footer = () => {
  return (
    <StyledFooterDiv>
      <LinkBox>
        <StyledNavLink to="/about">About</StyledNavLink>
      </LinkBox>
    </StyledFooterDiv>
  );
};

const StyledFooterDiv = styled.div`
  bottom: -${numbers.headerFooterHeight};
  position: absolute;
  background: ${colors.accent};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${numbers.headerFooterHeight};
  width: 100%;
`;

const LinkBox = styled.div`
  margin: 20px;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  &:hover {
    opacity: 0.5;
  }
`;

export default Footer;
