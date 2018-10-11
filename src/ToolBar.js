import React, { Component } from 'react';

class ToolBar extends React.Component {

  //********* CLASS CHANGING METHODS ************//

  toggleCompose = (e) => {
    e.preventDefault();
    this.props.changeCompose()
  }

  toggleAll = (e) => {
    e.preventDefault();

    if(this.props.currentSelected.length === this.props.initialMessages.length){
      this.props.unselectToggleAll();
    } else {
      this.props.selectToggleAll();
    }
  }

  //********** RENDERING METHODS *************//

  selectBoxRender = () => {

    if(this.props.currentSelected.length === this.props.initialMessages.length){
      return(
          <i className="fa fa-check-square-o"></i>
      )
    } else if(this.props.currentSelected.length > 0){
      return(
          <i className="fa fa-minus-square-o"></i>
      )
    } else if(this.props.currentSelected.length === 0){
      return(
          <i className="fa fa-square-o"></i>
      )
    }
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

          <button className="btn btn-default">
            Mark As Read
          </button>

          <button className="btn btn-default">
            Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
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
