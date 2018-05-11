import React, { Component } from 'react';

class MenuItem extends Component {
  render() {
    return (
      <div className= "menuItems" onClick={() => this.props.handleClick(this.props.title)}>
      <span>{this.props.title}</span>
      </div>
    )
  }
}

export default MenuItem;
