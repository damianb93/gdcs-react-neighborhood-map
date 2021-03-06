import React, {Component} from 'react';
import './css/App.css';
import SideNav from "./SideNav";
import MapContainer from "./MapContainer";
import * as locationsData from '../data/locations';

class App extends Component {

  state = {
    windowWidth: 0,
    query: '', // Search query
    selectedLocation: '', // Currently selected marker location title
    infoWindowImgSrc: '', // Src for location related wikipedia thumbnail
    infoWindowWikiMsg: '',
    showInfoWindow: false,
    locations: [],
    activeLocations: []
  };

  componentDidMount = () => {
    // Initialize locations from json
    this.setState({locations: locationsData, activeLocations: locationsData});

    this.updateWindowWidth();
    // Adds event listener to keep track of window current width (used for side-nav related logic)
    window.addEventListener('resize', this.updateWindowWidth);
  };

  search = (query) => {
    if (!query) this.setState({query, activeLocations: this.state.locations, showInfoWindow: false});
    else this.setState({
      query,
      activeLocations: this.state.locations.filter(location => location.title.toLowerCase().includes(query.toLowerCase().trim())),
      showInfoWindow: false,
      selectedLocation: ''
    });
  };

  toggleInfoWindow = (selectedLocation, isOpen) => {
    this.setState({
      selectedLocation,
      showInfoWindow: isOpen,
      infoWindowImgSrc: '',
    });

    // If InfoWindow is opened fetch img for location
    if (isOpen) {
      this.getSelectedLocationImg(selectedLocation);
    }
  };

  /**
   * Fetch image thumbnail from related wikipedia article
   * @param selectedLocation - currently selected marker location
   */
  getSelectedLocationImg = (selectedLocation) => {
    this.setState({infoWindowWikiMsg: 'loading...'});
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=200&origin=*&titles=${encodeURIComponent(this.getWikiSearchTitle(selectedLocation))}`)
      .then(response => {
        if (response.ok) return response.json();

        alert('Network error: ' + response.statusText);
        this.setState({infoWindowWikiMsg: `Error! Couldn't load image.`});
      })
      .then(response => {
        // Extract thumbnail source
        const dataPages = response.query.pages;
        const pageId = Object.keys(dataPages)[0];
        const imgSrc = dataPages[pageId].thumbnail ? dataPages[pageId].thumbnail.source : '';

        if (!imgSrc) this.setState({infoWindowWikiMsg: `Error! Couldn't load image.`});

        this.setState({infoWindowImgSrc: imgSrc});
        setTimeout(function() { document.querySelector('.info-window h3').focus() }, 0);
      })
      .catch(error => {
        alert('Error occurred while fetching data from Wikipedia. Error message: ' + error);
        this.setState({infoWindowWikiMsg: `Error! Couldn't load image.`});
      });
  };

  /**
   * Returns wikiTitle property from location if present or else location title.
   * @param selectedLocation - currently selected marker location
   * @returns {string}
   */
  getWikiSearchTitle(selectedLocation) {
    const location = this.state.locations.find(location => location.title === selectedLocation);

    return location.wikiTitle ? location.wikiTitle : location.title;
  }

  updateWindowWidth = () => {
    this.setState({windowWidth: window.innerWidth});
  };

  // Opens side navigation panel
  openNav = () => {
    document.querySelector(".side-nav").style.display = 'block';
  };

  render() {
    return (
      <div className="app">
        <main>
          <header className="app-header">
            <a className="open-menu-btn" onClick={() => this.openNav()} aria-label='Menu open icon'>&#9776;</a>
            <h1>Neighborhood Map</h1>
          </header>
          <SideNav
            windowWidth={this.state.windowWidth}
            search={this.search}
            query={this.state.query}
            locations={this.state.activeLocations}
            toggleInfoWindow={(location, isOpen) => this.toggleInfoWindow(location, isOpen)}
          />
          <div className="map-container" role='application'>
            <MapContainer
              windowWidth={this.state.windowWidth}
              locations={this.state.activeLocations}
              selectedLocation={this.state.selectedLocation}
              showInfoWindow={this.state.showInfoWindow}
              infoWindowImgSrc={this.state.infoWindowImgSrc}
              infoWindowWikiMsg={this.state.infoWindowWikiMsg}
              toggleInfoWindow={(location, isOpen) => this.toggleInfoWindow(location, isOpen)}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
