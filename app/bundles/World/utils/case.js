import _ from 'lodash';

export const convertKeysToSnakeCase = object =>
  _.mapKeys(object, (val, key) => _.snakeCase(key));

export const convertKeysToCamelCase = object =>
  _.mapKeys(object, (val, key) => _.camelCase(key));
