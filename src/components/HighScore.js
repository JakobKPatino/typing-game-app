import '../css/highscore.css';
import Score from './Score';

function HighScore() {
  return (
    <div className='high-score-page-container'>
      <div className='high-score-container'>
        <h1 className='high-score-title'>High Scores</h1>
        <Score difficulty={'Easy'}/>
        <Score difficulty={'Medium'}/>
        <Score difficulty={'Hard'}/>
      </div>
    </div>
  );
}

export default HighScore;