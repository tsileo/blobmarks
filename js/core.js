var idTs = function(_id) {
  return new Date(parseInt(_id.substring(0, 8), 16) * 1000);
}
var apiHostname = function() {
      if (this.get('config.api_url')) {
        return new URL(this.get('config.api_url')).hostname;
      }
      return '';
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

var BaseRactive = Ractive.extend({
  loadConfig: function(callback) {
    var that = this;
    var config;
    if (this.get('mode') == 'localStorage') {
      var conf = JSON.parse(localStorage.getItem('blobmarks_config'));
      if (conf) {
        that.set('config', conf);
        console.log('loadConfig');
        that.set('configured', true);
        that.set('configMode', false);
        callback(that.get('config'));
}
    } else {
      chrome.storage.local.get(['api_url', 'api_key', 'collection'], function(config) {
        that.set('config', config);
      console.log('loadConfig');
      that.set('configured', true);
      that.set('configMode', false);
      callback(that.get('config'));
  });
    }
      },
  url: function(path) {
    var that = this;
    var path = path || '';
    var spath = '/api/ext/docstore/v1/' + this.get('config.collection');
    if (path.substring(0, 4) == '/api') { 
      spath = '';
    }
    return this.get('config.api_url') + spath + (path || '');
  },
  headers: function(headers) {
    headers = headers || {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Basic ' + btoa(":" + this.get('config.api_key'));
    return headers;
  },
  data: {mode: 'localStorage'},
});

