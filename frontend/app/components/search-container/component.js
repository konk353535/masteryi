import Ember from 'ember';

export default Ember.Component.extend({
  queryParams: ['name', 'region'],

  name: null,

  region: null,

  loading: false,

  championData: null,

  error: false,

  errorText: '',

  propertyObserver: Ember.on('init', Ember.observer('name', 'region', function () {
    this.set('loading', true);
    this.set('error', false);
    this.set('region', this.get('region'));
    const url = `/api/search/${this.get('region').toLowerCase()}/${this.get('name').toLowerCase()}`;

    Ember.$.ajax({ url })
    .then((response) => {
      this.set('championData', response);
      this.set('loading', false);
    })
    .fail((err) => {
      this.set('loading', false);
      this.set('error', true);

      if (err.status === 404) {
        this.set('errorText', `Sorry we can\'t find you. <br />
          This is due to you having no champions with level 5 mastery <br />
          OR <br />
          We are still scanning, and you have yet to be scanned`);
      } else {
        this.set('errorText', `Everything is on fire`);
      }
    });

  }))

});
