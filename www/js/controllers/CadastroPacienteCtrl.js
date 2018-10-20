app.controller('CadastroPacienteCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 
	 /*** MÉTODO DE FAZER CADASTRAR ****/
	 $scope.cadastrar = function(){
		 // Disparando ação de load
		 $scope.carregando();
		 $scope.erros=false;
		 // Validando os campos 
		 var errosValidacao = validarCadastro($scope.loginData);
		// Caso haja algum erro
		 if(errosValidacao.erros){
		 	// Disparando ação de load
			$scope.carregado();
			// Abrindo dialog com erros
			var alertPopup = $ionicPopup.alert({
				title: 'Campo obrigatórios',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			$scope.erros=true;
			salvo = false;
		 }else{
			// 
		 	$http({
				method: "POST",
			    timeout:$scope.timeout,
			    data: "strLogin=" + (($scope.loginData.strCpf != undefined) ? $scope.loginData.strCpf : "") + "&strSenha=" + (($scope.loginData.strSenha != undefined) ? $scope.loginData.strSenha : ""),
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_USUARIO_LOGIN,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				// Disparando ação de load
				$scope.carregado();
				 
				if(response.data.bolRetorno == false){
					var alertPopup = $ionicPopup.alert({
						title: 'Usuário Não Encontrado',
						template: 'Usuário ou senha estão errados!'
					});
					alertPopup.then(function(res) {
					});
				}else if(response.data.result != null && response.data.result != undefined){
					$scope.setLogin(response.data.result);
					var alertPopup = $ionicPopup.alert({
						title: 'Sucesso',
						template: 'Aguarde, você sera redirecionado!'
					});
					alertPopup.then(function(res) {
					});
					// Redirecionando para o inicio
					setTimeout(function(){
						// Redirecionado para o inicio
						$scope.goTo("app.inicio");
						alertPopup.close();
					}, 1500);
				}
				 
			}, function(response) {
				console.log(response);
				// Disparando ação de load
				$scope.carregado();
			});
		 }
	 }
	 /*** FIM MÉTODO CADASTRAR ***/
	 
	 $ionicModal.fromTemplateUrl('templates/cadastrar-paciente-confirmacao.html', {
		 scope: $scope
	 }).then(function(modal) {
		 $scope.modal = modal;
	 });
	 
	 $scope.closeConfirmar = function() {
		 $scope.modal.hide();
	 };
	  
	 $scope.confirmarCadastro = function() {
		 $scope.modal.show();
	 };
	 
	 /*** MÉTODO DE FAZER VALIDAÇÕES DO CADASTRO ****/
	 $scope.validarCadastro = function(){
		 console.log("oi");
		 var bolErros = false;
		 if(!bolErros){
			 $scope.confirmarCadastro();
		 }
	 }
	 /*** FIM DA VALIDAÇÃO ***/
});

/**
 * Método que irá validar o cadastro do paciente
 */
function validarCadastro(loginData){
	
	bolErros = false;
	strMensagem = "";
	
	if(Util.validaCPF(loginData.cpf)) {
		bolErros = true;
		strMensagem += "CPF inválido! <br />";
	}
	
	if(loginData.nome == "" || loginData.nome == undefined) {
		bolErros = true;
		strMensagem += "Nome é obrigatório!  <br />";
	}
	
	if(Util.validaData(loginData.data_nascimento)) {
		bolErros = true;
		strMensagem += "Data inválida!  <br />";
	}
	
	if(loginData.sexo == "" || loginData.sexo == undefined){
		bolErros = true;
		strMensagem += "Sexo é obrigatório!  <br />";
	}
	
	if(loginData.endereco == "" || loginData.endereco == undefined){
		bolErros = true;
		strMensagem += "Endereço é obrigatório!  <br />";
	}
	
	if(loginData.cidade == "" || loginData.cidade == undefined){
		bolErros = true;
		strMensagem += "Cidade é obrigatória!  <br />";
	}
	
	if(loginData.estado == "" || loginData.estado == undefined){
		bolErros = true;
		strMensagem += "Estado é obrigatório!  <br />";
	}
	
	if(loginData.contato == "" || loginData.contato == undefined){
		bolErros = true;
		strMensagem += "É necessário informar ao menos um contato!  <br />";
	}
	
	if(loginData.contato == "" || loginData.contato == undefined){
		bolErros = true;
		strMensagem += "É necessário informar ao menos um contato!  <br />";
	}
	
	if(loginData.email == "" || loginData.email == undefined){
		bolErros = true;
		strMensagem += "E-mail é obrigatório!  <br />";
	}
	
}