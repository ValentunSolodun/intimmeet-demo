import React from 'react';
import './Icon.css';
import cn from 'classnames';

const Icon = ({text, alt, imgSrc, className,  ...args}) => {
   return (
     <div className={cn('icon-container', className)} {...args}>
       <img className='icon-element' src={imgSrc} alt={alt}/>
       <span className='icon-element-text' >{text}</span>
     </div>
   )
}

export default Icon;
