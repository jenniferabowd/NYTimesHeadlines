import React, { Component } from 'react';

class Story extends Component {
  render() {
    let viewStory;
    if(this.props.currentStoryUrl) {
      viewStory = (
        <iframe src={this.props.currentStoryUrl}>
        console.log(this.props.currentStoryUrl)
        </iframe>
      )
        return (
          <div>
            <h1>Story</h1>
            <div>{viewStory}</div>
                <button>Add to List</button>
          </div>
        );
    } else {
      return (
        <div>
          <h1>Story</h1>
          <div>
            <h3>Click on an article name to read the story</h3>
          </div>
        </div>
      )
    }
  }
}

export default Story;
