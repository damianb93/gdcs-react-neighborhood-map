import React, { Component } from 'react';
import './App.css';
import SideNav from "./SideNav";
import MapContainer from "./MapContainer";
import * as locationsData from './locations';

class App extends Component {

  state = {
    windowWidth: 0,
    query: '',
    selectedLocation: '',
    showInfoWindow: false,
    locations: []
  };

  componentDidMount = () => {
    this.setState({locations: locationsData});
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  };

  search = (query) => {
    if (!query) this.setState({query, locations: locationsData});
    else this.setState({
      query,
      locations: locationsData.filter(location => location.title.toLowerCase().includes(query.toLowerCase().trim()))
    });
  };

  toggleInfoWindow = (selectedLocation, isOpen) => {
    this.setState({
      selectedLocation,
      showInfoWindow: isOpen
    })
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
            search={this.search}
            query={this.state.query}
            locations={this.state.locations}
            toggleInfoWindow={(location, isOpen) => this.toggleInfoWindow(location, isOpen)}
          />
          <MapContainer
            windowWidth={this.state.windowWidth}
            locations={this.state.locations}
            selectedLocation={this.state.selectedLocation}
            showInfoWindow={this.state.showInfoWindow}
            toggleInfoWindow={(location, isOpen) => this.toggleInfoWindow(location, isOpen)}
          />
        </main>
      </div>
    );
  }
}

export default App;
