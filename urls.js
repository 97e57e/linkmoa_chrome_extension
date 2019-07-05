var urlList="";

let copy = document.getElementById('copy');
let reset = document.getElementById('reset');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.url) {
    exceptionHandler(tab.url);
    chrome.storage.local.set({'urlList': urlList}, function() {
    });
  } 
});

if(copy){
  copy.addEventListener('click',function(event){
    chrome.storage.local.get('urlList', function(items) {
      alert("아래의 URL 목록을 클립보드에 복사했습니다.\n" + items.urlList);
      copyStringToClipboard(items.urlList);
    });
  });
}

if(reset){
  reset.addEventListener('click',function(event){
    urlList=""
    chrome.storage.local.set({'urlList': urlList}, function() {
    });
    alert("저장된 URL 목록을 초기화 했습니다.");
  });
}

//Exception URLs
function exceptionHandler(url){
  var str="";
  str+=url;
  //Exclude main domain
  if(str == "https://www.naver.com/" ||
     str == "chrome://history/" ||
     str == "https://www.google.com/" ||
     str.indexOf("https://www.google.com/search?") !==-1 ||
     str.indexOf("https://search.naver.com/") !==-1){
         console.log('exception');
  } else {
      urlList += url +'\n';
  }
}

// Copying string value to Clipboard
function copyStringToClipboard (str) {
    var tmp = document.createElement('textarea');
    tmp.value = str;
    tmp.setAttribute('readonly', '');
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
 }