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


document.getElementById('header_task_button').addEventListener ('click', CopyText);

function CopyText(){
  var copyText = document.querySelector('#header_task_input')
  copyText.select()
  document.execCommand('copy')
}
