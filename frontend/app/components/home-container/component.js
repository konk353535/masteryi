import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['container'],

  region: 'NA',

  actions: {
    setRegion(region) {
      this.set('region', region);
    }
  }

});
