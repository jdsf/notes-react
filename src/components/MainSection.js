import React, { Component } from 'react';
import Entries from './Entries';
import Editor from './Editor';
import Button from './Button';
import DayInfo from './DayInfo';

import { CSSTransition, TransitionGroup } from 'react-transition-group'






class MainSection extends Component {


  state = {
    header: "home",
    showEntries: true,
    entries:
      { "2018":
        [{ January:
         [{ "1":
               [{  title: "sample title",
                   content: "try editing, deleting or adding your own!",
               }]
           },
           { "2":
                 [{  title: "sample title",
                     content: "try editing, deleting or adding your own!",
                 }]
            }
          ]
         },
         { July:
          [{ "7":
                [{  title: "sample title",
                    content: "try editing, deleting or adding your own!",
                }]
            }]
          }]
      },
    newEntry: {
                title: "default title",
                content: "default content"
              },
    editEntry: {
                title: "default",
                content: "default content"
              },
    editPosition: {year: 0, month: 0, day: 0, position: 0}
  };

  componentWillMount() {

    window.localStorage.setItem("notes", JSON.stringify(this.state.entries));
    if (window.localStorage.notes) {
      let notes = JSON.parse(window.localStorage.notes);
      if (this.state.entries !== notes) {
        this.setState({
          entries: notes
        });
      }
    } else {
      window.localStorage.setItem("notes", JSON.stringify(this.state.entries));
    }




  }

  render() {

    const changeView = () => {
      this.setState({
        showEntries: !this.state.showEntries
      });

      if (this.state.showEntries) {
        this.setState({
          header: "editor"
        });
      } else {
        this.setState({
          header: "home"
        });
      }
   }

   const resetEdit = () => {
     this.setState({
       editEntry: {title: "default", content: "default"}
     });

     this.setState({
       editPosition: {year: 0, month: 0, day: 0, position: 0}
     });
   }

   const goBack = () => {
     resetEdit();
     changeView();
   }

   const updateStorage = (entries) => {
     let notes = JSON.stringify(entries);
     window.localStorage.notes = notes;
   }

   const trackText = (field, value) => {

     if (this.state.editEntry.title === "default") {
       this.setState({
         newEntry: {...this.state.newEntry, [field]: value}
       });
     } else {
       this.setState({
         editEntry: {...this.state.editEntry, [field]: value}
       });
     }

   }

   /*
   entries:
     { "2018":
       [{ July:
         [{ "7":
               [{  title: "sample title",
                   content: "try editing, deleting or adding your own!",
               }]
           }]
        }]
     }
   */


   const addEntry = () => {
     let today = growTree(this.state.entries); // today = [year, month, day]
     let entriesCopy = this.state.entries;
     let change;



     if (this.state.editEntry.title === "default") {
       let monthsArray = entriesCopy[today[0]];
       let monthPos = monthsArray.length - 1;
       let monthObj = monthsArray[monthPos];
       let daysArray = monthObj[today[1]];
       let dayPos = daysArray.length - 1;
       let dayObj = daysArray[dayPos];
       let entriesArray = dayObj[today[2]];
       entriesArray.concat(this.state.newEntry);
       dayObj[today[2]] = entriesArray;
       daysArray[dayPos] = dayObj;
       monthObj[today[1]] = daysArray;
       monthsArray[monthPos] = monthObj;
       entriesCopy[today[0]] = monthsArray;
     } else {
       let newEntry = this.state.newEntry;
       let editYear = this.state.editPosition.year;
       let editMonth = this.state.editPosition.month;
       let editMonthName = Object.keys(entriesCopy[editYear][editMonth])[0];
       let editDay = this.state.editPosition.day;
       let editPos = this.state.editPosition.position;
       entriesCopy[editYear][editMonth][editMonthName][editDay][editDay][editPos] = newEntry;
     }

     change = entriesCopy;

     this.setState({
       entries: change
     });

     updateStorage(change);
     goBack();
   }

   /*  Helper function, checks if the current state contains a branch
       for the particular year, month, and day when it is called
       (in that order). If no such branch exists then it is added with an
       empty array such that a new end leaf can be added. If the
       current state has a branch for the current date then no change is made.
       Ensures that the end of the branch is always the current date.
       Returns the name of the current date's month and day
   */
   const growTree = (entriesByYear) => {
     let date = new Date();
     let months = ["January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October",
                    "November", "December"
                  ];
     let currentYear = date.getFullYear();
     let currentDay = (date.getDate());
     let currentMonth = months[date.getMonth()];
     let entriesByYearOriginal = entriesByYear;

     let monthObj = {};
     let dayObj = {};
     dayObj[currentDay] = [];
     monthObj[currentMonth] = [];
     monthObj[currentMonth].push(dayObj);


     if (!entriesByYear.hasOwnProperty(currentYear)){
       entriesByYear[currentYear] = [monthObj];
     } else {
       let entriesByMonth = entriesByYear[currentYear];
       let position = -1;
       for (let i = 0; i < entriesByMonth.length; i++) {
         if (entriesByMonth[i].hasOwnProperty(currentMonth)) {
           position = i;
         }
       }

       if (position == -1) {
         entriesByMonth.push(monthObj);
       } else {
         let entriesByDay = entriesByMonth[position][currentMonth];
         let pos = -1;
         for (let i = 0; i < entriesByDay.length; i++) {
           if (entriesByDay[i].hasOwnProperty(currentDay)) {
             pos = i;
           }
         }
         if (pos == -1) {
           entriesByDay.push(dayObj);
           entriesByMonth[position][currentMonth] = entriesByDay;
         }
       }
       entriesByYear[currentMonth] = entriesByMonth;
     }


     if (JSON.stringify(entriesByYear) !==
         JSON.stringify(entriesByYearOriginal)) {
           this.setState({
             entries: entriesByYear
           });
     }

     return [currentYear, currentMonth, currentDay];
   }

   const showEntry = (position) => {

     console.log(position);
     let pos = JSON.parse(position);
     let year = pos.year;
     let month = pos.month;
     let day = pos.day;
     let index = pos.position;

     let confirm = window.confirm("Edit this entry?");

     if (confirm) {
       console.log(month);
       console.log(year);
       let monthObject = this.state.entries[year][month];
       let monthName = Object.keys(monthObject)[0];
       let dayNumber = Object.keys(monthObject[monthName])[0];
       let chosen = monthObject[monthName][dayNumber][index];

       this.setState({
         editEntry: chosen
       });

       this.setState({
         editPosition: pos
       });

       changeView();
     }
   }


   const deleteEntry = () => {
     let confirm = window.confirm("Are you sure?");
     if (confirm){
       let change;
       change = this.state.entries;
       change.splice(this.state.editPosition, 1);
       this.setState({
         entries: change
       });
       updateStorage(change);
       goBack();
     }
   }




   let section = [];
   let yearHeading;
   let monthHeading;
   let dayHeading;
   let position = this.state.editPosition;

   if (this.state.showEntries){
      let allYears =  Object.keys(this.state.entries);
      for (let i = 0; i < allYears.length; i++) {
        let year = allYears[i];
        yearHeading = (
          <h3> {year} </h3>
        );
        section.push(yearHeading);
        position.year = year;
        let monthsArray = this.state.entries[year];
        for (let i = 0; i < monthsArray.length; i++) {
          let month = Object.keys(monthsArray[i])[0];
          monthHeading = (
            <h4> {month} </h4>
          );
          section.push(monthHeading);
          position.month = i;
          let currentMonth = monthsArray[i][month];
          for (let i = 0; i < currentMonth.length; i++) {
            let day =  Object.keys(currentMonth[i])[0];
            dayHeading = (
              <h5> {day} </h5>
            );
            section.push(dayHeading);
            position.day = i;
            let currentDayEntries = currentMonth[i][day];
            section.push(
              <div>
                <Entries key = {i} click = {showEntry.bind(this)}
                  entries = {currentDayEntries}
                  position = {JSON.stringify(position)}>
                </Entries>
                <br/>
              </div>
            );
          }
        }
      }
      section = (<div>
                  {section}
                  <Button click = {addEntry} name = "new"> </Button>
                 </div>);

   } else if (this.state.editEntry.title === "default") {
     section = (<div className = "fade">
                   <Editor trackText = {trackText.bind(this)}
                           chosenEntry = {this.state.editEntry}
                   > </Editor>
                   <br/>
                    <Button click = {addEntry} name = "done"> </Button>
                    <Button click = {goBack} name = "return"> </Button>
                 </div>
               );
   } else {
     section = (<div className = "fade">
                   <Editor trackText = {trackText.bind(this)}
                           chosenEntry = {this.state.editEntry}
                   > </Editor>
                   <br/>
                   <Button click = {addEntry} name = "done"> </Button>
                   <Button click = {goBack} name = "return"> </Button>
                   <Button click = {deleteEntry} name = "delete"> </Button>
                 </div>
               );
   }

    return (
      <div className = "app-container stretch-full">
        <div id= "header-main-section">
          <DayInfo date = {new Date()}></DayInfo>
          <header><h1> {this.state.header} </h1></header>
          <TransitionGroup>
            <CSSTransition timeout = {1000} classNames = "fade">
                {section}
            </CSSTransition>
          </TransitionGroup>
        </div>
        <br/>
        <footer><h2>Notes</h2></footer>
      </div>
    )
  }
}

export default MainSection;
