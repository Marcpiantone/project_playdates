import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = () => {
  const [date, setDate] = useState("");
  return <DatePicker value={date} onChange={(ev) => setDate(ev)} />;
};

export default DateTimePicker;
