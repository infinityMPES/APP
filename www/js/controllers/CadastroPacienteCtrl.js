app.controller('CadastroPacienteCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	
	 /*** MÉTODO DE FAZER CADASTRAR ****/
	 $scope.cadastrar = function(){
		 // Disparando ação de load
		 $scope.carregando();
		 
		 $scope.erros=false;
		// Validando campos obrigatórios
		 if(  
				$scope.loginData.strCpf == '' || $scope.loginData.strCpf == null || 			
				$scope.loginData.strSenha == '' || $scope.loginData.strSenha == null){
			 	
			 	// Disparando ação de load
				$scope.carregado();
				
			 	var strMensagem = "";
			 	strMensagem += ($scope.loginData.strCpf == '' || $scope.loginData.strCpf == null) ? "<b>Login</b> é obrigatório <br /> " : "";
			 	strMensagem += ($scope.loginData.strSenha == '' || $scope.loginData.strSenha == null) ? "<b>Senha</b> é obrigatória <br /> " : "";
			 	
				var alertPopup = $ionicPopup.alert({
					title: 'Campo obrigatórios',
					template: strMensagem
				});
				alertPopup.then(function(res) {
				});
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
	 
});