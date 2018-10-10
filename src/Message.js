import React, { Component } from 'react';
import Label from './Label'

class Message extends React.Component {

  bodyMessage = () => {
      return(
        <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            { this.props.body }
          </div>
        </div>
      )
  }

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
        <i className="star fa fa-star"></i>
      )
    } else if (this.props.starred === false){
      return (
        <i className="star fa fa-star-o"></i>
      )
    } else {
      return (
        <i className="star fa fa-star"></i>
      )
    }
  }

  selectToggle = (e) => {
    e.preventDefault();

    //NOT WORKING PROPERLY
    var strSelect = this.props.id.toString()
    var modSelect = [];
    modSelect.push(strSelect)
    this.props.selectToggle(modSelect)

    if(this.props.currentSelected.includes(e.target.key)){
      return '';
    } else  {
      return 'selected';
    }
  }

  labeled = () => {
    return this.props.labels.map((label, i) => <Label key={ i } label={ label } />)
  }

  render(){
    return(
      <form>
        <div className={`row message ${this.readStatus()}`} onClick={ this.selectToggle }>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" />
              </div>
              <div className="col-xs-2">
                { this.starredMessage() }
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            { this.labeled() }
            <a href="#">
              Here is some message text that has a bunch of stuff
            </a>
          </div>
        </div>
        { this.bodyMessage() }
      </form>
    )
  }
}

export default Message;
