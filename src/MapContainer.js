import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    bounds: {}
  };

  extendMapBounds = (mapProps) => {
    const {google} = mapProps;
    const bounds = new google.maps.LatLngBounds();

    for (let location of this.props.locations) {
      bounds.extend(location.position);
    }

    this.setState({bounds});
  };

  render() {
    const {locations, selectedLocation, showInfoWindow, infoWindowImgSrc} = this.props;
    const marker = selectedLocation ? this.refs[selectedLocation] ? this.refs[selectedLocation].marker : {} : {};
    const location = locations.find(location => location.title === selectedLocation);
    const wikiLink =  `https://en.wikipedia.org/wiki/${(location ? location.wikiTitle ? location.wikiTitle : location.title : 'Main Page').replace(/ /g, '_')}`;
    return (
      <Map
        style={{marginLeft: this.props.windowWidth > 768 ? '200px' : '0px'}}
        onReady={this.extendMapBounds}
        google={this.props.google}
        zoom={15}
        bounds={this.state.bounds}>
        {locations && locations.map(location => (
          <Marker
            key={location.title}
            ref={location.title}
            title={location.title}
            position={location.position}
            onClick={() => this.props.toggleInfoWindow(location.title, true)}
            icon={{
              url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/map-marker-icon.png',
              scaledSize: new this.props.google.maps.Size(40, 40)
            }}
            animation={this.props.selectedLocation === location.title ? this.props.google.maps.Animation.BOUNCE : null}
          />
        ))}
        <InfoWindow
          marker={marker}
          visible={showInfoWindow}
          onClose={() => this.props.toggleInfoWindow('', false)}>
          <div className="info-window" aria-label={`${selectedLocation} info window`}>
            <h3 tabIndex="0">{selectedLocation}</h3>
            {infoWindowImgSrc && <img src={infoWindowImgSrc} alt={selectedLocation} tabIndex="0"/>}
            {infoWindowImgSrc &&
            <div><em>Image from <a href={wikiLink} rel="noopener noreferrer"
                                   target="_blank" tabIndex="0">Wikipedia</a> </em></div>}
            {!infoWindowImgSrc && <div>Loading...</div>}
          </div>

        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhzwxbCEz3KVgIRY2bsCgP-otLmv-sdsY')
})(MapContainer)