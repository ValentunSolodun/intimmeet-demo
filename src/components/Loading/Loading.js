import React from 'react';
import './Loading.css';

const Loading = ({...args}) => {
  return (
    <div {...args} className='lds-ring-container'>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading;
