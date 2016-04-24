import championConstants from './../../constants/champions'
import Ember from 'ember';

export default Ember.Component.extend({

  initLeaderboard: Ember.on('init', function () {
    Ember.$.ajax({
      url: '/api/summary',
    }).then((response) => {
      this.set('champions', response.rows);
    });
  }),

  champions: null,

  computedChampions: Ember.computed('champions', function () {
    const champions = this.get('champions');

    if (!champions) return;

    return champions.map((champion) => {
      const imageName = championConstants[champion.champion_id].image.full;

      champion.championName = championConstants[champion.champion_id].name;
      champion.image = `http://ddragon.leagueoflegends.com/cdn/6.8.1/img/champion/${imageName}`;
      return champion;
    });
  }),

  sortedByProperty: 'points',

  sortedBy: 'desc',

  computedSort: Ember.computed('sortedBy', 'sortedByProperty', function () {
    const sortedByProperty = this.get('sortedByProperty');
    const sortedBy = this.get('sortedBy');

    return [`${sortedByProperty}:${sortedBy}`];
  }),

  championsSorted: Ember.computed.sort('computedChampions', 'computedSort'),

  actions: {
    orderBy(column) {
      const sortedByProperty = this.get('sortedByProperty');
      const sortedBy = this.get('sortedBy');

      if (sortedByProperty === column) {
        if (sortedBy === 'desc') {
          this.set('sortedBy', 'asc');
        } else {
          this.set('sortedBy', 'desc');
        }
      } else {
        this.set('sortedBy', 'desc');
      }

      this.set('sortedByProperty', column);
    }
  }

});
