import React, { Component } from 'react';

class Story extends React.Component {
  render() {
    let viewStory;
    if(this.props.currentStoryUrl) {
      viewStory = (
        <div>
          <p>{this.props.currentStoryTitle}</p>
          <p>{this.props.currentStoryAbstract}</p>
          <a href={this.props.currentStoryUrl}>{this.props.currentStoryUrl}</a>
        </div>
      )
        return (
          <div>
            <h1>Story</h1>
            <div>{viewStory}</div>
                <button onClick={ () => this.props.addToList(this.props.myListStory)}>
                  Add to List
                </button>
          </div>
        );
    } else {
      return (
        <div>
          <h1>Story</h1>
          <div>
            <h3>Click on an article name to learn more</h3>
          </div>
        </div>
      )
    }
  }
}

export default Story;
