import React, { Component } from 'react';
import MyStoryListItem from './MyStoryListItem';

class MyList extends React.Component {
  render() {
    let myListLi = this.props.myListArr.map((myListStory, i) => {
      return (
        <MyStoryListItem
          key={i}
          myListStory={myListStory}
          deleteStory={this.props.deleteStory}
          enableEditMode={this.enableEditMode}
          addNote={this.addNote}
          editCurrentNote={this.editCurrentNote}
          // notes={this.state.notes}
          // note={this.state.note}
        />
      );
    });
    return(
      <div>
        <h1>My List</h1>
        <ol>
            {myListLi}
        </ol>
      </div>
    );
  }
}

export default MyList;
