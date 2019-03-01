
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


/**
 * Validação de cpf
 */
Util.validaCPF = function(cpf)
{
  if(cpf == "" || cpf == undefined) return false;
  cpf = cpf.replace(/[^\d]+/g,'');
  if (cpf.length != 11 || 
			cpf == "00000000000" || 
			cpf == "11111111111" || 
			cpf == "22222222222" || 
			cpf == "33333333333" || 
			cpf == "44444444444" || 
			cpf == "55555555555" || 
			cpf == "66666666666" || 
			cpf == "77777777777" || 
			cpf == "88888888888" || 
			cpf == "99999999999")
				return false;
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
	if(stringData == "" || stringData == undefined) return false;
   /******** VALIDA DATA NO FORMATO DD/MM/AAAA *******/
   var regExpCaracter = /[^\d]/;     //Expressão regular para procurar caracter n�o-num�rico.
   var regExpEspaco = /^\s+|\s+$/g;  //Expressão regular para retirar espa�os em branco.
   if(stringData.length != 10)
   {
       return false;
   }
   splitData = stringData.split('/');
   if(splitData.length != 3)
   {
       return false;
   }
   splitData[0] = splitData[0].replace(regExpEspaco, '');
   splitData[1] = splitData[1].replace(regExpEspaco, '');
   splitData[2] = splitData[2].replace(regExpEspaco, '');
   if ((splitData[0].length != 2) || (splitData[1].length != 2) || (splitData[2].length != 4))
   {
       return false;
   }
   if (regExpCaracter.test(splitData[0]) || regExpCaracter.test(splitData[1]) || regExpCaracter.test(splitData[2]))
   {
       return false;
   }

   dia = parseInt(splitData[0],10);
   mes = parseInt(splitData[1],10)-1;
   ano = parseInt(splitData[2],10);
   var novaData = new Date(ano, mes, dia);
   if ((novaData.getDate() != dia) || (novaData.getMonth() != mes) || (novaData.getFullYear() != ano))
   {
       return false;
   }
   else
   {
       return true;
   }
}

/**
 * Método que irá criar a tabela pelos parametros informados
 * 
 */
Util.montarTabela =  function(idTabela, dados, colunas, ordenacao){
	// Caso a tabela já esteja criada
	$('#'+idTabela).dataTable().fnClearTable();
	$('#'+idTabela).dataTable().fnDestroy();
    console.log(ordenacao)
	// Iniciando a tabela
    $('#'+idTabela).DataTable({
    	language : {
	        "decimal":        "",
	        "emptyTable":     "Desculpe, nenhum registro encontrado",
	        "info":           "Mostrando _START_ de _END_ of _TOTAL_ registros",
	        "infoEmpty":      "Mostrando 0 de 0",
	        "infoFiltered":   "(filtrado de _MAX_ registros)",
	        "infoPostFix":    "",
	        "thousands":      ",",
	        "lengthMenu":     "Mostrar _MENU_ registros",
	        "loadingRecords": "Carregando...",
	        "processing":     "Processando...",
	        "search":         "Buscar:",
	        "zeroRecords":    "Nenhum Resultado Encontrado",
	        "paginate": {
	            "first":      "Primeiro",
	            "last":       "Ultimo",
	            "next":       "Próximo",
	            "previous":   "Anterior"
	        },
	        "aria": {
	            "sortAscending":  ": activate to sort column ascending",
	            "sortDescending": ": activate to sort column descending"
	        }
	    },
//	    dom: 'Bfrtip',
//	    buttons: [
//	        'copy', 'csv', 'excel', 'pdf'
//	    ],
	    responsive: true,
        data: dados,
        "columns": colunas,
        order: ((ordenacao != undefined) ? ordenacao : [[ 1, "asc" ]])
    });
}

/**
 * Método que irá validar o cadastro / edição do paciente
 */
Util.validarCadastroPaciente = function (loginData, bolCadastro){
	
	bolErros = false;
	strMensagem = "";
	
	// Caso seja cadastrar paciente
	if(loginData.id == "" && loginData.id == undefined){
		if(!Util.validaCPF(loginData.cpf)) {
			bolErros = true;
			strMensagem += "<b>CPF</b> inválido! <br />";
		}
		
		if(loginData.senha == "" || loginData.senha == undefined){
			bolErros = true;
			strMensagem += "<b>Senha</b> é obrigatória!  <br />";
		}
		
		if(loginData.confirmacao_senha == "" || loginData.confirmacao_senha == undefined){
			bolErros = true;
			strMensagem += "<b>Confirmação da Senha</b> é obrigatória!  <br />";
		}
		
		if(loginData.senha != loginData.confirmacao_senha){
			bolErros = true;
			strMensagem += "A <b>Senha</b> não corresponde a <b>Confirmação da Senha</b>!  <br />";
		}
	}else if(bolCadastro == undefined || bolCadastro == false){
		// Caso seja editar paciente valido o perfil
		if(loginData.perfil_id == "" || loginData.perfil_id == undefined){
			bolErros = true;
			strMensagem += " <b>Perfil</b> é obrigatório!  <br />";
		}
	}
	
	if(loginData.email == "" || loginData.email == undefined){
		bolErros = true;
		strMensagem += " <b>E-mail</b> é obrigatório!  <br />";
	}
	
	if(loginData.nome == "" || loginData.nome == undefined) {
		bolErros = true;
		strMensagem += " <b>Nome</b> é obrigatório!  <br />";
	}
	
	if(!Util.validaData(loginData.data_nascimento)) {
		bolErros = true;
		strMensagem += " <b>Data nascimento</b> inválida!  <br />";
	}
	
	if(loginData.sexo == "" || loginData.sexo == undefined){
		bolErros = true;
		strMensagem += " <b>Sexo</b> é obrigatório!  <br />";
	}
	
	if(loginData.endereco == "" || loginData.endereco == undefined){
		bolErros = true;
		strMensagem += " <b>Endereço</b> é obrigatório!  <br />";
	}
	
	if(loginData.cidade == "" || loginData.cidade == undefined){
		bolErros = true;
		strMensagem += " <b>Cidade</b> é obrigatória!  <br />";
	}
	
	if(loginData.uf == "" || loginData.uf == undefined){
		bolErros = true;
		strMensagem += " <b>Estado</b> é obrigatório!  <br />";
	}
	
	if(loginData.contato == "" || loginData.contato == undefined){
		bolErros = true;
		strMensagem += " É necessário informar ao menos um <b>Nº de Contato</b>!  <br />";
	}
	
	return {strMensagem : strMensagem, bolErros : bolErros};
}

/**
 * Método que irá validar o cadastro / edição do usuário médico
 */
Util.validarCadastroMedico = function (loginData){
	
	bolErros = false;
	strMensagem = "";
	
	if(!Util.validaCPF(loginData.cpf)) {
		bolErros = true;
		strMensagem += "<b>CPF</b> inválido! <br />";
	}
	
	if(loginData.perfil_id == "" || loginData.perfil_id == undefined){
		bolErros = true;
		strMensagem += "<b>Perfil</b> é obrigatório!  <br />";
	}
	
	/**
	 * Caso seja cadastro valido dados de acesso
	 */
	if(loginData.id == "" && loginData.id == undefined){
		if(loginData.senha == "" || loginData.senha == undefined){
			bolErros = true;
			strMensagem += "<b>Senha</b> é obrigatória!  <br />";
		}
		
		if(loginData.confirmacao_senha == "" || loginData.confirmacao_senha == undefined){
			bolErros = true;
			strMensagem += "<b>Confirmação da Senha</b> é obrigatória!  <br />";
		}
		
		if(loginData.senha != loginData.confirmacao_senha){
			bolErros = true;
			strMensagem += "A <b>Senha</b> não corresponde a <b>Confirmação da Senha</b>!  <br />";
		}
	}
	
	if(loginData.email == "" || loginData.email == undefined){
		bolErros = true;
		strMensagem += "<b>E-mail</b> é obrigatório!  <br />";
	}
	
	if(loginData.nome == "" || loginData.nome == undefined) {
		bolErros = true;
		strMensagem += "<b>Nome</b> é obrigatório!  <br />";
	}
	
	if(!Util.validaData(loginData.data_nascimento)) {
		bolErros = true;
		strMensagem += "<b>Data de nascimento</b> inválida!  <br />";
	}
	
	if(loginData.sexo == "" || loginData.sexo == undefined){
		bolErros = true;
		strMensagem += "<b>Sexo</b> é obrigatório!  <br />";
	}
	
	return {strMensagem : strMensagem, bolErros : bolErros};
}

Util.validarCamposExames = function(exameData){
	 bolErros = false;	
	 strMensagem = "";
	 
	 if(exameData.area_id == undefined || exameData.area_id == ""){
		 strMensagem += "Área é obrigatória <br />";
		 bolErros = true;	
	 }
	 
	 if(exameData.tipo_exame_id == undefined || exameData.tipo_exame_id == ""){
		 strMensagem += "Tipo de Exame é obrigatório <br />";
		 bolErros = true;	
	 }
	 
	 if(exameData.data_exame == undefined || exameData.data_exame == ""){
		 strMensagem += "Data da Coleta é obrigatória <br />";
		 bolErros = true;	
	 }
	 
	 if(exameData.data_previsao == undefined || exameData.data_previsao == ""){
		 strMensagem += "Data da Previsão é obrigatória <br />";
		 bolErros = true;	
	 }
	 return {strMensagem : strMensagem, bolErros : bolErros};
}

Util.validarCamposAgendamento = function(exameData){
	 bolErros = false;	
	 strMensagem = "";
	 
	 if(exameData.area_id == undefined || exameData.area_id == ""){
		 strMensagem += "Área é obrigatória <br />";
		 bolErros = true;	
	 }
	 
	 
	 if(exameData.data_solicitada == undefined || exameData.data_solicitada == ""){
		 strMensagem += "Data é obrigatória <br />";
		 bolErros = true;	
	 }
	 
	 if(exameData.descricao == undefined || exameData.descricao == ""){
		 strMensagem += "Motivo é obrigatório <br />";
		 bolErros = true;	
	 }
	 return {strMensagem : strMensagem, bolErros : bolErros};
}

Util.validarNotificacao = function(notificacaoData){
	 bolErros = false;	
	 strMensagem = "";
	 
	 if(notificacaoData.titulo == undefined || notificacaoData.titulo == ""){
		 strMensagem += "Título é obrigatório <br />";
		 bolErros = true;	
	 }
	 
	 if(notificacaoData.corpo == undefined || notificacaoData.corpo == ""){
		 strMensagem += "Corpo é obrigatório <br />";
		 bolErros = true;	
	 }
	 
	 if(!bolErros && notificacaoData.corpo.legth > 500) {
		 strMensagem += "Corpo com mais de 500 caracteres <br />";
		 bolErros = true;
     }
	 
	 
	 return {strMensagem : strMensagem, bolErros : bolErros};
}