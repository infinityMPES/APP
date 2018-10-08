if(Util == null) {var Util = {};}

Util.inArray = function(valor, array) {
    for(var i = 0 ; i < array.length; i++) {
        if(array[i] == valor) {
            return true;
        }
    }
    return false;
};

Util.str_split = function (string, splitLength) {

	  if (splitLength === null) {
	    splitLength = 1;
	  }
	  if (string === null || splitLength < 1) {
	    return false;
	  }

	  string += '';
	  var chunks = [];
	  var pos = 0;
	  var len = string.length;

	  while (pos < len) {
	    chunks.push(string.slice(pos, pos += splitLength))
	  }

	  return chunks;
};

Util.mascaraCertificado = function(mascara, string) {

    retorno = '';
    separadores = [',','.','-'];
    mascaraArray = Util.str_split(mascara,1);
    stringArray = Util.str_split(string,1);
    n = 0;
    
    for(i = 0; i < mascara.length; i++) {
        if(!Util.inArray(mascaraArray[i], separadores)) {
        	mascaraArray[i] = stringArray[n++];
        }
    }
    return mascaraArray.join('');
};

Util.Asc = function (String) {
	return String.charCodeAt(0);
}
 
Util.Chr = function (AsciiNum) {
	return String.fromCharCode(AsciiNum)
}

Util.encodeURI = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
	    return '%' + c.charCodeAt(0).toString(16);
	});
}	

Util.encryptAES = function(key, iv, text) {
	  
	  key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key));
	  iv  = CryptoJS.enc.Utf8.parse(iv);	  
	  encrypted = CryptoJS.AES.encrypt(text, key, {iv:iv, mode:CryptoJS.mode.CBC, padding:CryptoJS.pad.ZeroPadding});
	  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

Util.decryptAES = function(key, iv, text) {
	  
	  key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key));
	  iv  = CryptoJS.enc.Utf8.parse(iv);	  
	  decrypted = CryptoJS.AES.decrypt(text, key, {iv:iv, mode:CryptoJS.mode.CBC, padding:CryptoJS.pad.ZeroPadding});
	  return decrypted.toString(CryptoJS.enc.Utf8);
}

Util.utf8Base64 = function(value) {
	
	return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value)); 				
}

Util.base64Utf8 = function(value) {
	
	return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(value));	
}

Util.guid = function() {

	var d = new Date().valueOf(); 
	var n = d.toString();
	var p = 0;
	var hifens = 0;
	var result = '';
	var length = 32;
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (var i = length; i > 0; --i) {
	  result += ( (i & 1) && n.charAt(p) ? n.charAt(p)  : chars[Math.floor(Math.random() * chars.length)]);
	  if(result.length < length && (result.length==8 || (result.length > 0 && (result.length - hifens)%8==0)) ) {
	  	result +='-'
	    hifens++;
	   }
	   if(i & 1) p++;
	};
	return result;
}

Util.base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

Util.base64Encode = function( string ) {
	
    var base64Chars = Util.base64Chars;
    var characters  = base64Chars;
    var result = '';
    var i = 0;
    do {
        var a = string.charCodeAt(i++);
        var b = string.charCodeAt(i++);
        var c = string.charCodeAt(i++);

        a = a ? a : 0;
        b = b ? b : 0;
        c = c ? c : 0;

        var b1 = ( a >> 2 ) & 0x3F;
        var b2 = ( ( a & 0x3 ) << 4 ) | ( ( b >> 4 ) & 0xF );
        var b3 = ( ( b & 0xF ) << 2 ) | ( ( c >> 6 ) & 0x3 );
        var b4 = c & 0x3F;

        if( ! b ) {
            b3 = b4 = 64;
        } else if( ! c ) {
            b4 = 64;
        }

        result += Util.base64Chars.charAt( b1 ) + Util.base64Chars.charAt( b2 ) + Util.base64Chars.charAt( b3 ) + Util.base64Chars.charAt( b4 );

    } while ( i < string.length );

    return result;
}

Util.base64Decode = function( string ) {
	
	var base64Chars = Util.base64Chars;
    var characters  = base64Chars;
    var result = '';
    var i = 0;
    do {
        var b1 = Util.base64Chars.indexOf( string.charAt(i++) );
        var b2 = Util.base64Chars.indexOf( string.charAt(i++) );
        var b3 = Util.base64Chars.indexOf( string.charAt(i++) );
        var b4 = Util.base64Chars.indexOf( string.charAt(i++) );

        var a = ( ( b1 & 0x3F ) << 2 ) | ( ( b2 >> 4 ) & 0x3 );
        var b = ( ( b2 & 0xF  ) << 4 ) | ( ( b3 >> 2 ) & 0xF );
        var c = ( ( b3 & 0x3  ) << 6 ) | ( b4 & 0x3F );

        result += String.fromCharCode(a) + (b?String.fromCharCode(b):'') + (c?String.fromCharCode(c):'');

    } while( i < string.length );

    return result;
}

Util.windowPopup = function(openedDomain, path, idReference, specs, eventName, callback) {

	(function initializeOpenUniquePopUp(openedDomain, path, idReference, specs, eventName, callback) {
	  var trackedWindows = {};
	  window.openUniquePopUp = function(openedDomain, path, idReference, specs, eventName, callback) {
	    setTimeout(checkIfOpen, 1000);
	    function checkIfOpen() {
	      var win;	
	      var browser = false;	
	      if(!trackedWindows[idReference]) {
    		try {
    			win = cordova.InAppBrowser.open(openedDomain + path, idReference, specs);
    		} catch(e) {
    			window.open(openedDomain + path, idReference, specs);
    			browser = true;
    		}
    		if(!browser) {
    			if(window.addEventListener) {
    				win.removeEventListener(eventName, function(){callback(win)}, false);  
    				win.addEventListener(eventName, function(){callback(win)}, false);
    			} else if (window.attachEvent) {
    				win.detachEvent(eventName, function(){callback(win)}, false);
    				win.attachEvent(eventName, function(){callback(win)}, false);
    			}
    		} else {
    			if(window.addEventListener) {
    				window.removeEventListener(eventName, callback, false);  
    				window.addEventListener(eventName, callback, false);
    			} else if (window.attachEvent) {
    				window.detachEvent(eventName, callback, false);
    				window.attachEvent(eventName, callback, false);
    			}
    		}
	      }
	    }
	  }
	})(openedDomain, path, idReference, specs, eventName, callback);
	window.openUniquePopUp(openedDomain, path, idReference, specs, eventName, callback);
}

Util.windowPopupPost = function(openedDomain, path, idReference, specs, data, callback) {
	
	(function initializeOpenUniquePopUp(openedDomain, path, idReference, specs, data, callback) {
		var trackedWindows = {};
		window.openUniquePopUp = function(openedDomain, path, idReference, specs, data) {
			setTimeout(checkIfOpen, 1000);
			function checkIfOpen() {
				if(!trackedWindows[idReference]) {
				    var form = document.createElement("form");
				    form.target = idReference;
				    form.method = "POST";
				    form.action = openedDomain;
				    for(var i = 0 ; i < data.length ; i++) {
				        var input = document.createElement("input");
				        input.type = "hidden";
				        input.name = data[i].key;
				        input.value = data[i].value;
			            form.appendChild(input);
			            document.body.appendChild(form);
					}
					try {
						map = cordova.InAppBrowser.open(openedDomain + path, idReference, specs);
					} catch(e) {
						map = window.open(openedDomain + path, idReference, specs);
					}
					if(map) {
						form.submit();
					}
				}
			}
		}
		if(window.addEventListener) {
			window.removeEventListener('message', callback, false);  
			window.addEventListener('message', callback, false);
		} else if (window.attachEvent) {
			window.detachEvent('message', callback, false);
			window.attachEvent('message', callback, false);
		}
	})(openedDomain, path, idReference, specs, data, callback);
	window.openUniquePopUp(openedDomain, path, idReference, specs, data, callback);
}

Util.headers = function(token, json) {
	
    var header = {};
    
    if(json !=null && json == true) {
    	header['Content-Type'] = 'application/json';
    } else {
    	header['Content-Type'] = 'application/x-www-form-urlencoded';
    }

	return header;
}
