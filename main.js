var gmail;
var email_subject;
var sender_email;
var data_id;
var data;
var email_plain_body;
var rootAppName = "https://www.localapplicant.com/"//staging.synaptique.com
var availableTags = [
  "ActionScript",
  "AppleScript",
  "Asp"
];

var isdebug = false;
var imgurl = "";
//ease changing between developement modes
function bug(isdebug) {
  if (isdebug) {
    debugger;
  }
  else {
    //todo
  }
}


//adjust the iframe height after done loading
function iframeLoaded() {
  bug(isdebug);
  var iFrameID = document.getElementById('Iframe_synap');
  if (iFrameID) {
    // here you can make the height, I delete it first, then I make it again
    console.log(iFrameID.height)
    bug(isdebug);
    iFrameID.height = "";
    console.log(iFrameID.height)
    iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
    console.log(iFrameID.height)

  }
}

//fetch the Keywords list from the server
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
      //alert(xmlHttp.status); //use status to identify if the user is logged in
    },
    success: function (jsonResponse) {
      rfqKeywordList = jsonResponse;
    }
  });
  return rfqKeywordList;
}




function addAutocompleteToSearch() {
  var rfqKeywordList = getRfqKeywords();//uncomment this when working online(not locally)

  var filtered = [];
  rfqKeywordList.forEach(function (item) {
    console.log(item);
    if (item.id.substring(0, 2) == "it") {
      filtered.push(item)
    }
  });
  var arr = $.map(filtered, function (el) {
    return el
  });
  console.log(arr);
  bug(isdebug);

  //var rfqKeywordList = arr;

  $('#rfqFilterSearch').autocompleter({ //jquery autocompleter
    source: arr,
    highlightMatches: true,
    hint: true,
    empty: false,
    limit: 10,

    callback: function (value, index, selected) {
      bug(isdebug);
      if (selected) {
        console.log(selected.label);
        console.log(selected.id);
        showUpdateModal(selected.id);//https://www.localapplicant.com/item/getOrderDetailModal?id=it227
        //$('.hi_synap').html('<div class="nH hh"><iframe id="Iframe_synap" src="https://www.localapplicant.com/item/getOrderDetailModal?id=it227" onload="iframeLoaded()"></iframe></div>');
        //$('.hi_synap_i').html(fmodal);
      }
    }
  });
}


//fetch the update Modal and desplay it
function showUpdateModal(id) {
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
      $('.synap_update').html("<form ACTION=\"https://www.localapplicant.com/item/saveOrderDetail?id=" + id + "?\" METHOD=\"POST\" target=\"dummyframe\"><div class=\"hi_synap_i\"></div></form>");
      $('.hi_synap_i').html(response + "<input type=\"submit\" value=\"Submit\">");
      bug(isdebug);

    },
    failure: function () {
      console.log('error! no response')
    }
  });
}

//keep refreshing until the webpage done loading
function refresh(f) {
  if ((/in/.test(document.readyState)) || (typeof Gmail === undefined)) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}



var main = function () {

  gmail = new Gmail();

  //excute each time the user open an email
  gmail.observe.on("open_email", function (id, url, body, xhr) {

    data_id = gmail.get.email_data(id);
    email_subject = data_id.subject;
    sender_email = data_id.people_involved[0][1]; //0 is description
    email_plain_body = data_id.threads[id].content_plain;


    //dummyframe is used to prevent redirection upon submmiting the form
    $('.hi').append('<iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe"></iframe>');
    //console.log(chrome.extension.getURL("/images/logo.png"));
    $('.hi').append('<div class="nH hh"><div class="c0"><div class="cV"><div class="cX"><img class="cY" src="'+ imgurl + '" height="16"><span class="cZ">Synaptique extension_test</span><span class="cU"> - Stay up to date!</span>'
      + '</br></br></div><div class="cT"></div></div><div></div><div class=\"hi_synap\"><label for=\"rfqFilterSearch\">Search for an Item: </label></br><input id=\"rfqFilterSearch\"></div></div></div>');
    $('.hi').append("<div class=\"synap_update\"></div>");


  });
}

//get absolute urls from content script
document.addEventListener('passurl', function (e)
{
    imgurl=e.detail;
    console.log("received "+url);
});

$('#rfqFilterSearch').on('input', function() {
    addAutocompleteToSearch();
});


//the trigger(the first line to get excuted)
refresh(main);