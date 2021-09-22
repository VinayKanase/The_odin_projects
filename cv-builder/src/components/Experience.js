import React, { Component } from 'react'
import Input from './Input';
import { validateExperience } from '../formValidation';
import { getsetExperience } from '../data';
export class Experience extends Component {
 constructor(props) {
  super(props);
  const { post, company, joining_year, leaving_year } = getsetExperience(this.props.expIndex);
  this.state = {
   post: post,
   company: company,
   joining_year: joining_year,
   leaving_year: leaving_year,
   error: []
  }
  this.onInputChange = this.onInputChange.bind(this);
 }
 onInputChange(event) {
  const temp = { ...this.state };
  temp[event.target.id] = event.target.value;
  this.setState(temp);
  setTimeout(() => {
   this.setState({
    error: validateExperience(this.state)
   })
   setTimeout(() => {
    if (this.state.error.length === 0)
     getsetExperience(this.props.expIndex, this.state);
   }, 500);
  }, 200);
 }
 render() {
  return (
   <>
    {this.props.expIndex === 0 ?
     <div className="note">
      Note: If you are working currently leave Year of Leaving empty.
     </div> : ''}
    <ul className={this.state.error.length > 0 ? 'error active' : 'error'}>
     {
      this.state.error.map((message, i) =>
       <li key={i}>{message}</li>
      )
     }
    </ul>
    <Input onChange={this.onInputChange} value={this.state.post} inputType="text" id="post"
     placeholder="Enter Your Post Name"
     label="Post" isRequired />
    <Input onChange={this.onInputChange} value={this.state.company} inputType="text" id="company"
     placeholder="Enter Your Company Name"
     label="Company Name" isRequired />
    <div className="input__row">
     <Input onChange={this.onInputChange} value={this.state.joining_year} inputType="number" id="joining_year" placeholder="Year of Joining" label="Year of Joining" isRequired isHalf isYearInput />
     <Input onChange={this.onInputChange} value={this.state.leaving_year} inputType="number" id="leaving_year" placeholder="Year of Leaving" label="Year of Leaving" isHalf isYearInput />
    </div>
   </>
  )
 }
}

export default Experience;
