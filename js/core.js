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
  mode: 'localStorage',
  loadConfig: function(callback) {
    var that = this;
    if (this.mode == 'localStorage') {
      var conf = JSON.parse(localStorage.getItem('blobmarks_config'));
      if (conf) {
        that.set('config', conf);
        callback(conf);
        that.set('configured', true);
        that.set('configMode', false);
        console.log('loaded conf', conf);
        //document.getElementById("otp").focus();
      }
    } else {
      chrome.storage.local.get(['api_url', 'api_key', 'collection'], function(config) {
        console.log(config);
        that.set('config', config);
        that.set('configured', true);
        that.set('configMode', false);
        callback(config);
        //document.getElementById("otp").focus();
      })
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
  loadBookmarks: function() {
    console.log('loadBookmarks');
    var that = this;
    if (that.get('config.collection')) {
fetch(that.url(), {
      mode: 'cors',
      method: 'get',
      headers: that.headers(),
    }).then(status)
      .then(json)
      .then(function(data) {
        console.log('bookmarks', data);
        that.set('bookmarks', data);
    });
    }
      },
  search: function(q) {
    var that = this;
    fetch(that.url('/search?q='+q), {
      mode: 'cors',
      method: 'get',
      headers: that.headers(),
    }).then(status)
      .then(json)
      .then(function(data) {
        console.log('bookmarks', data);
        that.set('bookmarks', data);
    });


  },
});

