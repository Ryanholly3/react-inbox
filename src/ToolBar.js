import React, { Component } from 'react';

class ToolBar extends React.Component {

  //********* CLASS CHANGING METHODS ************//

  toggleCompose = (e) => {
    e.preventDefault();
    this.props.changeCompose()
  }

  toggleAll = (e) => {
    e.preventDefault();

    if(this.props.selectedMessages.length === this.props.initialMessages.length){
      this.props.unselectToggleAll();
    } else {
      this.props.selectToggleAll();
    }
  }

  markAsRead = () => {
    var unreadSelected = [];
    if(this.props.selectedMessages !== []){
      for(var i = 0; i < this.props.selectedMessages.length; i++){
        let currentId = this.props.selectedMessages[i]
        for(var j=0; j < this.props.initialMessages.length; j++){
          if (this.props.initialMessages[j].id === currentId && this.props.initialMessages[j].read === false){
            unreadSelected.push(currentId);
          }
        }
      }
      this.props.markAsRead(unreadSelected);
    }
  }

  markAsUnread = () => {
    var readSelected = [];
    if(this.props.selectedMessages !== []){
      for(var i = 0; i < this.props.selectedMessages.length; i++){
        let currentId = this.props.selectedMessages[i]
        for(var j=0; j < this.props.initialMessages.length; j++){
          if (this.props.initialMessages[j].id === currentId && this.props.initialMessages[j].read === true){
            readSelected.push(currentId);
          }
        }
      }
      this.props.markAsUnread(readSelected);
    }
  }

  //********** RENDERING METHODS *************//

  selectBoxRender = () => {

    if(this.props.selectedMessages.length === this.props.initialMessages.length){
      return(
          <i className="fa fa-check-square-o"></i>
      )
    } else if(this.props.selectedMessages.length > 0){
      return(
          <i className="fa fa-minus-square-o"></i>
      )
    } else if(this.props.selectedMessages.length === 0){
      return(
          <i className="fa fa-square-o"></i>
      )
    }
  }

  applyLabel = () => {

  }

  removeLabel = () => {

  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-danger" onClick={ this.toggleCompose }>
            <i className="fa fa-plus"></i>
          </button>

          <button className="btn btn-default" onClick={ this.toggleAll }>
            { this.selectBoxRender() }
          </button>

          <button className="btn btn-default" onClick={ this.markAsRead }>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={ this.markAsUnread }>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={ this.applyLabel }>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={ this.removeLabel }>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ToolBar;
