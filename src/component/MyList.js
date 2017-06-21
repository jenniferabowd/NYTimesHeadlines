import React from 'react';
import MyStoryListItem from './MyStoryListItem';

class MyList extends React.Component {
  render() {
    // creates a var of myListLi
    let myListLi = this.props.myListArr.map((myListStory, i) => {
      // passes MyListStoryItem the props it needs
      return (
        <MyStoryListItem
          key={i}
          myListStory={myListStory}
          deleteStory={this.props.deleteStory}
          editCurrentNote={this.props.editCurrentNote}
          note={myListStory.note}
          index={i}
        />
      );
    });
    // returns the myList in a UL
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
