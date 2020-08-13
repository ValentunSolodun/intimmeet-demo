import React from 'react';
import './Button.css';
import cn from 'classnames';

const STYLE_OF_BUTTONS = {
  'gray': 'gray-button',
  'green': 'green-button',
  'red': 'red-button'
};

const Button = ({onClick, style, className, classNameButton, label, leftIcon}) => {
  return (
    <div className={cn(STYLE_OF_BUTTONS[style], 'button-container', className)}>
      {leftIcon}
      <button onClick={onClick} className={cn('common-button-style', classNameButton)}>
        {label}
      </button>
    </div>
  )
}

export default Button;
