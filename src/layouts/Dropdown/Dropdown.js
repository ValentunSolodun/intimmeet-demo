import React from 'react';
import './Dropdown.css';
import cn from 'classnames';

const Dropdown = ({children, styles, className, ...args}) => {
  return (
    <div {...args} style={styles} className={cn(className, 'dropdown-container')}>
      {children}
    </div>
  )
}

export default Dropdown;
