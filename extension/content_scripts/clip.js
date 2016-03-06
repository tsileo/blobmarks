var payload = {
  url: ''+document.location,
  title: document.title,
  selectedText: window.getSelection().toString(),
};

chrome.runtime.sendMessage(payload);
