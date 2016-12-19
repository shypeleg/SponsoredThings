


// Find first ancestor of el with tagName and a certain size
function upTo(el, tagName,minWidth,minHeight,maxWidth,maxHeight) {
  	
	tagName = tagName.toLowerCase();
	let currentLevel=0;
	
	while (el && el.parentNode) {
		el = el.parentNode;
		let width = el.clientWidth;
		let height = el.clientHeight;
		
		if (width === null || width === undefined  || width>maxWidth ){
			break;
		}
		if (height === null || height === undefined  || height>maxHeight ){
			break;
		}

		if (el.tagName && el.tagName.toLowerCase() == tagName 
			&& height && height>minHeight
			&& width && width>minWidth ) {
			
			return el;
		}
  }
  return null;
}

let didReceiveNewData = false;

let findAndChangeSponsoredEventHandler = function (){
	if (didReceiveNewData){
		let sponsoredPosts = document.getElementsByClassName('uiStreamSponsoredLink');
//		console.log("# sponsored",sponsoredPosts.length);
		
		for (var i = 0; i < sponsoredPosts.length; i++) {
			
			if (sponsoredPosts[i].alreadyHandled){
//				console.log("skipped");
				continue;
			}

			sponsoredPosts[i].style.color = "#ea0000";
			sponsoredPosts[i].style.fontSize = "xx-large";
			// add a new property that says this element was already changed so no need to alter it again next time
			sponsoredPosts[i].alreadyHandled=true;
			// get parent div for opacity:
			let div = upTo(sponsoredPosts[i],'div',400,400, 700,700)
			if (div){
				div.style.opacity = "0.3";
			}
		}
		didReceiveNewData=false;
	}
}
window.setInterval(findAndChangeSponsoredEventHandler, 1000);

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading(not ajax stuff, first loading)

			didReceiveNewData=true;
		}
	}, 10);
});

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs(more data received with ajax for example. endless feeds.. chtas..)
	didReceiveNewData=true;
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});