/* global google */

import React, { PropTypes, Component } from 'react';

export default class HotelAddress extends Component {
  static propTypes = {
    address: PropTypes.string,
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { lat, lng, name } = this.props;
    const position = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      scrollwheel: false,
      zoom: 16,
      center: position,
      mapTypeControl: true,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({ position, map });
    const infowindow = new google.maps.InfoWindow({ content: name, position });

    infowindow.open(map, marker);
    marker.setMap(map);
  }

  render() {
    const { address } = this.props;

    let showingAddress = (address) ? <div className='address__text'><b>Адрес: {address}</b></div> : null;

    return (
      <div className='address'>
        <a
          className='address__anchor-link'
          id='location__anchor-link'
          name='location__anchor-link'
        ></a>
        {showingAddress}
        <div className='address__map' id='address__map'>
          <div id='map' style={{ width: '100%', height: '505px', margin: 'auto' }}></div>
        </div>
      </div>
    );
  }
}
