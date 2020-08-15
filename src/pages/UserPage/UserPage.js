import React, {useRef, useState, useEffect} from 'react';
import './UserPage.css';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import PhoneIcon from '../../components/PhoneIcon';
import {getUserSelector} from '../../selectors';
import {customHistory} from '../../helpers/history';
import {GET_USER_REQUEST} from '../../actions';
import Hint from '../../components/Hint';
import Dropdown from '../../components/Dropdown';
import {useOnClickOutside} from '../../helpers/hooks';
import Loading from '../../components/Loading';
import _ from 'lodash';
import IntemmeetButton from '../../components/IntemmeetButton';

// const MENU_ITEM = [
//   {id: 1, name: 'Call', icon: '/images/icons/approvals.svg'},
//   {id: 1, name: 'Video Call', icon: '/images/icons/call_logs.svg'},
//   {id: 1, name: 'Speed Date', icon: '/images/icons/speed_date.svg'},
//   {id: 1, name: 'Images', icon: '/images/icons/images.svg'},
//   {id: 1, name: 'Passion & Truth Detector', icon: '/images/icons/credit_manager.svg'},
//   {id: 1, name: 'Settings', icon: '/images/icons/settings.svg'},
// ];


// const USER_TEST_DATA = {
//   id: 1,
//   name: 'Denise',
//   location: 'New York, NY',
//   imgSrc: 'images/test_user.png',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
// };

const UserPage = ({renderData, getUser}) => {
  const {user, isLoading, errors} = renderData;
  // const refDropdown = useRef(null);
  // const [showPhoneIconMenu, setShowPhoneIconMenu] = useState(false);
  // const [selectedMenuItem, setSelectedMenuItem] = useState('');
  // useOnClickOutside(refDropdown, () => setShowPhoneIconMenu(false), ['user-icon-go-call-img']);
  // const handlerOnClickMenu = (key) => {
  //   setSelectedMenuItem(key);
  // };

  useEffect(() => {
    getUser();
  }, []);

  const handlerGoBack = () => {
    customHistory.goBack();
  };

  // const handlerOnClickPhoneIcon = () => {
  //   setShowPhoneIconMenu(!showPhoneIconMenu)
  // };

  return (
    <div className='user-page-container'>
      {
        isLoading ? <Loading/> : null
      }
      <IntemmeetButton classNameOverlayDropdown='user-page-container__dropdown-overlay' user={user} />
      <Icon className='user-icon-add-to-favourite' imgSrc='/images/icons/to_favourite.svg'/>
      <div className='user-avatar-container'>
        <div className='user-page-avatar-container'>
          <img className='user-avatar-item' src={user.imgSrc} alt=""/>
        </div>
        <div className='user-name-container'>
          {user.name}
        </div>
      </div>
      <div className='user-bio-button-back-container'>
        <div className='user-bio-container'>
          <div className='user-bio-container__title'>Bio</div>
          <div className='user-bio-container__description'>
            {user.bio}
          </div>
        </div>
        <Button className='button-back' leftIcon='<' onClick={handlerGoBack} label='Back'/>
      </div>
      <div style={{position: 'absolute', bottom: 5, left: 10}}>
        <button onClick={() => window.onCallEvent('create', {isIncomming: false, isOutcomming: true, targetName: 'test User 1'})}>Outcomming call</button>
        <button onClick={() => window.onCallEvent('create', {isIncomming: true, isOutcomming: false, targetName: 'test'})}>Incomming call</button>
        <button onClick={() => window.onCallEvent('pick_up', {publishVideo: true})}>Pick up (with video)</button>
        <button onClick={() => window.onCallEvent('pick_up', {publishVideo: false})}>Pick up</button>
        <button onClick={() => window.onCallEvent('hang_up')}>Hang up</button>
        <button onClick={() => window.onCallEvent('state_changed', {publishVideo: true})}>State changed (on video)</button>
        <button onClick={() => window.onCallEvent('state_changed', {publishVideo: false})}>State changed (off video)</button>
        <button onClick={() => window.onCallEvent('error')}>Error</button>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    renderData: getUserSelector(state)
  }),
  (dispatch, props) => ({
    getUser: () => dispatch({type: GET_USER_REQUEST, payload: {userId: props.match.params.id || null}})
  })
)(UserPage);
