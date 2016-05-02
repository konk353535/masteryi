import Ember from 'ember';

export default Ember.Component.extend({

  loading: false,

  championData: null,

  propertyObserver: Ember.on('init', Ember.observer('name', 'region', function () {
    this.set('loading', true);
    const url = `/api/search/${this.get('region').toLowerCase()}/${this.get('name').toLowerCase()}`;

    Ember.$.ajax({ url }).then((response) => {
      this.set('championData', response);
      this.set('loading', false);
    });

  }))

});
