<script>
function myurl() {
var regexp = /limit=([^&]+)/i;
    var GetValue = '';
    if (!!regexp.exec(document.location.host)) 
        GetValue = regexp.exec(document.location.host)[1];
    var valueurl=document.getElementById('valueurl');
    document.getElementById('valueurl').innerHTML=GetValue.split('\n').join('<br>');
        
}        
</script>
