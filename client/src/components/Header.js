//Login + Navlinks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { NavLink, useHistory } from "react-router-dom";

import {
  googleSignIn,
  signOut,
  returningUserSignin,
} from "../store/actions/auth";
import { getAppUser, getAppUserStatus } from "../store/reducers/user.reducer";
import { clearTribes } from "../store/actions/tribes";

import logo from "../assets/logo_white.png";
import { colors, numbers } from "./GlobalStyles";
import { getTribesLetter } from "../assets/tribes-totems/totems";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const appUser = useSelector(getAppUser);

  const status = useSelector(getAppUserStatus);

  console.log(status);

  useEffect(() => {
    dispatch(returningUserSignin());
  }, []);

  const userFirstname = appUser.displayName
    ? appUser.displayName.split(" ")[0]
    : null;

  const goHome = () => {
    history.push("/");
  };

  const tribesLetter = getTribesLetter("25px", "white");

  console.log(typeof tribesLetter);
  return (
    <StyledHeader className={"Header"}>
      <StyledTitleContainerLink to="/">
        <Logo src={logo} alt={"Tribes_logo"} />
        {tribesLetter.map((letter, index) => {
          return <div key={index}>{letter}</div>;
        })}
      </StyledTitleContainerLink>
      {status === "loading" ? (
        <></>
      ) : status === "idle" ? (
        <>
          <StyledUserContainer>
            <StyledUserP
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Welcome, {userFirstname}
              {!isHovered && <MenuDiv>⪢</MenuDiv>}
              {isHovered && <MenuDiv>⪡</MenuDiv>}
            </StyledUserP>
          </StyledUserContainer>
          {isHovered && (
            <MenuUL
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <LI>
                <StyledNavLink to="/profile">Profile</StyledNavLink>
              </LI>
              <LI>
                <StyledNavLink
                  to="/"
                  onClick={() => {
                    dispatch(signOut());
                    dispatch(clearTribes());
                  }}
                >
                  Log out
                </StyledNavLink>
              </LI>
            </MenuUL>
          )}
        </>
      ) : (
        <StyledUserContainer>
          <StyledButton
            onClick={() => {
              dispatch(googleSignIn());
              setIsHovered(false);
              goHome();
            }}
          >
            Log in
          </StyledButton>
        </StyledUserContainer>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  background: ${colors.primary};
  top: 0px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${numbers.headerFooterHeight};
  padding-right: 20px;
`;

const StyledTitleContainerLink = styled(NavLink)`
  color: white;
  display: flex;
  align-items: center;
  padding: 5px;
  &:hover {
    opacity: 0.5;
  }
`;

const Logo = styled.img`
  height: 70px;
`;

const StyledUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: ${numbers.headerFooterHeight};
`;

const fadeIn = keyframes`
  from {
opacity:0.1
  }
  to {
  opacity:1
  }`;

const StyledUserP = styled.p`
  height: 100%;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 150px;
  justify-content: center;
  cursor: default;
  animation: ${fadeIn} 700ms linear;
  &:hover {
    opacity: 0.5;
  }
`;

const MenuDiv = styled.span`
  font-size: 1.2em;
  transform: rotate(90deg);
  margin: 5px;
`;

const MenuUL = styled.ul`
  background-color: ${colors.secondary};
  z-index: 1;
  top: ${numbers.headerFooterHeight};
  position: absolute;
  list-style-type: none;
  right: 0px;
  min-width: 150px;
  padding: 5px;
  box-shadow: 0px 5px 15px 0px ${colors.shadow};
`;

const LI = styled.li`
  padding-left: 30px;
  padding-top: 3px;
  padding-bottom: 3px;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
`;

const StyledButton = styled.button`
  border: none;
  align-self: center;
  background-color: ${colors.secondary};
  font-size: 1.2em;
  padding: 10px;
  margin: 15px;
  cursor: pointer;
`;

export default Header;
