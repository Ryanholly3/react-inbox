import React, { Component } from 'react';

class Label extends React.Component {

  render(){
    return(
      <span className="label label-warning">{ this.props.label }</span>
    )
  }
}

export default Label;
