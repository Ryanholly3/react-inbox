import React, { Component } from 'react';

class Message extends React.Component {

  render(){
    return(
      <div className="message">
        { this.props.subject }
      </div>
    )
  }
}

export default Message;
