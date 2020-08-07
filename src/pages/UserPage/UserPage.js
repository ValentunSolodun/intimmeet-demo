import React from 'react';
import './UserPage.css';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import PhoneIcon from '../../components/PhoneIcon';
import {customHistory} from '../../helpers/history';

const USER_TEST_DATA = {
  id: 1,
  name: 'Denise',
  location: 'New York, NY',
  imgSrc: 'images/test_user.png',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
};

const UserPage = () => {

  const handlerGoBack = () => {
    customHistory.goBack()
  }

  return (
    <div className='user-page-container'>
      <div className='user-avatar-container'>
        <div className='user-page-avatar-container'>
          <img src="images/test_user.png" alt=""/>
          <Icon imgSrc='Heart' text='Heart'/>
          <PhoneIcon/>
        </div>
        <div className='user-name-container'>
          {USER_TEST_DATA.name}
        </div>
      </div>
      <div className='user-bio-button-back-container'>
        <div className='user-bio-container'>
          <div className='user-bio-container__title'>Bio</div>
          <div className='user-bio-container__description'>
            {USER_TEST_DATA.bio}
          </div>
        </div>
        <Button className='button-back' leftIcon='<' onClick={handlerGoBack} label='Back'/>
      </div>
    </div>
  )
}

export default UserPage;
