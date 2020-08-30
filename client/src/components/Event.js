import React from "react";
import styled, { keyframes } from "styled-components";
import { FiCheckSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../store/reducers/events.reducer";
import moment, { format } from "moment";
import { getAppUser } from "../store/reducers/user.reducer";
import { colors } from "./GlobalStyles";

const Event = ({ event }) => {
  const AppUser = useSelector(getAppUser);

  const isOptedIn = event.members.includes(AppUser.email);

  const humanDate = moment(new Date(event.date)).format("DD-MMM @ h:mm A");
  console.log(humanDate);
  return (
    <Eventbox
      style={{
        backgroundColor: isOptedIn ? `${colors.primary}` : `${colors.shadow}`,
      }}
    >
      <Visible>
        <EventName>{event.eventName}</EventName>
        <AlignRight>
          <EventDate>{humanDate}</EventDate>
          <OptInBUTTON>
            <FiCheckSquare /> I'm in
          </OptInBUTTON>
        </AlignRight>
      </Visible>
      <Hidden>
        <div>Posted by : {event.creatorEmail}</div>
        Who's in ?
        {event.members.map((member) => {
          return <>{member}</>;
        })}
      </Hidden>
    </Eventbox>
  );
};

const Eventbox = styled.div`
  min-width: 500px;
  border-radius: 5px;
  margin: 5px;
  padding: 8px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Visible = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EventName = styled.div`
  font-size: 1.2em;
`;

const EventDate = styled.div`
  font-size: 0.7em;
  padding: 3px;
`;

const AlignRight = styled.div`
  display: flex;
  align-items: center;
`;

const Hidden = styled.div`
  display: none;
`;

const OptInBUTTON = styled.button``;

export default Event;
