import {createStore} from 'redux';
import { forecastReducer } from './forecastReducer';
const { camelCase, transform, isArray, isObject } = require("lodash");

export const store = createStore(forecastReducer);

export const camelize = (obj: any) =>
    transform(obj, (acc: any, value: any, key: any, target: any) => {
      const camelKey = isArray(target) ? key : camelCase(key);
      acc[camelKey] = isObject(value) ? camelize(value) : value;
});