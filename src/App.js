import React, { Component } from 'react';
import './App.css';
import SideNav from "./SideNav";
import MapContainer from "./MapContainer";

class App extends Component {

  state = {
    windowWidth: 0
  };

  componentDidMount = () => {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  };

  updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  openNav = () => {
    document.querySelector(".side-nav").style.display = 'block';
  };

  render() {
    return (
      <div className="app">
        <main>
          <header className="app-header">
            <a className="open-menu-btn" onClick={() => this.openNav()}>&#9776;</a>
            <h1>Neighborhood Map</h1>
          </header>
          <SideNav
            windowWidth={this.state.windowWidth}
          />
          <MapContainer
            windowWidth={this.state.windowWidth}
          />
        </main>
      </div>
    );
  }
}

export default App;
