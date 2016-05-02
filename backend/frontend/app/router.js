import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('leaderboard');
  this.route('scans');
  this.route('home', { path: '/' });
  this.route('search', { path: '/search' });
  this.route('championleaderboard');
});

export default Router;
