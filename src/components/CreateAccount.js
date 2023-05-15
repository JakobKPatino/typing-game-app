import '../css/createaccount.css';
import visibleEye from '../images/visible-eye.png'
import notVisibleEye from '../images/not-visible-eye.png'
import { useDispatch} from 'react-redux';
import { changePage } from '../features/currentPage';
import {changeAccount} from '../features/currentAccount';
import { useState } from 'react';

function CreateAccount() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [missingField, setMissingField] = useState(false);
  const [usedUsername, setUsedUsername] = useState(false);

  const dispatch = useDispatch();

  function handleSubmit(e) {

    e.preventDefault();

    let users =  JSON.parse(window.localStorage.getItem('users'));
    let missingFieldTemp = missingField;
    let usedUsernameTemp = usedUsername;

    if (username === '' || password === '') {
      setMissingField(true);
      missingFieldTemp = true;
    } else {
      setMissingField(false);
      missingFieldTemp = false;
    }
    
    if (users.hasOwnProperty(username)) {
      setUsedUsername(true);
      usedUsernameTemp = true;
    } else {
      setUsedUsername(false);
      usedUsernameTemp = false;
    }

    if (!missingFieldTemp && !usedUsernameTemp) {
      let newAccount = {};
      const newAccountDefaultContent = {
        password: password,
        easy: {
          accuracyHighScore: 0,
          wpmHighScore: 0,
          pointsHighScore: 0
        },
        medium: {
          accuracyHighScore: 0,
          wpmHighScore: 0,
          pointsHighScore: 0
        },
        hard: {
          accuracyHighScore: 0,
          wpmHighScore: 0,
          pointsHighScore: 0
        }
      };
      newAccount[username] = newAccountDefaultContent;
      dispatch(changeAccount(newAccount));
      localStorage.setItem('currentAccount', JSON.stringify(newAccount));
      users[username] = newAccountDefaultContent;
      localStorage.setItem('users', JSON.stringify(users));

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
    <div className='create-account-page-container'>
      <div className='create-account-or-back-container'>
        <form className='create-account-input-container' onSubmit={handleSubmit}>
          <h2 className='create-account-prompt'>Create Account</h2>
          {missingField && <p className='empty-field-message'>Please fill in all fields</p>}
          <div className='username-container'>
            <div className='username-prompt-container'>
              <p className='username-prompt-ca'>Username</p>
              {usedUsername && <p className='unused-username-message'>Username already exists</p>}
            </div>
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
          <button className='create-account-submit-button'>Create Account</button>
        </form>
        <button 
          className='back-button' 
          onClick={() => dispatch(changePage('login'))}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;