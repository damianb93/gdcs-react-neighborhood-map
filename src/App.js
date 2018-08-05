import React, { Component } from 'react';
import './App.css';
import SideNav from "./SideNav";
import MapContainer from "./MapContainer";

class App extends Component {

  state = {
    windowWidth: 0,
    selectedLocation: {},
    activeMarker: {},
    showInfoWindow: false,
    locations: [
      {
        title: 'Imperial Palace',
        position: {lat: 35.685175, lng: 139.75279950000004}
      },
      {
        title: 'Fukiage Omiya Palace',
        position: {lat: 35.686297798496426, lng: 139.74858995683894}
      },
      {
        title: 'Three Palace Sanctuaries',
        position: {lat: 35.6818855, lng: 139.7499811}
      },
      {
        title: 'Seimon Ironbridge',
        position: {lat: 35.68021116697682, lng: 139.7536056876968}
      },
      {
        title: 'Seimon Stonebridge',
        position: {lat: 35.680002009754766, lng: 139.75471075781093}
      },
      {
        title: 'Statue of Kusunoki Masashige',
        position: {lat: 35.677884262003104, lng: 139.75847657926784}
      },
      {
        title: 'Edo Castle Ruins',
        position: {lat: 35.68777048605817, lng: 139.75469466455684}
      }
    ]
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

  openInfoWindow = (selectedLocation, activeMarker) => {
    this.setState({
      selectedLocation,
      activeMarker,
      showInfoWindow: true
    })
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
            locations={this.state.locations}
            openInfoWindow={this.openInfoWindow}
            selectedLocation={this.state.selectedLocation}
            activeMarker={this.state.activeMarker}
            showInfoWindow={this.state.showInfoWindow}
          />
        </main>
      </div>
    );
  }
}

export default App;
