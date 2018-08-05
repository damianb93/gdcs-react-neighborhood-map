import React, {Component} from "react";

class SideNav extends Component {


  closeNav = () => {
    document.querySelector(".side-nav").style.display = 'none';
  };

  render() {
    return (
      <nav className="side-nav" style={{display: this.props.windowWidth > 768 ? 'block' : 'none'}}>
        <a className="close-menu-btn" onClick={() => this.closeNav()}>&times;</a>
        <a>Test1</a>
        <a>Test2</a>
        <a>Test3</a>
        <a>Test4</a>
      </nav>
    )
  }
}

export default SideNav;