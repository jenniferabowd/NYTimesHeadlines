import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import MyList from './component/MyList';
import Notes from './component/Notes';
import TopStories from './component/TopStories';
import Story from './component/Story';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: []
    }
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest() {
    const nyTimesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key={key}'
    axios.get(nyTimesUrl)
      .then((response) => {
        // console.log(response);
        const data = response.data.results;
        console.log(data);
        let topStories = [];
          if(data) {
            topStories = Object.keys(data).map((id) => {
              const story = data[id];
              console.log(story);
              return {
                id: id,
                topArticleTitle: story.title
              }
             });

          }
        this.setState({ topStories });
      })
      .catch((error) => {
       });
  }

  render() {
    return (
      <div className="App">
        <div className="Stories">
          <TopStories
            id="test"
            topStories={this.state.topStories}
          />
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
