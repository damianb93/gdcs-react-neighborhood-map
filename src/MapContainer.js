import React, {Component} from "react";

class MapContainer extends Component {
  render() {
    return (
      <div id="map-container" style={{marginLeft: this.props.windowWidth > 768 ? '200px' : '0px'}}>
        <div id="map"/>
      </div>
    )
  }
}

export default MapContainer;