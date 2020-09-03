//background.js

var currTab = '';
//для мертвых табов
function callback() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    }
}

  // если таб изменился, нужно изменить ID таба
chrome.tabs.onActiveChanged.addListener( function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      currTab = tabs[0].id;
      });
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete'){
    chrome.tabs.query({ "active": true,"currentWindow": true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "urlUpdated"});
});
  }

});


    // Задание красной и зеленой иконки
chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "greenicon") {
          chrome.browserAction.setIcon({tabId:currTab, path: { "19": "icongreen-19.png","38": "icongreen-38.png" }}, callback);
        }
        if(request.message === "redicon")
        {
          chrome.browserAction.setIcon({tabId:currTab, path: { "19": "iconred-19.png","38": "iconred-38.png" }}, callback);
        }
        if( request.message === "yellowicon"){
          chrome.browserAction.setIcon({tabId:currTab, path: { "19": "iconyellow-19.png","38": "iconyellow-38.png" }}, callback);
        }
        if( request.message === "basecampicon"){
          chrome.browserAction.setIcon({tabId:currTab, path: { "19": "icon-basecamp-19.png","38": "icon-basecamp-38.png" }}, callback);
        }
        if( request.message === "incallibriicon"){
          chrome.browserAction.setIcon({tabId:currTab, path: { "19": "icon-incallibri-19.png","38": "icon-incallibri-38.png" }}, callback);
        }
});
