import React, { Component } from 'react';

class TopStories extends React.Component {
  render() {
    let storyList = this.props.topStories.map((story, i) => {
      return (
        <li className="list-group-item" key={i} onClick={ () => this.props.setStories(i) }>
          {story.topArticleTitle}
        </li>
      );
    });
    return (
      <div>
        <ul className="list-group">
          {storyList}
        </ul>
      </div>
    );
  }
}

export default TopStories;
