// popup.js
function InsertData (requestdata) {
  if (requestdata[requestdata.message] != '')
  document.getElementById(requestdata.message).innerHTML = requestdata[requestdata.message];
}
// Вызывается, когда пользователь нажимает на действие браузера.
chrome.browserAction.enable(function(tab) {
  // Отправить сообщение на активную вкладку
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// Слушаем сообщения
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "callibri" && request.script != '' ) {
      // Выводим че нашли
      document.getElementById("callirbi").innerHTML = '<span class="greentext">Скрипт есть!</span>';
      document.getElementById("more_callibri").innerHTML = request.script;
    }
    else
    if (request.message === "metrika" && request.script != ''){
      document.getElementById("more_metrika").innerHTML = request.script;
      var metrikaid = request.script;
      var ymRegexp = /\d+\d+\d+\d+/;
      metrikaid = ymRegexp.exec(metrikaid);
      if (metrikaid.length > 10){
        document.getElementById("metrika").innerHTML = '<span class="greentext">Найдено несколько счетчиков</span>';
      }
      else {
        document.getElementById("metrika").innerHTML = '<span class="greentext">Счетчик: </span>' + metrikaid;
      }
    }
    else
    if (request.message === "analytics" && request.script != ''){
      var analyticsid = request.script;
      document.getElementById("analytics").innerHTML = '<span class="greentext">Счетчик есть </span>';
      document.getElementById("more_analytics").innerHTML = request.script;
    }
    else
    if (request.message === "callibri_phone" && request.callibri_phone != '') {
      document.getElementById("callibri_phone").innerHTML = request.callibri_phone;
    }
    else
    {
      InsertData(request);
    }
    }
);
