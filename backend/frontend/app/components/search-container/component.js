import Ember from 'ember';

export default Ember.Component.extend({

  championData: null,

  propertyObserver: Ember.on('init', Ember.observer('name', 'region', function () {
    const url = `/api/search/${this.get('region').toLowerCase()}/${this.get('name').toLowerCase()}`;

    Ember.$.ajax({ url }).then((response) => {
      this.set('championData', response);
    });

  }))

});
