
(function () {
	var options = {
		useMarker: false,
		hideLeftColumn: false,
		hideRightColumn: false,
	};

	function upTo(el, minWidth, minHeight, maxWidth, maxHeight) {
		var maxLevelsToSearch = 20;
		let currentLevel = 0;
		let theChosenElement = null;

		while (el && 
					el.parentNode && 
					currentLevel < maxLevelsToSearch && 
					el.clientWidth < maxWidth && 
					el.clientHeight < maxHeight
					) {

			++currentLevel;
			if (el.clientWidth > minWidth && el.clientHeight > minHeight)
				theChosenElement = el;
			el = el.parentNode;

			
		}
		// console.log('start');
		// console.log('el', el);
		// console.log('theChosenElement', theChosenElement);
		// console.log('end');
		return theChosenElement;
	}

	function createMarker(onClick) {
		var newDiv = document.createElement("div");
		newDiv.style.backgroundColor = '#3b5998';
		newDiv.style.padding = '10px';
		newDiv.style.margin = '10px 0px';
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
		if (el.style)
			el.style.display !== 'none' ? el.style.display = 'none' : el.style.display = null;
	}

	function processSponsored(sponsoredLink) {
		let containingPost;
		if (sponsoredLink.text.toLowerCase().includes('links')) {// taboola and friends
			containingPost = upTo(sponsoredLink, 250, 250, 1200, 330);
		}
		else { // facebook ? mip
			containingPost = upTo(sponsoredLink, 400, 400, 700, 700);
		}
		if (containingPost) {
			if (options.useMarker) {
				//var post = el.childNodes[0]; // yes, it's only one child
				var marker = createMarker(() => toggleVisibility(containingPost));
				containingPost.insertBefore(marker, containingPost.childNodes[0]);
				toggleVisibility(containingPost);
			} else {
				containingPost.style.opacity = '0.2';
			}
		}
	}

	function investigateElement(el) {
		if (el && el.getElementsByTagName) {
			var links = el.getElementsByTagName('a');
			for (var i = 0, max = links.length; i < max; i++) {
				if (links[i].text.toLowerCase().includes('sponsored')) {
					processSponsored(links[i]);
				}
			}
		}
	}

	function investigateExistingSubsteams() {
		// test first (existing) 2 substeams
		investigateElement(document);
		//investigateElement(document.getElementById('substream_0'));
		//investigateElement(document.getElementById('substream_1'));
	}

	function startObserving() {
		var observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => mutation.addedNodes.forEach(investigateElement));
		});
		observer.observe(document, { subtree: true, childList: true, attributes: true });
	}

	function hideColumns() {
		if (options.hideLeftColumn) {
			const leftCol = document.getElementById('leftCol');
			leftCol.classList.add('dimmed');
		}
		if (options.hideRightColumn) {
			const rightCol = document.getElementById('rightCol');
			rightCol.classList.add('dimmed');
		}
	}

	function init() {
		// initializing //
		hideColumns();
		investigateExistingSubsteams();
		//setTimeout(investigateExistingSubsteams, 1000);
		startObserving();
	}
	//
	init();

}());
