import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiCheckSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../store/reducers/events.reducer";
import moment, { format } from "moment";
import { getAppUser } from "../store/reducers/user.reducer";
import { colors } from "./GlobalStyles";

const Event = ({ event, handleEvents, tribeId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const appUser = useSelector(getAppUser);
  const events = useSelector(getEvents);
  console.log(events);

  const isOptedIn = event.attendees.includes(appUser.email);

  console.log("OPTED IN " + isOptedIn);

  const humanDate = moment(new Date(event.date)).format("DD-MMM @ h:mm A");

  const toggleOptedIn = (email) => {
    fetch(`/gatherings/gathering/${event._id}`, {
      method: "PUT",
      body: JSON.stringify({
        attendee: email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => handleEvents(tribeId))
      .catch((err) => console.error(err));
  };

  return (
    <Eventbox
      key={event._id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isOptedIn
          ? `${colors.primary}`
          : `${colors.lightershadow}`,
        opacity: isOptedIn ? 1 : 0.7,
      }}
    >
      <Visible>
        <EventName>{event.eventName}</EventName>
        <AlignRight>
          <EventDate>{humanDate}</EventDate>
          <OptInBUTTON
            onClick={() => {
              toggleOptedIn(appUser.email);
            }}
          >
            <FiCheckSquare />
            I'm in
          </OptInBUTTON>
        </AlignRight>
      </Visible>
      {isHovered && (
        <Hidden>
          <div>Posted by : {event.creatorEmail}</div>
          Who's in ?
          {event.attendees.map((attendee) => {
            return <div key={attendee}>{attendee}</div>;
          })}
        </Hidden>
      )}
    </Eventbox>
  );
};

const Eventbox = styled.div`
  min-width: 50vw;
  border-radius: 5px;
  margin: 5px;
  padding: 8px;
  color: ${colors.darktext};
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
  font-size: 0.8em;
`;

const OptInBUTTON = styled.button`
  display: flex;
  align-items: center;
  height: 30px;
  border-radius: 5px;
  border: none;
`;

export default Event;
