import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyList from './component/MyList';
import Notes from './component/Notes';
import TopStories from './component/TopStories';
import Story from './component/Story';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Stories">
          <TopStories />
          <Story />
        </div>
        <div className="myListNotes">
          <MyList />
          <Notes />
        </div>
      </div>
    );
  }
}

export default App;
