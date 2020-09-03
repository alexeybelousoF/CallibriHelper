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
// Функция поиска скрипта
var FindScript = function(anyscript,callmessage ) {
      const scripthtml = document.querySelectorAll("script");
      var strinscripthtml = '';
      var message;
      scripthtml.forEach(function(item, i, scripthtml){
        if (item.outerHTML.includes(anyscript)) {
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



window.addEventListener('load',  function (request, sender, sendResponse) {
  var currentLocation = window.location.href;



  if (currentLocation.indexOf('in.callibri.ru/tickets')+ 1) {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if( request.message == "urlUpdated") {
        var basecamp = document.querySelector('[data-bip-attribute="basecamp_task"]');
        if (basecamp.textContent != 'Добавить'){
          chrome.runtime.sendMessage({"message": 'basecampicon', "basecamp": ''});
          //console.log(basecamp.textContent)
        } else {
          chrome.runtime.sendMessage({"message": 'incallibriicon', "incallibri": 'incallibri'});
        }

      }
      //слушаем клик
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if( request.message === "clicked_browser_action" ) {
            var projectLink = document.getElementById('project_link')
            var ticketLink = window.location.href;
            var clientEmail = document.querySelector('.in .name')

            var allTiketData = new Array(
              {"ticket":ticketLink},
              {"project":projectLink.href},
              {"client":clientEmail.textContent},
              {"tast":basecamp.textContent}
            )
            allTiketData = JSON.stringify(allTiketData)
              chrome.runtime.sendMessage({"message": 'incallibri', "basecamp": allTiketData});
            }


        });
    });
  }
  else {
    let callibriLS = JSON.parse(localStorage.getItem('callibri'));
    var checkicon = FindScript('callibri.js', 'callibri');
    // Проверка для смены картинок при загрузке страницы
    if (checkicon != '' && (callibriLS)) {
      chrome.runtime.sendMessage({"message": 'greenicon', "greenicon": "greenicon"});
    }
    if ((!checkicon) && (!callibriLS)) {
      chrome.runtime.sendMessage({"message": 'redicon', "redicon": "redicon"});
    }
    if (checkicon === '' && callibriLS) {
      console.log(callibriLS)
      chrome.runtime.sendMessage({"message": 'yellowicon', "yellowicon": "yellowicon"});
    }
    // если услышали клик - выполняем поиск данных
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if( request.message === "clicked_browser_action" ) {
            FindScript('metrika/tag.js', 'metrika');
            FindScript('googletagmanager', 'analytics');
            if  (checkicon != '') {
              chrome.runtime.sendMessage({"message": 'callibri', "script": checkicon});
            }

            if(localStorage.getItem('callibri')) {
              chrome.runtime.sendMessage({"message": 'callibri_phone', "callibri_phone": localStorage.getItem('callibri_phone')});
              chrome.runtime.sendMessage({"message": 'callibri_email', "callibri_email": callibriLS.data.email});
              chrome.runtime.sendMessage({"message": 'metrikacounter_id', "metrikacounter_id": callibriLS.data.metrika.counter_id});
              chrome.runtime.sendMessage({"message": 'site_id', "site_id": callibriLS.data.site_id});
              if (callibriLS.data.copies_phones[0])
              chrome.runtime.sendMessage({"message": 'copies_phones', "copies_phones": callibriLS.data.copies_phones[0].phone});
            }
          }
        }
      );
    }
  });
