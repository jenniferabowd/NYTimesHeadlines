import React, { Component } from 'react';

class MyStoryListItem extends React.Component {
  constructor(props) {
    console.log('constructing mystorylist');
    super(props)
    this.state = {
      edit: false,
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    // this.enableEditMode = this.enableEditMode.bind(this);
    this.renderSelectedNote = this.renderSelectedNote.bind(this);
  }

  handleDelete() {
    this.props.deleteStory(this.props.myListStory);
  }

  handleEdit() {
    this.setState({ edit: !(this.state.edit) });
    console.log(this.state);
  }

  // enableEditMode() {
  //   if (this.state.edit === false){
  //       this.setState({ edit: true });
  //     } else {
  //       this.setState({ edit: false });
  //     }
  // }

  renderSelectedNote() {
    let content;
    // let myNotesLi = this.props.notes.map((note, i) => {

    if (this.state.edit === false) {
      // let newNote = this.props.notes[this.props.newNote];
      // if(!this.props.edit) {
        content = (
          <div>
            <p>{this.props.notes.myNotesP}</p>
          </div>
        );
      // }
    } else {
        content = (
          <div>
            <input defaultValue={this.props.notes.myNotesLi} ref="editNoteInput"/>
            { <button onClick={this.editCurrentNote}>Save</button> }
          </div>
          // this.setState({ edit: false });
        );
        // this.setState({ edit: false });
      }
    // });
    // this.setState({ edit: false });
    return content;
    // this.setState({ edit: false });
  }

   render() {
    return(
        <li>
          {this.props.myListStory.myListStory}
          <button onClick={this.handleEdit}>Edit Note</button>
          <button onClick={this.handleDelete}>Delete</button>
          {this.renderSelectedNote()}
        </li>
    );
  }
}

export default MyStoryListItem;
