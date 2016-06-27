var gmail;
var subject;
var data_id;
var data;


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
    console.log('trololooaoaojaoajojaoj');
    function reqListener() {
      console.log(this.responseText);
    }
console.log('bew')
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://api.predic8.de/shop/");
    oReq.send();
    debugger;

    subject = gmail.get.email_subject();
    debugger;
    data_id = gmail.get.email_data(id);
    data = gmail.get.email_data();
    console.log('email subject:' + data_id.subject)
    //console.log("email data id: " + data_id);
    console.log("sender email: " + data_id.people_involved[0][1]);//0 is description
    debugger
    console.log("email html body: " + data_id.content_plain);
    //console.log('xhr ' + xhr);
    console.log(id);
    //var stocktest = httpGet('http://www.google.com/finance/info?q=NASDAQ:GOOG');

    //console.log('email data S: ' + JSON.stringify(gmail.get.selected_emails_data()))
    //console.log('email data: ' + gmail.get.emails_data())
    //console.log("my email " + gmail.get.user_email());
    //console.log("visible_emails " + JSON.stringify(gmail.get.visible_emails()));

    // Inject a toolbar:
    var $email_body = gmail.dom.email_body();
    console.log("body  " + gmail.get.displayed_email_data());
    $('.hi').append('<div class="atest"><a>This is a test</a></br></br></br></br>' +
      '<a>This another test</a></div>');
    //$email_body.prepend('<div class="toto"><a>Do somethingoooooooooooooooooooooo</a></div>');
  });
}


refresh(main);
