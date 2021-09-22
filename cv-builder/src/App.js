import Nav from "./components/Nav";
import Form from "./components/Form";
import Preview from "./components/Preview";
import React, { Component } from "react";
import { clearTemplateData } from "./data.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreview: false,
    };
    this.onClickPreview = this.onClickPreview.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
  }
  onClickPreview(event) {
    this.setState({ isPreview: !this.state.isPreview });
  }
  onClearClick() {
    clearTemplateData();
    this.setState({ isPreview: true });
    setTimeout(() => this.setState({ isPreview: false }), 1);
  }
  render() {
    return (
      <div className="app">
        <Nav
          onClickPreview={this.onClickPreview}
          isPreview={this.state.isPreview}
          onClear={this.onClearClick}
        />
        {this.state.isPreview ? <Preview /> : <Form />}
      </div>
    );
  }
}
