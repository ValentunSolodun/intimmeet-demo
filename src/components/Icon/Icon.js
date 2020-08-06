import React from 'react';
import './Icon.css';

const Icon = ({text, alt, imgSrc, ...args}) => {
   return (
     <div className='icon-container' {...args}>
       <img className='icon-element' src={imgSrc} alt={alt}/>
       <span className='icon-element-text' >{text}</span>
     </div>
   )
}

export default Icon;
