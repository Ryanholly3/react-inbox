import React, { Component } from 'react';
import Label from './Label'


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

  changeSelected = (e) => {
    e.preventDefault();

    var strSelect = this.props.id.toString();
    console.log(strSelect)
    this.props.selectToggle(strSelect);
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

  selectRender = () => {
    if(this.props.currentSelected.includes(this.props.id.toString())){
      return 'selected';
    } else  {
      return '';
    }

    console.log('this.props.id:', this.props.id);
    console.log('this.props.currentSelected:', this.props.currentSelected)

  }

  labeled = () => {
    return this.props.labels.map((label, i) => <Label key={ i } label={ label } />)
  }

  render(){
    return(
      <form>
        <div className={`row message ${this.readStatus()} ${this.selectRender()}`} onClick={ this.changeSelected }>
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
