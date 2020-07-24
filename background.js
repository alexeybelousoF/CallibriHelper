//background.js

var currTab = '';
let colorIcon = '';
  // если таб изменился, нужно изменить ID таба
chrome.tabs.onActiveChanged.addListener( function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      currTab = tabs[0].id;
      });
});
    // Задание красной и зеленой иконки
chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "iconreload" && request.script != '' ) {
          chrome.browserAction.setIcon({tabId:currTab, path: { "19": "icongreen-19.png","38": "icongreen-38.png" } });
        }
        else
        if( request.message === "iconreload" && request.script === '' )
        {
          chrome.browserAction.setIcon({tabId:currTab, path: { "19": "iconred-19.png","38": "iconred-38.png" } });
        }
});
