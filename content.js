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
// Проверка для смены картинок при загрузке страницы
window.onload = FindScript('callibri.js', 'iconreload');
// если услышали клик - выполняем функцию
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      FindScript('metrika/tag.js', 'metrika');
      FindScript('googletagmanager', 'analytics');
      FindScript('callibri.js', 'callibri');
      chrome.runtime.sendMessage({"message": 'callibri_phone', "callibri_phone": localStorage.getItem('callibri_phone')});
      let callibriLS = JSON.parse(localStorage.getItem('callibri'));
      chrome.runtime.sendMessage({"message": 'callibri_email', "callibri_email": callibriLS.data.email});
      chrome.runtime.sendMessage({"message": 'metrikacounter_id', "metrikacounter_id": callibriLS.data.metrika.counter_id});
      chrome.runtime.sendMessage({"message": 'site_id', "site_id": callibriLS.data.site_id});
      if (callibriLS.data.copies_phones[0])
      chrome.runtime.sendMessage({"message": 'copies_phones', "copies_phones": callibriLS.data.copies_phones[0].phone});

    }
  }
);
