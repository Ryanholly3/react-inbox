import React, { Component } from 'react';
import ToolBar from './ToolBar';
import MessageList from './MessageList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      initialMessages:[],
      composeWindow: false,
      selectedMessages: []
    }
    this.selectToggleAll = this.selectToggleAll.bind(this)
    this.selectToggle = this.selectToggle.bind(this)
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages');
    const json = await response.json();
    this.setState({
      initialMessages: json,
    });
  }



  changeCompose = () => {
    var currentBool = this.state.composeWindow;
    this.setState({
      composeWindow: !currentBool,
    })
  }

  selectToggle = (id) => {
    console.log('id:', id)
    var found = false;
    var indexSelect = null;
    for(var i = 0; i < this.state.selectedMessages.length; i++) {
      if (this.state.selectedMessages[i] === id){
        found = true;
        indexSelect = i
      }
    }
    if (found === false){
      this.setState({
        selectedMessages: this.state.selectedMessages.concat(id)
      })
    } else if (found === true){
      var newSelected = this.state.selectedMessages;
      newSelected.splice(indexSelect, 1);
      this.setState({
        selectedMessages: newSelected
      })
    }
  }

  selectToggleAll = () => {
    var allIds = []
    for(var i = 0; i < this.state.initialMessages.length; i++) {
      allIds.push(this.state.initialMessages[i].id)
    }
    this.setState({
      selectedMessages: allIds
    })
  }

  unselectToggleAll = () => {
    this.setState({
      selectedMessages: []
    })
  }

   markAsRead = async (unreadSelected) => {
    var patch = {
      messageIds: unreadSelected,
      command: 'read',
      read: true
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    this.setState({
      initialMessages: posted
    })
  }

  markAsUnread = async (readSelected) => {
    var patch = {
      messageIds: readSelected,
      command: 'read',
      read: false
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    this.setState({
      initialMessages: posted
    })

  }

  applyLabel = async (label, messageIds) => {
    var patch = {
      messageIds: messageIds,
      command: 'addLabel',
      label: label
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    this.setState({
      initialMessages: posted
    })
  }

  removeLabel = async (label, messageIds) => {
    var patch = {
      messageIds: messageIds,
      command: 'removeLabel',
      label: label
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    this.setState({
      initialMessages: posted
    })
  }

  deleteMessages = async (messageIds) => {
    //ONLY can delete one at a time. come back once learn backend
    var patch = {
      messageIds: messageIds,
      command: 'delete',
    };

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    console.log(posted)
    this.setState({
      initialMessages: posted
    })

  }

  starChange = async (messageId) => {
    var patch = {
      messageIds: messageId,
      command: 'star',
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    this.setState({
      initialMessages: posted
    })
  }

  addMessage = async (subject, body) => {
    var message = {
      subject: subject,
      starred: false,
      labels: [],
      body: body,
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const posted = await response.json()
    this.setState({
      initialMessages: this.state.initialMessages.concat(posted)
    })
  }

  render() {
    return (
      <div className="App">
        <h1> REACT INBOX </h1>
        <div className="components">
          <ToolBar changeCompose={ this.changeCompose } selectToggleAll={ this.selectToggleAll } unselectToggleAll={ this.unselectToggleAll } initialMessages={ this.state.initialMessages } selectedMessages={ this.state.selectedMessages } markAsRead={ this.markAsRead } markAsUnread={ this.markAsUnread } applyLabel={ this.applyLabel } removeLabel={ this.removeLabel } deleteMessages={ this.deleteMessages }/>
          <MessageList initialMessages={ this.state.initialMessages } composeWindow={ this.state.composeWindow } selectToggle={ this.selectToggle } selectedMessages={ this.state.selectedMessages } starChange={ this.starChange } addMessage={ this.addMessage }/>
        </div>
      </div>
    );
  }
}

export default App;
