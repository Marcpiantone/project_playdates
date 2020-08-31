import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getAppUser } from "../store/reducers/user.reducer";
import styled, { keyframes } from "styled-components";
import { colors, numbers } from "./GlobalStyles";
import { NavLink, useHistory } from "react-router-dom";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const NewTribe = () => {
  const [tribeName, setTribeName] = useState("");
  const [logo, setLogo] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messageBox, setMessageBox] = useState("");
  const [divVisible, setDivVisible] = useState(1);

  const history = useHistory();

  const appUser = useSelector(getAppUser);

  const handleNewTribe = (
    tribeName,
    description,
    members,
    appUser,
    logo,
    color
  ) => {
    if (!tribeName) {
      return;
    }
    members.push(appUser.email);
    console.log(tribeName);
    fetch("/tribes", {
      method: "POST",
      body: JSON.stringify({
        name: tribeName,
        logo: logo,
        color: color,
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

  const removeMember = (member) => {
    let membersCopy = [...members];
    const memberIndex = membersCopy.indexOf(member);
    membersCopy.splice(memberIndex, 1);
    setMembers(membersCopy);
  };

  return (
    <DIV>
      <SliderBUTTON
        style={{ visibility: divVisible > 1 ? "visible" : "hidden" }}
        onClick={() => (divVisible > 1 ? setDivVisible(divVisible - 1) : null)}
      >
        <FiArrowLeft />
      </SliderBUTTON>

      <FORM>
        <TitleDiv> So... You're starting a new Tribe ?</TitleDiv>
        <FormDIV style={{ display: divVisible !== 1 ? "none" : null }}>
          <LABEL htmlFor={"name"}>How should we name it?</LABEL>
          <INPUT
            id={"name"}
            placeholder={namePlaceholder}
            onChange={(ev) => setTribeName(ev.target.value)}
          ></INPUT>
        </FormDIV>
        <FormDIV style={{ display: divVisible !== 2 ? "none" : null }}>
          <LABEL htmlFor={"description"}>And you have a mission?</LABEL>
          <INPUT
            id={"description"}
            placeholder={missionPlaceholder}
            onChange={(ev) => setDescription(ev.target.value)}
          ></INPUT>
        </FormDIV>
        <FormDIV style={{ display: divVisible !== 3 ? "none" : null }}>
          <LABEL htmlFor={"members"}>Who are the members of this Tribe?</LABEL>
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
            <MembersINPUT
              id={"members"}
              value={inputValue}
              placeholder={
                members[0] !== undefined
                  ? "...who else ?"
                  : "Send invites now ...or later!"
              }
              onKeyDown={(ev) => {
                console.log(ev.key);
                if (ev.key === "Enter") {
                  putEmailsInArray(inputValue);
                  setInputValue("");
                }
              }}
              onChange={(ev) => {
                if (inputValue !== "") {
                  setMessageBox("Press ⏎ enter to add member");
                }
                setInputValue(ev.target.value);
              }}
            ></MembersINPUT>
          </EmailTagsDIV>
          {messageBox !== undefined && (
            <MessageBoxDIV>{messageBox}</MessageBoxDIV>
          )}
        </FormDIV>
      </FORM>
      <SliderBUTTON
        style={{ visibility: divVisible < 3 ? "visible" : "hidden" }}
        onClick={() => (divVisible < 3 ? setDivVisible(divVisible + 1) : null)}
      >
        <FiArrowRight />
      </SliderBUTTON>
      <BottomDIV>
        <ButtonDIV>
          <ButtonWrapper>
            <HomeBUTTON to={"/"}>Cancel</HomeBUTTON>
            {tribeName && (
              <CreateBUTTON
                onClick={() => {
                  handleNewTribe(
                    tribeName,
                    description,
                    members,
                    appUser,
                    logo,
                    color
                  );
                }}
              >
                Create
              </CreateBUTTON>
            )}
          </ButtonWrapper>
        </ButtonDIV>
      </BottomDIV>
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - ${numbers.headerFooterHeight}*2);
`;

const SliderBUTTON = styled.button`
  background: none;
  border: none;
  height: 100px;
  width: 100px;
  font-size: 3em;
  color: ${colors.shadow};
`;

const TitleDiv = styled.div`
  color: ${colors.shadow};
  font-size: 3em;
  padding: 30px;
  text-align: center;
`;

const fadeIn = keyframes`
  from {
opacity:0.1
  }
  to {
  opacity:1
  }`;

const FORM = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.darktext};
  margin-bottom: 10px;
`;

const FormDIV = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
  animation: ${fadeIn} 700ms linear;
`;

const LABEL = styled.label`
  font-size: 1.5em;
`;

const INPUT = styled.input`
  outline: none;
  border: solid 1px ${colors.shadow};
  border-radius: 5px;
  width: 100%;
  height: 40px;
  font-size: 1.5em;
  &::placeholder {
    color: ${colors.shadow};
  }
`;

const MembersINPUT = styled.input`
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
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
  border: solid 1px ${colors.shadow};
  border-radius: 5px;
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
