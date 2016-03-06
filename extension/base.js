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
    chrome.storage.local.get(['api_url', 'api_key', 'collection', 'done'], function(config) {
      console.log(config);
      that.set('config', config);
      callback(config);
    })
  },
  url: function(path) {
    return this.get('config.api_url') + '/api/ext/docstore/v1/' + this.get('config.collection') + (path || '');
  },
  headers: function(headers) {
    headers = headers || {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Basic ' + btoa(":" + this.get('config.api_key'));
    return headers;
  },
});
