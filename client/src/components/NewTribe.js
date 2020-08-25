import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAppUser } from "../store/reducers/user.reducer";
import styled from "styled-components";
import { colors } from "./GlobalStyles";
import { NavLink, useHistory } from "react-router-dom";

const NewTribe = () => {
  const [tribeName, setTribeName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");

  const history = useHistory();

  const appUser = useSelector(getAppUser);

  const handleNewTribe = (tribeName, description, members, appUser) => {
    if (!tribeName) {
      return;
    }
    console.log(tribeName);
    fetch("/tribes", {
      method: "POST",
      body: JSON.stringify({
        name: tribeName,
        description: description,
        creator: appUser.email,
        creatorId: appUser.uid,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => history.goBack())
      .catch((err) => console.error(err));
  };

  const missionsArray = [
    "Destroy the Ring",
    "Save Hyrule",
    "Save Earth from Daleks",
    "Project Mayhem",
    "Find Jack Sparrow's treasure",
    "Be the first Humans on Mars",
  ];

  const namesArray = [
    "The Justice League",
    "The Avengers",
    "The Fellowship of the Ring",
    "The Fight Club",
    "The Pirate Crew",
    "The SpaceX Program",
  ];

  const missionPlaceholder =
    missionsArray[Math.floor(Math.random() * missionsArray.length)];

  const namePlaceholder =
    namesArray[Math.floor(Math.random() * namesArray.length)];

  return (
    <DIV>
      <TitleDiv> So... You're starting a new Tribe ?</TitleDiv>
      <FORM autoComplete={"off"}>
        <FormDIV>
          <LABEL htmlFor={"name"}>How should we name it?</LABEL>
          <INPUT
            id={"name"}
            placeholder={namePlaceholder}
            onChange={(ev) => setTribeName(ev.target.value)}
          ></INPUT>
        </FormDIV>
        <FormDIV>
          <LABEL htmlFor={"description"}>And you have a mission?</LABEL>
          <INPUT
            id={"description"}
            placeholder={missionPlaceholder}
            onChange={(ev) => setDescription(ev.target.value)}
          ></INPUT>
        </FormDIV>
        <FormDIV>
          <LABEL htmlFor={"members"}>Who are the members of this Tribe?</LABEL>
          <INPUT
            id={"members"}
            placeholder={"Send invites now ...or later!"}
            onChange={(ev) => setMembers(ev.target.value)}
          ></INPUT>
        </FormDIV>
      </FORM>
      <ButtonDIV>
        <HomeBUTTON to={"/"}>Cancel</HomeBUTTON>
        {tribeName && (
          <CreateBUTTON
            onClick={() => {
              handleNewTribe(tribeName, description, members, appUser);
            }}
          >
            Create
          </CreateBUTTON>
        )}
      </ButtonDIV>
    </DIV>
  );
};

const DIV = styled.div``;

const TitleDiv = styled.div`
  color: ${colors.shadow};
  font-size: 3em;
  padding: 30px;
  text-align: center;
`;

const FORM = styled.form`
  display: flex;
  flex-direction: column;
  color: ${colors.darktext};
`;

const FormDIV = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const LABEL = styled.label`
  font-size: 1.5em;
`;

const INPUT = styled.input`
  outline: none;
  border: solid 1px ${colors.shadow};
  border-radius: 5px;
  width: 350px;
  height: 40px;
  font-size: 1.5em;
  &::placeholder {
    color: ${colors.shadow};
  }
`;

const ButtonDIV = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const HomeBUTTON = styled(NavLink)`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.shadow};
  color: ${colors.lighttext};
  border-radius: 10px;
  height: 40px;
  width: 80px;
  &:hover {
    opacity: 0.5;
  }
`;

const CreateBUTTON = styled.button`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
  color: ${colors.lighttext};
  border-radius: 10px;
  height: 40px;
  width: 80px;
  &:hover {
    opacity: 0.5;
  }
  font-size: 1em;
  border: none;
  cursor: pointer;
`;
export default NewTribe;
