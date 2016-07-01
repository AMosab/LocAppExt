var j = document.createElement('script');
j.src = chrome.extension.getURL('jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

var u = document.createElement('script');
u.src = chrome.extension.getURL('jquery-ui.js');
(document.head || document.documentElement).appendChild(u);

var c = document.createElement('script');
c.src = chrome.extension.getURL('jquery.autocompleter.min.js');
(document.head || document.documentElement).appendChild(c);

var g = document.createElement('script');
g.src = chrome.extension.getURL('gmail.js');
(document.head || document.documentElement).appendChild(g);

var d = document.createElement('script');
d.src = chrome.extension.getURL('tests/jso.js');
(document.head || document.documentElement).appendChild(d);

var m = document.createElement('script');
m.src = chrome.extension.getURL('tests/modal.js');
(document.head || document.documentElement).appendChild(m);

var s = document.createElement('script');
s.src = chrome.extension.getURL('main.js');
(document.head || document.documentElement).appendChild(s);
