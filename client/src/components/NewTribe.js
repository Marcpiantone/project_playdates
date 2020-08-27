import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAppUser } from "../store/reducers/user.reducer";
import styled from "styled-components";
import { colors } from "./GlobalStyles";
import { NavLink, useHistory } from "react-router-dom";

const NewTribe = () => {
  const [tribeName, setTribeName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messageBox, setMessageBox] = useState("");

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
        members: members,
        creatorEmail: appUser.email,
        creatorName: appUser.displayName,
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

  const putEmailsInArray = (value) => {
    setMessageBox("");
    const splitOnSpace = value.toLowerCase().split(" ");
    const rejectedEmail = [];
    const splitOnComma = splitOnSpace.toString().split(",");
    const removedUselessSpaceArray = splitOnComma.filter((bit) => bit !== "");

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    removedUselessSpaceArray.forEach((email) => {
      const validated = validateEmail(email);
      if (validated) {
        if (members.indexOf(email) === -1)
          setMembers((members) => [...members, email]);
      } else {
        console.log(email);
        rejectedEmail.push(email);
        setMessageBox(`${rejectedEmail} : unvalid email(s)`);
      }
    });
  };
  console.log(members);

  const removeMember = (member) => {
    let membersCopy = [...members];
    const memberIndex = membersCopy.indexOf(member);
    membersCopy.splice(memberIndex, 1);
    setMembers(membersCopy);
  };

  console.log(members[0]);

  console.log(messageBox);

  return (
    <>
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
            <LABEL htmlFor={"members"}>
              Who are the members of this Tribe?
            </LABEL>
            <INPUT
              id={"members"}
              value={inputValue}
              placeholder={
                members[0] !== undefined
                  ? "Who else ?"
                  : "Send invites now ...or later!"
              }
              onKeyDown={(ev) => {
                console.log(ev.key);
                if (inputValue !== "") {
                  setMessageBox("Press Enter to add member");
                }
                if (ev.key === "Enter") {
                  putEmailsInArray(inputValue);
                  setInputValue("");
                }
              }}
              onChange={(ev) => {
                setInputValue(ev.target.value);
              }}
            ></INPUT>
          </FormDIV>
        </FORM>
        <BottomDIV>
          {messageBox !== undefined && (
            <MessageBoxDIV>{messageBox}</MessageBoxDIV>
          )}
          <EmailTagsDIV>
            {members.map((member) => {
              return (
                <EmailTags key={members.indexOf(member)}>
                  {member}
                  <RemoveButton onClick={() => removeMember(member)}>
                    x
                  </RemoveButton>
                </EmailTags>
              );
            })}
          </EmailTagsDIV>
          <ButtonDIV>
            <ButtonWrapper>
              <HomeBUTTON to={"/"}>Cancel</HomeBUTTON>
              {tribeName && (
                <CreateBUTTON
                  onClick={() => {
                    putEmailsInArray(inputValue);
                    handleNewTribe(tribeName, description, members, appUser);
                  }}
                >
                  Create
                </CreateBUTTON>
              )}
            </ButtonWrapper>
          </ButtonDIV>
        </BottomDIV>
      </DIV>
    </>
  );
};

const DIV = styled.div`
  position: absolute;
  top: 150px;
`;

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
  margin-bottom: 10px;
`;

const FormDIV = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
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

const MessageBoxDIV = styled.div`
  text-align: right;
  font-size: 0.8em;
  color: ${colors.accent};
`;

const EmailTagsDIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
`;

const EmailTags = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lighttext};
  color: ${colors.buttons};
  font-size: 0.8em;
  margin: 3px;
  padding: 2px;
  border-radius: 5px;
  border: ${colors.buttons} solid 1px;
`;

const RemoveButton = styled.button`
  border-radius: 5px;
  border: none;
  background-color: ${colors.buttons};
  color: ${colors.lighttext};
  margin: 2px;
  cursor: pointer;
`;

const BottomDIV = styled.div`
  height: 150px;
`;

const ButtonDIV = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const HomeBUTTON = styled(NavLink)`
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
  margin-left: 10px;
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
