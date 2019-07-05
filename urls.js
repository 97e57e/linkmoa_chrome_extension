let urlList="";

let copy = document.getElementById('copy');
let reset = document.getElementById('reset');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.url) {
    saveUrls(tab.url);
    console.log("urlList : " + urlList);
    chrome.storage.local.set({'urlList': urlList}, function() {
    });
  }
});

//Copy button listener
if(copy){
  copy.addEventListener('click',function(event){
    chrome.storage.local.get('urlList', function(items) {
      alert("아래의 URL 목록을 클립보드에 복사했습니다.\n" + items.urlList);
      var str="" + items.urlList;
      copyStringToClipboard(str);
      console.log(str);
    });
  });
}
//Reset button listener
if(reset){
  reset.addEventListener('click',function(event){
    urlList=""
    chrome.storage.local.set({'urlList': ""}, function(){});
    chrome.storage.local.get('urlList',function(items){alert("저장된 URL 목록이 삭제되었습니다.");});
  });
}

//Save URLs
function saveUrls(url){
  var str="";
  str+=url;
  //Exclude main domain
  if(str == "https://www.naver.com/" ||
     str == "https://www.google.com/" ||
     str.indexOf("chrome://") !==-1 ||
     str.indexOf("https://www.google.com/search?") !==-1 ||
     str.indexOf("https://search.naver.com/") !==-1){
      console.log('exception');
  } else {
    urlList += url +'\n';
  }
}

// Copying string value to Clipboard
function copyStringToClipboard (str) {
  if(str.length > 2){str.slice(0, -1);}
  var tmp = document.createElement('textarea');
  tmp.value = str;
  tmp.setAttribute('readonly', '');
  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
 }