import React, { Component } from 'react';

class TopStories extends Component {


  render() {
    let storyList = this.props.topStories.map((story, i) => {
      //console.log(story);
      return (
        <li key={i}>{story.topArticleTitle}</li>
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
