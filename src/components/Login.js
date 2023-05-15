import { useState } from 'react';
import '../css/login.css';
import visibleEye from '../images/visible-eye.png'
import notVisibleEye from '../images/not-visible-eye.png'
import { useDispatch} from 'react-redux';
import { changePage } from '../features/currentPage';
import {changeAccount} from '../features/currentAccount';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [missingField, setMissingField] = useState(false);
  const [incorrentEntry, setIncorrectEntry] = useState(false);

  const dispatch = useDispatch();

  function handleSubmit(e) {

    e.preventDefault();

    let users =  JSON.parse(window.localStorage.getItem('users'));
    let missingFieldTemp = missingField;
    let incorrentEntryTemp = incorrentEntry;

    if (username === '' || password === '') {
      setMissingField(true);
      missingFieldTemp = true;
      setIncorrectEntry(false);
      incorrentEntryTemp = false;

    } else {
      setMissingField(false);
      missingFieldTemp = false;

      if (users.hasOwnProperty(username)) {
        if (users[username].password === password) {
          setIncorrectEntry(false);
          incorrentEntryTemp = false;
        } else {
          setIncorrectEntry(true);
          incorrentEntryTemp = true;
        }
      } else {
        setIncorrectEntry(true);
        incorrentEntryTemp = true;
      }
    }

    if (!missingFieldTemp && !incorrentEntryTemp) {
      const users =  JSON.parse(window.localStorage.getItem('users'));
      let newCurrentAccount = {};
      newCurrentAccount[username] = users[username];
      dispatch(changeAccount(newCurrentAccount));
      localStorage.setItem('currentAccount', JSON.stringify(newCurrentAccount));

      dispatch(changePage('home'));
    }
    
  }

  function handlePasswordVisibility() {
    if (passwordVisible) {
      document.getElementsByClassName('password-input')[0].type = 'password';
      setPasswordVisible(false);
    } else {
      document.getElementsByClassName('password-input')[0].type = 'text';
      setPasswordVisible(true);
    }
  }

  return (
    <div className='login-page-container'>
      <div className='login-or-create-account-container'>
        <form className='login-input-container' onSubmit={handleSubmit}>
          <h2 className='login-prompt'>Login</h2>
          {missingField && <p className='empty-field-message'>Please fill in all fields</p>}
          {incorrentEntry && <p className='incorrect-entry-message'>Incorrect username or password</p>}
          <div className='username-container'>
            <p className='username-prompt'>Username</p>
            <input className="username-input"
                type="text"
                maxLength='12'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className='password-container'>
            <p className='password-prompt'>Password</p>
            <div className='password-input-container'>
              <input className="password-input"
                  type="password"
                  maxLength='12'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              <button 
                className="visible-password-button"
                type = 'button'
                onClick={handlePasswordVisibility}
              >
                {!passwordVisible && <img className='visible-password-img' src={visibleEye} alt="password visible" />}
                {passwordVisible && <img className='not-visible-password-img' src={notVisibleEye} alt="password not visible" />}
              </button>
            </div>
          </div>
          <button className='login-submit-button'>Login</button>
        </form>
        <button 
          className='create-account-button' 
          onClick={() => dispatch(changePage('create-account'))}
        >
          Create An Account
        </button>
      </div>
    </div>
  );
}

export default Login;