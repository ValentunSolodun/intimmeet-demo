import React, {useEffect} from 'react';
import './RootPage.css';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import ImageWithText from '../../components/ImageWithText';
import Loading from '../../components/Loading';
import {getUsersSelector} from '../../selectors';
import IntemmeetButton from '../../components/IntimmeetButton';
import {GET_USERS_REQUEST} from '../../actions';
import _ from 'lodash';
import cn from 'classnames';
import {customHistory} from '../../helpers/history';

const MENU_ITEM = [
  {id: 1, name: 'Approvals', icon: 'images/icons/approvals.svg'},
  {id: 1, name: 'Call Log', icon: 'images/icons/call_logs.svg'},
  {id: 1, name: 'Speed Date', icon: 'images/icons/speed_date.svg'},
  {id: 1, name: 'Images', icon: 'images/icons/images.svg'},
  {id: 1, name: 'Credit Manager', icon: 'images/icons/credit_manager.svg'},
  {id: 1, name: 'Settings', icon: 'images/icons/settings.svg'},
];

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

  const {users, isLoading, errors} = renderData;
  useEffect(() => {
    getUsers();
  }, []);

  const handlerOnClickUser = (userId) => {
    customHistory.push(`/user/${userId}`);
  };


  return (
    <div className='root-page-container'>
      <IntemmeetButton offsetTop='0%'/>

      <div className='grid-of-users-container'>
        {
          isLoading ? <Loading/> : null
        }
        {
          _.map(users, u => {
            return (
              <div className={cn('user-item-container')} key={u.id}>
                <ImageWithText onClick={() => handlerOnClickUser(u.id)} imgSrc={u.img_src} title={u.name}
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
