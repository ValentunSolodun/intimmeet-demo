import React from 'react';
import './Button.css';
import cn from 'classnames';

const STYLE_OF_BUTTONS = {
  'gray': 'gray-button',
  'green': 'green-button',
}

const Button = ({onClick, style, className, label, leftIcon}) => {
  return (
    <div className={cn('button-container', className)}>
      {leftIcon}
      <button onClick={onClick} className={cn(STYLE_OF_BUTTONS[style], 'common-button-style')}>
        {label}
      </button>
    </div>
  )
}

export default Button;
