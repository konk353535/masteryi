import Ember from 'ember';

export default Ember.Controller.extend({
  champion_id: null,

  queryParams: ['champion_id'],

  paramsObserver: Ember.observer('champion_id', function () {
    console.log(this.get('champion_id'));
  })
});
