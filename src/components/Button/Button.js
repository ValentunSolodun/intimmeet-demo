import React from 'react';
import './Button.css';
import cn from 'classnames';

const STYLE_OF_BUTTONS = {
  'gray': 'gray-button',
  'green': 'green-button',
  'red': 'red-button',
  'blue': 'blue-button',
  'white': 'white-button'
};

const Button = ({onClick, style, className, classNameButton, label, leftIcon}) => {
  return (
    <div className={cn(STYLE_OF_BUTTONS[style], 'button-container', className)} onClick={onClick}>
      {leftIcon}
      <button className={cn('common-button-style', classNameButton)}>
        {label}
      </button>
    </div>
  )
}

export default Button;
