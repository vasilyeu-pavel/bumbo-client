import _ from 'lodash';
import { convertKeysToCamelCase } from '../utils/case';

export default class InitialStateConfigurator {
  constructor(props, initialStates) {
    this.backendState = props;
    this.frontendState = initialStates;
    this.currencies = [{ text: 'Rub', id: 1 }];
  }

  get() {
    if (this.backendState.order) {
      return {
        appState: this.appState(),
        orderState: this.orderState(),
      };
    }

    return {
      appState: this.appState(),
      orderState: this.orderState(),
      searchToursState: this.searchToursState(),
      aviaSearchesState: this.aviaSearchesState(),
    };
  }

  aviaSearchesState() {
    const { aviaSearchesInitialState } = this.frontendState;
    return aviaSearchesInitialState;
  }

  appState() {
    const { geoDictionaries } = this.backendState;
    const { appInitialState } = this.frontendState;

    return appInitialState.mergeDeep({
      currencyId: 1,
      allCurrencies: this.currencies,
      geoDictionaries,
    });
  }

  searchToursState() {
    const { searchToursInitialState } = this.frontendState;
    const { mainFormSelectors } = this.backendState;

    return searchToursInitialState.mergeDeep({
      departFrom: mainFormSelectors.depart_from_cities,
      kidsAgesSelect: mainFormSelectors.kids_ages_select,
      defaultDestination: mainFormSelectors.destination,
      defaultSearchParams: {
        date_from: mainFormSelectors.date_from,
        date_to: mainFormSelectors.date_to,
        nights: mainFormSelectors.nights,
        adults: mainFormSelectors.adults,
        nights_range: mainFormSelectors.nights_range || 2,
        city_from_id: mainFormSelectors.depart_from_cities_selected,
        kids_ages: [],
      },
      searchParams: {
        date_from: mainFormSelectors.date_from,
        date_to: mainFormSelectors.date_to,
        nights: mainFormSelectors.nights,
        adults: mainFormSelectors.adults,
        nights_range: mainFormSelectors.nights_range || 2,
        city_from_id: mainFormSelectors.depart_from_cities_selected,
        kids_ages: [],
      },
    });
  }

  orderState() {
    const { orderInitialState } = this.frontendState;

    return orderInitialState.mergeDeep({
      authenticityToken: this.backendState.authenticity_token,
    });
  }
}
