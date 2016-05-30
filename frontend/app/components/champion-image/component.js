import Ember from 'ember';
import championConstants from './../../constants/champions';

export default Ember.Component.extend({

  imageUrl: Ember.computed('championId', function () {
    if (championConstants[this.get('championId')]) {
      const imageName = championConstants[this.get('championId')].image.full;
      return `http://ddragon.leagueoflegends.com/cdn/6.8.1/img/champion/${imageName}`;
    }
  })

});
