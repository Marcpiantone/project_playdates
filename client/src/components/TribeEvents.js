import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { numbers } from "./GlobalStyles";
import { FiPlusSquare } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  clearEvents,
  requestEvents,
  receiveEvents,
} from "../store/actions/events";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../store/reducers/events.reducer";

import { getAppUser } from "../store/reducers/user.reducer";

import Event from "./Event";

const TribeEvents = ({ tribeId }) => {
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState(new Date());

  const appUser = useSelector(getAppUser);
  const creatorEmail = appUser.email;

  const handleNewEvent = (tribeId, eventName, date) => {
    fetch("/gatherings", {
      method: "POST",
      body: JSON.stringify({
        tribeId: tribeId,
        eventName: eventName,
        date: date,
        attendees: [creatorEmail],
        creatorEmail: creatorEmail,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  };

  const handleEvents = (tribeId) => {
    dispatch(requestEvents());
    fetch(`/gatherings/${tribeId}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveEvents(json.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleEvents(tribeId);
  }, []);

  const eventsState = useSelector(getEvents);
  const events = eventsState.events;
  const isLoading = eventsState.status === "loading";

  console.log(events);
  console.log(isLoading);

  if (events !== null) {
    events.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  return (
    <DIV>
      <input
        value={eventName}
        placeholder={"New event..."}
        onChange={(ev) => setEventName(ev.target.value)}
      ></input>
      <DatePicker
        showTimeSelect
        selected={date}
        value={date}
        onChange={(ev) => setDate(new Date(ev))}
        minDate={new Date()}
        dateFormat="MMMM do yyyy, h:mm aa"
      />
      <CreateBUTTON
        onClick={() => {
          handleNewEvent(tribeId, eventName, date);
          handleEvents(tribeId);
        }}
      >
        <FiPlusSquare />
      </CreateBUTTON>
      <EventsDIV>
        {!isLoading &&
          events.map((event) => {
            return (
              <Event
                key={event._id}
                event={event}
                handleEvents={handleEvents}
                tribeId={tribeId}
              />
            );
          })}
      </EventsDIV>
    </DIV>
  );
};

const DIV = styled.div`
  padding: 10px;
  color: black;
  min-height: calc(
    100vh - ${numbers.headerFooterHeight}*2 - ${numbers.smallerHeaderHeight}
  );
`;

const CreateBUTTON = styled.button``;

const fadeIn = keyframes`
  from {
opacity:0.1
  }
  to {
  opacity:1
  }`;

const EventsDIV = styled.div`
  animation: ${fadeIn} 2000ms linear;
`;

export default TribeEvents;
