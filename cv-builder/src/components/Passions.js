import React, { Component } from 'react'
import { getsetPassions } from '../data';
import Input from './Input';
export class Passions extends Component {
 constructor(props) {
  super(props);
  this.state = {
   passion: getsetPassions(this.props.passionIndex)
  }
  this.onInputChange = this.onInputChange.bind(this);
 }
 onInputChange(event) {
  const temp = { ...this.state };
  temp[event.target.id] = event.target.value;
  this.setState(temp);
  getsetPassions(this.props.passionIndex, event.target.value);
 }
 render() {
  return (
   <>
    <Input onChange={this.onInputChange} value={this.state.passion} id="passion" inputType="text" placeholder="Enter Passion" label="Passion" />
   </>
  )
 }
}

export default Passions;
