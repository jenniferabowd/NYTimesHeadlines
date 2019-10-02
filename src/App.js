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
      // this will hold all the top story headlines
      topStories: [],
      // this will hold the current story title
      currentStoryTitle: '',
      // this will hold the current story abstract
      currentStoryAbstract: '',
      // this will hold the current story url
      currentStoryUrl: '',
      // this will hold the items in my list
      myListArr: [],
      // this will beach each story in my list
      myListStory: '',
      // this will be the note for each story
      note: '',
      edit: false,
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
    // var mykey = config.MY_KEY;

    // NY Times API variable
    const nyTimesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=24a8cf49ab2649bba4126888236dc793'
    // API get request using Axios
    axios.get(nyTimesUrl)
      // once you do the get request, process the response
      .then((response) => {
        // this puts the API response into a data variable
        const data = response.data.results;
        // this calls the top stories variable
        let topStories = [];
          // says if there is data, then add the top stories into the topStories array
          if(data) {
            topStories = Object.keys(data).map((id) => {
              // each item of data is stored in a variable of story
              const story = data[id];
              console.log('story:', story)
              // returns the items from the API that we want for each story
              return {
                // this sets the id, topArticleTitle, storyUrl, and abstract to how it is stored in the story variable
                id: id,
                topArticleTitle: story.title,
                storyUrl: story.url,
                abstract: story.abstract
              }
             });
          }
          // sets the state for the top stories
        this.setState({ topStories });
      })
      // error handler
      .catch((error) => {
      console.error(error)
    });
  }

// this sets the state for the item clicked on that will render in the current story box
  setStories(i) {
    this.setState({
      currentStoryUrl: this.state.topStories[i].storyUrl,
      currentStoryTitle: this.state.topStories[i].topArticleTitle,
      currentStoryAbstract: this.state.topStories[i].abstract,
    })
  }

// get request from Firebase for myList
  getRequestFirebase() {
    // sets the api request from firebase into a variable
    const firebaseURL = 'https://ny-times-app.firebaseio.com/mylist/.json'
    // api get request
    axios.get(firebaseURL)
      .then((response) => {
        // sets the response data into a variable
        const data = response.data;
        // creates an empty myListArr variable
        let myListArr = [];
        // if data, it does the following
          if(data) {
            // it sets each object in Firebase to the variable myListArr
            myListArr = Object.keys(data).map((id) => {
              return {
                // stores each item to this
                id: id,
                myListStory: data[id].article,
                note: data[id].note,
              }
            });
          }
          // shows the story from most recently added to the last
          myListArr.reverse();
          // sets the state for myListArr
          this.setState({ myListArr })
      })
      .catch((error) => {
        console.log(error);
      })
  };

// adds story to myList
  addToList(myListStory) {
    const firebaseURL = 'https://ny-times-app.firebaseio.com/mylist/.json'
    // this add the current storyTitle to the database along with an empty note
    axios.post(firebaseURL, {
      article: this.state.currentStoryTitle,
      note: this.state.note,
    })
      .then(() => {
        // after you add the story to myList, it does another getRequestFirebase
        this.getRequestFirebase();
        // sets the state from that getRequest to myListStory and note
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
    // deletes the current story from Firebase
    axios.delete(`https://ny-times-app.firebaseio.com/mylist/${myListStory.id}/.json`)
    .then((response) => {
      // then does another getRequestFirebase
      this.getRequestFirebase();
    });
  }

// edits current story note
  editCurrentNote(myListStory, newNote, index) {
    axios({
      baseURL: 'https://ny-times-app.firebaseio.com/',
      url: `/mylist/${myListStory.id}.json`,
      method: "PATCH",
      // sets up how the data will be passed
      data: {note: newNote},
    }).then((response) => {
      // sets the new list array to the following
      let myNewListArr = [...this.state.myListArr];
      // sets the note to the newNote
      myNewListArr[index].note = newNote;
      // does another getRequestFirebase
      this.getRequestFirebase()
      // sets the state of myListArr and edit
      this.setState({
        myListArr: myNewListArr,
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
        <div className="myList">
          <h1>My List</h1>
          <div className="myListNotes">
            <MyList
              myListArr={this.state.myListArr}
              deleteStory={this.deleteStory}
              editCurrentNote={this.editCurrentNote}
              note={this.state.note}
              edit={this.state.edit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
