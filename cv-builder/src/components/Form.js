import React, { Component } from 'react';
import '../css/Form.css';
// import Input from './Input';
import PersonalInformation from './PersonalInformation';
import Experience from './Experience';
import Education from './Education';
import Passions from './Passions';
import TechLanguages from './TechLanguages';
import { deleteLastElement, arrayLength } from '../data';

export class Form extends Component {
  constructor(props) {
    super(props);
    let exp = ['ok'];
    let edu = ['ok'];
    let tech = ['ok'];
    let passion = ['ok'];
    for (let i = 1; i < arrayLength('experienceCount'); i++) {
      exp.push('ok');
    }
    for (let i = 1; i < arrayLength('educationCount'); i++) {
      edu.push('ok');
    }
    for (let i = 1; i < arrayLength('techCount'); i++) {
      tech.push('ok');
    }
    for (let i = 1; i < arrayLength('passionCount'); i++) {
      passion.push('ok');
    }
    this.state = {
      experienceCount: exp,
      educationCount: edu,
      techCount: tech,
      passionCount: passion
    }
    this.onNewEntryClick = this.onNewEntryClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }
  onNewEntryClick(e) {
    let temp = this.state;
    let name = e.target.classList[0];
    temp[name] = [...temp[name], Math.random()];
    this.setState(temp);
    arrayLength(name, true);
  }
  onCancelClick(e) {
    let temp = this.state;
    let name = e.target.classList[0];
    temp[name].shift();
    this.setState(temp);
    deleteLastElement(name);
  }
  render() {
    return (
      <div className="form" >
        <div className="form__personalInformation">
          <h2 className="form__subheading">Personal Information</h2>
          <PersonalInformation />
        </div>
        <div className="form__experience">
          <h2 className="form__subheading">Experience</h2>
          {
            this.state.experienceCount.map((t, index) =>
              <Experience expIndex={index} key={index} />
            )
          }
          <div className="form__buttons">
            <button className="experienceCount" onClick={this.onNewEntryClick}>Add New Entry</button>
            <button className="experienceCount" onClick={this.onCancelClick}>Cancel Entry</button>
          </div>
        </div>
        <div className="form__education">
          <h2 className="form__subheading">Education</h2>
          {
            this.state.educationCount.map((t, index) =>
              <Education eduIndex={index} key={index} />
            )
          }
          <div className="form__buttons">
            <button className="educationCount" onClick={this.onNewEntryClick}>Add New Entry</button>
            <button className="educationCount" onClick={this.onCancelClick}>Cancel Entry</button>
          </div>
        </div>
        <div className="form__techLanguages">
          <h2 className="form__subheading">TECH Languages</h2>
          {
            this.state.techCount.map((t, index) =>
              <TechLanguages techIndex={index} key={index} />
            )
          }
          <div className="form__buttons">
            <button className="techCount" onClick={this.onNewEntryClick}>Add New Entry</button>
            <button className="techCount" onClick={this.onCancelClick}>Cancel Entry</button>
          </div>
        </div>
        <div className="form__passions">
          <h2 className="form__subheading">Passions</h2>
          {
            this.state.passionCount.map((t, index) =>
              <Passions passionIndex={index} key={index} />
            )
          }
          <div className="form__buttons">
            <button className="passionCount" onClick={this.onNewEntryClick}>Add New Entry</button>
            <button className="passionCount" onClick={this.onCancelClick}>Cancel Entry</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form
