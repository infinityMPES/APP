app.controller('CadastroUsuariosCtrl', function ($scope, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 
	 $scope.usuarioEdit = {};
	 
	 // Lista de perfis do sistema
	 $scope.listaPerfis = [];
	 // Buscando os perfis cadastrados na base
	 $http({
		method: "GET",
	    timeout:$scope.timeout,
	    url: $scope.strUrlServico + Constantes.APP_SERVICE_LISTAR_PERFIS,
	    headers: Util.headers($scope.token)
	 }).then(function(response) {
		 if(response.data.bolRetorno == true){
			 $scope.listaPerfis = response.data.result;
		 }
	 }, function(response) {
		// Mensagem de erro
		$scope.falhaCarregamento(response);
	 });
	 
	 $scope.listaCancer = [];
	 $http({
		method: "GET",
	    timeout:$scope.timeout,
	    url: $scope.strUrlServico + Constantes.APP_SERVICE_LISTAR_CANCER,
	    headers: Util.headers($scope.token)
	 }).then(function(response) {
		 if(response.data.bolRetorno == true){
			 $scope.listaCancer = response.data.result;
		 }
	 }, function(response) {
		// Mensagem de erro
		$scope.falhaCarregamento(response);
	 });
	 
	 /*** MÉTODO DE SALVAR OS DADOS ****/
	 $scope.salvar = function(){
		// Disparando ação de load
		$scope.carregando();
		// Postando para URL
	 	$http({
			method: "POST",
		    timeout:$scope.timeout,
		    data: 'dadosUsuario=' + JSON.stringify($scope.usuarioEdit),
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_CADASTRAR_USUARIO,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			// Disparando ação de load
			$scope.carregado();
			bolRetorno = false;
			mensagem   = "";
			if(response.data.bolRetorno == true){
				bolRetorno = true;
				mensagem = "Cadastro Realizada Com Sucesso!";
				$scope.usuarioEdit = {};
			}else{
				mensagem = response.data.strMensagem;
			}
			
			var alertPopup = $ionicPopup.alert({
				title: (bolRetorno) ? 'Sucesso' : "Erro",
				template: mensagem
			});
			alertPopup.then(function(res) { });
		}, function(response) {
			console.log(response);
			// Disparando ação de load
			$scope.carregado();
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		});
	 }
	 /*** FIM MÉTODO SALVAR OS DADOS ***/
	 /** MÉTODO PARA VALIDAR AS INFORMAÇOES **/
	 $scope.validar = function(){
		 
		 // Criando o campo cpf
		 $scope.usuarioEdit.cpf = $scope.usuarioEdit.login;
		 
		 // Validando os campos 
		 var errosValidacao =  ($scope.usuarioEdit.perfil_id == 1) 
		 					   ? Util.validarCadastroPaciente($scope.usuarioEdit, false)
	 						   : Util.validarCadastroMedico($scope.usuarioEdit);
		 
	   	 // Caso haja algum erro
		 if(errosValidacao.bolErros){
		 	// Disparando ação de load
			$scope.carregado();
			// Abrindo dialog com erros
			var alertPopup = $ionicPopup.alert({
				title: 'Campo(s) obrigatório(s)',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			return false;
		 }
		 $scope.usuarioEdit.pep = $scope.usuarioEdit.numero_pep;
		 // Validando cpf e email
		 $scope.salvar();
		 console.log($scope.usuarioEdit)
		 console.log(errosValidacao)
	 }
	 /** FIM MÉTODO PARA VALIDAR AS INFORMAÇOES **/
	 
	 $scope.listaCidade = [];
	 $scope.estadoEscolhido = function() {
		$scope.carregando();
		// Postando para URL
		$http({
			method: "GET",
		    timeout:$scope.timeout,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_LISTAR_CIDADE+"?UF="+$scope.usuarioEdit.uf,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			// Disparando ação de load
			$scope.carregado();
			 // Validando caso haja um CPF ou Email cadastrado
			if(response.data.bolRetorno == true){
				$scope.listaCidade =  response.data.result;
			}
				
		}, function(response) { // Disparando ação de load
			$scope.carregado();
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		});
	};
});

