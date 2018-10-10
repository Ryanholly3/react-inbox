import React, { Component } from 'react';
import ToolBar from './ToolBar';
import MessageList from './MessageList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      initialMessages:[]
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages');
    const json = await response.json();
    this.setState({
      initialMessages: json,
    });
  }

  render() {
    return (
      <div className="App">
        <h1> REACT INBOX </h1>
        <div className="components">
          <ToolBar />
          <MessageList initialMessages={ this.state.initialMessages } />
        </div>
      </div>
    );
  }
}

export default App;
