import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MyList from './component/MyList';
import Notes from './component/Notes';
import TopStories from './component/TopStories';
import Story from './component/Story';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: [],
      currentStoryUrl: '',
    }
    this.setStories = this.setStories.bind(this);
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest() {
    const nyTimesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key='
    axios.get(nyTimesUrl)
      .then((response) => {
        const data = response.data.results;
        let topStories = [];
          if(data) {
            topStories = Object.keys(data).map((id) => {
              const story = data[id];
              console.log(story);
              return {
                id: id,
                topArticleTitle: story.title,
                storyUrl: story.url,
              }
             });
          }
        this.setState({ topStories });
      })
      .catch((error) => {
       });
  }

  setStories(i) {
    this.setState({ currentStoryUrl: this.state.topStories[i].storyUrl})
  }


  render() {
    return (
      <div className="App">
        <div className="Stories">
          <TopStories
            topStories={this.state.topStories}
            setStories={this.setStories}
          />
          <Story
            topStories={this.state.topStories}
            currentStoryUrl={this.state.currentStoryUrl}
            setStories={this.setStories}
          />
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
