import '../css/body.css';
import { useSelector } from 'react-redux';
import Home from './Home';
import Login from './Login';
import CreateAccount from './CreateAccount';
import DifficultySelect from './DifficultySelect';
import HighScore from './HighScore';
import Play from './Play';

function Body() {

  const currentPage = useSelector((state) => state.currentPage.value);

  return (
    <div className='body'>
      {currentPage === 'home' && <Home />}
      {currentPage === 'difficulty-select' && <DifficultySelect />}
      {currentPage === 'play' && <Play />}
      {currentPage === 'high-score' && <HighScore />}
      {currentPage === 'login' && <Login />}
      {currentPage === 'create-account' && <CreateAccount />}
    </div>
  );
}

export default Body;