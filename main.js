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

function iframeLoaded() {
  debugger
      var iFrameID = document.getElementById('Iframe_synap');
      if(iFrameID) {
            // here you can make the height, I delete it first, then I make it again
                        console.log(iFrameID.height)
debugger
            iFrameID.height = "";
            console.log(iFrameID.height)
            iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
            console.log(iFrameID.height)
            
      }   
  }

function getRfqKeywords() {
  var _url = rootAppName + "RFQ/getRFQKeywords";
  var rfqKeywordList;

  $.ajax({
    type: 'post',
    url: _url,
    data: "",
    xhrFields: {
      withCredentials: true
    },
    async: false,
    complete: function (xmlHttp) {
      // xmlHttp is a XMLHttpRquest object
      //alert(xmlHttp.status);
    },
    success: function (jsonResponse) {
      rfqKeywordList = jsonResponse;
    }
  });
  return rfqKeywordList;
}

function addAutocompleteToSearch() {
  var rfqKeywordList = getRfqKeywords();
  var filtered = [];
  json.forEach(function (item) {
    console.log(item);
    if (item.id.substring(0, 2) == "it") {
      filtered.push(item)
    }
  });
  var arr = $.map(filtered, function (el) {
    return el
  });
  console.log(arr);
  debugger


  $('#rfqFilterSearch').autocompleter({
    source: arr,

    callback: function (value, index, selected) {
      debugger
      if (selected) {
        console.log(selected.label);
        console.log(selected.id);
        //showUpdateModalSingleItem(selected.id);https://www.localapplicant.com/item/getOrderDetailModal?id=it227
    //$('.hi_synap').html('<div class="nH hh"><iframe id="Iframe_synap" src="https://www.localapplicant.com/item/getOrderDetailModal?id=it227" onload="iframeLoaded()"></iframe></div>');
$('.hi_synap').html(fmodal);
      }
    }
  });
}

function showUpdateModalSingleItem(id) {
  $('.overlay-ajax').show();
  var url_ = rootAppName + "item/getOrderDetailModal";
  $.ajax({
    type: 'post',
    url: url_,
    xhrFields: {
      withCredentials: true
    },
    data: {
      id: id
    },
    success: function (response) {
      $('.overlay-ajax').hide();
      $('.hi').append(response);
      $('#errorOrderDetailSingle').hide();
      $('#successOrderDetailSingle').hide();
      $('.hi').append('show');
      $('#itemId').val(id);
    },
    failure: function () {
      $('.overlay-ajax').hide();
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
      console.log(this.status);

    }

    //ajax REST request test
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    //oReq.withCredentials = true;
    oReq.open("POST", "https://api.predic8.de/shop/");
    oReq.send();

    data_id = gmail.get.email_data(id);
    email_subject = data_id.subject;
    sender_email = data_id.people_involved[0][1]; //0 is description
    email_plain_body = data_id.threads[id].content_plain;



    //$('.hi').append('<div class="nH hh"><iframe src="https://www.localapplicant.com/dashboard"></iframe></div>');
    $('.hi').append('<iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe"></iframe>');

    $('.hi').append('<div class="nH hh"><div class="c0"><div class="cV"><div class="cX"><img class="cY" src="http://cluster006.ovh.net/~synaptiq/synaptique/images/logo-syn.png" height="16"><span class="cZ">Synaptique extension_test</span><span class="cU"> - Stay up to date!</span>'
      + '</br></br></div><div class="cT"></div></div><div></div><div class=\"ui-widget\"><label for=\"Item Id\">Search: </label><input id=\"rfqFilterSearch\"></div></div></div>');
    $('.hi').append("<form ACTION=\"http://www.cs.tut.fi/cgi-bin/run/~jkorpela/echo.cgi\" METHOD=\"POST\" target=\"dummyframe\"><div class=\"hi_synap\"></div>  </br><input type=\"submit\" value=\"Submit\"></form>");


    addAutocompleteToSearch();
  });
}

refresh(main);