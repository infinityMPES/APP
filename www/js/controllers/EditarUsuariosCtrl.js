app.controller('EditarUsuariosCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
//	 $scope.usuarioLogado(true);
	 
	 $scope.usuarioEdit = {};
	 // Disparando ação de load
	 $scope.carregando();
	 // ´Mostrando o carregando
	 $scope.carregando();
	 // Verificando se o usuário logado é o mesmo que está editando
	 $scope.bolEdit = false; 
	 $scope.listaCidade = [];
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
		})
		.then(function(response) {
			 if(response.data.bolRetorno == true){
				 $scope.listaCancer = response.data.result;
			 }
		}, function(response) {
		// Mensagem de erro
		$scope.falhaCarregamento(response);
	 });

	 // Carregando o usuário
	 setTimeout(function(){
		 $scope.carregarUsuario();
	 }, 2500);
	 
	 // Cerregando o usuário
	 $scope.carregarUsuario = function(cidades){
		 // Recuperando os dados do usuário
		 $http({
				method: "GET",
			    timeout:$scope.timeout,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_RECUPERAR_USUARIO_POR_ID + "?intIdUsuario="+$stateParams.usuarioId,
			    headers: Util.headers($scope.token)
		 }).then(function(response) {
			 	// Disparando ação de load
				$scope.carregado();
				 if(response.data.bolRetorno == true){
					 response.data.result.senha = "";
					 if(cidades == undefined && response.data.result.perfil_id ==1){
						 // Disparando ação de load
						 $scope.carregando();
						 $scope.estadoEscolhido(response.data.result.uf);
					 }else{
						 // Caso encontre o usuário
						 $scope.usuarioEdit = response.data.result;
					 }
					 // Verificando se o usuário que está sendo editado é o mesmo que está logado
					 $scope.bolEdit = ($scope.usuarioEdit.id == $scope.loginData.id);	
					 $scope.notificacaoData.pep = $scope.usuarioEdit.numero_pep;
					 $scope.notificacaoData.total = 1;
					 
				 }else{
					var alertPopup = $ionicPopup.alert({
						title: "Erro",
						template: "Usuario Não Encontrado"
					});
					alertPopup.then(function(res) { });
					}
		 }, function(response) {});
	 }

	 /*** MÉTODO DE SALVAR OS DADOS ****/
	 $scope.salvar = function(){
		// Disparando ação de load
		$scope.carregando();
		// Postando para URL
	 	$http({
			method: "POST",
		    timeout:$scope.timeout,
		    data: 'dadosUsuario=' + JSON.stringify($scope.usuarioEdit),
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_EDITAR_USUARIO +"?validarSenha="+$scope.bolEdit,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			// Disparando ação de load
			$scope.carregado();
			bolRetorno = false;
			mensagem   = "";
			if(response.data.bolRetorno == true){
				bolRetorno = true;
				mensagem = "Edição Realizada Com Sucesso!";
			}else{
				mensagem = response.data.strMensagem;
			}
			
			var alertPopup = $ionicPopup.alert({
				title: (bolRetorno) ? 'Sucesso' : "Erro",
				template: mensagem
			});
			alertPopup.then(function(res) { });
		}, function(response) {
			// Disparando ação de load
			$scope.carregado();
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		});
	 }
	 /*** FIM MÉTODO SALVAR OS DADOS ***/
	 /** MÉTODO PARA VALIDAR AS INFORMAÇOES **/
	 $scope.validar = function(){
		 
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
				title: 'Campo obrigatórios',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			return false;
		 }
		 // Validando cpf e email
		 $scope.salvar();
		 console.log($scope.usuarioEdit)
		 console.log(errosValidacao)
	 }
	 /** FIM MÉTODO PARA VALIDAR AS INFORMAÇOES **/
	 $scope.estadoEscolhido = function(uf) {
		$scope.carregando();
		// Postando para URL
		$http({
			method: "GET",
		    timeout:$scope.timeout,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_LISTAR_CIDADE+"?UF="+((uf != undefined) ? uf : $scope.usuarioEdit.uf),
		    headers: Util.headers($scope.token)
		}).then(function(response) {
			// Disparando ação de load
			$scope.carregado();
			 // Validando caso haja um CPF ou Email cadastrado
			if(response.data.bolRetorno == true){
				$scope.listaCidade =  response.data.result;
				if(uf != undefined) $scope.carregarUsuario(true);
			}
				
		}, function(response) { // Disparando ação de load
			$scope.carregado();
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		});
	};
	
	
});

