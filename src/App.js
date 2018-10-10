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
    //NOT WORKING PROPERLY
    if (this.state.selectedMessages === []){
      this.setState({
        selectedMessages: id
      })
    } else if (this.state.selectedMessages.includes(id)){
      this.setState({
        selectedMessages: this.state.selectedMessages.concat(id)
      })
    }
    console.log(this.state.selectedMessages)
  }

  render() {
    return (
      <div className="App">
        <h1> REACT INBOX </h1>
        <div className="components">
          <ToolBar changeCompose={ this.changeCompose }/>
          <MessageList initialMessages={ this.state.initialMessages } composeWindow={ this.state.composeWindow } selectToggle={ this.selectToggle } currentSelected={ this.state.selectedMessages }/>
        </div>
      </div>
    );
  }
}

export default App;
