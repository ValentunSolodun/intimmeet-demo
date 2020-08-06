import React from 'react';
import './PhoneIcon.css';

const PhoneIcon = ({...args}) => {
  return (
    <div {...args}>
      <img src="images/phone.png" alt="Call"/>
    </div>
  )
}

export default PhoneIcon;
