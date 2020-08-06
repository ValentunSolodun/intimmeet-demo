import React, {useState} from 'react';
import './RootPage.css';
import PhoneIcon from '../../components/PhoneIcon';
import Menu from '../../components/Menu/Menu';
import Button from '../../components/Button';
import ImageWithText from '../../components/ImageWithText';
import _ from 'lodash';
import cn from 'classnames';

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

  // const [selectedUser, setSelectedUser] = useState(_.first(USER_TEST_DATA).id);
  //
  // const handlerSetSelectedUser = () => {
  //
  // }

  return (
    <div>
      <div className='top-panel'>
        <PhoneIcon/>
        <Menu/>
      </div>
      <div className='grid-of-users-container'>
        {
          _.map(USER_TEST_DATA, u => {
            return (
              <div className={cn('user-item-container')} key={u.id}>
                <ImageWithText imgSrc={u.imgSrc} title={u.name} subtitle={u.location} />
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
