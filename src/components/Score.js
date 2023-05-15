import '../css/score.css';
import { useSelector } from 'react-redux';

function Score({difficulty}) {

  const currentAccount = useSelector((state) => state.currentAccount.value);
  const highScores = Object.values(currentAccount)[0][difficulty.toLowerCase()];

  return (
    <div className='difficulty-container'>
      <h2 className='difficulty-title'>{difficulty}</h2>
      <div className='score-container'>
        <div className='accuracy-high-score-container'>
          <h3 className="accuracy-high-score-title">Accuracy</h3>
          <p className='accuracy-high-score'>{highScores.accuracyHighScore}%</p>
        </div>
        <div className='wpm-high-score-container'>
          <h3 className="wpm-high-score-title">WPM</h3>
          <p className='wpm-high-score'>{highScores.wpmHighScore}</p>
        </div>
        <div className='points-high-score-container'>
          <h3 className="points-high-score-title">Points</h3>
          <p className='points-high-score'>{highScores.pointsHighScore}</p>
        </div>
      </div>
    </div>
  );
}

export default Score;