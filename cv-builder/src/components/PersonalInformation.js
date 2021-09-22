import React, { Component } from 'react';
import Input from './Input';
import { validatePersonalInformation } from '../formValidation';
import { getsetPersonalInformation } from '../data';
export class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    const { name, short_description, phoneNo, email, github, location } = getsetPersonalInformation();
    this.state = {
      name: name,
      short_description: short_description,
      phoneNo: phoneNo,
      email: email,
      github: github,
      location: location,
      error: []
    }
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(event) {
    const temp = { ...this.state };
    temp[event.target.id] = event.target.value;
    this.setState(temp);
    setTimeout(() => {
      this.setState({ error: validatePersonalInformation(this.state) });
      setTimeout(() => {
        if (this.state.error.length === 0) {
          getsetPersonalInformation(this.state);
        }
      }, 500)
    }, 200);
  }
  render() {
    return (
      <>
        <ul className={this.state.error.length > 0 ? 'error active' : 'error'}>
          {
            this.state.error.map((er, i) =>
              <li key={i}>{er}</li>
            )
          }
        </ul>
        <Input onChange={this.onInputChange} value={this.state.name}
          inputType="text" id="name" placeholder="Enter Your Name" label="Name" isRequired />
        <Input onChange={this.onInputChange} value={this.state.short_description}
          inputType="text" id="short_description" placeholder="Enter Your Short Description" label="Short Description" />
        <Input onChange={this.onInputChange} value={this.state.phoneNo}
          inputType="number" id="phoneNo" placeholder="Enter Your Phone Number" label="Phone Number" />
        <Input onChange={this.onInputChange} value={this.state.email}
          inputType="email" id="email" placeholder="Enter Your Email" label="Email" isRequired />
        <Input onChange={this.onInputChange} value={this.state.github}
          inputType="text" id="github" placeholder="Enter Your Website/Github URL" label="Website/Github URL" />
        <Input onChange={this.onInputChange} value={this.state.location}
          inputType="text" id="location" placeholder="Enter Your Location" label="Location" />
      </>
    )
  }
}

export default PersonalInformation;
