/* global google */

import React, { Component, PropTypes } from 'react';
import GoogleMap from 'google-map-react';
import CardMarker from './CardMarker.jsx';
import MarkerResort from './MarkerResort';
import MarkerHotel from './MarkerHotel';
import MapMoveControl from './MapMoveControl';
import MapToggleControl from './MapToggleControl';
import { extend, isNull, isEqual } from 'lodash';
import { OrderedMap } from 'immutable';
import mapStyles from './mapStyles';

export default class WorldMap extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      defaultCenter: { lat: 59.938043, lng: 30.337157 },
      options: {
        minZoom: 3,
        maxZoom: 15,
      },
      clusterRadius: 20,
      hoverDistance: 30,
    };
  }

  static propTypes = {
    query: PropTypes.object,
    router: PropTypes.object,
    searchParams: PropTypes.object,
    toggleWorldMap: PropTypes.func,
    openedInfoBoxId: PropTypes.number,
    zoom: PropTypes.number.isRequired,
    center: PropTypes.object.isRequired,
    zoomFromTo: PropTypes.func.isRequired,
    mapIsShown: PropTypes.bool.isRequired,
    changeSearchOnMapMove: PropTypes.func,
    setMapZoom: PropTypes.func.isRequired,
    setMapCenter: PropTypes.func.isRequired,
    markersType: PropTypes.string.isRequired,
    changeMapBounds: PropTypes.func.isRequired,
    searchOnMapMove: PropTypes.bool.isRequired,
    setOpenedInfoBox: PropTypes.func.isRequired,
    changeCardsGroupByType: PropTypes.func.isRequired,
    locationQueriesStringWithDefaultParams: PropTypes.string,
    markers: PropTypes.instanceOf(OrderedMap).isRequired,
    hoveredItemId: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.null]),
  }

  shouldComponentUpdate(nextProps) {
    const {
      markers: nextMarkers,
      markersType: nextMarkersType,
      hoveredItemId: nexthoveredCardId,
      openedInfoBoxId: nextOpenedInfoBoxId,
    } = nextProps;

    const {
      markers,
      markersType,
      hoveredItemId,
      openedInfoBoxId,
    } = this.props;

    return !isEqual(markers, nextMarkers)
    || !isEqual(markersType, nextMarkersType)
    || !isEqual(hoveredItemId, nexthoveredCardId)
    || !isEqual(openedInfoBoxId, nextOpenedInfoBoxId);
  }

  getHotelPrice(price) {
    if (price > 100000) {
      return `${(price < 1000000 ? (price / 1000).toFixed(1) : (price / 1000).toFixed(0))}K`;
    }

    return price;
  }

  hotelMarker(marker) {
    const { markersType, openedInfoBoxId, hoveredItemId } = this.props;
    const {
      id,
      key,
      rate,
      stars,
      cityName,
      position,
      minPrice,
      countryName,
      modifiers = [],
    } = marker;

    const isOpenedInfoBox = openedInfoBoxId === id;
    const isItemHovered = hoveredItemId === id;

    const handleClick = () => this.handleCityMarkerClick(marker.id);

    return (
      <MarkerHotel
        onClick={handleClick}
        modifiers={modifiers}
        hovered={isItemHovered}
        key={`marker_${markersType}_${id}`}
        minPrice={this.getHotelPrice(minPrice)}
        {...position}
      >
        {isOpenedInfoBox && <CardMarker
          id={id}
          type={'hotel'}
          hotelLink={this.props.locationQueriesStringWithDefaultParams}
          title={key}
          city={cityName}
          country={countryName}
          rate={rate}
          stars={stars}
          minPrice={this.getHotelPrice(minPrice)}
          pushRoute={this.props.history.push}
        />}
      </MarkerHotel>
    );
  }

  resortMarker(marker) {
    const { markersType, openedInfoBoxId, hoveredItemId } = this.props;
    const {
      id,
      key,
      position,
      cityName,
      minPrice,
      countryId,
      countryName,
      modifiers = [],
    } = marker;

    const isOpenedInfoBox = openedInfoBoxId === id;
    const handleClick = () => this.handleCityMarkerClick(marker.id);

    if (hoveredItemId === id) modifiers.push('orange');

    return (
      <MarkerResort
        onClick={handleClick}
        modifiers={modifiers}
        key={`marker_${markersType}_${id}`}
        {...position}
      >
        {isOpenedInfoBox && <CardMarker
          id={id}
          type={'city'}
          title={key}
          city={cityName}
          country={countryName}
          countryId={countryId}
          photo={`/images/countries/${countryId}.jpeg`}
          minPrice={this.getHotelPrice(minPrice)}
          query={this.props.query}
          pushRoute={this.props.history.push}
        />}
      </MarkerResort>
    );
  }

  renderMarkers() {
    const { markers } = this.props;

    return markers
      .map((marker) => marker.cityId ? this.hotelMarker(marker) : this.resortMarker(marker));
  }

  handleMapClick = ({ event, lat, lng }) => {
    const { openedInfoBoxId, setOpenedInfoBox } = this.props;

    if (event.target.classList.length || isNull(openedInfoBoxId)) return false;

    setOpenedInfoBox(null);
  }

  handleMapChange = ({ center, zoom, bounds }) => {
    const { setMapZoom, setMapCenter, changeMapBounds, history } = this.props;

    // @HACK setting bounds should be last
    setMapZoom(history, zoom);
    setMapCenter(history, center);
    changeMapBounds(bounds);
  }

  handleCityMarkerClick(id) {
    this.props.setOpenedInfoBox(id === this.props.openedInfoBoxId ? null : id);
  }

  mapMoveControl() {
    const { mapIsShown, searchOnMapMove, changeSearchOnMapMove } = this.props;

    if (!mapIsShown) return '';

    const handleChangeOnMapMove = (bool) =>
      changeSearchOnMapMove(this.props.history, bool);


    return (
      <MapMoveControl
        checked={searchOnMapMove}
        onChange={handleChangeOnMapMove}
      />
    );
  }

  mapToggleControl() {
    const {
      mapIsShown,
      toggleWorldMap,
      markersType,
    } = this.props;

    if (markersType !== 'hotel') return '';

    return <MapToggleControl state={mapIsShown} onChange={toggleWorldMap} />;
  }

  googleMap() {
    const { center, zoom, bounds } = this.props;

    return (
      <GoogleMap
        bootstrapURLKeys={{
          key: 'AIzaSyC3FCwo542kp0LEGXT2utwhnZtu-FevQsM',
          language: 'ru',
        }}
        ref='map'
        center={center}
        zoom={zoom}
        bounds={bounds}
        defaultCenter={this.state.defaultCenter}
        defaultZoom={this.state.zoom}
        onClick={this.handleMapClick}
        onChange={this.handleMapChange}
        options={{
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
          scaleControl: true,
          styles: mapStyles.styles,
        }}
      >
        {this.renderMarkers()}
      </GoogleMap>
    );
  }

  render() {
    console.log('%c Rerender WorldMap! ', 'background: #333; color: yellow');

    return (
      <div className='map'>
        {this.mapMoveControl()}
        {this.googleMap()}
      </div>
    );
  }
}
