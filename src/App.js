import { useEffect } from 'react';
import Body from './components/Body';
import Header from './components/Header';
import './css/App.css';
import { useDispatch } from 'react-redux';
import { changeAccount } from './features/currentAccount';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const users = {};
    let currentAccount = {};
    //localStorage.clear();
    if (window.localStorage.getItem('users') === null) {
      localStorage.setItem('users', JSON.stringify(users));
    }
    if (window.localStorage.getItem('currentAccount') === null) {
      localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
    }

    currentAccount =  JSON.parse(window.localStorage.getItem('currentAccount'));
    if (Object.keys(currentAccount).length !== 0) {
      dispatch(changeAccount(currentAccount));
    }

  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  );
}

export default App;
