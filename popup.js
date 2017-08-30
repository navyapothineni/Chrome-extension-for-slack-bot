
/**
 * Get the current tab URL and post it as a msg to a Slack channel using an incoming webhook URL
 *
 * 
 */

var slack_url = "https://hooks.slack.com/services/XXXXXXXX/EEEEEEEE/YYYYYYYYYYYYYY";
var channel_name = "#some-channel";
var user_name = "Some User";
var unfurl_links = true;

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    console.log("URL : " + url);
    callback(url);
  });

}


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("status").innerHTML = "Posting...";
  getCurrentTabUrl(function postURL(url) {
    text = "Read today\'s article <"+url+"|here>.";
    var payload= {"text": text, "channel": channel_name, "username": user_name, "unfurl_links": unfurl_links} ;
    console.log(JSON.stringify(payload));
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", slack_url);
    xmlhttp.onload = function () {
    // Request finished. Do processing here.
      if ( xmlhttp.status == 200 || xmlhttp.status == 'ok')
        document.getElementById("status").innerHTML = "Done!";
      else
        document.getElementById("status").innerHTML = "Problem! Response code was: "+ xmlhttp.status;
    };
    xmlhttp.send(JSON.stringify(payload));
  });
});
