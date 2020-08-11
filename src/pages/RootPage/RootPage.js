import React, {useState, useRef, useEffect} from 'react';
import './RootPage.css';
import {connect} from 'react-redux';
import PhoneIcon from '../../components/PhoneIcon';
import Menu from '../../components/Menu/Menu';
import Button from '../../components/Button';
import ImageWithText from '../../components/ImageWithText';
import Loading from '../../components/Loading';
import {getUsersSelector} from '../../selectors';
import {GET_USERS_REQUEST} from '../../actions';
import Dropdown from '../../components/Dropdown';
import Icon from '../../components/Icon';
import Hint from '../../components/Hint';
import _ from 'lodash';
import cn from 'classnames';
import {useOnClickOutside} from '../../helpers/hooks';
import {customHistory} from '../../helpers/history';

const MENU_ITEM = [
  {id: 1, name: 'Approvals', icon: 'images/icons/approvals.svg'},
  {id: 1, name: 'Call Log', icon: 'images/icons/call_logs.svg'},
  {id: 1, name: 'Speed Date', icon: 'images/icons/speed_date.svg'},
  {id: 1, name: 'Images', icon: 'images/icons/images.svg'},
  {id: 1, name: 'Credit Manager', icon: 'images/icons/credit_manager.svg'},
  {id: 1, name: 'Settings', icon: 'images/icons/settings.svg'},
]

// const USER_TEST_DATA = [
//   {id: 1, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 2, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 3, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 4, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 5, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 6, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 7, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 8, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 9, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 10, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 11, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 12, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
//   {id: 13, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
// ];

const RootPage = ({renderData, getUsers}) => {

  const refDropdown = useRef(null);
  const {users, isLoading, errors} = renderData;

  const [showPhoneIconMenu, setShowPhoneIconMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  useOnClickOutside(refDropdown, () => setShowPhoneIconMenu(false), ['phone-icon-general-img-item']);

  useEffect(() => {
    getUsers();
  }, []);

  // const [selectedUser, setSelectedUser] = useState(_.first(USER_TEST_DATA).id);
  //
  // const handlerSetSelectedUser = () => {
  //
  // }

  const handlerOnClickUser = (userId) => {
    customHistory.push(`/user/${userId}`);
  };

  const handlerOnClickPhoneIcon = () => {
    setSelectedMenuItem('');
    setShowPhoneIconMenu(!showPhoneIconMenu);
  };

  const handlerOnClickMenu = (key) => {
    setSelectedMenuItem(key);
  };

  return (
    <div className='root-page-container'>
      <Icon onClick={handlerOnClickPhoneIcon} className='phone-icon-general' classNameImg='phone-icon-general-img-item'
            imgSrc='images/icons/phone_icon.svg'/>
      {
        showPhoneIconMenu ? (
          <Dropdown ref={refDropdown} className='phone-icon-menu-container'>
            <div className='logo-hint-container'>
              <img src="images/icons/logo.svg" alt="Logo"/>
              <div>
                <Icon className='logo-hint-container__hint-icon'
                      text='Help'
                      classNameImg='logo-hint-container__hint-icon-item-img'
                      imgSrc='images/icons/help_icon.svg'
                />
              </div>
            </div>
            <div className='phone-icon-menu-container__menu'>
              {
                _.map(MENU_ITEM, m => {
                  return (
                    <Icon style={{opacity: selectedMenuItem === m.name ? 1 : 0.7}}
                          onClick={() => handlerOnClickMenu(m.name)} className='phone-icon-menu-item' text={m.name}
                          imgSrc={m.icon}/>
                  )
                })
              }
            </div>
            <div>
              {
                selectedMenuItem === 'Approvals' ? (
                  <div>APPROVALS</div>
                ) : selectedMenuItem === 'Call Log' ? (
                  <div>CALL LOG</div>
                ) : selectedMenuItem === 'Speed Date' ? (
                  <div>SPEED DATE</div>
                ) : selectedMenuItem === 'Images' ? (
                  <div>IMAGES</div>
                ) : selectedMenuItem === 'Credit Manager' ? (
                  <div>CREDIT MANAGER</div>
                ) : selectedMenuItem === 'Settings' ? (
                  <div>SETTINGS</div>
                ) : null
              }
            </div>
          </Dropdown>) : null
      }
      <div className='grid-of-users-container'>
        {
          isLoading ? <Loading/> : null
        }
        {
          _.map(users, u => {
            return (
              <div className={cn('user-item-container')} key={u.id}>
                <ImageWithText onClick={() => handlerOnClickUser(u.id)} imgSrc={u.imgSrc} title={u.name}
                               subtitle={u.location}/>
                <div className='user-item-button-container'>
                  <Button className='button-hide-in-grid' label='Hide' style='gray'/>
                  <Button className='button-like-in-grid' label='Like' style='green'/>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default connect(
  state => ({
    renderData: getUsersSelector(state)
  }),
  dispatch => ({
    getUsers: () => dispatch({type: GET_USERS_REQUEST})
  })
)(RootPage);
