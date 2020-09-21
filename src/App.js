import React from 'react';
import './App.css';
import './assets/styles/mainPage.css';
import MainPage from './components/mainPage';

function App() {
  return (
    <div >
      <div className="header"/>
      <div className="w-full h-full">
        <MainPage/>
      </div>
   </div>
  );
}

export default App;
