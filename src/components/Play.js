import { useRef, useState } from 'react';
import '../css/play.css';
import { useDispatch, useSelector } from 'react-redux';
import wordPool from '../json/wordpool.json';
import { changeHighScore } from '../features/currentAccount';

function Play() {

  const currentDifficulty = useSelector((state) => state.currentDifficulty.value);
  const currentAccount = useSelector((state) => state.currentAccount.value);

  const dispatch = useDispatch()

  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [keysPressed, setKeysPressed] = useState(0);
  const [wordsToType, setWordsToType] = useState('');
  const [wordsToTypeRows, setWordsToTypeRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [points, setPoints] = useState(0);
  const correctKeysPressed = useRef(0);
  const onPage = useRef(true);

  function updateHighScores(timeElapsed) {
    const accuracy = Math.round((correctKeysPressed.current / totalCharacters) * 100);
    setAccuracy(accuracy);
    const wpm = Math.floor(((keysPressed / 5) * 60) / timeElapsed);
    setWPM(wpm);
    const points = accuracy * wpm;
    setPoints(points);
    const account = Object.values(currentAccount)[0][currentDifficulty.toLowerCase()];
    let users = JSON.parse(window.localStorage.getItem('users'));
    let updatedCurrentAccount = {};

    if (accuracy > account.accuracyHighScore) {
      dispatch(changeHighScore([currentDifficulty, 'accuracyHighScore', accuracy]));
      
      if (Object.values(JSON.parse(window.localStorage.getItem('currentAccount'))).length > 0) {
        users[Object.keys(currentAccount)[0]][currentDifficulty.toLowerCase()].accuracyHighScore = accuracy;
        localStorage.setItem('users', JSON.stringify(users));

        updatedCurrentAccount[Object.keys(currentAccount)[0]] = users[Object.keys(currentAccount)[0]];
        localStorage.setItem('currentAccount', JSON.stringify(updatedCurrentAccount));
      }
    }

    if (wpm > account.wpmHighScore) {
      dispatch(changeHighScore([currentDifficulty, 'wpmHighScore', wpm]));
      
      if (Object.values(JSON.parse(window.localStorage.getItem('currentAccount'))).length > 0) {
        users[Object.keys(currentAccount)[0]][currentDifficulty.toLowerCase()].wpmHighScore = wpm;
        localStorage.setItem('users', JSON.stringify(users));

        updatedCurrentAccount[Object.keys(currentAccount)[0]] = users[Object.keys(currentAccount)[0]];
        localStorage.setItem('currentAccount', JSON.stringify(updatedCurrentAccount));
      }
    }

    if (points > account.pointsHighScore) {
      dispatch(changeHighScore([currentDifficulty, 'pointsHighScore', points]));
      
      if (Object.values(JSON.parse(window.localStorage.getItem('currentAccount'))).length > 0) {
        users[Object.keys(currentAccount)[0]][currentDifficulty.toLowerCase()].pointsHighScore = points;
        localStorage.setItem('users', JSON.stringify(users));
;
        updatedCurrentAccount[Object.keys(currentAccount)[0]] = users[Object.keys(currentAccount)[0]];
        localStorage.setItem('currentAccount', JSON.stringify(updatedCurrentAccount));
      }
    }
    
  }

  function startTimer() {
    let startTime = performance.now();
    setStartTime(startTime);
    setTimerActive(true);
  }

  function endTimer() {
    const endTime = performance.now()
    
    let timeElapsed = endTime - startTime;
    timeElapsed = Math.round(timeElapsed / 1000);

    setTimerActive(false);

    updateHighScores(timeElapsed);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  function generateWords() {
    const adjustedWordPool = wordPool[currentDifficulty.toLowerCase()];
    const row1 = generateRow(adjustedWordPool, false);
    const row2 = generateRow(adjustedWordPool, false);
    const row3 = generateRow(adjustedWordPool, false);
    const row4 = generateRow(adjustedWordPool, false);
    const row5 = generateRow(adjustedWordPool, true);
    const words = row1 + row2 + row3 + row4 + row5;
    setWordsToType(words);
    setTotalCharacters(words.length);
    setWordsToTypeRows([row1, row2, row3, row4, row5]);
  }
  
  function generateRow(words, end) {
    let randomIndex = 0;
    let newWord = '';
    let newWordsToType = '';
    let spacesRemaining = 20;
    while (spacesRemaining > 1) {
      randomIndex = getRandomInt(words.length);
      newWord = words[randomIndex];
      while (newWord.length > (spacesRemaining - 1)) {
        randomIndex = getRandomInt(words.length);
        newWord = words[randomIndex];
      }
      spacesRemaining = 20 - (newWordsToType + newWord + 1).length;
      if (spacesRemaining <= 1 && end) {
        newWordsToType = newWordsToType + newWord;
      } else {
        newWordsToType = newWordsToType + newWord + ' ';
      }    
    }
    return(newWordsToType);
  }

  window.onkeydown = function keyDown(e) {
    if(onPage.current) {
      if (!timerActive && e.key === ' ') {
        setKeysPressed(0);
        setCurrentRow(0);
        setCurrentCharacter(0);
        correctKeysPressed.current = 0;
        generateWords();
        startTimer();
      }

      if (timerActive) {
        let newKeysPressed = keysPressed + 1
        setKeysPressed(newKeysPressed);
      }

      if (timerActive) {
        if (e.key.length === 1) {
          const container = document.getElementById('row-' + currentRow + '-character-' + currentCharacter);
          if (e.key === wordsToType[0]) {
            container.style.backgroundColor = 'lightgreen';
            correctKeysPressed.current = correctKeysPressed.current + 1; 
          } else {
            container.style.backgroundColor = 'lightpink';
          }
          if (currentCharacter === wordsToTypeRows[currentRow].length - 1) {
            setCurrentCharacter(0);
            setCurrentRow(currentRow + 1);
          } else {
            setCurrentCharacter(currentCharacter + 1);
          }
          if (wordsToType.length === 1) {
            endTimer();
          }
          setWordsToType(wordsToType.slice(1));
        }
      }
    }
  }

  window.onclick = function(e) {
    if (document.getElementsByClassName('login-button')[0].contains(e.target)
        || document.getElementsByClassName('home-button')[0].contains(e.target)) {
          onPage.current = false;
     }
  }

  return(
    <div className='play-page-container'>
      <div className='play-container'>
        <h1 className='game-title'>{currentDifficulty}</h1>
        <div className='game-words-container'>
          {!timerActive && <h2 className='game-prompt'>Press Space To Start</h2>}
          {timerActive && 
            <div className='words-to-type-column'>
              {wordsToTypeRows.map((row, i) => (
                <div className='words-to-type-row' id={'row-' + i} 
                     key={'row-' + i}>
                  {row.split('').map((letter, n) => (
                    <div className='letter-container' id={'row-' + i + '-character-' + n}
                         key={'row-' + i + '-character-' + n}>
                      <p className='letter' >{letter}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>}
        </div>
        {timerActive &&
          <div className='score-display-container'>
            <h3 className='score-display'>Accuracy: 0% | WPM: 0 | Points: 0</h3>
          </div>}
        {!timerActive && 
          <div className='score-display-container'>
            <h3 className='score-display'>Accuracy: {accuracy}% | WPM: {wpm} | Points: {points}</h3>
          </div>}
      </div>
    </div>
  );
}

export default Play;