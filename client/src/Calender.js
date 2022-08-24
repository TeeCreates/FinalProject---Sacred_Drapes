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

  const firstDayOfMonth = new Date(year, month + padding, 1);
  // 1 will give the first day

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // console.log("date string", dateString);

  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
  const displayedMonth = dateString.split(" ")[1];

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
    paddingArrDays.forEach((day) => {
      totalDisplayedCalender.push(day);
    });

    calenderDays.forEach((day) => {
      totalDisplayedCalender.push(day);
    });
  };
  daySquare();
  console.log(totalDisplayedCalender);

  console.log("what?", new Date(year, month));
  return (
    <>
      <button onClick={() => handleDecrease()}>decrease</button>
      <button onClick={() => handleIncrease()}>increase</button>
      <span>{displayedMonth}</span>
      <Wrapper>
        <CalenderContainder>
          <Weekdays>
            <div>Sunday</div>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
          </Weekdays>
          <CalenderDays>
            {totalDisplayedCalender.map((day) => {
              return <Day>{day}</Day>;
            })}
          </CalenderDays>
        </CalenderContainder>
        <p>Please select the date you wish to submit</p>
      </Wrapper>
    </>
  );
};
export default Calender;
const Day = styled.div`
  height: 100px;
  width: 100px;
  border: 1px solid black;
`;

const Weekdays = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 700px;
`;

const CalenderDays = styled.div`
  width: 770px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
`;

const CalenderContainder = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
