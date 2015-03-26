chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		startSlackPackExtension();

	}
	}, 10);
});

function startSlackPackExtension() {
	/*{{CODE}}*/
}
