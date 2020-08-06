import React from 'react';
import './ImageWithText.css';

const ImageWithText = ({imgStyles, imgSrc, alt, title, subtitle, ...props}) => {
  return (
    <div className='image-with-text-container' {...props}>
      <img className='image-with-text-img' src={imgSrc} alt={alt}/>
      <div className='image-with-text-title-containers'>
        <span className='image-with-text-title'>{title}</span>
        <span className='image-with-text-subtitle'>{subtitle}</span>
      </div>
    </div>
  )
}

export default ImageWithText;
