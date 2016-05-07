import Ember from 'ember';

export default Ember.Component.extend({

  regionName: Ember.computed('region', function () {
    const regions = {
      'oce': 'Oceania',
      'na': 'North America',
      'eune': 'Europe Nordic & East',
      'euw': 'Europe West'
    };

    return regions[this.get('region').toLowerCase()];
  })
});
