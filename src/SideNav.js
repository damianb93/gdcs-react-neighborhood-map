import React, {Component} from "react";
import {DebounceInput} from "react-debounce-input";

class SideNav extends Component {
  search = (query) => {
    this.props.search(query);
  };

  closeNav = () => {
    document.querySelector(".side-nav").style.display = 'none';
  };

  render() {
    const { locations, query } = this.props;
    return (
      <nav className="side-nav" style={{display: this.props.windowWidth > 768 ? 'block' : 'none'}}>
        <a className="close-menu-btn" onClick={() => this.closeNav()}>&times;</a>
        <DebounceInput
          type="text"
          placeholder="Filter markers"
          debounceTimeout={300}
          value={query}
          onChange={event => this.search(event.target.value)}
        />
        {locations && locations.map((location, index) => (
          <a key={index} onClick={() => this.props.toggleInfoWindow(location.title, true)} >{location.title}</a>
        ))
        }
      </nav>
    )
  }
}

export default SideNav;