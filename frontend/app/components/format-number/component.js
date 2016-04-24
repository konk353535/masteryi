import Ember from 'ember';

export default Ember.Component.extend({

  number: null,

  formattedNumber: Ember.computed('number', function () {
    const number = this.get('number');

    if (!number) return;

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
