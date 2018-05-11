import React, { Component } from 'react'; 

class ItemInCenter extends Component {

  render(){
    console.log("executing descs");
    return( 
      <div className= "blogPost" onClick={() => this.props.handleClick(this.props.title)}>      
        <span id= "linkTexts"><p>{this.props.title} </p></span>
      </div>
    )
  }
}

export default ItemInCenter;
