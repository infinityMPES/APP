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
    
    header['AppVersion'] = Constantes.APP_VERSION;
    
    var deviceinfo = Device.getInfo();
    var siminfo = Sim.getInfo();
    var geoinfo = Geolocation.getInfo();
    
    if(siminfo != null) {
    	deviceinfo['sim'] = siminfo;	
    }
    
    if(geoinfo != null) {
    	deviceinfo['geo'] = geoinfo;	
    }
    
    header['Device'] = JSON.stringify(deviceinfo);
    
    if(json !=null && json == true) {
    	header['Content-Type'] = 'application/json';
    } else {
    	header['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    
	if(token != null) {
		header['AccessToken'] = token;
		header['CsrfToken'] = Util.csrf();
	} else {
		header['CsrfToken'] = Util.csrf();
	}

	return header;
}

Util.encrypt = function(texto) {
	var hashs = hash().split('-');
	return Util.encryptAES(hashs[0], hashs[1], texto);
}

Util.decrypt = function(texto) {
	var hashs = hash().split('-');
	return Util.decryptAES(hashs[0], hashs[1], texto);
}

Util.csrf = function() {
	var hashs = hash().split('-');
	var csrf = ':'+Network.ip+':'+parseInt((new Date().getTime()/1000));
	return Util.encryptAES(hashs[0], hashs[1], csrf);
}

function hash() {
		key = '';
		for(i = 0 ; i < 16 ; i++) {
			if(i == 0) {
				key+= 2*4;
			}
			if(i == 1) {
				key+= (2*4)-i;
			}
			if(i == 2) {
				key+= 3*i;
			}
			if(i == 3) {
				key+= 2+i;
			}
			if(i == 4) {
				key+= 1*i;
			}
			if(i == 5) {
				key+= i-2;
			}
			if(i == 6) {
				key+= 6/3;
			}
			if(i == 7) {
				key+= 2*4-i;
			}
			if(i == 8) {
				key+= i;
			}
			if(i == 9) {
				key+= i-2;
			}
			if(i == 10) {
				key+= (i/2)+1;
			}
			if(i == 11) {
				key+= i-(2*3);
			}
			if(i == 12) {
				key+= i/3;
			}
			if(i == 13) {
				key+= ((i-1)/3)-1;
			}
			if(i == 14) {
				key+= i/7;
			}
			if(i == 15) {
				key+= i/i;
			}
		}
		iv = '';
		for(i = 0 ; i < 16 ; i++) {
			if(i == 0) {
				iv+= 1+i;
			}
			if(i == 1) {
				iv+= 2*i;
			}
			if(i == 2) {
				iv+= 1*i;
			}
			if(i == 3) {
				iv+= 1+i;
			}
			if(i == 4) {
				iv+= 1+i;
			}
			if(i == 5) {
				iv+= i-2;
			}
			if(i == 6) {
				iv+= 6/3;
			}
			if(i == 7) {
				iv+= 2*4-i;
			}
			if(i == 8) {
				iv+= i;
			}
			if(i == 9) {
				iv+= i-2;
			}
			if(i == 10) {
				iv+= (i/2)+1;
			}
			if(i == 11) {
				iv+= i-(2*3);
			}
			if(i == 12) {
				iv+= i/3;
			}
			if(i == 13) {
				iv+= ((i-1)/3)-1;
			}
			if(i == 14) {
				iv+= i/7;
			}
			if(i == 15) {
				iv+= i/i;
			}
		}	
		return key+'-'+iv;
}

/**
 * Validação de cpf
 */
Util.validaCPF = function(cpf)
{
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (cpf.length < 11)
        return false;
  for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1))
              {
              digitos_iguais = 0;
              break;
              }
  if (!digitos_iguais)
        {
        numeros = cpf.substring(0,9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
              soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
              return false;
        numeros = cpf.substring(0,10);
        soma = 0;
        for (i = 11; i > 1; i--)
              soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
              return false;
        return true;
        }
  else
      return false;
}

/**
 * Validação de data
 */
Util.validaData = function(stringData)
{
   /******** VALIDA DATA NO FORMATO DD/MM/AAAA *******/
   var regExpCaracter = /[^\d]/;     //Expressão regular para procurar caracter não-numérico.
   var regExpEspaco = /^\s+|\s+$/g;  //Expressão regular para retirar espaços em branco.
   if(stringData.length != 10)
   {
       alert('Data fora do padrão DD/MM/AAAA');
       return false;
   }
   splitData = stringData.split('/');
   if(splitData.length != 3)
   {
       alert('Data fora do padrão DD/MM/AAAA');
       return false;
   }
   splitData[0] = splitData[0].replace(regExpEspaco, '');
   splitData[1] = splitData[1].replace(regExpEspaco, '');
   splitData[2] = splitData[2].replace(regExpEspaco, '');
   if ((splitData[0].length != 2) || (splitData[1].length != 2) || (splitData[2].length != 4))
   {
       alert('Data fora do padrão DD/MM/AAAA');
       return false;
   }
   if (regExpCaracter.test(splitData[0]) || regExpCaracter.test(splitData[1]) || regExpCaracter.test(splitData[2]))
   {
       alert('Caracter inválido encontrado!');
       return false;
   }

   dia = parseInt(splitData[0],10);
   mes = parseInt(splitData[1],10)-1;
   ano = parseInt(splitData[2],10);
   var novaData = new Date(ano, mes, dia);
   if ((novaData.getDate() != dia) || (novaData.getMonth() != mes) || (novaData.getFullYear() != ano))
   {
       alert('Data Inválida!');
       return false;
   }
   else
   {
       alert('Data OK!');
       return true;
   }
}