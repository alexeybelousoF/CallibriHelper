//function views
showscripts.addEventListener('click',ShowandHide);

function ShowandHide() {
  var shadow = document.getElementById('more_info');
  if (shadow.style.display !== 'none'){
  	shadow.style.display="none";
  }else{
  	shadow.style.display="block";
  }
};
