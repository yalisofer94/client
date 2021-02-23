import React, {Component, componentDidUpdate} from 'react';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainer extends Component {
    constructor(props){
      super(props)
      this.state = {
        lat: this.props.lat,
        lng: this.props.lng
      }
    }

    render() {
      return (
        <div style={{position:'relative', width:'100%', height:'600px'}}>
          <Map
            google={this.props.google}
            zoom={19}
            style={{width:'100%', height:'600px', position:'relative'}}
            initialCenter={{
              lat: this.state.lat,
              lng: this.state.lng
            }}
            center={{
              lat: this.state.lat,
              lng: this.state.lng
            }}>
              <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: this.state.lat, lng: this.state.lng}} />
            </Map>
            
        </div>  
    )}
  }

export default GoogleApiWrapper({
  apiKey: "AIzaSyBkxP0uOzCNjtByiZD1KccRs7GFfKy_7ss",
})(MapContainer);