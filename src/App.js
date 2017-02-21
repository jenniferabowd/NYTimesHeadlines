import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MyList from './component/MyList';
import TopStories from './component/TopStories';
import Story from './component/Story';

class App extends Component {
  constructor(props) {
    super(props);
    // sets the inital state
    this.state = {
      topStories: [],
      currentStoryAbstract: '',
      currentStoryTitle: '',
      currentStoryUrl: '',
      myListArr: [],
      myListStory: '',
      note: '',
    }
    // binds all methods
    this.getRequestNYT = this.getRequestNYT.bind(this);
    this.setStories = this.setStories.bind(this);
    this.getRequestFirebase = this.getRequestFirebase.bind(this);
    this.addToList = this.addToList.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.editCurrentNote = this.editCurrentNote.bind(this);
  }
  // loads the getRequests from Firebase and NY Times once the page loads
  componentDidMount() {
    this.getRequestNYT();
    this.getRequestFirebase();
  }

  // NY Times get request
  getRequestNYT() {
    const nyTimesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=24a8cf49ab2649bba4126888236dc793'
    axios.get(nyTimesUrl)
      .then((response) => {
        const data = response.data.results;
        let topStories = [];
          if(data) {
            topStories = Object.keys(data).map((id) => {
              const story = data[id];
              // returns the items from the API that we want for each story
              return {
                id: id,
                topArticleTitle: story.title,
                storyUrl: story.url,
                abstract: story.abstract,
              }
             });
          }
          // sets tthe state for the top stories
        this.setState({ topStories });
      })
      .catch((error) => {
       });
  }

// renders the current state
  setStories(i) {
    this.setState({
      currentStoryUrl: this.state.topStories[i].storyUrl,
      currentStoryTitle: this.state.topStories[i].topArticleTitle,
      currentStoryAbstract: this.state.topStories[i].abstract,
    })
  }

// get request from Firebase for myList
  getRequestFirebase() {
    const firebaseURL = 'https://ny-times-app.firebaseio.com/mylist/.json'
    axios.get(firebaseURL)
      .then((response) => {
        const data = response.data;
        let myListArr = [];
          if(data) {
            myListArr = Object.keys(data).map((id) => {
              return {
                id: id,
                myListStory: data[id].article,
                note: data[id].note,
              }
            });
          }
          myListArr.reverse();
          this.setState({ myListArr })
      })
      .catch((error) => {
        console.log(error);
      })
  };

// adds story to myList
  addToList(myListStory) {
    console.log('clicked')
    const firebaseURL = 'https://ny-times-app.firebaseio.com/mylist/.json'
    axios.post(firebaseURL, {
      article: this.state.currentStoryTitle,
      note: this.state.note,
    })
      .then(() => {
        this.getRequestFirebase();
        this.setState({
          myListStory: this.state.currentStoryTitle,
          note: this.state.note,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  };

// deletes story
  deleteStory(myListStory) {
    axios.delete(`https://ny-times-app.firebaseio.com/mylist/${myListStory.id}/.json`)
    .then((response) => {
      this.getRequestFirebase();
    });
  }

// edits current story note
  editCurrentNote(myListStory, newNote, index) {
    console.log(newNote);
    axios({
      url: `/mylist/${myListStory.id}.json`,
      baseURL: 'https://ny-times-app.firebaseio.com/',
      method: "PATCH",
      data: {note: newNote},
      }).then((response) => {
      let myNewListArr = [...this.state.myListArr];
      myNewListArr[index].note = newNote;
      this.getRequestFirebase()
    this.setState({
      myListArr: myNewListArr,
      edit: false,
    });
    }).catch((error) => {
      console.log(error);
    })
  }

// what is rendered and passes props
  render() {
    return (
      <div className="App">
      <h1 className="jumbotron">Most Popular New York Times Articles</h1>
        <div className="stories">
          <div className="topStoriesListWithHeader">
          <h1>Top Stories</h1>
            <div className="topStoriesList">
              <TopStories
                topStories={this.state.topStories}
                setStories={this.setStories}
              />
            </div>
          </div>
          <div className="abstract">
            <Story
              currentStoryAbstract={this.state.currentStoryAbstract}
              currentStoryTitle={this.state.currentStoryTitle}
              currentStoryUrl={this.state.currentStoryUrl}
              addToList={this.addToList}
              myListStory={this.state.myListStory}
            />
          </div>
        </div>
        <br />
        <h1>My List</h1>
        <div className="myListNotes">
          <MyList
            myListArr={this.state.myListArr}
            deleteStory={this.deleteStory}
            editCurrentNote={this.editCurrentNote}
            note={this.state.note}
          />
        </div>
      </div>
    );
  }
}

export default App;
