//function views
showscripts.addEventListener('click',ShowandHide);
// скрывашка
function ShowandHide() {
  var shadow = document.getElementById('more_info');
  if (shadow.style.display !== 'none'){
  	shadow.style.display="none";
  }else{
  	shadow.style.display="block";
  }
};
//copytext

//copyText 2
// Слушаем сообщения
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "messageList") {
      var helpDataLink = document.querySelectorAll('.help_data_link');

      helpDataLink.forEach((item, i) => {

        item.addEventListener('click', function(el) {
          target = el.target;
          console.log(target);
          target.select();
          document.execCommand('copy');

        });
      });
    };
});
