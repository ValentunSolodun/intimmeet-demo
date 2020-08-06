import React, {useState, useRef} from 'react';
import './RootPage.css';
import PhoneIcon from '../../components/PhoneIcon';
import Menu from '../../components/Menu/Menu';
import Button from '../../components/Button';
import ImageWithText from '../../components/ImageWithText';
import Dropdown from '../../layouts/Dropdown';
import Icon from '../../components/Icon';
import Hint from '../../components/Hint';
import _ from 'lodash';
import cn from 'classnames';
import {useOnClickOutside} from '../../helpers/hooks';

const USER_TEST_DATA = [
  {id: 1, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 2, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 3, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 4, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 5, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 6, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 7, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 8, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 9, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 10, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 11, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 12, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
  {id: 13, name: 'Denise', location: 'New York, NY', imgSrc: 'images/test_user.png'},
];

const RootPage = () => {

  const refDropdown = useRef(null);

  const [showPhoneIconMenu, setShowPhoneIconMenu] = useState(false);
  useOnClickOutside(refDropdown, () => setShowPhoneIconMenu(false));

  // const [selectedUser, setSelectedUser] = useState(_.first(USER_TEST_DATA).id);
  //
  // const handlerSetSelectedUser = () => {
  //
  // }

  const handlerOnClickUser = () => {

  }

  const handlerOnClickPhoneIcon = () => {
    setShowPhoneIconMenu(!showPhoneIconMenu)
  }

  return (
    <div>
      <div className='top-panel'>
        <PhoneIcon onClick={handlerOnClickPhoneIcon} />
        {
          showPhoneIconMenu ? (
            <Dropdown ref={refDropdown} className='phone-icon-menu-container'>
              <Icon text='Call Approvals' imgSrc='images/UserApprovals.png'/>
              <Icon text='Call Log' imgSrc='images/UserApprovals.png'/>
              <Icon text='Call Purchase' imgSrc='images/UserApprovals.png'/>
              <Icon text='Call Availability' imgSrc='images/UserApprovals.png'/>
              <div style={{position: 'relative'}}>
                <Hint style={{position: 'absolute', top: 10, right: -15}} text='Help' />
              </div>
            </Dropdown>) : null
        }
        <Menu/>
      </div>
      <div className='grid-of-users-container'>
        {
          _.map(USER_TEST_DATA, u => {
            return (
              <div className={cn('user-item-container')} key={u.id}>
                <ImageWithText onClick={handlerOnClickUser} imgSrc={u.imgSrc} title={u.name} subtitle={u.location}/>
                <div className='user-item-button-container'>
                  <Button label='Hide' style='gray'/>
                  <Button label='Like' style='green'/>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default RootPage;
