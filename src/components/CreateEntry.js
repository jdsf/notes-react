import React, { Component } from 'react';


class Editor extends React.Component {
  constructor (props) {
    super(props);


    this.state = {title: "title goes here!",
                  content: " ----------------   your entry here!" + "\r\n \r\n" +
                  " \"Only the hand that erases \r\n" +
                  " \r\n   can write \r\n   " +
                  " \r\n     the true thing\" \r\n" +
                  "\r\n             - Meister Eckhart"
                 }
  }

  componentWillMount() {
    if (this.props.chosenEntry.title !== "default") {
      this.setState({
        title: this.props.chosenEntry.title
      });

      this.setState({
        content: this.props.chosenEntry.content
      });
    }
  }

  onFieldChange(event) {
      const field = event.target.name;
      const value = event.target.value;
      this.props.trackText(field, value);
  }

  render() {
    return
      <main>
        <header>
          <h1 className = "decorated">
            <span>   {this.state.header}   </span>
          </h1>
        </header>
        <div className = "editor center">
          <textarea name = "title" rows = "1" cols = "50" defaultValue = {this.state.title}
            onChange = {this.onFieldChange.bind(this)}>
          </textarea>
          <textarea name = "content" rows = "10" cols = "130" defaultValue = {this.state.content}
            onChange = {this.onFieldChange.bind(this)}>
          </textarea>
        </div>
        <br/>
        <div className = "buttons">
         <Button click = {addEntry} name = "done"> </Button>
         <Button click = {goBack} name = "return"> </Button>
        </div>
      </main>
    </div>





    )
  }
}

export default CreateEntry;
