import Ember from 'ember';

export default Ember.Component.extend({

  isActive: Ember.computed('target', 'current', function () {
    return this.get('target') === this.get('current');
  }),

  desc: Ember.computed('type', function () {
    return this.get('type') === 'desc';
  })
});
