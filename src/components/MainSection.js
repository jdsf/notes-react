import React, { Component } from 'react';
import Entries from './Entries';
import Editor from './Editor';
import Button from './Button';
import DayInfo from './DayInfo';





class MainSection extends Component {


  state = {
    header: "home",
    showEntries: true,
    entries: [{ title: "sample title", content: "try editing, deleting or adding your own!"}
    ],
    newEntry: {title: "default title", content: "default content"},
    editEntry: {title: "default", content: "default"},
    editPosition: 0
  };

  componentWillMount() {
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




    let section;

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
       editPosition: 0
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

   const addEntry = () => {

     let change;

     if (this.state.editEntry.title === "default") {
       change = this.state.entries.concat(
         this.state.newEntry
       );
     } else {
       change = this.state.entries;
       change[this.state.editPosition] = this.state.editEntry;
     }

     this.setState({
       entries: change
     });

     updateStorage(change);
     goBack();
   }


   const showEntry = (position) => {

     let confirm = window.confirm("Edit this entry?");

     if (confirm) {
       let chosen = this.state.entries[position];
       this.setState({
         editEntry: chosen
       });

       this.setState({
         editPosition: position
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


   if (this.state.showEntries){
     section = (<form>
                   <Entries click = {showEntry.bind(this)} entries = {this.state.entries}> </Entries>
                   <br/>
                   <Button click = {changeView} name = "new"> </Button>
                 </form>
               );

   } else if (this.state.editEntry.title === "default") {
     section = (<form >
                   <Editor trackText = {trackText.bind(this)}
                           chosenEntry = {this.state.editEntry}
                   > </Editor>
                   <br/>
                    <Button click = {addEntry} name = "done"> </Button>
                    <Button click = {goBack} name = "return"> </Button>
                 </form>
               );
   } else {
     section = (<form>
                   <Editor trackText = {trackText.bind(this)}
                           chosenEntry = {this.state.editEntry}
                   > </Editor>
                   <br/>
                   <Button click = {addEntry} name = "done"> </Button>
                   <Button click = {goBack} name = "return"> </Button>
                   <Button click = {deleteEntry} name = "delete"> </Button>
                 </form>
               );
   }

    return (
      <div className = "app-container stretch-full">
        <div id= "header-main-section">
          <DayInfo date = {new Date()}></DayInfo>
          <header><h1> {this.state.header} </h1></header>
          {section}
        </div>
        <br/>
        <footer><h2>Notes</h2></footer>
      </div>
    )
  }
}

export default MainSection;
