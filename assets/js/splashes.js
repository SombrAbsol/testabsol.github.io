function getIndex(name, length) {
	const match = decodeURI(window.location.href).match(new RegExp("[?&]" + name + "=(.*?)(?=\&|#|$)"));
	var index;
	if(match && match.length > 1) {
		index = parseInt(match[1]);
	}
	if(isNaN(index))
		index = Math.floor(Math.random() * length);
	return index;
}

document.getElementById("splash").innerHTML = splashes[getIndex("splash", splashes.length)];
