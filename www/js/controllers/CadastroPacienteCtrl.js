app.controller('CadastroPacienteCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 
	 $scope.listaCancer = [];
	 
	 
	 $http({
			method: "GET",
		    timeout:$scope.timeout,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_LISTAR_CANCER,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			 if(response.data.bolRetorno == true){
				 $scope.listaCancer = response.data.result;
			 }
		}, function(response) {});
	 
	 /*** MÉTODO DE FAZER CADASTRAR ****/
	 $scope.cadastrar = function(){
		 // Disparando ação de load
		 $scope.carregando();
		 // Validando os campos 
		 var errosValidacao = validarCadastroPaciente($scope.loginData);
		 // Caso haja algum erro
		 if(errosValidacao.bolErros){
		 	// Disparando ação de load
			$scope.carregado();
			// Abrindo dialog com erros
			var alertPopup = $ionicPopup.alert({
				title: 'Campo obrigatórios',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			return false;
		 }else{
			 objOnesignal = $scope.getOneSignal();
			 $scope.loginData.onesignal = objOnesignal.userId; 
			// Postando para URL
		 	$http({
				method: "POST",
			    timeout:$scope.timeout,
			    data: 'dadosPaciente=' + JSON.stringify($scope.loginData) + "&onesignal="+objOnesignal.userId,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_CADASTRAR_PACIENTE,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				// Disparando ação de load
				$scope.carregado();
				 
			}, function(response) {
				console.log(response);
				// Disparando ação de load
				$scope.carregado();
			});
		 }
	 }
	 /*** FIM MÉTODO CADASTRAR ***/
	 /** **/
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
	 /**  **/
	 /*** MÉTODO DE FAZER VALIDAÇÕES DO CADASTRO ****/
	 $scope.validarCadastro = function(){
		 // Validando os campos 
		 var errosValidacao = validarCadastroPaciente($scope.loginData);
		 // Caso haja algum erro
		 if(errosValidacao.bolErros){
		 	// Disparando ação de load
			$scope.carregado();
			// Abrindo dialog com erros
			var alertPopup = $ionicPopup.alert({
				title: 'Campo obrigatórios',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			return false;
		 }
		 // Validando cpf e email
		 $scope.validarEmailCPF();
	 }
	 // Método que irá validar o email e o cpf
	 $scope.validarEmailCPF = function(){
		// Disparando ação de load
		$scope.carregando();
		// Postando para URL
		$http({
			method: "POST",
		    timeout:$scope.timeout,
		    data: "strEmail=" + (($scope.loginData.email != undefined || $scope.loginData.email != "") ? $scope.loginData.email : "") +
		    	  "&strCPF=" + (($scope.loginData.cpf != undefined || $scope.loginData.cpf != "") ? $scope.loginData.cpf : ""),
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_VALIDAR_CADASTRO,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			// Disparando ação de load
			$scope.carregado();
			 // Validando caso haja um CPF ou Email cadastrado
			if(response.data.bolRetorno == false){
				var alertPopup = $ionicPopup.alert({
					title: 'Validação',
					template: response.data.strMensagem
				});
				alertPopup.then(function(res) {
				});
			}else // Abrindo a tela de confirmação
				$scope.abrirConfirmacao();
		}, function(response) {
			// Disparando ação de load
			$scope.carregado();
		});
	 }
	 // Abrindo a tela de confirmarção de cadastro
	 $scope.abrirConfirmacao = function(){
		// Caso não tenha nenhum problema
		 $scope.confirmarCadastro();
	 }
	 /*** FIM DA VALIDAÇÃO ***/
});

/**
 * Método que irá validar o cadastro do paciente
 */
function validarCadastroPaciente(loginData){
	
	bolErros = false;
	strMensagem = "";
	
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
		strMensagem += "<b>Data nascimento</b> inválida!  <br />";
	}
	
	if(loginData.sexo == "" || loginData.sexo == undefined){
		bolErros = true;
		strMensagem += "<b>Sexo</b> é obrigatório!  <br />";
	}
	
	if(loginData.endereco == "" || loginData.endereco == undefined){
		bolErros = true;
		strMensagem += "<b>Endereço</b> é obrigatório!  <br />";
	}
	
	if(loginData.cidade == "" || loginData.cidade == undefined){
		bolErros = true;
		strMensagem += "<b>Cidade</b> é obrigatória!  <br />";
	}
	
	if(loginData.uf == "" || loginData.uf == undefined){
		bolErros = true;
		strMensagem += "<b>Estado</b> é obrigatório!  <br />";
	}
	
	if(loginData.contato == "" || loginData.contato == undefined){
		bolErros = true;
		strMensagem += "É necessário informar ao menos um <b>Nº de Contato</b>!  <br />";
	}
	
	return {strMensagem : strMensagem, bolErros : bolErros};
}