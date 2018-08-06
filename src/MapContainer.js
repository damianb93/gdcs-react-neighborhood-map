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
    const { locations, selectedLocation, showInfoWindow, infoWindowImgSrc } = this.props;
    let marker = selectedLocation ? this.refs[selectedLocation] ? this.refs[selectedLocation].marker : {} : {};
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
            icon={{ url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/128/map-marker-icon.png', scaledSize: new this.props.google.maps.Size(40, 40)}}
            animation={this.props.selectedLocation === location.title ? this.props.google.maps.Animation.BOUNCE : null}
          />
        ))}
        <InfoWindow
          marker={marker}
          visible={showInfoWindow}
          onClose={() => this.props.toggleInfoWindow('', false)}>
          <div>
            <h3>{selectedLocation}</h3>
            {infoWindowImgSrc && <img src={infoWindowImgSrc} alt={selectedLocation}/>}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhzwxbCEz3KVgIRY2bsCgP-otLmv-sdsY')
})(MapContainer)