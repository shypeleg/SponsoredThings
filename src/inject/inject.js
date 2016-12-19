(function () {
	var options = {
		useMarker: true
	};

	function createMarker(onClick) {
		var newDiv = document.createElement("div");
		newDiv.style.backgroundColor = '#3b5998';
		newDiv.style.padding = '10px';
		newDiv.style.textAlign = 'center';
		newDiv.style.color = 'white';
		newDiv.style.cursor = "pointer";
		newDiv.style.textDecoration = "underline";

		var text = document.createTextNode("Sponsored Post - Removed");
		newDiv.appendChild(text);

		newDiv.onclick = onClick;
		return newDiv;
	}

	function toggleVisibility(el) {
		el.style.display !== 'none' ? el.style.display = 'none' : el.style.display = null;
	}

	function processSponsored(el) {
		if (options.useMarker) {
			var post = el.childNodes[0]; // yes, it's only one child
			var marker = createMarker(() => toggleVisibility(post));
			el.insertBefore(marker, post);
			toggleVisibility(post);
		} else {
			el.style.opacity = "0.3";
		}
	}

	function investigateAddedElement(el) {
		if (el.nodeType === 1) {
			var sponsoredLink = el.querySelector('.uiStreamSponsoredLink');
			if (sponsoredLink) {
				processSponsored(el);
				// console.log(el);
			}
		}
	}

	var observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => mutation.addedNodes.forEach(investigateAddedElement));
	});

	observer.observe(document.getElementById('contentArea'), { subtree: true, childList: true });

} ());
