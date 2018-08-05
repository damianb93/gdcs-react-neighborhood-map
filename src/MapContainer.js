import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  onMarkerClick = (selectedLocation, activeMarker) => {
    this.props.openInfoWindow(selectedLocation, activeMarker);
  };

  render() {
    const { locations } = this.props;
    return (
      <Map google={this.props.google} center={{lat: 35.6835498, lng: 139.7524473 }} zoom={16}>
        {locations.map(location => (
          <Marker
            key={location.title}
            title={location.title}
            position={location.position}
            onClick={this.onMarkerClick}
          />
        ))}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showInfoWindow}>
          <div>
            <h3>{this.props.selectedLocation.title}</h3>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhzwxbCEz3KVgIRY2bsCgP-otLmv-sdsY')
})(MapContainer)