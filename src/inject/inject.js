function hideSponsoredParent(el) {
	el.style.opacity = "0.3";
	// el.style.display = "none";
}

function markSponsored(el) {
	el.style.color = "#ea0000";
	el.style.fontSize = "xx-large";
}

function investigateAddedElement(el) {
	if (el.nodeType === 1) {
		var sponsoredLink = el.querySelector('.uiStreamSponsoredLink');
		if (sponsoredLink) {
			markSponsored(sponsoredLink);
			hideSponsoredParent(el);
			console.log(`Sponsored: ${el}`);
		}
	}
}

var observer = new MutationObserver(mutations => {
	mutations.forEach(mutation => mutation.addedNodes.forEach(investigateAddedElement));
});

observer.observe(document.getElementById('contentArea'), { subtree: true, childList: true });
