import React, { Component } from 'react';
import Entries from './Entries';
import Editor from './Editor';
import Button from './Button';
import CreateEntry from './CreateEntry'
import EditEntry from './EditEntry'
import DisplayEntries from './DisplayEntries'
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';
import 'velocity-animate/velocity.ui';






class MainSection extends Component {


  state = {
    header: "home",
    showEntries: true,
    entries:
      { "1995":
        [{ September:
         [{ "7":
               [{  title: "CLICK ON ME!!!",
                   content: "Click on entries to enter the editor."
                   + " Here you can: change your entry's title and content" +
                   ", save or discard your changes, or delete the entry entirely."
                   + " If you'd like to add your own entry return home and click on new"
               }]
          },
          { "11":
                [{  title: "<>< <>< <><",
                    content: " Multiple entries can be saved per day."
                },
                {  title: "><> ><> ><> ><>",
                    content: "See!!"

                }
              ]

          }
       ]
         },
         {October:
          [{ "24":
                [{  title: "Important: more info",
                    content: "Please note your entries are saved locally on your browser" +
                    " and not online. Make sure to copy and save any " +
                    "important entries to your desktop in case you clear" +
                    " your browser's data"
                }]
           }]
         }
        ]
      },
    newEntry: {
                title: "default title",
                content: "default content"
              },
    editEntry: {
                title: "default",
                content: "default"
              },
    editPosition: {year: 0, month: 0, day: 0, position: 0}
  };


  componentWillMount() {

    window.localStorage.setItem("notes_react", JSON.stringify(this.state.entries));
    if (window.localStorage.notes_react) {
      let notes = JSON.parse(window.localStorage.notes_react);
      if (this.state.entries !== notes) {
        this.setState({
          entries: notes
        });
      }
    } else {
      window.localStorage.setItem("notes_react", JSON.stringify(this.state.entries));
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

     this.setState({
       newEntry: {
                   title: "default title",
                   content: "default content"
                 }
     });

   }

   const goBack = () => {
     resetEdit();
     changeView();
   }

   const updateStorage = (entries) => {
     let notes = JSON.stringify(entries);
     window.localStorage.notes_react = notes;
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
     let entriesCopy = this.state.entries;
     let change;

     if (this.state.editEntry.title === "default") {
       let today = growTree(this.state.entries); // today = [year, month, day]
       let monthsArray = entriesCopy[today[0]];
       let monthPos = monthsArray.length - 1;
       let monthObj = monthsArray[monthPos];
       let daysArray = monthObj[today[1]];
       let dayPos = daysArray.length - 1;
       let dayObj = daysArray[dayPos];
       let entriesArray = dayObj[today[2]];
       entriesArray = entriesArray.concat([this.state.newEntry]);
       dayObj[today[2]] = entriesArray;
       daysArray[dayPos] = dayObj;
       monthObj[today[1]] = daysArray;
       monthsArray[monthPos] = monthObj;
       entriesCopy[today[0]] = monthsArray;
     } else {
       let newEntry = this.state.editEntry;
       let editYear = this.state.editPosition.year;
       let editMonth = this.state.editPosition.month;
       let editMonthName = Object.keys(entriesCopy[editYear][editMonth])[0];
       let editDay = this.state.editPosition.day;
       let editDayName = Object.keys(entriesCopy[editYear][editMonth][editMonthName][editDay]);
       let editPos = this.state.editPosition.position;

       entriesCopy[editYear][editMonth][editMonthName][editDay][editDayName][editPos] = newEntry;

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
       entriesByYear[currentYear] = entriesByMonth;
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
     let pos = JSON.parse(position);
     let year = pos.year;
     let month = pos.month;
     let day = pos.day;
     let indx = pos.position;

     let confirm = window.confirm("Edit this entry?");

     if (confirm) {

       let monthObject = this.state.entries[year][month];
       let monthName = Object.keys(monthObject)[0];
       let dayNumber = Object.keys(monthObject[monthName][day])[0];
       let chosen = monthObject[monthName][day][dayNumber][indx];
       this.setState({
         editEntry: chosen
       });

       this.setState({
         editPosition: pos
       });

       changeView();
     }
   }


   const emptySearch = (arr) => {
     let pos = -1;
     for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) {
        pos = i;
      }
     }
    return pos;
   }

   const deleteEntry = () => {
     let confirm = window.confirm("Are you sure?");
     if (confirm){
       let change = this.state.entries;
       let editYear = this.state.editPosition.year;
       let editMonth = this.state.editPosition.month;
       let editMonthName = Object.keys(change[editYear][editMonth])[0];
       let editDay = this.state.editPosition.day;
       let editDayName = Object.keys(change[editYear][editMonth][editMonthName][editDay])[0];
       let editPos = this.state.editPosition.position;

       let allThings = [change, editYear, editMonth, editMonthName, editDay, editDayName, editPos];



       change[editYear][editMonth][editMonthName][editDay][editDayName].splice(editPos, 1);
       let endBranch = change[editYear][editMonth][editMonthName][editDay][editDayName];
       if (endBranch.length === 0){
         delete change[editYear][editMonth][editMonthName][editDay];
         endBranch = change[editYear][editMonth][editMonthName];
         if (endBranch.length === 0 || (endBranch.includes(undefined) &&
             endBranch.length === 1 )) {
           delete change[editYear][editMonth];
           endBranch = change[editYear];
           if (endBranch.length === 0 || (endBranch.includes(undefined) &&
               endBranch.length === 1 )) {
                   delete change[editYear];
           } else {
             let emptyPos = emptySearch(endBranch);
             change[editYear].splice(emptyPos, 1);
           }
         } else if (endBranch.includes(undefined)) {
           let emptyPos = emptySearch(endBranch);
           change[editYear][editMonth][editMonthName].splice(emptyPos, 1);
         }
       }

       this.setState({
         entries: change
       });

       updateStorage(change);
       goBack();
     }
   }


  const createSection = () => {

    let section = [];
    let yearHeading;
    let position = this.state.editPosition;

    if (this.state.showEntries){

       section = (<div>
                   <DisplayEntries
                    header = {this.state.header}
                    editPosition = {this.state.editPosition}
                    entries = {this.state.entries}
                    goBack = {goBack.bind(this)}
                    showEntry = {showEntry.bind(this)}
                   > </DisplayEntries>
                  </div>);

    } else if (this.state.editEntry.title === "default") {
      section = (<div>
                  <CreateEntry
                    header = {this.state.header}
                    trackText = {trackText.bind(this)}
                    chosenEntry = {this.state.editEntry}
                    addEntry = {addEntry.bind(this)}
                    goBack = {goBack.bind(this)}
                  > </CreateEntry>
                 </div>
                 // <Editor trackText = {trackText.bind(this)}
                 //         chosenEntry = {this.state.editEntry}
                 // > </Editor>
                 // <br/>
                 // <div className = "buttons">
                 //  <Button click = {addEntry} name = "done"> </Button>
                 //  <Button click = {goBack} name = "return"> </Button>
                 // </div>

                );
    } else {
      section = (<div>
                  <EditEntry
                    header = {this.state.header}
                    trackText = {trackText.bind(this)}
                    chosenEntry = {this.state.editEntry}
                    addEntry = {addEntry.bind(this)}
                    goBack = {addEntry.bind(this)}
                    deleteEntry = {deleteEntry.bind(this)}
                   > </EditEntry>
                  </div>



                    // <Editor trackText = {trackText.bind(this)}
                    //         chosenEntry = {this.state.editEntry}
                    // > </Editor>
                    // <br/>
                    // <div className = "buttons">
                    //   <Button click = {addEntry} name = "done"> </Button>
                    //   <Button click = {goBack} name = "return"> </Button>
                    //   <Button click = {deleteEntry} name = "delete"> </Button>
                    // </div>

                );
    }

    return section;

  }



    return (
      <div className= "header-main-section-footer stretch-full">
        <VelocityTransitionGroup
          enter = {{animation: "fadeIn"}}
        >
        {(this.state.showEntries ?  <DisplayEntries
                                      header = {this.state.header}
                                      editPosition = {this.state.editPosition}
                                      entries = {this.state.entries}
                                      goBack = {goBack.bind(this)}
                                      showEntry = {showEntry.bind(this)}
                                     ></DisplayEntries>
                                : (this.state.editEntry.title === "default" ?
                                      <CreateEntry
                                        header = {this.state.header}
                                        trackText = {trackText.bind(this)}
                                        chosenEntry = {this.state.editEntry}
                                        addEntry = {addEntry.bind(this)}
                                        goBack = {goBack.bind(this)}
                                      ></CreateEntry>
                                   :
                                     <EditEntry
                                       header = {this.state.header}
                                       trackText = {trackText.bind(this)}
                                       chosenEntry = {this.state.editEntry}
                                       addEntry = {addEntry.bind(this)}
                                       goBack = {addEntry.bind(this)}
                                       deleteEntry = {deleteEntry.bind(this)}
                                      ></EditEntry>
                                   )
        )}
        </VelocityTransitionGroup>
      </div>
    );
  }
}

export default MainSection;
