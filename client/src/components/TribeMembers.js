import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "./GlobalStyles";
import { FiPlusSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { getTribe } from "../store/reducers/tribe.reducer";

const TribeMembers = ({ tribeId, handleTribe }) => {
  const [newMember, setNewMember] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [messageBox, setMessageBox] = useState("");

  const tribeState = useSelector(getTribe);
  const tribe = tribeState.tribe;
  const members = tribe.members;
  const isLoading = tribeState.status === "loading";

  console.log(tribe);

  const handleUpdateTribe = (newMember) => {
    if (!newMember) {
      return;
    }
    if (members.includes(newMember)) {
      return;
    }
    fetch(`/tribes/tribe/${tribeId}`, {
      method: "PUT",
      body: JSON.stringify({ members: newMember }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
        handleTribe(tribeId);
      })
      .catch((err) => console.error(err));
  };

  return (
    <MembersDIV>
      <AddButton
        onClick={() => {
          setInputVisible(true);
          if (inputVisible) {
            handleUpdateTribe(newMember);
          }
          setNewMember("");
        }}
      >
        <Plus /> Invite
      </AddButton>
      {isLoading && <Loading />}
      <AddMemberInput
        onKeyDown={(ev) =>
          ev.key === "Enter" ? handleUpdateTribe(newMember) : null
        }
        value={newMember}
        placeholder={"Type member's email"}
        style={{ display: inputVisible ? "block" : "none" }}
        onChange={(ev) => setNewMember(ev.target.value)}
      ></AddMemberInput>
      {!isLoading &&
        members.map((member, index) => <div key={index}>{member}</div>)}
    </MembersDIV>
  );
};

const MembersDIV = styled.div`
  color: ${colors.darktext};
  width: 250px;
  border-right: solid 1px ${colors.lightershadow};
  padding: 10px;
`;

const AddMemberInput = styled.input`
  font-size: 1em;
  border: none;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  color: ${colors.lighttext};
  padding: 3px;
  margin: 0 auto;
  background: ${colors.buttons};
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.5;
  }
`;

const Plus = styled(FiPlusSquare)`
  height: 25px;
  width: 25px;
`;
export default TribeMembers;
