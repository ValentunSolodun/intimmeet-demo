import React from 'react';
import './Range.css';
import cn from 'classnames';

const Range = ({classNameContainer, className, ...args}) => {
  return (
    <div className={cn('custom-range-container', classNameContainer)}>
      <input {...args} className={cn('custom-range', className)} type="range"/>
    </div>
  )
};

export default Range;
