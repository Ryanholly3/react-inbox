import React, { Component } from 'react';
import Label from './Label'

var bool = false;
var select = ''

class Message extends React.Component {

  //*********** CLASS CHANGING METHODS ************//
  bodyMessage = () => {
      return(
        <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            { this.props.body }
          </div>
        </div>
      )
  }

  changeSelected = () => {
    this.props.selectToggle(this.props.id);
  }

  starChange = () => {

    var starArray = [];
    starArray.push(this.props.id)
    this.props.starChange(starArray);
  }


  //********* RENDER METHODS ************//
  readStatus = () => {
    if(this.props.read === false){
      return 'unread';
    } else if (this.props.read === true) {
      return 'read';
    }
  }

  starredMessage = () => {
    if(this.props.starred === true) {
      return (
        <i className="star fa fa-star" onClick={ this.starChange }></i>
      )
    } else if (this.props.starred === false){
      return (
        <i className="star fa fa-star-o" onClick={ this.starChange }></i>
      )
    } else {
      return (
        <i className="star fa fa-star" onClick={ this.starChange }></i>
      )
    }
  }

  checkRender = () => {
    if(this.props.selectedMessages.includes(this.props.id)){
      return(
        <input type="checkbox" onChange={ this.changeSelected } checked={true}/>
      );
    } else  {
      return(
        <input type="checkbox" onChange={ this.changeSelected } checked={false}/>
      )
    }
  }

  selectRender = () => {
    if(this.props.selectedMessages.includes(this.props.id)){
      return 'selected';
    } else  {
      return '';
    }
  }

  labeled = () => {
    return this.props.labels.map((label, i) => <Label key={ i } label={ label } />)
  }

  render(){
    return(
      <form>
        <div className={`row message ${this.readStatus()} ${ this.selectRender() }`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                { this.checkRender() }
              </div>
              <div className="col-xs-2">
                { this.starredMessage() }
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            { this.labeled() }
            <a href="#">
              { this.props.subject }
            </a>
          </div>
        </div>
        { this.bodyMessage() }
      </form>
    )
  }
}

export default Message;
