import championConstants from './../../constants/champions'
import Ember from 'ember';

export default Ember.Component.extend({

  champion_id: null,

  limit: null,

  loading: false,

  initLeaderboard: Ember.on('init', function () {
    let url = '/api/summary';

    if (this.get('champion_id')) {
      url += `/${this.get('champion_id')}`;
    }

    if (this.get('limit')) {
      url += `?limit=${this.get('limit')}`;
    }

    this.set('loading', true);
    Ember.$.ajax({ url }).then((response) => {
      // Sort by points
      var rankings = response.rows;
      rankings.sort((a,b) => b.points - a.points);
      var rank = 1;
      rankings = rankings.map((ranking) => {
        ranking.rank = rank;
        rank++;
        return ranking;
      })
      // Iterate over and apply rank to json
      this.set('champions', rankings);
      this.set('loading', false);
    });
  }),

  champions: null,

  computedChampions: Ember.computed('champions', function () {
    const champions = this.get('champions');

    if (!champions) return;

    return champions.map((champion) => {
      const imageName = championConstants[champion.champion_id].image.full;

      champion.championName = championConstants[champion.champion_id].name;
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
