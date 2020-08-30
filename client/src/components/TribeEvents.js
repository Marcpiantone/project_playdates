import React, { useState } from "react";
import styled from "styled-components";
import { numbers } from "./GlobalStyles";
import { FiPlusSquare } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";

const TribeEvents = () => {
  const [date, setDate] = useState(new Date());
  console.log(subDays(new Date(), 0));

  return (
    <DIV>
      EVENT HERE
      <input placeholder={"New event..."}></input>
      <DatePicker
        showTimeSelect
        selected={date}
        value={date}
        onChange={(ev) => setDate(ev)}
        minDate={new Date()}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <CreateBUTTON>
        <FiPlusSquare />
      </CreateBUTTON>
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
export default TribeEvents;
