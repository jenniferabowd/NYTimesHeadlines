import React, { Component } from 'react';

class MyStoryListItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.renderSelectedNote = this.renderSelectedNote.bind(this);
  }

  handleDelete() {
    this.props.deleteStory(this.props.myListStory);
  }

  handleEdit() {
    this.props.editCurrentNote(this.props.note);
  }

  renderSelectedNote() {
    let content;
    let myNotesLi = this.props.notes.map((note, i) => {

    if (this.props.enableEditMode === false) {
      // let newNote = this.props.notes[this.props.newNote];
      // if(!this.props.edit) {
        content = (
           <li>
            {this.props.myListStory.myListStory}
            <button onClick={this.handleEdit}>Add Note</button>
            <button onClick={this.handleDelete}>Delete</button>
            <ul>
              <li>{this.props.notes[i]}</li>
              <button onClick={this.enableEditMode}>Edit</button>
            </ul>
          </li>
        );
      // }
    } else {
        content = (
           <li>
            {this.props.myListStory.myListStory}
            <button onClick={this.handleEdit}>Add Note</button>
            <button onClick={this.handleDelete}>Delete</button>
              <div>
                <input defaultValue={this.props.notes[i]} ref="editNoteInput"/>
                <button onClick={this.editCurrentNote}>Save</button>
              </div>
          </li>
        );
      }
    });
    return content;
  }

   render() {
    return(
      <div>
      {this.renderSelectedNote()}
      </div>
    );
  }
}

export default MyStoryListItem;
