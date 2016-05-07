import Ember from 'ember';

export default Ember.Controller.extend({
  classNames: ['application'],

  name: null,

  region: 'NA',

  actions: {
    setRegion(region) {
      this.set('region', region);
    }
  }

});
