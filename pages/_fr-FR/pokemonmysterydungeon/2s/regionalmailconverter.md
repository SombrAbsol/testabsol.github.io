---
title: Convertisseur régional de Lettres Miracle S (PDM2C)
description: Convertisseur régional de Lettres Miracle S (PDM2C)
---
# Pokémon Donjon Mystère : Explorateurs du Ciel
## Convertisseur régional de Lettres Miracle S
Utilisez cet outil pour convertir le mot de passe d'une Lettre Miracle S américaine et australienne en mot de passe de Lettre Miracle S européenne, et réciproquement.

Source : [http://www.apointlessplace.net/wms/wmconvert.html](https://web.archive.org/web/20170511090501/http://www.apointlessplace.net/wms/wmconvert.html)

<script type="text/javascript" src="/assets/js/tools/PMD2S/wmutils.js">
</script> 
<script type="text/javascript" src="/assets/js/tools/PMD2S/wm.js">
</script> 
<script type="text/javascript">		
		// This is a really bad hack.
		let curCountry = 1;
		
		// This is used in wm.js.
		function getOption(name) {
			switch(name) {
				case 'EU':
					return (curCountry == 2);
				break;
				
				default:
					return false;
				break;
			}
		}
		
		// Don't allow option setting on this page.
		function setOption(name, value) {
			return false;
		}
		
		function setError(text) {
			$('outputbox').value = text;
		}
		
		function getByteSwap() {
			if(getOption("EU")) {
				return WMSParser.byteSwapEU;
			}
			else {
				return WMSParser.byteSwap;
			}
		}
	
		let convertedThisSession = false;
		function doConvert(fromCountry) {
			let mailString = WMSParser.sanitize($('inputbox').value);
			if(mailString.length != 34) {
				setError("Désolé, le mot de passe de la Lettre Miracle S entré n'a pas la bonne longueur ou contient des caractères invalides.");
				return false;
			}
			
			// Parse the code as the fromCountry first.
			curCountry = fromCountry;
			let unscrambled = WMSParser.unscrambleString(mailString, getByteSwap());
			
			// 3 - 1 = 2, 3 - 2 = 1. What a wonderful piece of logic.
			curCountry = 3 - fromCountry;
			let scrambled = WMSParser.scrambleString(unscrambled, getByteSwap());
			
			// Write the newly scrambled code in the box.
			$('outputbox').value = prettyMailString(scrambled, 2, 7);
			
			// Tracking
			if(typeof(_gaq) != 'undefined' && !convertedThisSession) {
				if(typeof(_gaq.push) != 'undefined') {
					_gaq.push(['_trackPageview', "/wms/converter/converted"]);
					convertedThisSession = true;
				}
			}
		}
</script>

<fieldset> 
  <legend>
    <span style="font-weight: normal;">Lettre Miracle S</span>
  </legend> 
  <strong>
    <textarea id="inputbox" rows="5" cols="30"></textarea> 
  </strong>
</fieldset>                
<input type="button" value="Convertir US/AU à EU" id="convertUSbtn" onclick="doConvert(1)">
<input type="button" value="Convertir EU à US/AU" id="convertEUbtn" onclick="doConvert(2)">
<fieldset> 
  <legend>
    <span style="font-weight: normal;">Mot de passe converti</span>
  </legend> 
  <textarea id="outputbox" rows="5" cols="30"></textarea> 
</fieldset>