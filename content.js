// content.js

  //функция замены ХТМЛ
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }
// Функция поиска скрипта(и отправки сообщения, надо разделить на 2?)
var FindScript = function (anyscript,callmessage ) {
      const scripthtml = document.querySelectorAll("script");
      var strinscripthtml = '';
      var message;
      scripthtml.forEach( function(item, i, scripthtml){
        if ( item.outerHTML.includes(anyscript) ) {
        strinscripthtml = strinscripthtml + '<div>' + escapeHtml(item.outerHTML) + '</div>';
        }
      });
      if  (strinscripthtml != '') {
        chrome.runtime.sendMessage({"message": callmessage, "script": strinscripthtml});
      }
      else
      {
        chrome.runtime.sendMessage({"message": callmessage, "script": ''});
      }
      return strinscripthtml;
}


// страничка загрузилась, смотрим где мы
window.addEventListener('load',  function (request, sender, sendResponse) {
  var currentLocation = window.location.href;

  //********************
  // Мы в тикетах
  //********************
  if ( currentLocation.indexOf('in.callibri.ru/tickets')+1   ||  currentLocation.indexOf('in.callibri.ru/admin/tickets')+1 )  {

      //слушаем клик
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
          if ( request.message === "clicked_browser_action" ) {
            // отрисовали кнопки
            chrome.runtime.sendMessage({"message": 'incallibri', "incallibri": "incallibri"});
          }
      });




    // создаем див в тикетах
    document.getElementById("tag_filter").innerHTML = `
    <div id="divforBasecamp"><div style="width:45%; display:inline;" id="headBasecamp"></div>
    <div id="linkBasecamp" style="width:45%; display:inline;"></div></div>`;
    // Кнопка расширения поля ввода
    document.querySelector('.button_group.text_tools').innerHTML = document.querySelector('.button_group.text_tools').innerHTML +'<div type="color" id="expand_input" ' +
    'style="font-size: 20px; cursor: pointer;">🖖🏾</div>';
    document.getElementById('messages_div').style.height = 'calc(100vh - 250px)';
    document.getElementById('expand_input').addEventListener ('click', function () {


      if ( document.getElementById('messages_div').style.height == 'calc(100vh - 250px)' ) {
        document.getElementById('messages_div').style.height = 'calc(100vh - 400px)';
        document.querySelector('[input="ticket_content"]').style = 'height: 250px; overflow: auto;';

      }
      else
      {
        document.getElementById('messages_div').style.height = 'calc(100vh - 250px)';
        document.querySelector('[input="ticket_content"]').style = 'height: 108px; overflow: auto;';

      }
    });

    //Отслеживаем изменение URL
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if ( request.message == "urlUpdated" ) {

        var basecamp = document.querySelector('[data-bip-attribute="basecamp_task"]');
        var projectLink = document.getElementById('project_link');
        var ticketLink = window.location.href;
        var clientEmail = document.querySelector('.in .name');

        if (ticketLink.includes('?')) {
          var ticketreplace = /\?.+#/;
          ticketLink = ticketLink.replace(ticketreplace, '#');
          console.log(ticketLink);
        }

        if (ticketLink.includes('admin')){
          ticketLink = ticketLink.replace('admin/tickets#', 'tickets/')
        }

        if (ticketLink.includes('#')) {
          ticketreplace = /[^\/]*\d[#]/;
          ticketLink = ticketLink.replace(ticketreplace, '')
        }
        // Формируем нужный хтмл
        document.getElementById('headBasecamp').innerHTML = `
        <span id="addOperationsText" >Операции: </span><input type="checkbox"  id="addOperations">
        <textarea value="ошибка" id="header_task_input"  style="opacity:0; width:1ch; height:1px;"></textarea>
        <button id="header_task_button">Скопировать шапку</button>`;


        var operationsUrl = projectLink.href.replace("edit",'')+"operations";

        if (projectLink.href.includes('mt_stat')) {
          operationsUrl = projectLink.href.replace("mt_stat",'')+"operations";
        }

        var headerData = "Тикет: " + ticketLink + "\nПроект: " + projectLink.href + "\nКлиент: " + clientEmail.textContent;
        var headerTaskInput = document.getElementById('header_task_input');

        //обработка галочки "Операции"
        document.getElementById('addOperations').addEventListener('change', function () {
          if (document.getElementById('addOperations').checked) {
            headerData = headerData + "\nОперации: " + operationsUrl;
          }
          else
          {
            headerData = "Тикет: " + ticketLink + "\nПроект: " + projectLink.href+ "\nКлиент: " + clientEmail.textContent;
          }
              headerTaskInput.value = headerData;
        });

        headerTaskInput.value = headerData;
        //обрабатываем кнопку копирования
        document.getElementById('header_task_button').addEventListener ('click', CopyText);
        // Функция копирования
        function CopyText(){
          var copyText = document.querySelector('#header_task_input');
          copyText.select();
          document.execCommand('copy');
        };

        // Ссылка на задачу
        if ( basecamp.textContent != 'Добавить' ){
          document.getElementById("linkBasecamp").innerHTML = "<button id='bot_answere_button'>Сформировать ответ</button><a target='_blank' style='color:black' href='"
          + basecamp.textContent + "'> Посмотреть задачу</a>";
          chrome.runtime.sendMessage({"message": 'basecampicon', "basecamp": ''});
        }
        else
        {
          document.getElementById("linkBasecamp").innerHTML = "<button id='bot_answere_button'>Сформировать ответ</button><span style='color:gray;'> Посмотреть задачу</span>";
          chrome.runtime.sendMessage({"message": 'incallibriicon', "incallibri": 'incallibri'});
        }


        //Формируем ответ
        document.getElementById("bot_answere_button").addEventListener ('click', function() {
          // Формируем данные для бота
          var messageNodelist = document.querySelectorAll('#message-list-container .body');
          var messageList = '';

          messageNodelist.forEach((item, i) => {
            messageList  = messageList + item.innerHTML;
          });

          var helpAllData = '';
          var messageList = messageList.toLowerCase();
          var helpDataInput = HelpProcedure(messageList, helpAllData); //суперфункция

          //Вставлялка бота (проверка на пустоту на всякий случай)
          if (document.querySelector('[input="ticket_content"]').textContent == '') {
            document.querySelector('[input="ticket_content"]').innerText = "Добрый день!\n"+ helpDataInput;
          }

          // Заменяем блок с клиентом на баланс и услуги

        });

        var userInfo = document.querySelector('.user_info > p:nth-child(4)').textContent.replace(/Проект:(.*)\)/g, '📞');
        document.getElementById('client_filter').innerHTML = userInfo;
      }
    });
  }

  //********************
  // ЧЯТИК
  //********************

  else if (currentLocation.indexOf('in.callibri.ru/chat')+1 ){
    chrome.runtime.sendMessage({"message": 'incallibriicon', "incallibri": 'incallibri'});
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if ( request.message == "urlUpdated" ) {

        document.querySelector('.user-announcements').innerHTML = "<button class='custom-a-button-chat' id='bot_answere_button'>Сформировать ответ</button>";
        //Формируем ответ
        document.getElementById("bot_answere_button").addEventListener ('click', function() {
          // Формируем данные для бота
          var messageNodelist = document.querySelectorAll('#message-list-container .message .body');
          var messageList = '';

          messageNodelist.forEach((item, i) => {
            messageList  = messageList + item.innerHTML;
          });

          var helpAllData = '';
          var messageList = messageList.toLowerCase();
          var helpDataInput = HelpProcedure(messageList, helpAllData); //суперфункция

          //Вставлялка бота (проверка на пустоту на всякий случай)
          if (document.querySelector('#message-form #message_text').textContent == '') {
            document.querySelector('#message-form #message_text').innerText = "Добрый день!\n"+ helpDataInput;
          }

        });
      }
    });
  }

  //********************
  // Номера - Свободные
  //********************

  else if ( currentLocation.indexOf('in.callibri.ru/admin/freephones')+1 ) {
    //слушаем клик
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if ( request.message === "clicked_browser_action" ) {

          let freePhoneNumbers = document.querySelectorAll('tbody > tr> td:nth-child(3) > span');
          let arrPhoneNumbers = new Array();
          freePhoneNumbers.forEach((item, i) => {
            var phoneNumber = item.innerHTML.replace(/\s/g, '');
            phoneNumber = phoneNumber.replace('+', '');
            arrPhoneNumbers.push(phoneNumber);

          });
          arrPhoneNumbers = JSON.stringify(arrPhoneNumbers);
          chrome.runtime.sendMessage({"message": 'freephones', "arrPhoneNumbers": arrPhoneNumbers});
        }
      });
  }

  //******************
  // Любой другой сайт
  //******************

  else {

    let callibriLS = JSON.parse(localStorage.getItem('callibri'));
    var ymRegexp = /_ym(.*)_lsid/;
    let metrikaLS = new Array();
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
      if ( localStorage.key( i ).match(ymRegexp) ) {
        metrikaLS.push( localStorage.key( i ).match(ymRegexp)[1] );

      }
    }
    var allmetrikaID = JSON.stringify(metrikaLS)
    var checkicon = FindScript('callibri.js', 'callibri');
    // Проверка для смены картинок при загрузке страницы
    if ( checkicon != '' && (callibriLS) ) {
      chrome.runtime.sendMessage({"message": 'greenicon', "greenicon": "greenicon"});
      console.log('green');
    }
    if ( (!checkicon) && (!callibriLS) ) {
      chrome.runtime.sendMessage({"message": 'redicon', "redicon": "redicon"});
      console.log('red');
    }
    if ( checkicon === '' && callibriLS ) {
      chrome.runtime.sendMessage({"message": 'yellowicon', "yellowicon": "yellowicon"});
    }
    // если услышали клик - выполняем поиск данных
      chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
          if ( request.message === "callibri_script_install") {
            console.log(request.message);
            var callibriScript = document.createElement('script');
            callibriScript.src = "//cdn.callibri.ru/callibri.js";
            document.getElementsByTagName('body')[0].appendChild(callibriScript);
          }
          if ( request.message === "clicked_browser_action" ) {
            FindScript('metrika/tag.js', 'metrika');
            FindScript('googletagmanager', 'analytics');
            chrome.runtime.sendMessage({"message": 'allmetrikaID', "allmetrikaID": allmetrikaID});

            if ( checkicon != '' ) {
              chrome.runtime.sendMessage({"message": 'callibri', "script": checkicon});
            }

            if ( localStorage.getItem('callibri') ) {
              chrome.runtime.sendMessage({"message": 'callibri_phone', "callibri_phone": localStorage.getItem('callibri_phone')});
              chrome.runtime.sendMessage({"message": 'callibri_email', "callibri_email": callibriLS.data.email});
              chrome.runtime.sendMessage({"message": 'metrikacounter_id', "metrikacounter_id": "<a target='_blank' href='https://metrika.yandex.ru/dashboard?id=" +
                                        callibriLS.data.metrika.counter_id + "'>" + callibriLS.data.metrika.counter_id  + "</a>"});

              chrome.runtime.sendMessage({"message": 'site_id', "site_id": "<a target='_blank' href='https://in.callibri.ru/project/" +
                                        callibriLS.data.site_id + "/edit'>" + callibriLS.data.site_id + "</a>"});

              var lcCurrentPage = localStorage.getItem('callibri_visitor_send_event');// lc - lead catcher
              if (lcCurrentPage) {
                lcCurrentPage = '<a target="_blank" href="https://in.callibri.ru/project/' + callibriLS.data.site_id + '/widget/lid_catchers' +
                '#group_' + lcCurrentPage.slice(2, lcCurrentPage.indexOf('|')) +
                '&segment_group_' + lcCurrentPage.slice(lcCurrentPage.indexOf('|') +1, lcCurrentPage.lastIndexOf('|')) + '">Ссылка на ловец</a>';
              }
              chrome.runtime.sendMessage({"message": 'lc_current_Page', "lc_current_Page": lcCurrentPage})
              if ( callibriLS.data.copies_phones[0] ){
                chrome.runtime.sendMessage({"message": 'copies_phones', "copies_phones": callibriLS.data.copies_phones[0].phone});
              }
            }
          }
      });
  }
});
