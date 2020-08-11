import React, {useState} from 'react';
import './LoginPage.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {LOGIN_REQUEST} from '../../actions';

const LoginPage = ({loginRequest}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handlerOnChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlerOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlerSubmit = () => {
    loginRequest({login, password});
  };

  return (
    <div className='login-page-container'>
      <Input onChange={handlerOnChangeLogin} value={login} label='Login' type='text' placeholder='Login'/>
      <Input onChange={handlerOnChangePassword} value={password} label='Password' type='password'/>
      <Button onClick={handlerSubmit} label='Sign In' style='red'/>
    </div>
  )
}

export default connect(null, dispatch => ({
  loginRequest: (data) => dispatch({type: LOGIN_REQUEST, payload: data})
}))(LoginPage);
