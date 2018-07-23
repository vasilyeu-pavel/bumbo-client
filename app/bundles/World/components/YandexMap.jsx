import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import request from 'axios';
import _ from 'lodash';

function insertScript(url) {
  const head = document.querySelector('head');
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = url;

  head.appendChild(script);
}

export default class YandexMap extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    center: React.PropTypes.array.isRequired,
    markers: React.PropTypes.array,
    zoom: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
  }

  static defaultProps = {
    height: 500,
    zoom: 12,
  }

  componentWillReceiveProps(nextProps) {
    const { ymaps, map, props } = this;

    if (!_.isEqual(props.center, nextProps.center)) {
      this.map.setCenter(nextProps.center);
    }

    if (!_.isEqual(props.markers, nextProps.markers)) {
      if (nextProps.markers.length !== 0) {
        _.forEach(nextProps.markers, marker => {
          const placemark = new ymaps.Placemark([marker.latitude, marker.longitude]);
          map.geoObjects.add(placemark);
        });
      }
    }
  }

  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    const mapUrl = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=initMap';

    insertScript(mapUrl);
  }

  initMap(ymaps) {
    let moscowId = null;

    this.ymaps = ymaps;
    this.map = new this.ymaps.Map(ReactDOM.findDOMNode(this), {
      center: this.props.center,
      zoom: this.props.zoom,
    });

    _.forEach(this.props.cities, city => {
      if (city.name === 'Москва') {
        moscowId = city.id;
      }
    });

    $('.select2--green').val(moscowId).change();

    this.map.behaviors.disable('scrollZoom');

    navigator.geolocation.getCurrentPosition((position) => {
      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;
      const minskCoords = [53.902257, 27.561831];

      let userCity = null;
      let userCountry = null;
      let userCityWithAgents = false;

      request.get(`https://geocode-maps.yandex.ru/1.x/?geocode=${userLatitude},${userLongitude}&format=json&kind=locality&sco=latlong`)
        .then(res => {
          const userGeolocationInfo = res.data.response.GeoObjectCollection.featureMember[0].GeoObject;
          let cityPresent = false;
          let minskId = null;

          userCity = userGeolocationInfo.name;
          userCountry = userGeolocationInfo.description;

          _.forEach(this.props.cities, city => {
            if (city.name === userCity) {
              this.map.setCenter([userLatitude, userLongitude]);
              $('.select2--green').val(city.id).change();
              this.props.changeCity(city.id);
              cityPresent = true;
            }

            if (city.name === 'Минск') {
              minskId = city.id;
            }

            if (city.name === 'Москва') {
              moscowId = city.id;
            }
          });

          if (!cityPresent && userCountry === 'Беларусь') {
            this.map.setCenter(minskCoords);
            $('.select2--green').val(minskId).trigger('change');
            this.props.changeCity(minskId);
          }
        });

      const placemark = new this.ymaps.Placemark([userLatitude, userLongitude]);

      this.map.geoObjects.add(placemark);
      this.map.setZoom(10);
    });

    _.forEach(this.props.markers, marker => {
      const placemark = new this.ymaps.Placemark([marker.latitude, marker.longitude]);
      this.map.geoObjects.add(placemark);
    });
  }

  render() {
    const { ymaps, map } = this;
    const { width, height, className } = this.props;
    let children;

    if (map) {
      children = React.Children.map(this.props.children, (child) =>
        child ? React.cloneElement(child, { ymaps, map }) : ''
      );
    }

    return (
      <div style={{ width, height }} className={className} >
        {children}
      </div>
    );
  }
}
