import Ember from 'ember';
import championConstants from './../../constants/champions';

export default Ember.Component.extend({

  name: Ember.computed('championId', function () {
    return championConstants[this.get('championId')].name;
  })

});
