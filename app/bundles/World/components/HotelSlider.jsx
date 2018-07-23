/* global $ */

import React, { Component, PropTypes } from 'react';
import Stars from './common/Stars';
import { List } from 'immutable';

export default class HotelSlider extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    hotelId: PropTypes.number.isRequired,
    facilities: PropTypes.object.isRequired,
    starsCount: PropTypes.number.isRequired,
    cityAndCountry: PropTypes.string.isRequired,
    imageUrls: PropTypes.instanceOf(List).isRequired,
  }

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    $('.slider__fotorama')
    .on('fotorama:fullscreenenter fotorama:fullscreenexit', (e, fotorama) => {
      if (e.type === 'fotorama:fullscreenenter') {
        fotorama.setOptions({
          fit: 'contain',
        });
      } else {
        fotorama.setOptions({
          fit: 'cover',
        });
      }
    })
    .fotorama({
      height: 538,
      width: 840,
      fit: 'cover',
      nav: 'thumbs',
      thumbwidth: 120,
      thumbheight: 60,
      allowfullscreen: true,
      navwidth: 1200,
    });
  }

  getImages = () => {
    const { hotelId, imageUrls } = this.props;
    const imagesCount = imageUrls.size;

    if (imagesCount == 0 || !imageUrls.get(0).includes('sletat'))
      return imageUrls;

    const ratio = window.devicePixelRatio;
    const width = 840 * ratio;
    const height = 620 * ratio;
    const images = [];

    for (let i = 0; i < imagesCount; i++) {
      images[i] = `https://hotels.sletat.ru/i/f/${hotelId}_${i}_${width}_${height}.jpg`;
    }

    return images;
  }

  hotelRating() {
    const { rating } = this.props;

    if (rating === 0) return '';

    return (
      <div className='slider-hotel__rating'>
        <a href='#description__review' className='slider-hotel__anchor-link anchor-link'>
          <div className='slider-hotel__rating__icon'>
            <svg width='30' height='26' stroke='#FF9C00' viewBox='0 0 42.08301 38.29297'><path clipRule='evenodd' fill='none' d='M8 34.506c0 .987-.8 1.787-1.787 1.787H2.787c-.987 0-1.787-.8-1.787-1.787V19.08c0-.987.8-1.787 1.787-1.787h3.426c.987 0 1.787.8 1.787 1.787v15.426z'/><path fill='none' d='M18.894 8.386c1.06-2.485.785-4.442.958-5.22.172-.777.323-2.366 2.303-2.28 1.982.086 3.118 1.618 3.003 5.032-.07 2.023-.43 4.832-2.31 7.597-.878 1.29 2.058 1.625 2.458 1.625l13.015-.005c1.62 0 2.904.877 2.904 2.504 0 1.873-.007 1.043-.007 1.06 0 .8-.2.968-.754 1.74-.208.29-1.26.705-1.45.77-1.482.497-1.556.3-.34 1.04.31.19.746.62.746 1.55 0 .945-.015.84-.015 1.35 0 .61-.457 1.05-.77 1.43-.327.39-1.348.52-1.67.594-.495.116-.75.193-.14.593.512.334.845.784.845 1.35 0 .823-.008-.086-.008 1.097 0 .962-.53 1.178-.742 1.344-.316.243-1.41.592-1.84.663-.802.133-.42.32.11.66.285.186.614.44.614 1.05 0 .442.038.9-.11 1.436-.335 1.21-1.588 1.25-2.18 1.25-2.37 0-8.593-.007-10.324-.007-2.402 0-8.53.13-12.335-.117.01-.147-.188-19.303.015-19.453 4.092-2.153 6.43-4.924 8.024-8.654z'/></svg>
          </div>
          <span className='slider-hotel__rating__number'>{rating.toFixed(1)}</span>
          <div className='slider-hotel__rating__text'><span>общий рейтинг</span></div>
        </a>
      </div>
    );
  }

  render() {
    const { name, rating, facilities, starsCount, cityAndCountry } = this.props;

    return (
      <div className='slider inner'>
        <div className='slider__fotorama fotorama'>
          {this.getImages().map(image => (<img key={image} src={image}/>))}
        </div>

        <div className='slider__hotel slider__hotel--active'>
          <div className='slider-hotel__stars'>
            <Stars count={starsCount} size='huge' color='orange' />
          </div>
          <h2 className='slider-hotel__name'>{name}</h2>
            <div className='slider-hotel__content'>
              <div className='slider-hotel__description'>
                <div className='slider-hotel__description__icon anchor-link'>
                  <svg width='8' height='18' viewBox='0 0 8 18'>
                    <path fillRule='evenodd' fill='#FF9C00' clipRule='evenodd'd='M4.166 1.8c0 1.076.858 1.806 1.915 1.806C7.14 3.606 8 2.876 8 1.8 8 .727 7.14-.003 6.08-.003c-1.056 0-1.914.73-1.914 1.805zM.016 7.96c0 .214-.04.744.005 1.063l1.673-1.905c.347-.36.746-.61.95-.542.206.068.318.296.252.508l-2.77 8.68c-.318 1.013.286 2.01 1.754 2.236 2.15 0 3.43-1.377 4.687-3.164 0-.213.076-.775.03-1.094l-1.673 1.906c-.346.358-.777.61-.982.542-.19-.064-.3-.262-.26-.46l2.786-8.72c.232-1.107-.4-2.113-1.73-2.243-1.4 0-3.465 1.41-4.722 3.196z'/>
                  </svg>
                </div>
                <a href='#hotel-description' className='slider-hotel__description__text anchor-link'>Описание отеля</a>
              </div>
              {this.hotelRating()}
              <div className='slider-hotel__free'>{facilities.map(f => f.get('name')).join(', ')}</div>
              <div className='slider-hotel__location'>
                <a href='#location__anchor-link' className='slider-hotel__location__anchor-link anchor-link'>
                  <div className='slider-hotel__location__icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='24' viewBox='0 0 18 24'><path fillRule='evenodd' clipRule='evenodd' fill='#FF9C00' d='M9 0C4.03 0 0 4.03 0 9c0 5.934 9 15 9 15s9-9.173 9-15c0-4.97-4.03-9-9-9zM1.5 9.093C1.5 4.9 4.858 1.5 9 1.5c4.143 0 7.5 3.4 7.5 7.593C16.5 14 9 21.75 9 21.75s-7.5-7.7-7.5-12.657z'/><path fillRule='evenodd' clipRule='evenodd' fill='#FF9C00' d='M9 6C7.343 6 6 7.343 6 9s1.343 3 3 3c1.656 0 3-1.343 3-3s-1.344-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5S8.17 7.5 9 7.5c.828 0 1.5.67 1.5 1.5s-.672 1.5-1.5 1.5z'/></svg>
                  </div>
                  <div className='slider-hotel__location__text'>{cityAndCountry}</div>
                </a>
                <a href='#prices' className='button button--orange button--bigger slider-hotel__book anchor-link'>
                  <span>Туры в отель</span>
                  <svg style={{ top: '19px', right: '164px' }} className='tours__sort-item-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.825 21.825' fill='#fff'>
                    <path d='M16.791 13.254a1.112 1.112 0 0 1 1.587 0 1.14 1.14 0 0 1 0 1.587l-6.65 6.651a1.14 1.14 0 0 1-.809.333c-.317 0-.603-.127-.81-.333l-6.65-6.651c-.444-.444-.444-1.143 0-1.587s1.143-.444 1.587 0l4.746 4.762V1.111A1.116 1.116 0 0 1 10.918 0c.619 0 1.111.492 1.111 1.111v16.904l4.762-4.761z'/>
                  </svg>
                </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
