import React, { Component } from 'react';

class myStoryListItem extends Component {
  render() {
    let article;
    if (this.props.myListStory) {
       article = this.props.myListStory;
    }
    return(
      <li>
        {article}
      </li>
    );
  }
}

export default myStoryListItem;
