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

      // ищем в доме скрипт
      const scripthtml = document.querySelectorAll("script");
      var strinscripthtml = '';
      var message
      scripthtml.forEach(function(item, i, scripthtml){
        if (item.outerHTML.includes(anyscript)) {
      strinscripthtml = strinscripthtml + '<div>' + escapeHtml(item.outerHTML) + '</div>';
    }
      });
      // есть скрипт или нет
      if  (strinscripthtml != '') {
        chrome.runtime.sendMessage({"message": callmessage, "script": strinscripthtml});
        //console.log('Скрипта есть')
      }
      else
      {
        chrome.runtime.sendMessage({"message": callmessage, "script": ''});
        //console.log('Скрипта нет')
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

    }
  }
);
