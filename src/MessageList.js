import React, { Component } from 'react';
import Message from './Message';

class MessageList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subject: '',
      body: ''
    }
  }

  writeSubject = (e) => {
    e.preventDefault();
    this.setState({
      subject: e.target.value,
    })
  }

  writeBody = (e) => {
    e.preventDefault();
    this.setState({
      body: e.target.value,
    })
  }

  newMessage = (e) => {
    e.preventDefault();

    this.props.addMessage(this.state.subject, this.state.body)
  }

  composeRender(){
    if(this.props.composeWindow === true ){
      return(
        <div className="ComposeMessage">
          <form className="form-horizontal well">
            <div className="form-group">
              <div className="col-sm-8 col-sm-offset-2">
                <h4>Compose Message</h4>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={ this.writeSubject }/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="body" className="col-sm-2 control-label">Body</label>
              <div className="col-sm-8">
                <textarea name="body" id="body" className="form-control" onChange={ this.writeBody }/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-8 col-sm-offset-2">
                <input type="button" value="Send" className="btn btn-primary" onClick={ this.newMessage } />
              </div>
            </div>
          </form>
        </div>
      )
    }
  }

  renderList(){
    return this.props.initialMessages.map((message, i) => <Message key={ i } id={ message.id } subject={ message.subject } read={ message.read } starred={ message.starred } labels={ message.labels} body={ message.body } selectToggle={ this.props.selectToggle } selectedMessages={ this.props.selectedMessages } starChange={ this.props.starChange }/>)
  }

  render() {
    return (
      <div className="messages">
        { this.composeRender() }
        <div className="messageList">
          { this.renderList() }
        </div>
      </div>
    );
  }
}

export default MessageList;
