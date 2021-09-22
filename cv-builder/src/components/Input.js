import React from 'react';
import '../css/Input.css';
function Input({ id, label, inputType, placeholder, isRequired, isHalf, isYearInput, onChange, value }) {

  return (
    <div className={isHalf ? 'input half' : 'input'}>
      <label htmlFor={id}>
        {label}
        {
          isRequired
            ? <span aria-required>*</span>
            : ''
        }:
      </label>
      {
        isHalf && isYearInput
          ? <input
            type={inputType}
            id={id}
            min="1900"
            step="1"
            max="2050"
            placeholder={placeholder}
            onChange={onChange || ''}
            value={value || ''} />
          : <input
            type={inputType}
            id={id}
            minLength="1"
            maxLength="100"
            placeholder={placeholder}
            onChange={onChange || ''}
            value={value || ''} />

      }
    </div>
  )
}

export default Input;
