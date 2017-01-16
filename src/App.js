import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MyList from './component/MyList';
// import Notes from './component/Notes';
import TopStories from './component/TopStories';
import Story from './component/Story';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topStories: [],
      currentStoryAbstract: '',
      currentStoryTitle: '',
      currentStoryUrl: '',
      myListArr: [],
      myListStory: '',
      note: '',
      notes: [],
    }
    this.getRequestNYT = this.getRequestNYT.bind(this);
    this.setStories = this.setStories.bind(this);
    this.getRequestFirebase = this.getRequestFirebase.bind(this);
    this.addToList = this.addToList.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.addNote = this.addNote.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
    this.editCurrentNote = this.editCurrentNote.bind(this);
    // this.renderSelectedNote = this.renderSelectedNote.bind(this);
  }

  componentDidMount() {
    this.getRequestNYT();
    this.getRequestFirebase();
  }

  getRequestNYT() {
    const nyTimesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key='
    axios.get(nyTimesUrl)
      .then((response) => {
        const data = response.data.results;
        let topStories = [];
          if(data) {
            topStories = Object.keys(data).map((id) => {
              const story = data[id];
              return {
                id: id,
                topArticleTitle: story.title,
                storyUrl: story.url,
                abstract: story.abstract,
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
      currentStoryTitle: this.state.topStories[i].topArticleTitle,
      currentStoryAbstract: this.state.topStories[i].abstract,
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
    console.log('clicked')
    const firebaseURL = 'https://ny-times-app.firebaseio.com/mylist/.json'
    axios.post(firebaseURL, {
      article: this.state.currentStoryTitle,
      note: ''
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
    axios.delete(`https://ny-times-app.firebaseio.com/mylist/${myListStory.id}/.json`)
    .then((response) => {
      this.getRequestFirebase();
    });
  }

  addNote(noteIext) {
    this.setState({ note: noteIext });
  }

  enableEditMode() {
    this.setState({ edit: true });
  }

  editCurrentNote(noteText) {
    let newNote = { note: noteText};
    newNote.note = this.refs.editNoteInput;
    axios.patch({
      url: '/mylist/${note}/.json',
      baseURL: 'https://ny-times-app.firebaseio.com/',
      method: "PATCH",
      data: newNote,
      }).then((response) => {
      let notes = this.state.note;
      let i = response.data.name;
      notes[i] = newNote;
      this.setState({ notes: notes, edit: false });
    }).catch((error) => {
      console.log(error);
    })
  }

  // renderSelectedNote() {
  //   let content;

  //   if (this.state.newNote) {
  //     let newNote = this.state.notes[this.state.newNote];
  //     if(!this.state.edit) {
  //       content = (
  //         <div>
  //           <div className="d-flex justify-content-end mb-3">
  //             <button onClick={this.enableEditMode}>Edit</button>
  //           </div>
  //           <h1>{newNote.note}</h1>
  //         </div>
  //       );
  //     } else {
  //       content = (
  //         <div>
  //           <div className="d-flex justify-content-end mb-3">
  //             <button onClick={this.editCurrentNote}>Save</button>
  //           </div>
  //           <input className="w-100" defaultValue={newNote.note} ref="editNoteInput"/>
  //         </div>
  //       );
  //     }
  //   }
  //   return content;
  // }

  render() {
    return (
      <div className="App">
        <div className="stories">
          <div className="topStoriesList">
          <h1>Top Stories</h1>
            <TopStories
              topStories={this.state.topStories}
              setStories={this.setStories}
            />
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
        <div className="myListNotes">
          <MyList
            myListArr={this.state.myListArr}
            deleteStory={this.deleteStory}
            enableEditMode={this.enableEditMode}
            addNote={this.addNote}
            editCurrentNote={this.editCurrentNote}
            notes={this.state.notes}
            note={this.state.note}
          />
        </div>
      </div>
    );
  }
}

export default App;
