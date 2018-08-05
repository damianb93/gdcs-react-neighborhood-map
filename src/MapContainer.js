import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  render() {
    const { locations, selectedLocation, showInfoWindow } = this.props;
    let marker = selectedLocation ? this.refs[selectedLocation].marker : {};
    return (
      <Map google={window.google} center={{lat: 35.6835498, lng: 139.7524473 }} zoom={16}>
        {locations && locations.map(location => (
          <Marker
            key={location.title}
            ref={location.title}
            title={location.title}
            position={location.position}
            onClick={() => this.props.toggleInfoWindow(location.title, true)}
            animation={this.props.selectedLocation === location.title ? this.props.google.maps.Animation.BOUNCE : null  }
          />
        ))}
        <InfoWindow
          marker={marker}
          visible={showInfoWindow}
          onClose={() => this.props.toggleInfoWindow('', false)}>
          <div>
            <h3>{selectedLocation}</h3>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhzwxbCEz3KVgIRY2bsCgP-otLmv-sdsY')
})(MapContainer)