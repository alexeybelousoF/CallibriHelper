// popup.js
// функция вставки для внешних сайтов
function InsertData (requestdata) {
  var requestdataMessage = requestdata[requestdata.message]
  if (requestdataMessage && document.getElementById(requestdata.message) )
  document.getElementById(requestdata.message).innerHTML = requestdataMessage;
}


// Вызывается, когда пользователь нажимает на действие браузера.
chrome.browserAction.enable(function(tab) {
  // Отправить сообщение на активную вкладку
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {"message": "clicked_browser_action"});
    return activeTab = tabs[0].id;
  });



  // Слушаем сообщения
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

      // Функция для переключения на кабинет
      function InCallibri () {
        var allcontent =  document.getElementById("allcontent")
        var incallibri = document.getElementById("incallibri")
        allcontent.style.display = "none";
        incallibri.style.display = "block";
      }

      //Тикеты
      if ( request.message == "incallibri" || request.message == "messageList") {
        // скрыли все
        InCallibri();
      }
      // Свободные номера
      else

      if (request.message == "freephones") {
          let freePhoneNumbers = '';
          InCallibri();
          let arrPhoneNumbers = JSON.parse(request.arrPhoneNumbers);
          arrPhoneNumbers.forEach((item, i) => {
            freePhoneNumbers = freePhoneNumbers + item + "\n";
          });
          document.getElementById('header_task_button').textContent = 'Скопировать номера';
          document.getElementById('addOperations').style = "display:none;";
          document.getElementById('addOperationsText').style = "display:none;";
          document.getElementById('header_task_input').value = freePhoneNumbers;
      }

      // Любой другой сайт
      else {

        // Отображение данных
        if ( request.message === "callibri" && request.script != '' ) {
          // Выводим че нашли
          document.getElementById("callirbi").innerHTML = '<span class="greentext">Скрипт есть!</span>';
          document.getElementById("more_callibri").innerHTML = request.script;
        }
        else

        if (request.message === "metrika" && request.script != ''){
          document.getElementById("more_metrika").innerHTML = request.script;
        }

        if (request.message === "allmetrikaID" && request.script != '') {
          var arrMetrikaID = JSON.parse(request.allmetrikaID);
          var allmetrikaID = '';

          arrMetrikaID.forEach( function(item, i) {
            if (!allmetrikaID) {
              allmetrikaID = item
            }
            allmetrikaID = allmetrikaID +", "+ item;
            return allmetrikaID;
          })

          document.getElementById("metrika").innerHTML = '<span class="greentext"> ' + allmetrikaID + '</span>';
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
  });
});
