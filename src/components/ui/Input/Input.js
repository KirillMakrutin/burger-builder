import React from 'react';
import classes from './Input.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(' ')}
          {...props.config}
          value={props.value}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join(' ')}
          {...props.config}
          value={props.value}
        />
      );
      break;

    case 'select':
      inputElement = (
        <select
          onChange={props.changed}
          className={inputClasses.join(' ')}
          value={props.value}
        >
          {props.config.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = <input className={inputClasses.join(' ')} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
