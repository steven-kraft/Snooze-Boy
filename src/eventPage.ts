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
  chrome.storage.local.get(['tabs'], function(result) {
    var date = new Date();
    result.tabs.forEach(function(t) {
      if(date > t.date) {
        openTab(t);
        saveTabs(result.tabs.filter(tab => tab.id !== t.id))
      }
    });
  });
}

// Check Tabs Every Second
setInterval(checkTabs, 1000);
