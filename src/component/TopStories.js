import React, { Component } from 'react';
// import Story from './component/Story';

class TopStories extends Component {
  render() {
    let storyList = this.props.topStories.map((story, i) => {
      return (
        <li key={i} onClick={ () => this.props.setStories(i) }>
          {story.topArticleTitle}
        </li>
      );
    });
    return (
      <div>
        <h1>Top Stories</h1>
        <ul>
          {storyList}
        </ul>
      </div>
    );
  }
}

export default TopStories;
