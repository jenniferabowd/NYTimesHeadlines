import React, { Component } from 'react';
import MyStoryListItem from './MyStoryListItem';

class MyList extends Component {
  render() {
    let myListLi = this.props.myListArr.map((myListStory, i) => {
      return (
        <myStoryListItem
          key={i}
          myListStory={myListStory}
        />
      );
    });
    return(
      <div>
        <h1>My List</h1>
        <ul>
            {myListLi}
        </ul>
      </div>
    );
  }
}

export default MyList;
