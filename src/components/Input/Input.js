import React from 'react';
import './Input.css';
import cn from 'classnames';

const Input = ({label, classNameContainer, classNameInput, classNameLabel, ...args}) => {
  return (
    <div className={cn('input-container', classNameContainer)}>
      <span className={cn('input-label', classNameLabel)}>{label}</span>
      <input className={cn('input-item', classNameInput)} {...args}/>
    </div>
  )
}

export default Input;
