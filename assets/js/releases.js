$.getJSON('https://api.github.com/repos/epicpkmn11/HBChecker/tags').done(function (json) {
	var release = json[0];
	var version = release.name;

	exeURL = 'https://github.com/Epicpkmn11/HBChecker/releases/download/'+version+'/HBChecker.exe'
	$('#exeDownload').attr('href', exeURL);

	pyURL = 'https://github.com/Epicpkmn11/HBChecker/releases/download/'+version+'/HBChecker.py'
	$('#pyDownload').attr('href', pyURL);

	jsonURL = 'https://github.com/Epicpkmn11/HBChecker/releases/download/'+version+'/HBCheckerItems.json'
	$('#jsonDownload').attr('href', jsonURL);

	altJsonURL = 'https://github.com/Epicpkmn11/HBChecker/releases/download/'+version+'/AltHBCheckerItems.zip'
	$('#altJsonDownload').attr('href', altJsonURL);

	document.getElementById('relNum').innerHTML = version;
});

$.getJSON('https://api.github.com/repos/DS-Homebrew/TWiLightMenu/tags').done(function (json) {
	release = json[0];
	var versionNew = release.name.substr(1, release.name.length);
	var versionOld = document.getElementById('twlVer').innerHTML;
	if(versionNew != versionOld){
		document.getElementById('twlNotice').innerHTML += '(Note: Newer release of TWiLight Menu++ was detected ('+versionNew+'), you may get corruption errors.)';	
	}
});