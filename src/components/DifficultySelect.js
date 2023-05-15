import '../css/difficultyselect.css';
import { useDispatch } from 'react-redux';
import { changeDifficulty } from '../features/currentDifficulty';
import { changePage } from '../features/currentPage';

function DifficultySelect () {

  const dispatch = useDispatch();

  function handleClick(difficulty) {
    dispatch(changeDifficulty(difficulty));
    dispatch(changePage('play'));
  }

  return (
    <div className='difficulty-select-page-container'>
      <p className='difficulty-prompt'>Choose A Difficulty</p>
      <div className='game-links'>
        <button className='difficulty-button' onClick={() => handleClick('Easy')}>Easy</button>
        <button className='difficulty-button' onClick={() => handleClick('Medium')}>Medium</button>
        <button className='difficulty-button' onClick={() => handleClick('Hard')}>Hard</button>
      </div>
    </div>
  );
}

export default DifficultySelect;