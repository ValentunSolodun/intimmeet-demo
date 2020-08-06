import React from 'react';
import './Button.css';
import cn from 'classnames';

const STYLE_OF_BUTTONS = {
  'gray': 'gray-button',
  'green': 'green-button',
}

const Button = ({onClick, style, label}) => {
  return (
    <button onClick={onClick} className={cn(STYLE_OF_BUTTONS[style], 'common-button-style')}>
      {label}
    </button>
  )
}

export default Button;
