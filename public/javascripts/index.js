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
  var url_element = document.getElementById('url'); 

  function setURL() {
    var params = JSON.parse(JSON.stringify(fixed_params));
    params_to_set.forEach(function(item, index) {
      params[item] = document.getElementById('param_to_set_' + item).value;
    });
    url_element.innerText = base_url + "?" + toQueryString(params);
  }

  function copyURL(obj) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(url_element);
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand('copy');
    } catch(err) {
      alert("Copy to clipboard was not successful.")
    }

    window.getSelection().removeAllRanges();
  }

  params_to_set.forEach(function(item, index) {
    document.getElementById('param_to_set_' + item).addEventListener("keyup", setURL);
  });

  document.getElementById('copyURL').addEventListener('click', copyURL);

  setURL();
}


