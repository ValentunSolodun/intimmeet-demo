import React from 'react';
import './PhoneIcon.css';

const PhoneIcon = ({classNameImg, ...args}) => {
  return (
    <div {...args}>
      <img className={classNameImg} src="images/phone.png" alt="Call"/>
    </div>
  )
}

export default PhoneIcon;
