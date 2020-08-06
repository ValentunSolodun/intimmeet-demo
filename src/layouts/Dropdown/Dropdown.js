import React from 'react';
import './Dropdown.css';
import cn from 'classnames';

const Dropdown = React.forwardRef((props, ref) => {
  const {styles, className, children, ...args} = props;
  return (
    <div ref={ref} {...args} style={styles} className={cn(className, 'dropdown-container')}>
      {children}
    </div>
  )
});

export default Dropdown;
