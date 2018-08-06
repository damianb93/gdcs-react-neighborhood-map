import React, {Component} from "react";

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
        <h2>Search</h2>
        <input
          className="search-field"
          type="text"
          placeholder="Filter markers"
          value={query}
          onChange={event => this.search(event.target.value)}
        />
        <div className="links">
          {locations && locations.map((location, index) => (
            <a key={index} onClick={() => this.props.toggleInfoWindow(location.title, true)} >{location.title}</a>
          ))
          }
        </div>
      </nav>
    )
  }
}

export default SideNav;