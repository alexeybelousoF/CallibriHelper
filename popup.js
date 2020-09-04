// popup.js
function InsertData (requestdata) {
  var requestdataMessage = requestdata[requestdata.message]
  if (requestdataMessage)
  document.getElementById(requestdata.message).innerHTML = requestdataMessage;
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
      if (metrikaid) {
        if (metrikaid.length > 10){
          document.getElementById("metrika").innerHTML = '<span class="greentext">Найдено несколько счетчиков</span>';
        }
        else {
          document.getElementById("metrika").innerHTML = '<span class="greentext">Счетчик: </span>' + metrikaid;
        }
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

    //INCALLIBRI
    if (request.message == "incallibri"){
      var allcontent =  document.getElementById("allcontent")
      var incallibri = document.getElementById("incallibri")
      var allTiketData = JSON.parse(request.basecamp)
      allcontent.style.display = "none";
      incallibri.style.display = "block";
      if (allTiketData[3].task !='Добавить') {

        document.getElementById('basecamp_link').innerHTML = "Basecamp: " + "<a href='"+allTiketData[3].task + "' target='_blank'>Ссылка на задачу</a>"
      }
      var ticketUrl = allTiketData[0].ticket
      if (ticketUrl.indexOf('admin')){
        ticketUrl = ticketUrl.replace('admin/tickets#', 'tickets/')
      }
      if (ticketUrl.indexOf('#')) {
        var ticketreplace = /\d\d\d\d\d\d\d\d#/
        ticketUrl = ticketUrl.replace(ticketreplace, '')
      }

      var projectUrl = allTiketData[1].project
      var operationsUrl = projectUrl.replace("edit",'')+"operations"
      if (projectUrl.indexOf('mt_stat')) {
        operationsUrl = projectUrl.replace("mt_stat",'')+"operations"
      }
      var headerData = "Тикет: " + ticketUrl + "\nПроект: " + projectUrl+ "\nКлиент: " +allTiketData[2].client
      document.getElementById('addOperations').addEventListener('change', function () {

        if (document.getElementById('addOperations').checked) {
          headerData = headerData + "\nОперации: " + operationsUrl
        }
        else {
          headerData = "Тикет: " + ticketUrl + "\nПроект: " + projectUrl+ "\nКлиент: " +allTiketData[2].client
        }
        document.getElementById('header_task_input').value = headerData;
      })
      document.getElementById('header_task_input').value = headerData;

    }
    }
);
