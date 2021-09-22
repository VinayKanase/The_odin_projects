import React, { Component } from 'react'
import Input from './Input';
import { validateEducation } from '../formValidation';
import { getsetEducation } from '../data';
export class Education extends Component {
  constructor(props) {
    super(props);
    // console.log(getsetEducation(this.props.eduIndex).degree, this.props.eduIndex);
    const { degree, university, joining_year, leaving_year, scoreObtained, outOf } = getsetEducation(this.props.eduIndex);
    this.state = {
      degree: degree,
      university: university,
      joining_year: joining_year,
      leaving_year: leaving_year,
      score: scoreObtained,
      total: outOf,
      error: []
    }
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(event) {
    const temp = { ...this.state };
    temp[event.target.id] = event.target.value;
    this.setState(temp);
    setTimeout(() => {
      this.setState({ error: validateEducation(this.state) });
      setTimeout(() => {
        if (this.state.error.length === 0) {
          getsetEducation(this.props.eduIndex, this.state);
        }
      }, 500);
    }, 200)
  }
  render() {
    return (
      <>
        {this.props.eduIndex === 0
          ? <div className="note">
            Note: If you are doing some education currently can leave Year of Leaving empty.
          </div> : ''
        }
        <ul className={this.state.error.length > 0 ? 'error active' : 'error'}>
          {
            this.state.error.map((message, i) =>
              <li key={i}>{message}</li>
            )
          }
        </ul>
        <Input onChange={this.onInputChange} value={this.state.degree} inputType="text" id="degree" placeholder="Enter Degree Name" label="Degree Name:" isRequired />
        <Input onChange={this.onInputChange} value={this.state.university} inputType="text" id="university" placeholder="Enter University Name" label="University Name" isRequired />
        <div className="input__row">
          <Input onChange={this.onInputChange} value={this.state.joining_year} inputType="number" id="joining_year" placeholder="Year of Joining" label="Year of Joining" isRequired isHalf isYearInput />
          <Input onChange={this.onInputChange} value={this.state.leaving_year} inputType="number" id="leaving_year" placeholder="Year of Leaving" label="Year of Leaving" isHalf isYearInput />
        </div>
        <div className="input__row">
          <Input onChange={this.onInputChange} value={this.state.score} inputType="number" id="score" placeholder="Your Score" label="Score" isRequired isHalf />
          <Input onChange={this.onInputChange} value={this.state.total} inputType="number" id="total" placeholder="Out of" label="Out of" isRequired isHalf />
        </div>
      </>
    )
  }
}

export default Education;
