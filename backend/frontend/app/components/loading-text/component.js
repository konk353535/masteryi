import Ember from 'ember';

export default Ember.Component.extend({

  isDestroyed: false,

  messages: [
    'Loading',
    'Loading.',
    'Loading..',
    'Loading...',
    'Well this is taking awhile',
    'Well this is taking awhile.',
    'Well this is taking awhile..',
    'Well this is taking awhile...',
    'Well this is taking awhile... :(',
    'Well this is taking awhile... :(',
    'Well this is taking awhile... :(',
    'Uhh yep the servers are on fire again',
    'Uhh yep the servers are on fire again',
    'Uhh yep the servers are on fire again',
    'Backup server is now booting',
    'Backup server is now booting.',
    'Backup server is now booting..',
    'Backup server is now booting...',
    'Backup server is now booting....',
    'Backup server is now booting.....',
    'We lied',
    'We lied :',
    'We lied :('
  ],

  timeDelay: 500,

  message: null,

  messageIndex: 0,

  init() {
    this._super();
    this.set('message', this.get('messages')[0]);
    this.set('messageIndex', 0);
    this.tick();
  },

  tick() {
    let messageIndex = this.get('messageIndex');
    const messages = this.get('messages');
    if (messageIndex < messages.length - 1){
      setTimeout(() => {
        if ( !(this.get('isDestroyed') || this.get('isDestroying')) ) {
          messageIndex++;
          this.set('messageIndex', messageIndex);
          this.set('message', messages[messageIndex]);
          this.tick();
        }
      }, this.get('timeDelay'));
    }
  }

});
