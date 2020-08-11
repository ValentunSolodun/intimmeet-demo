import React, {useRef, useState, useEffect} from 'react';
import './UserPage.css';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import PhoneIcon from '../../components/PhoneIcon';
import {customHistory} from '../../helpers/history';
import {GET_USER_REQUEST} from '../../actions';
import Hint from '../../components/Hint';
import Dropdown from '../../components/Dropdown';
import {useOnClickOutside} from '../../helpers/hooks';

const USER_TEST_DATA = {
  id: 1,
  name: 'Denise',
  location: 'New York, NY',
  imgSrc: 'images/test_user.png',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
};

const UserPage = ({user, getUser}) => {

  const refDropdown = useRef(null);
  const [showPhoneIconMenu, setShowPhoneIconMenu] = useState(false);
  useOnClickOutside(refDropdown, () => setShowPhoneIconMenu(false), ['user-icon-go-call-img']);

  useEffect(() => {
    getUser();
  }, []);

  const {name, imgSrc, bio} = user;

  const handlerGoBack = () => {
    customHistory.goBack();
  };

  const handlerOnClickPhoneIcon = () => {
    setShowPhoneIconMenu(!showPhoneIconMenu)
  };

  return (
    <div className='user-page-container'>
      <div className='user-avatar-container'>
        <div className='user-page-avatar-container'>
          <img className='user-avatar-item' src="/images/test_user.png" alt=""/>
          <Icon className='user-icon-add-to-favourite' imgSrc='/images/heart.png' text='Heart'/>
          <Icon onClick={handlerOnClickPhoneIcon}
                className='user-icon-go-call'
                classNameImg='user-icon-go-call-img'
                imgSrc={imgSrc}
                text='Heart'
          />
          {
            showPhoneIconMenu ? (
              <Dropdown ref={refDropdown} className='user-icon-go-call-dropdown phone-icon-menu-container '>
                <Icon className='phone-icon-menu-item' text='Call' imgSrc='/images/UserApprovals.png'/>
                <Icon className='phone-icon-menu-item' text='Video call' imgSrc='/images/UserApprovals.png'/>
                <Icon className='phone-icon-menu-item' text='Game call' imgSrc='/images/UserApprovals.png'/>
                <Icon className='phone-icon-menu-item' text='Call Availability' imgSrc='/images/UserApprovals.png'/>
                <div style={{position: 'relative'}}>
                  <Hint style={{position: 'absolute', top: 10, right: -15}} text='Help'/>
                </div>
              </Dropdown>) : null
          }

        </div>
        <div className='user-name-container'>
          {name}
        </div>
      </div>
      <div className='user-bio-button-back-container'>
        <div className='user-bio-container'>
          <div className='user-bio-container__title'>Bio</div>
          <div className='user-bio-container__description'>
            {bio}
          </div>
        </div>
        <Button className='button-back' leftIcon='<' onClick={handlerGoBack} label='Back'/>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    user: state.user
  }),
  (dispatch, props) => ({
    getUser: () => dispatch({type: GET_USER_REQUEST, payload: {userId: props.match.params.id || null}})
  })
)(UserPage);
