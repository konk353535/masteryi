import Ember from 'ember';

export default Ember.Controller.extend({

  init() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      })
    });
  },

  scans: null,

  sortRegionAsc: ['region'],

  sortedComputedScans: Ember.computed.sort('computedScans', 'sortRegionAsc'),

  computedScans: Ember.computed('scans', function () {
    let scans = this.get('scans');

    if (!scans) return;

    return scans.map((scan) => {
      scan.progressPercent = ((scan.current_id - scan.start_id) / scan.end_id * 100).toFixed(2);
      scan.scanned = scan.current_id - scan.start_id;
      return scan;
    });
  }),

  initScans: Ember.on('init', function () {
    this.fetchScans();
  }),

  fetchScans() {
    Ember.$.ajax({
      url: '/api/scans',
    }).then((response) => {
      this.set('scans', response);
    });
  }

});
