import React, { Component } from 'react';

class MyStoryListItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete() {
    this.props.deleteStory(this.props.myListStory);
  }

  handleEdit() {
    this.props.editCurrentNote(this.props.note);
  }

  render() {
    return(
      <li>
        {this.props.myListStory.myListStory}
        <button onClick={this.handleEdit}>Add Note</button>
        <button onClick={this.handleDelete}>Delete</button>
        <ul>
        </ul>
      </li>
    );
  }
}

export default MyStoryListItem;
