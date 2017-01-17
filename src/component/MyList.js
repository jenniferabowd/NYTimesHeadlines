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
          // enableEditMode={this.enableEditMode}
          addNote={this.addNote}
          editCurrentNote={this.editCurrentNote}
          notes={this.props.notes}
          note={this.props.note}
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
