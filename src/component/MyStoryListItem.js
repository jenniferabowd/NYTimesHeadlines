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
    this.renderSelectedNote = this.renderSelectedNote.bind(this);
  }

  handleDelete() {
    this.props.deleteStory(this.props.myListStory);
  }

  handleEdit() {
    this.setState({ edit: !(this.state.edit) });
  }

  renderSelectedNote() {
    let content;

    if (this.state.edit === false) {
        content = (
          <div>
            <p>{this.props.note}</p>
          </div>
        );
    } else {
        content = (
          <div>
            <input defaultValue={this.props.note} ref={(input) => this.input = input}/>
            <button className="btn btn-warning btn-xs" onClick={() => {this.props.editCurrentNote(this.props.myListStory, this.input.value, this.props.index)} }>
              Save
              {" "}
              <span className="glyphicon glyphicon-piggy-bank" aria-hidden="true">
              </span>
            </button>
          </div>
        );
      }
    return content;
  }

  render() {
    return(
        <li className="list-group-item">
          {this.props.myListStory.myListStory}
          {" "}
          <button type="button" className="btn btn-warning btn-xs" onClick={this.handleEdit}>
            Add Note
            {" "}
            <span className="glyphicon glyphicon-pencil" aria-hidden="true">
            </span>
          </button>
          {" "}
          <button type="button" className="btn btn-info btn-xs" onClick={this.handleDelete}>
            <span className="glyphicon glyphicon-trash" aria-hidden="true">
            </span>
          </button>
          <br />
          {this.renderSelectedNote()}
        </li>
    );
  }
}

export default MyStoryListItem;
