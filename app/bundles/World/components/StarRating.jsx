import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class StarRating extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    starCount: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    starCount: 5,
    value: 0,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.value,
    };

    _.bindAll(this, ['handleChange']);
  }

  handleChange(event) {
    const value = parseInt(event.target.value, 10);

    this.setState({ value });
  }

  handleStarClick(value) {
    this.props.onChange(this.props.name, value);
  }

  renderStars() {
    const { starCount, name } = this.props;
    const { value } = this.state;
    const starNodes = [];

    for (let i = starCount; i > 0; i--) {
      const id = `star-rating-${i}`;

      starNodes.push(
        <input
          id={id}
          key={`input_${i}`}
          name={name}
          type='radio'
          value={i}
          checked={value === i}
          className='star-rating__input'
          onChange={this.handleChange}
        />
      );

      starNodes.push(
          <label
            key={`label_${i}`}
            htmlFor={id}
            title={`${i} out of 5 stars`}
            className='star-rating__icon'
            onClick={this.handleStarClick.bind(this, i)}
          >
            <svg viewBox='0 0 32 31' fill='#ff9c00'>
              <path d='M16 1.996l4.273 8.818 9.717 1.375-7.007 7.046 1.613 9.76L16 24.55l-8.6 4.448 1.613-9.76L2.01 12.19l9.717-1.376L16 1.996M16 0c-.895 0-1.71.505-2.09 1.293l-3.62 7.513-8.326 1.24c-.855.126-1.565.71-1.84 1.51-.276.8-.068 1.682.536 2.284l6.1 6.094-1.415 8.45c-.142.85.226 1.704.95 2.203.396.273.862.41 1.33.41.384 0 .77-.093 1.116-.278L16 26.933l7.26 3.784c.348.184.733.278 1.117.278.467 0 .934-.138 1.332-.41.72-.5 1.09-1.354.943-2.204l-1.415-8.45 6.102-6.094c.604-.602.81-1.483.536-2.284-.276-.8-.985-1.384-1.84-1.51l-8.326-1.24-3.62-7.513C17.712.506 16.896 0 16 0z'/>
            </svg>
          </label>
      );
    }

    return starNodes;
  }

  render() {
    return (
        <div className='star-rating'>
          <div className='star-rating__text'>от</div>
          <div className='star-rating__form'>
            {this.renderStars()}
          </div>
        </div>
    );
  }
}
