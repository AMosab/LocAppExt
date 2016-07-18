var gmail;
var email_subject;
var sender_email;
var data_id;
var data;
var email_plain_body;
var rootAppName = "https://staging.synaptique.com:8443/" //staging.synaptique.com

var isdebug = false;
var logo_url = "";
var loading_url = "";
var black_png = "";
var bulb_url = "";
var loaded = false;
var current_id = 0;
var current_user_id = 0;

//ease changing between developement modes
function bug(isdebug) {
  if (isdebug) {
    debugger;
  } else {
    //todo
  }
}

function ccbRfqKeywords(result) {
  $("#rfqFilterSearch").focus();

  $(".synap_loading").toggle();

}

function cbRfqKeywords(response, ccbRfqKeywords) {
  var rfqKeywordList = response;
  if (rfqKeywordList == 0) {
    console.log('outta here')
    $('.synap_update').html('<div class="error">       you need to login to your LocalApplicant acount first!</div>');

    ccbRfqKeywords(false);

  } else if (rfqKeywordList == -1) {
    console.log(rfqKeywordList);
  } else {
    // var filtered = [];
    // rfqKeywordList.forEach(function(item) {
    //   console.log(item);
    //   if (item.id.substring(0, 2) == "it") {
    //     filtered.push(item)
    //   }
    // });
    var arr = $.map(rfqKeywordList, function(el) {
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
      callback: function(value, index, selected) {
        bug(isdebug);
        if (selected) {
          console.log(selected.label);
          console.log(selected.id);
          $(".synap_loading").toggle();

          showUpdateModal(selected.id); //https://www.localapplicant.com/item/getOrderDetailModal?id=it227

          //$('.hi_synap').html('<div class="nH hh"><iframe id="Iframe_synap" src="https://www.localapplicant.com/item/getOrderDetailModal?id=it227" onload="iframeLoaded()"></iframe></div>');
          //$('.hi_synap_i').html(fmodal);
        }
      }
    });

    ccbRfqKeywords(true);
  }



}


function cbUsersList(response) {
  var keywordsList = response;
  if (keywordsList == 0) {
    console.log('outta here')
    $('.synap_update').html('<div class="error">you need to login to your LocalApplicant acount first!</div>');

  } else if (keywordsList == -1) {
    console.log(keywordsList);
  } else {

    var arr = $.map(keywordsList, function(el) {
      return el
    });
    console.log("users " + arr);
    bug(isdebug);
    debugger
    //var keywordsList = arr;

    $('#assignToLabel').autocompleter({ //jquery autocompleter
      source: arr,
      highlightMatches: true,
      hint: true,
      empty: false,
      limit: 10,
      callback: function(value, index, selected) {
        bug(isdebug);
        if (selected) {
          console.log(selected.label);
          console.log(selected.id);
          current_user_id = selected.id;
          $('#assignToId').val(selected.label)
          debugger;


        }
      }
    });
    debugger;

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
function getRfqKeywords(cbRfqKeywords) {
  var response;
  var _url = rootAppName + "RFQ/getItemsKeywords";
  var rfqKeywordList;
  $.ajax({
    type: 'post',
    url: _url,
    data: "",
    xhrFields: {
      withCredentials: true
    },
    complete: function(xmlHttp) {
      // xmlHttp is a XMLHttpRquest object
      if ((xmlHttp.status == 0) || (xmlHttp.status == 302)) {
        console.log("xmlHttp.status " + xmlHttp.status);
        response = 0;

      } else if (xmlHttp.status == 200) {
        response = xmlHttp.responseJSON;
      } else {
        response = -1;
      }

      cbRfqKeywords(response, ccbRfqKeywords);


    }
  });

}


function getUsersList(cb) {
  var response;
  var _url = rootAppName + "RFQ/getUserList";
  var usersList;
  $.ajax({
    type: 'post',
    url: _url,
    data: "",
    xhrFields: {
      withCredentials: true
    },
    complete: function(xmlHttp) {
      // xmlHttp is a XMLHttpRquest object
      if ((xmlHttp.status == 0) || (xmlHttp.status == 302)) {
        console.log("xmlHttp.status " + xmlHttp.status);
        response = 0;

      } else if (xmlHttp.status == 200) {
        response = xmlHttp.responseJSON;
      } else {
        response = -1;
      }
      debugger;

      cb(response);


    }
  });
  // var res = [
  //   {
  //     id: 107,
  //     label: "User 2 dev buyer one (u2.devbuyer1@realtimetypeapprovals.com)"
  //   },
  //   {
  //     id: 103,
  //     label: "dev hmida (devbuyer1@synaptique.com)"
  //   }
  // ]
  // cb(res);
}

function addAutocompleteToSearch() {
  $("#rfqFilterSearch").blur();


  getRfqKeywords(cbRfqKeywords);



}

function synap_submit() {
  $(".synap_loading1").toggle();

  //var formData = JSON.stringify($("#synap_form").serializeArray());
  var formData = {};
  $.each($('#synap_form').serializeArray(), function() {
    formData[this.name] = this.value;
  });
  // formData = JSON.parse(formData);
  formData.assignToId = current_user_id;
  // formData = JSON.stringify(formData);
  console.log(formData);
  $.ajax({
    type: "post",
    url: rootAppName + "item/saveOrderDetail?id=" + current_id, //current_id
    data: formData,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,

    success: function() {
      $(".synap_loading1").toggle();

    },
    dataType: "json"
  });

}

//fetch the update Modal and display it
function showUpdateModal(id) {

  var url_ = rootAppName + "item/getOrderDetailModal";
  current_id = id;
  $.ajax({
    type: 'post',
    url: url_,
    xhrFields: {
      withCredentials: true
    },
    data: {
      id: id
    },
    datatype: "html",
    success: function(response) {

      $('.synap_update').html("<form id=\"synap_form\" target=\"dummyframe\"><div class=\"hi_synap_i\"></div></form>");
      var res_html;
      var i;
      var last_field = 9;

      for (i = 1; i <= last_field; i++) {
        res_html += $(response).find('#field' + i).html();

      }
      $('.hi_synap_i').html(res_html + "<input type=\"button\" value=\"Submit\" onclick=\"synap_submit()\">"); //$(response).find('.block clearfix').text()
      $("#submissionTarget").datepicker({
        dateFormat: "dd/mm/yy"
      });;
      $("#submissionEffective").datepicker({
        dateFormat: "dd/mm/yy"
      });;
      $("#completionTarget").datepicker({
        dateFormat: "dd/mm/yy"
      });;
      $("#completionEffective").datepicker({
        dateFormat: "dd/mm/yy"
      });;
      $('.hi_synap_i #logo').attr("src", "blawwawg");
      $('.hi_synap_i #comment').css("width", "40%")
      getUsersList(cbUsersList);
      $(".synap_loading").toggle();


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



var main = function() {

  gmail = new Gmail();

  //excute each time the user open an email
  gmail.observe.on("open_email", function(id, url, body, xhr) {

    // data_id = gmail.get.email_data(id);
    // email_subject = data_id.subject;
    // sender_email = data_id.people_involved[0][1]; //0 is description
    // email_plain_body = data_id.threads[id].content_plain;


    //dummyframe is used to prevent redirection upon submmiting the form
    $('.hi').append('<iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe"></iframe>');
    //console.log(chrome.extension.getURL("/images/logo.png"));
    $('.hi').append('<div class="nH hh"><div class="c0"><div class="cV"><div class="cX"><img class="cY" src="' + logo_url + '" height="16"><span class="cZ">Gmail Extension</span><span class="cU"> - Stay up to date!</span>' +
      '</br></br></div><div class="cT"></div></div><div></div><div class=\"hi_synap\"><label for=\"rfqFilterSearch\">Search for an Item: </label></br><input name= \"synap_input\" id=\"rfqFilterSearch\"></div></div></div>');
    $('.hi').append('<div class="synap_loading" ><img src="' + loading_url + '" width="64" height="64"/></div>')
    $('.hi').append("<div class=\"synap_update\"></div>");
    $('.hi').append('<div class="synap_loading1" ><img src="' + loading_url + '" width="64" height="64"/></div>')

    loaded = false;
    $('#rfqFilterSearch').one('focus', function() {


      $(".synap_loading").toggle();

      addAutocompleteToSearch();


    })
    $('#rfqFilterSearch').select(function() {
      console.log('okioa')

    })

    $(document).ajaxStart(function() {
      // $(".synap_loading").toggle();
    });
    $(document).ajaxComplete(function() {
      // $(".synap_loading").toggle();
    });

  });
}

//get absolute urls from content script
document.addEventListener('passurl', function(e) {

  logo_url = e.detail[0].logo_url;
  loading_url = e.detail[0].loading_url;
  black_png = e.detail[0].black_png;
  black_png = e.detail[0].bulb_url;
  console.log("received " + logo_url);
});


$(document).ready(function() {
  console.log('in ready');


});



//the trigger(first line to get excuted)
refresh(main);