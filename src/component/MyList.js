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
          addNote={this.addNote}
          editCurrentNote={this.editCurrentNote}
          note={myListStory.note}
        />
      );
    });
    return(
      <div>
        <ul className="list-group">
            {myListLi}
        </ul>
      </div>
    );
  }
}

export default MyList;
