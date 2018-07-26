import React, { Component } from 'react';
import Editor from './Editor';
import Button from './Button';



class EditEntry extends React.Component {
  constructor (props) {
    super(props);

  }



  render() {
    return(
     <div>
      <main>
        <header>
          <h1 className = "decorated">
            <span>   {this.props.header}   </span>
          </h1>
        </header>
        <Editor trackText = {this.props.trackText}
                chosenEntry = {this.props.chosenEntry}
        > </Editor>
        <br/>
        <div className = "buttons">
          <Button click = {this.props.addEntry} name = "done"> </Button>
          <Button click = {this.props.goBack} name = "return"> </Button>
          <Button click = {this.props.deleteEntry} name = "delete"> </Button>
        </div>
      </main>
    </div>

    )
  }
}

export default EditEntry;
