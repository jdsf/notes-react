import React from 'react';



const DayInfo = (props) => {

  let greeting = "";


  if (!window.sessionStorage.notes) {
    window.sessionStorage.setItem("notes", "recently used notes");
    greeting = "Welcome, today is ";
  } else {
    greeting = "";
  }


  const handleDayName = () => {
    let day = props.date.getDay();
    let name;
    if (day === 0) {
      name = "Monday";
    } else if (day === 1) {
      name = "Tuesday";
    } else if (day === 2) {
      name = "Wednesday";
    } else if (day === 3) {
      name = "Thursday";
    } else if (day === 4){
      name = "Friday";
    } else if (day === 5){
      name = "Saturday";
    } else {
      name = "Sunday";
    }
    return name;
  }

  const handleMonth = () => {
    let month = props.date.getMonth();
    let name;

    if (month === 0) {
      name = "January";
    } else if (month === 1) {
      name = "February";
    } else if (month === 2) {
      name = "March";
    } else if (month === 3) {
      name = "April";
    } else if (month === 4) {
      name = "May";
    } else if (month === 5) {
      name = "June";
    } else if (month === 6) {
      name = "July";
    } else if (month === 7) {
      name = "August";
    } else if (month === 8) {
      name = "September";
    } else if (month === 9) {
      name = "October";
    } else if (month === 10) {
      name = "November";
    } else {
      name = "December";
    }
    return name;
  }

  const handleDayNumber = () => {
    let day = props.date.getDate();
    let properDay = day;
    if (day % 10 === 0  || day > 4 && day !== 21
        && day !== 22 && day !== 23) {
      properDay += "th";
    } else if (day % 10 === 1) {
      properDay += "st";
    } else if (day % 10 === 2) {
      properDay += "nd";
    } else {
      properDay += "rd";
    }
    return properDay;
  }


  return (
    <div className = "info">
      <span>
        {greeting}
        <span> {handleDayName()}</span> the
        <span> {handleDayNumber()}</span> of
        <span> {handleMonth()}  </span>
      </span>
    </div>
  )


};


export default DayInfo;
