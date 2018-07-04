import React, { Component } from 'react';


class Editor extends React.Component {
  constructor (props) {
    super(props);


    this.state = {title: "title goes here!", content: "type your entry here!"
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
    return (
      <div className = "editor center">
        <textarea name = "title" rows = "1" cols = "50" defaultValue = {this.state.title}
          onChange = {this.onFieldChange.bind(this)}>
        </textarea>
        <textarea name = "content" rows = "10" cols = "130" defaultValue = {this.state.content}
          onChange = {this.onFieldChange.bind(this)}>
        </textarea>
      </div>
    )
  }
}

export default Editor;
