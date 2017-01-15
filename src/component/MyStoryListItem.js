import React, { Component } from 'react';

class MyStoryListItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    this.props.deleteStory(this.props.myListStory);
  }

  render() {
    return(
      <li>
        {this.props.myListStory.myListStory}
        <button onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
}

export default MyStoryListItem;
