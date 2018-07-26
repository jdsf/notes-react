import React, { Component } from 'react';
import Entries from './Entries';
import Button from './Button';


class DisplayEntries extends Component {
  constructor (props) {
    super(props);

  }


  render() {

    const handleDay = (position, dayName, currentMonth) => {
      let dayNum = position.day;
      let currentDayEntries = currentMonth[dayNum][dayName];

      return (
        <div>
          <Entries key = {dayNum} click = {this.props.showEntry}
            entries = {currentDayEntries}
            position = {JSON.stringify(position)}>
          </Entries>
          <br/>
        </div>
      );
    }


    const handleMonth = (position, monthName, monthsArray) => {
      let monthNum = position.month;
      let monthGroup = [];
      let currentMonth = monthsArray[monthNum][monthName];
      for (let i = 0; i < currentMonth.length; i++) {
        let day =  Object.keys(currentMonth[i])[0];
        position.day = i;
      let dayHeading = (
          <div className = "dayGroup" >
            <h5 className = "day underline"> <span> {day} </span> </h5>
            {handleDay(position, day, currentMonth)}
          </div>
        );
        monthGroup.push(dayHeading);
      }

      return monthGroup;
    }

    const handleYear = (position) => {
      let year = position.year;
      let yearGroup = [];
      let monthsArray = this.props.entries[year];
      for (let i = 0; i < monthsArray.length; i++) {
        let month = Object.keys(monthsArray[i])[0];
        position.month = i;
      let monthHeading = (
          <div className = "monthGroup">
            <h4 className = "month"> {month} </h4>
              <div className = "days ">
                {handleMonth(position, month, monthsArray)}
              </div>
          </div>
        );
        yearGroup.push(monthHeading);
      }

      return yearGroup;
    }

    const createEntryDisplay = () => {
      let section = [];
      let yearHeading;
      let position = this.props.editPosition;

      let allYears =  Object.keys(this.props.entries);
      for (let i = 0; i < allYears.length; i++) {
        let year = allYears[i];
        position.year = year;
        yearHeading = (
          <div className = "yearGroup">
           <h3 className = "year decorated"> <span> {"  " + year + "  "} </span> </h3>
           <div className = "months">
             {handleYear(position)}
           </div>
          </div>
        );

        section.push(yearHeading);
      }

      if (section.length === 0) {
        section.push (
          <p> No entries whatsoever! Let us do something about that :) </p>
        );
      }

      section = (
        <div className = "years">
        {section}
        </div>
      );


      return section;

    }


    return(
      <div>
       <main>
         <header>
           <h1 className = "decorated">
             <span>   {this.props.header}   </span>
           </h1>
         </header>
         {createEntryDisplay()}
         <div className = "buttons">
           <Button click = {this.props.goBack} name = "new"> </Button>
         </div>
       </main>
     </div>



    );
  }
}


export default DisplayEntries;
