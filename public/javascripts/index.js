var base_url;
var params_to_set;
var fixed_params;

var shortUrl = require('node-url-shortener');

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
    params[item] = document.getElementById('param_to_set_' + item).value;
  });
  var url = base_url + "?" + toQueryString(params);
  return url;
}

function getShortUrl(longUrl, callback) {
  shortUrl.short('https://google.com', function(err, shortUrl) {
    callback(shortUrl);
  });
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

  function sendSMS(obj) {
    var url = 'sms:' + document.getElementById('param_to_set_phone').value.replace(/[^0-9.]/g, "") + "?&body=" + encodeURIComponent(getUrl());
    window.open(url);
  }

  function sendEmail(obj) {
    longUrl = getUrl();
    getShortUrl(longUrl, function(shortUrl) {
      var url = 'mailto:' + document.getElementById('param_to_set_email').value + "?body=" + encodeURIComponent(shortUrl);
      window.open(url);
    });
  }

  params_to_set.forEach(function(item, index) {
    document.getElementById('param_to_set_' + item).addEventListener("keyup", setUrl);
  });
  document.getElementById('copyUrl').addEventListener('click', copyUrl);
  document.getElementById('sendSMS').addEventListener('click', sendSMS);
  document.getElementById('sendEmail').addEventListener('click', sendEmail);

  setUrl();
}


