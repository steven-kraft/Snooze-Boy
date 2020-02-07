function saveTabs(tabs) {
  chrome.storage.local.set({'tabs': closeTabs(tabs)});
}

function closeTabs(tabs) {
  tabs.forEach(function(t) {
    if (t.cid) {
      chrome.tabs.remove(t.cid);
      delete t.cid;
    }
  });
  return tabs;
}

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    switch(request.message) {
      case "save":
        if(request.tabs)
          saveTabs(request.tabs);
        break;
      case "load":
        break;
      default:
        alert("Invalid Message")
    }

    return isResponseAsync;
});

function openTab(t) {
  chrome.tabs.create({url: t.url});
}

function checkTabs() {
    var remove_ids = []
    chrome.storage.local.get(['tabs'], function(result) {
      var tabs = result;
      var date = new Date();
      if(result.tabs) {
        result.tabs.forEach(function(t) {
          if(date > t.date) {
            openTab(t);
            remove_ids.push(t.id)
          }
        });
        saveTabs(result.tabs.filter(tab => !remove_ids.includes(tab.id)));
      }
    });
}

setInterval(function() {
  var date = new Date();
  if ( date.getSeconds() === 0 ) {
    checkTabs();
  }
}, 1000);
