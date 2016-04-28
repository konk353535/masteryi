import Ember from 'ember';

const MILLION = 1000000;

export default Ember.Component.extend({

  short: null,

  number: null,

  formattedNumber: Ember.computed('number', function () {
    const number = this.get('number');

    if (!number) return;

    if (this.get('short')) {
      if (number >= MILLION) {
        return `${(number / MILLION).toFixed(1)}M`;
      }

      if (number >= 10000) {
        return `${(number / 1000).toFixed(1)}K`
      }
    }

    let formattedNumber = [];
    let numberArr = number.toString().split('').reverse();

    for (let i = 0; i < numberArr.length; i++) {
      if ((i) % 3 === 0 && i !== 0) {
        formattedNumber.push(',');
      }
      
      formattedNumber.push(numberArr[i]);
    }

    return formattedNumber.reverse().join('');
  })

});
