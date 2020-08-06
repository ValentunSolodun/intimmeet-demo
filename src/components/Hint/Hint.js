import React from 'react';
import './Hint.css';
import cn from 'classnames';

const Hint = ({onClick, text, className, ...args}) => {
  return (
    <div onClick={onClick} className={cn('hint-container', className)} {...args}>
      <span className='hint-icon'>
        ?
      </span>
      <span className='hint-text'>
        {text}
      </span>
    </div>
  )
}

export default Hint;
