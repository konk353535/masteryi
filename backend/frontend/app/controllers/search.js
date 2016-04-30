import Ember from 'ember';

export default Ember.Controller.extend({

  name: null,

  region: null,

  queryParams: ['name', 'region']

});
