import Vue from 'vue';
import date from './format-date';

export default date;

Vue.filter('date', date);
