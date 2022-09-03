import { useState } from "react";
import styled from "styled-components";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Form } from "./Form";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(1);
  const [padding, setPadding] = useState(0);
  const [numberLastMonth, setNumberLastMonth] = useState("");
  const [prevMonth, setPrevMonth] = useState(1);

  const { setSeletectedDate, seletectedDate } = useContext(UserContext);
  const handleIncrease = () => {
    setCurrentMonth(currentMonth + 1);
    setPadding(padding + 1);
    setPrevMonth(prevMonth - 1);
    setNumberLastMonth(previousMonthNumber - 1);
  };

  const handleDecrease = () => {
    setCurrentMonth(currentMonth - 1);
    setPadding(padding - 1);
    setPrevMonth(prevMonth + 1);
    setNumberLastMonth(previousMonthNumber - 1);
  };

  console.log("test", numberLastMonth);

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

  const monthsInCalender = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dt = new Date();
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const current = new Date();
  current.setMonth(current.getMonth() - prevMonth);
  const previousMonthNumber =
    current.toLocaleString("default", {
      month: "numeric",
    }) - 1;

  // console.log(day, month, year);
  //(18 7 2022) it should 8 not 7, but it's because it's an index value

  const daysInMonth = new Date(year, month + currentMonth, 0).getDate();
  // month +2 will give me september
  // month -1 will give me last month

  // the 3rd value will indicate the first day of the month. When you give it a value of 0 it will provide you the
  //last day of the previous month.
  // 0 (last day of previous month)
  // -1 (second to last day of the previous month)
  // console.log("days in month", new Date(year, month + currentMonth, 0));

  const firstDayOfMonth = new Date(year, month + padding, 1);
  // 1 will give the first day

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  // console.log("date string", dateString);
  const currentMonthNumber = new Date(new Date()).getMonth();
  const currentMonthWord = monthsInCalender[currentMonthNumber];

  console.log("check month in array ", displayedMonthWord);

  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
  const displayedMonthWord = dateString.split(" ")[1];
  const displayedYear = dateString.split(" ")[3];
  // const prevMonth =

  // console.log("padding days", paddingDays);

  let calenderDays = [];
  let paddingArrDays = [];
  let totalDisplayedCalender = [];
  const daySquare = () => {
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      if (i <= paddingDays) {
        let paddingDate = new Date(year, month, -i + 1).getDate();

        const prevMonth = new Date(year, month, -i + 1).toLocaleDateString(
          "en-us",
          {
            month: "long",
          }
        );
        const paddingObj = {
          day: paddingDate,
          monthWord: prevMonth,
          monthNumber: previousMonthNumber,
          year: displayedYear,
        };
        paddingArrDays.push(paddingObj);
        console.log(
          "previous month number ",
          previousMonthNumber,
          "use state:" + numberLastMonth,
          currentMonthNumber
        );
        paddingArrDays.sort(function (a, b) {
          return a.day - b.day;
        });

        // console.log(paddingArrDays, "padding arr days");
      } else if (i > paddingDays) {
        const currentObj = {
          day: i - paddingDays,
          monthNumber: currentMonthNumber,
          monthWord: displayedMonthWord,
          year: displayedYear,
        };

        calenderDays.push(currentObj);
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
  // console.log(totalDisplayedCalender);
  // console.log("what?", new Date(year, month));

  const selectDate = (day) => {
    setSeletectedDate(day.monthWord + " " + day.day + " " + day.year);
  };

  let makeDate = new Date();
  // console.log("Original date: ", makeDate.toString());
  makeDate.setMonth(makeDate.getMonth() - 1);
  let lastMonthData = makeDate.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // console.log("After subtracting a month: ", lastMonthData.split(", "));
  let splitLastMonthData = lastMonthData.split(",");
  let lastMonthNumber = splitLastMonthData[1];
  console.log("actual previous month", lastMonthNumber);

  const isDateBeforeToday = (date) => {
    console.log("date", date);
    let day = date.day;
    let monthNumber = date.monthNumber;
    console.log("number", monthNumber);
    let year = date.year;
    console.log(
      new Date(new Date(year, monthNumber, day).toDateString()) <
        new Date(new Date().toDateString())
    );
  };

  return (
    <>
      <BsFillArrowLeftCircleFill
        onClick={() => {
          handleDecrease();
        }}
      />
      <span>{displayedMonth}</span>
      <BsFillArrowRightCircleFill onClick={() => handleIncrease()} />
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
            {totalDisplayedCalender.map((date, index) => {
              return (
                <Day
                  key={index}
                  onClick={() => {
                    selectDate(date);
                    isDateBeforeToday(date);
                  }}
                >
                  {date.day}
                </Day>
              );
            })}
          </CalenderDays>
        </CalenderContainder>
        <Form />
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
