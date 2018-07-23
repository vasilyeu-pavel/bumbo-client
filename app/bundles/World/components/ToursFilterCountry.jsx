import React, { PureComponent, PropTypes } from 'react';
import _ from 'lodash';
import request from 'axios';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';

export default class ToursFilterCountry extends PureComponent {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    isPartners: PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'handleChange',
      'handleFocus',
      'handleBlur',
      'handleSuggestionsFetchRequest',
      'handleSuggestionsClearRequest',
      'handleSuggestionSelect',
    ]);

    this.getSuggestions = _.throttle(this.getSuggestions, 300);

    this.state = {
      active: false,
      value: '',
      suggestions: [],
      defaultSuggestions: [],
    };
  }

  componentDidMount() {
    const destination = this.props.value;

    if (this.state.suggestions.length === 0) {
      this.getSuggestions('');
    }

    if (!_.isEmpty(destination)) {
      request.get(`/tour_directions/${destination.id}`, {
        params: {
          destination_type: destination.type,
        },
      }).then((resp) => {
        const searchItemName = resp.data.text;

        this.setState({
          value: searchItemName,
        });
      });
    }
  }

  getSuggestions(value) {
    if (this.state.suggestions.length === 0 && this.state.defaultSuggestions.length !== 0) {
      this.setState({ suggestions: this.state.defaultSuggestions });

      return false;
    }

    const params = this.props.isPartners ? {
      q: value,
      search_for: 'partners',
    } : {
      q: value,
    };

    request.get('/tour_directions', { params })
      .then((response) => {
        let suggestions = [];

        if (response) {
          suggestions = response.data;
        }

        if (value.length === 0) {
          this.setState({ defaultSuggestions: suggestions });
        }

        this.setState({ suggestions });
      });
  }

  renderSuggestion(suggestion) {
    const {
      text,
      type,
      countryName,
      cityName,
      countryCode,
    } = suggestion;
    let hint = '';

    if (type === 'hotel') {
      hint = `${cityName}, ${countryName}`;
    } else if (type === 'city') {
      hint = `${countryName}`;
    }

    const isCountry = countryCode || countryName;

    return (
      <div className='react-autosuggest__suggestion-inner'>
        <span className='react-autosuggest__suggestion-text'>
          {type === 'country' && isCountry && (
            <img src={`/assets/flags/4x3/${countryCode.toLowerCase()}.svg`} />
          )}
          {text}
        </span>
        {!!hint.length && (
          <div className='react-autosuggest__suggestion-hint'>{hint}</div>
        )}
      </div>
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.text;
  }

  handleChange(event, { newValue }) {
    this.setState({ value: newValue });
  }

  handleSuggestionsFetchRequest({ value }) {
    this.getSuggestions(value);
  }

  handleSuggestionsClearRequest() {

  }

  handleSuggestionSelect(event, { suggestion }) {
    this.props.onChange(suggestion);
  }

  shouldRenderSuggestions() {
    return true;
  }

  handleFocus() {
    this.setState({ active: true });
  }

  handleBlur() {
    this.setState({ active: false });
  }

  render() {
    const { active, value, suggestions } = this.state;
    const className = 'tours-filter__item';
    const classList = classNames(
      className,
      `${className}--country`,
      { [`${className}--active`]: active }
    );
    const { tabIndex } = this.props;

    return (
      <div
        className={classList}
        onFocus={this.handleBlockFocus}
      >
        <Autosuggest
          ref='suggest'
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequest}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequest}
          onSuggestionSelected={this.handleSuggestionSelect}
          renderSuggestion={this.renderSuggestion}
          getSuggestionValue={this.getSuggestionValue}
          focusFirstSuggestion={true}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          inputProps={{
            value,
            tabIndex,
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            placeholder: 'Страна, курорт или отель',
          }}
        />
      </div>
    );
  }
}
