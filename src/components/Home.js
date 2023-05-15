import '../css/home.css';
import { useDispatch } from 'react-redux';
import { changePage } from '../features/currentPage';

function Home() {

  const dispatch = useDispatch();

  return (
    <div className='home-page-container'>
      <div className='welcome-container'>
        <h1 className='welcome-prompt'>Welcome</h1>
        <div className='play-or-high-score'>
          <button 
            className='play-button' 
            onClick={() => dispatch(changePage('difficulty-select'))}
          >
            Play
          </button>
          <button 
            className='high-score-button' 
            onClick={() => dispatch(changePage('high-score'))}
          >
            High Score
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;