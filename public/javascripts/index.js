var base_url;
var params_to_set;
var fixed_params;


function toQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

window.onload = function() { 
  var url_div = document.getElementById('url'); 

  function setURL() {
    var params = JSON.parse(JSON.stringify(fixed_params));
    params_to_set.forEach(function(item, index) {
      params[item] = document.getElementById('param_to_set_' + item).value;
    });
    url_div.innerText = base_url + "?" + toQueryString(params);
  }

  params_to_set.forEach(function(item, index) {
    document.getElementById('param_to_set_' + item).addEventListener("keyup", setURL);
  });

  setURL();
}


