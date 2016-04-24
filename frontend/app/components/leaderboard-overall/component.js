import championConstants from './../../constants/champions'
import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super();

    Ember.$.ajax({
      url: '/api/summary',
    }).then((response) => {
      this.set('champions', response.rows);
    });

  },

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

  sortProp: ['points:desc'],

  championsSorted: Ember.computed.sort('computedChampions', 'sortProp'),

  actions: {
    orderBy(column) {
      const currentCol = this.get('sortProp');
      const type = currentCol[0].split(':')[0];
      const order = currentCol[0].split(':')[1];

      if (column === type){
        if (order === 'desc'){
          this.set('sortProp', [column + ':asc']);
        } else {
          this.set('sortProp', [column + ':desc']);
        }
      } else {
        this.set('sortProp', [column + ':desc']);        
      }
    }
  }

});
