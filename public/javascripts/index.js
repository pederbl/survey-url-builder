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

function getUrl() {
  var params = JSON.parse(JSON.stringify(fixed_params));
  params_to_set.forEach(function(item, index) {
    params[item] = document.getElementById('param_to_set_' + item).value.trim();
  });
  var url = base_url + "?" + toQueryString(params);
  return url;
}

window.onload = function() { 
  var url_element = document.getElementById('url');

  function setUrl() {
    var url = getUrl();
    url_element.innerText = url;
    url_element.setAttribute('href', url);
  }

  function copyUrl(obj) {
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

  function sendSms(obj) {
    var url = 'sms:' + document.getElementById('param_to_set_phone').value.replace(/[^0-9.]/g, "") + "?&body=" + encodeURIComponent(getUrl());
    window.open(url);
  }

  function sendEmail(obj) {
    var formUrl = getUrl();
    var url = 'mailto:' + document.getElementById('param_to_set_email').value + "?body=" + encodeURIComponent(formUrl);
    window.open(url);
  }

  params_to_set.forEach(function(item, index) {
    document.getElementById('param_to_set_' + item).addEventListener("keyup", setUrl);
  });
  document.getElementById('copyUrl').addEventListener('click', copyUrl);
  document.getElementById('sendSms').addEventListener('click', sendSms);
  document.getElementById('sendEmail').addEventListener('click', sendEmail);

  setUrl();
}


