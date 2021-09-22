import React, { Component } from 'react'
import { getsetTechLanguages } from '../data';
import Input from './Input';

export class TechLanguages extends Component {
 constructor(props) {
  super(props);
  this.state = {
   techLanguage: getsetTechLanguages(this.props.techIndex)
  }
  this.onInputChange = this.onInputChange.bind(this);
 }
 onInputChange(event) {
  const temp = { ...this.state };
  temp[event.target.id] = event.target.value;
  this.setState(temp);
  getsetTechLanguages(this.props.techIndex, event.target.value);
 }
 render() {
  return (
   <>
    <Input onChange={this.onInputChange} value={this.state.techLanguage} id="techLanguage" inputType="text" placeholder="Enter Tech Languages" label="Tech Language" />
   </>
  )
 }
}

export default TechLanguages;
