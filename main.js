var gmail;
var email_subject;
var sender_email;
var data_id;
var data;
var email_plain_body;
var rootAppName = "https://www.localapplicant.com/"
var availableTags = [
  "ActionScript",
  "AppleScript",
  "Asp"
];

function getRfqKeywords() {
  var _url = rootAppName + "RFQ/getRFQKeywords";
  var rfqKeywordList;

  $.ajax({
    type: 'post',
    url: _url,
    data: "",

    async: false,
    success: function (jsonResponse) {
      rfqKeywordList = jsonResponse;
    }
  });
  return rfqKeywordList;
}

function addAutocompleteToSearch() {
  var rfqKeywordList = getRfqKeywords();
  $('#rfqFilterSearch').autocompleter({
    highlightMatches: true,
    source: rfqKeywordList,
    template: '{{ label }}',
    empty: false,
    limit: 10,
    callback: function (value, index, selected) {
      if (selected) {

      }
    }
  });
}


function refresh(f) {
  if ((/in/.test(document.readyState)) || (typeof Gmail === undefined)) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function () {

  gmail = new Gmail();


  gmail.observe.on("open_email", function (id, url, body, xhr) {
    function reqListener() {
      console.log(this.responseText);
    }

    //ajax REST request test
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://api.predic8.de/shop/");
    oReq.send();

    data_id = gmail.get.email_data(id);
    email_subject = data_id.subject;
    sender_email = data_id.people_involved[0][1];//0 is description
    email_plain_body = data_id.threads[id].content_plain;



    $('.hi').append('<div class="nH hh"><iframe src="https://www.localapplicant.com/dashboard"></iframe></div>');

    /*$('.hi').append('<div class="nH hh"><div class="c0"><div class="cV"><div class="cX"><img class="cY" src="http://cluster006.ovh.net/~synaptiq/synaptique/images/logo-syn.png" height="16"><span class="cZ">Synaptique extension_test</span><span class="cU"> - Stay up to date!</span>'
      + '</br></br><span class="cU">Hi ' + gmail.get.user_email() + ' </br></br><button type="button">Sing in</button></span></div><div class="cT"></div></div><div></div></div></div>');*/
    $('.hi').append("<div class=\"ui-widget\"><label for=\"Item Id\">Search: </label><input id=\"rfqFilterSearch\"></div>");


    addAutocompleteToSearch();
  });
}

refresh(main);
