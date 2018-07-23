import Button from './common/Button/Button.jsx';
import React, { PropTypes, Component } from 'react';
import { throttle, bindAll } from 'lodash';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';
import CardCityItem from './CardCityItem';

export default class CardCitiesOfCountry extends Component {
  static propTypes = {
    country: PropTypes.string.isRequired,
    cities: PropTypes.instanceOf(Map).isRequired,
    onCityHover: PropTypes.func,
    isPartners: PropTypes.bool,
    locationQueriesString: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);

    this.handleCityHover = throttle(this.handleCityHover, 200);

    this.state = {
      showCities: false,
    };

    bindAll(this, ['handleCardMouseLeave', 'toggleCities']);
  }

  handleCityHover(city) {
    if (this.props.onCityHover) {
      this.props.onCityHover(city.id);
    }
  }

  handleCardMouseLeave() {
    if (this.props.onCityHover) {
      this.props.onCityHover(null);
    }
  }

  toggleCities = (event) => {
    event.preventDefault();
    this.setState({
      showCities: !this.state.showCities,
    });
  }

  renderCities(cities) {
    const { locationQueriesString, onCityHover } = this.props;

    return (
      <div className='geo-card__cities'>
        {cities.map(city => (
          <CardCityItem
            key={city.id}
            city={city}
            locationQueriesString={locationQueriesString}
            onCityHover={onCityHover}
            isMinPrice={false}
          />
        ))}
        <div
          className='geo-card__toggle-button'
          onClick={this.toggleCities}
        >{this.state.showCities ? 'Свернуть курорты' : 'Все курорты'}</div>
      </div>
    );
  }

  cities() {
    const { cities } = this.props;
    const cityWithMinPrice = cities.minBy(city => city.minPrice);

    if (!this.state.showCities) return this.renderCities([cityWithMinPrice]);

    return this.renderCities(cities.sortBy(city => city.minPrice).valueSeq());
  }

  render() {
    const { country, cities } = this.props;
    const countryId = cities.first().countryId;
    const styles = { backgroundImage: `url(${`/images/countries/${countryId}.jpeg`})` };
    const cityWithMinPrice = cities.minBy(city => city.minPrice);
    const text = `от ${cityWithMinPrice.minPrice} р.`;

    return (
      <Link to={{ pathname: `/search/country/${countryId}` }}>
        <div className='geo-card' onMouseLeave={this.handleCardMouseLeave} style={styles}>
          <div className='geo-card__main'>
            <div className='geo-card__title'>{country}</div>
            <div className='geo-card__button'>
              <Button color='orange' modifiers={['rounded']}>{text}</Button>
            </div>
            <div className='geo-card__overlay'></div>
          </div>
          {this.cities()}
        </div>
      </Link>
    );
  }
}
