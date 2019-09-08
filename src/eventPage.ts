function saveTabs(tabs) {
  chrome.storage.local.set({'tabs': tabs}, function() {
    // Notify that we saved.
    console.log('Tabs Saved');

  });
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
