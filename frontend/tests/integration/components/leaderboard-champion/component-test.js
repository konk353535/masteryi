import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('leaderboard-champion', 'Integration | Component | leaderboard champion', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{leaderboard-champion}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#leaderboard-champion}}
      template block text
    {{/leaderboard-champion}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
