import React, { PropTypes } from 'react';
import Button from './common/Button/Button.jsx';
import Mark from './common/Mark.jsx';
import { isUndefined } from 'lodash';

const CardMarker = (props) => {
  const { id, title, type, country, countryId, city, minPrice, stars, rate, hotelLink } = props;
  const header = stars ? `${stars}* ${title}` : title;
  const subtitle = country || city;
  const ratio = window.devicePixelRatio;
  const format = (170 * 270 * ratio) > 9e4 ? 'f' : 'p';
  const attributes = { className: 'geo-card' };
  const handleClick = () => props.pushRoute(`/search/city/${id}`);
  let tag = 'div';
  let photo;

  if (type === 'hotel') {
    photo = `https://hotels.sletat.ru/i/${format}/${id}_0_170_270_1.jpg`;
    tag = 'a';
    attributes.href = `/online_tours/${id}?${hotelLink}`;
    attributes.target = '_blank';
  } else if (type === 'city') {
    photo = `/images/countries/${countryId}.jpeg`;
    attributes.onClick = handleClick;
  }

  const cardMakrer = () => {
    if (rate === 0 || rate === '0' || isUndefined(rate)) return '';

    return (
      <div className='card__mark card__mark--collapse'>
        <Mark value={rate} small={true}/>
      </div>
    );
  }

  const styles = { backgroundImage: `url(${photo})` };
  const children = (
    <div className='geo-container'>
      <div className='geo-card-image' style={styles}></div>
        <div className='card__title card__title--collapse'>{header}</div>
        {cardMakrer()}
      <div className='geo-card__subtitle'>{subtitle}</div>
      <div className='card__button card__button--collapse-marker'>
        <Button color='orange'>
          {`от ${minPrice} руб.`}
        </Button>
      </div>
      <div className='geo-card__overlay'></div>
    </div>
  );

  return React.createElement(tag, attributes, children);
};

CardMarker.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  city: PropTypes.string,
  country: PropTypes.string,
  countryId: PropTypes.number,
  text: PropTypes.string,
  hotelLink: PropTypes.string,
  rate: PropTypes.number,
  stars: PropTypes.number,
  onClick: PropTypes.func,
  pushRoute: PropTypes.func,
  minPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CardMarker;
