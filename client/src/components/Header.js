//Login + Navlinks
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { googleSignIn, signOut } from "../store/actions/auth";
import { getAppUser } from "../store/reducers/user.reducer";

import Avatar from "./Avatar";
import logo from "../assets/2552289-200_white.png";
import { colors } from "./GlobalStyles";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const appUser = useSelector(getAppUser);
  const user = appUser.user ? appUser.user : null;
  const userFirstname = user ? user.displayName.split(" ")[0] : null;

  return (
    <StyledHeader>
      <StyledTitleContainer>
        <Logo src={logo} alt={"Tribes_logo"} />
        <TitleSpan>TRIBES</TitleSpan>
      </StyledTitleContainer>
      {/* {user && user.email ? ( */}
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
          {/* <StyledButton onClick={() => dispatch(signOut())}>
              Log out
            </StyledButton> */}
        </StyledUserContainer>
        {isHovered && (
          <MenuUL
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <LI>Profile</LI>
            <LI>Log Out</LI>
          </MenuUL>
        )}
      </>
      {/* // ) : ( */}
      {/* //     <StyledUserContainer>
    //       <StyledButton onClick={() => dispatch(googleSignIn())}>
    //         Log in
    //       </StyledButton>
    //     </StyledUserContainer>
    //   )} */}
    </StyledHeader>
  );
};

const StyledHeader = styled.nav`
  background: ${colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Logo = styled.img`
  height: 70px;
`;

const TitleSpan = styled.span`
  font-size: 2.5em;
`;

const StyledUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 80px;
`;

const StyledUserP = styled.p`
  height: 100%;
  display: flex;
  align-items: center;
  width: 200px;
  justify-content: center;
`;

const MenuDiv = styled.span`
  font-size: 1.2em;
  transform: rotate(90deg);
  margin: 5px;
`;

const MenuUL = styled.ul`
  background-color: ${colors.secondary};
  z-index: 2;
  top: 80px;
  position: absolute;
  list-style-type: none;
  right: 0px;
  width: 200px;
`;

const LI = styled.li`
  margin-left: 30px;
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
