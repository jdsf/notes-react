import React, { Component } from 'react';
import Editor from './Editor';
import Button from './Button';


class CreateEntry extends React.Component {
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
        <Editor
          chosenEntry = {this.props.chosenEntry}
          trackText = {this.props.trackText}
        />
        <br/>
        <div className = "buttons">
         <Button click = {this.props.addEntry} name = "done"> </Button>
         <Button click = {this.props.goBack} name = "return"> </Button>
        </div>
      </main>
    </div>

    )
  }
}

export default CreateEntry;
