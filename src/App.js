import React, {Component} from 'react';
import './App.css';
import SideNav from "./SideNav";
import MapContainer from "./MapContainer";
import * as locationsData from './locations';

class App extends Component {

  state = {
    windowWidth: 0,
    query: '',
    selectedLocation: '',
    infoWindowImgSrc: '',
    showInfoWindow: false,
    locations: [],
    activeLocations: []
  };

  componentDidMount = () => {
    this.setState({locations: locationsData, activeLocations: locationsData});
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  };

  search = (query) => {
    if (!query) this.setState({query, activeLocations: this.state.locations, showInfoWindow: false});
    else this.setState({
      query,
      activeLocations: this.state.locations.filter(location => location.title.toLowerCase().includes(query.toLowerCase().trim())),
      showInfoWindow: false
    });
  };

  toggleInfoWindow = (selectedLocation, isOpen) => {
    this.setState({
      selectedLocation,
      showInfoWindow: isOpen,
      infoWindowImgSrc: '',
    });

    if (isOpen) {
      this.getSelectedLocationImg(selectedLocation);
    }
  };

  getSelectedLocationImg = (selectedLocation) => {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=200&origin=*&titles=${encodeURIComponent(this.getWikiSearchTitle(selectedLocation))}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network error: ' + response.statusText);
      })
      .then(response => {
        const dataPages = response.query.pages;
        const pageId = Object.keys(dataPages)[0];
        const imgSrc = dataPages[pageId].thumbnail ? dataPages[pageId].thumbnail.source : '';

        this.setState({infoWindowImgSrc: imgSrc})
      })
      .catch(error => {throw new Error('Error: ' + error)});
  };

  getWikiSearchTitle(selectedLocation) {
    const location = this.state.locations.find(location => location.title === selectedLocation);

    return location.wikiTitle ? location.wikiTitle : location.title;
  }

  updateWindowWidth = () => {
    this.setState({windowWidth: window.innerWidth});
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
            locations={this.state.activeLocations}
            toggleInfoWindow={(location, isOpen) => this.toggleInfoWindow(location, isOpen)}
          />
          <MapContainer
            windowWidth={this.state.windowWidth}
            locations={this.state.activeLocations}
            selectedLocation={this.state.selectedLocation}
            showInfoWindow={this.state.showInfoWindow}
            infoWindowImgSrc={this.state.infoWindowImgSrc}
            toggleInfoWindow={(location, isOpen) => this.toggleInfoWindow(location, isOpen)}
          />
        </main>
      </div>
    );
  }
}

export default App;
