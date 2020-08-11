import React from 'react';
import './Icon.css';
import cn from 'classnames';

const Icon = ({text, alt, imgSrc, className, classNameImg,  ...args}) => {
   return (
     <div className={cn('icon-container', className)} {...args}>
       <img className={cn('icon-element', classNameImg)} src={imgSrc} alt={alt}/>
       <span className='icon-element-text' >{text}</span>
     </div>
   )
}

export default Icon;
