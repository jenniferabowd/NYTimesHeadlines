import React, { Component } from 'react';

class Story extends React.Component {
  render() {
    let viewStory;
    if(this.props.currentStoryUrl) {
      viewStory = (
        <div className="story">
          <div className="panel panel-default">
            <h4>{this.props.currentStoryTitle}</h4>
            <p>{this.props.currentStoryAbstract}</p>
            <a href={this.props.currentStoryUrl}>{this.props.currentStoryUrl}</a>
            <br />
            <br />
            <button className="btn btn-info btn-xs" onClick={ () => this.props.addToList(this.props.myListStory)}>
                Add to List
                {" "}
                <span className="glyphicon glyphicon-pushpin" aria-hidden="true">
                </span>
            </button>
            <br />
            <br />
          </div>
        </div>
      )
        return (
          <div>
            <h1>Selected Story</h1>
            <div>
              {viewStory}
            </div>
          </div>
        );
    } else {
      return (
        <div className="story">
          <h1>Story</h1>
          <div className="panel panel-default">
            <h3>Click on an article name to learn more</h3>
          </div>
        </div>
      )
    }
  }
}

export default Story;
