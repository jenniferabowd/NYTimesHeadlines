import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MyList from './component/MyList';
import Notes from './component/Notes';
import TopStories from './component/TopStories';
import Story from './component/Story';
import MyStoryListItem from './component/MyStoryListItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: [],
      currentStoryUrl: '',
      currentStoryTitle: '',
      myListArr: [],
      myListStory: '',
    }
    this.setStories = this.setStories.bind(this);
    this.addToList = this.addToList.bind(this);
    this.getRequestNYT = this.getRequestNYT.bind(this);
    this.getRequestFirebase = this.getRequestFirebase.bind(this);
    this.deleteStory = this.deleteStory.bind(this)
  }

  componentDidMount() {
    this.getRequestNYT();
    this.getRequestFirebase();
  }

  getRequestNYT() {
    const nyTimesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=24a8cf49ab2649bba4126888236dc793'
    axios.get(nyTimesUrl)
      .then((response) => {
        const data = response.data.results;
        let topStories = [];
          if(data) {
            topStories = Object.keys(data).map((id) => {
              const story = data[id];
              // console.log(story);
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
    this.setState({
      currentStoryUrl: this.state.topStories[i].storyUrl,
      currentStoryTitle: this.state.topStories[i].topArticleTitle
    })
  }

  getRequestFirebase() {
    const firebaseURL = 'https://ny-times-app.firebaseio.com/mylist/.json'
    axios.get(firebaseURL)
      .then((response) => {
        // console.log(response);
        const data = response.data;
        let myListArr = [];
          if(data) {
            myListArr = Object.keys(data).map((id) => {
              const myListStory = data[id];
              return {
                id: id,
                myListStory: data[id].article
              }
            });
          }
          this.setState({ myListArr })
      })
      .catch((error) => {
        console.log(error);
      })
  };


  addToList(myListStory) {
    // console.log(myListStory)
    // console.log('clicked')
    const firebaseURL = 'https://ny-times-app.firebaseio.com/mylist/.json'
    axios.post(firebaseURL, {
      article: this.state.currentStoryTitle
    })
      .then(() => {
        this.getRequestFirebase();
        this.setState({
          myListStory: this.state.currentStoryTitle
        })
      })
      .catch((error) => {
        console.log(error);
      })
  };

  deleteStory(myListStory) {
    console.log(myListStory, 'This is delete')
    console.log('clicked delete')
    axios.delete(`https://ny-times-app.firebaseio.com/mylist/${myListStory.id}/.json`)
    .then((response) => {
      this.getRequestFirebase();
    });
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
            addToList={this.addToList}
            getRequestNYT={this.getRequestNYT}
            setStories={this.setStories}
            currentStoryTitle={this.state.currentStoryTitle}
            myListStory={this.state.myListStory}
          />
        </div>
        <div className="myListNotes">
          <div>
            <MyList
              myListArr={this.state.myListArr}
              myListStory={this.state.myListStory}
              addToList={this.addToList}
              setStories={this.setStories}
              currentStoryTitle={this.state.currentStoryTitle}
              myListStory={this.state.myListStory}
              deleteStory={this.deleteStory}
            />
            <Notes />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
