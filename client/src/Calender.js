import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(1);
  const [padding, setPadding] = useState(0);

  const handleIncrease = () => {
    setCurrentMonth(currentMonth + 1);
    setPadding(padding + 1);
  };

  const handleDecrease = () => {
    setCurrentMonth(currentMonth - 1);
    setPadding(padding - 1);
  };

  let nav = 0; //keep track of current month
  let clicked = null;
  let events = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : [];

  // THIS ARRAY WILL HELP DETERMINE HOW MANY PADDING DAYS WE WILL NEED
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dt = new Date();
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  // console.log(day, month, year);
  //(18 7 2022) it should 8 not 7, but it's because it's an index value

  const daysInMonth = new Date(year, month + currentMonth, 0).getDate();
  // month +2 will give me september
  // month -1 will give me last month

  // the 3rd value will indicate the first day of the month. When you give it a value of 0 it will provide you the
  //last day of the previous month.
  // 0 (last day of previous month)
  // -1 (second to last day of the previous month)
  console.log("days in month", new Date(year, month + currentMonth, 0));
  console.log("month", month);

  const firstDayOfMonth = new Date(year, month + padding, 1);
  // 1 will give the first day

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  // console.log("date string", dateString);

  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  console.log("padding days", paddingDays);

  let calenderDays = [];
  let paddingArrDays = [];
  let totalDisplayedCalender = [];
  const daySquare = () => {
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      if (i <= paddingDays) {
        let paddingDate = new Date(year, month, -i + 1).getDate();
        console.log("padding date", paddingDate);

        paddingArrDays.push(paddingDate);

        paddingArrDays.sort(function (a, b) {
          return a - b;
        });
      } else if (i > paddingDays) {
        calenderDays.push(i - paddingDays);
      }
    }
    totalDisplayedCalender.push(paddingArrDays);
    totalDisplayedCalender.push(calenderDays);
  };
  daySquare();
  console.log(totalDisplayedCalender);
  return (
    <>
      <button onClick={() => handleDecrease()}>decrease</button>
      <button onClick={() => handleIncrease()}>increase</button>

      <Weekdays>
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </Weekdays>
      {totalDisplayedCalender.map((day) => {
        return <span>{day}</span>;
      })}
    </>
  );
};
export default Calender;
const Day = styled.div`
  margin: 5px;
`;

const Weekdays = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 770px;
`;
