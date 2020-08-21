import React from "react";
import styled from "styled-components";

const Avatar = ({ src }) => <StyledAvatar src={src} />;

const StyledAvatar = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  border: 2px solid white;
  margin: 4px;
`;

export default Avatar;
