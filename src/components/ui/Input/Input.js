import React from 'react';
import classes from './Input.css';

const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          onChange={props.changed}
          className={classes.InputElement}
          {...props.config}
          value={props.value}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          onChange={props.changed}
          className={classes.InputElement}
          {...props.config}
          value={props.value}
        />
      );
      break;

    case 'select':
      inputElement = (
        <select
          onChange={props.changed}
          className={classes.InputElement}
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
      inputElement = <input className={classes.InputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
