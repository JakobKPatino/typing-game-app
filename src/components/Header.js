import '../css/header.css';
import profilePicture from '../images/profile-icon.jpg';
import { useDispatch, useSelector} from 'react-redux';
import { changePage } from '../features/currentPage';

function Header() {

  const currentAccount = useSelector((state) => state.currentAccount.value);

  const dispatch = useDispatch();

  return(
    <div className='header-container'>

      <div className='title-container'>
        <h1 className="title">TYPING GAME</h1>
      </div>

      <div className='home-login-container'>
        <button
          className='home-button'
          onClick={() => dispatch(changePage('home'))}
        >
          Home
        </button>

        <div className='login-container'>
          <button 
            className='login-button'
            onClick={() => dispatch(changePage('login'))}
          >
              <span className='login-button-contents'>
                <img className="profile-picture" src={profilePicture} alt="profile icon" />
                <p className='login-text'>{Object.keys(currentAccount)[0]}</p>
              </span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Header;