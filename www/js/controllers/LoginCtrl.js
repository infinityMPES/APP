app.controller('LoginCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	
	 /*** MÉTODO DE FAZER LOGIN ****/
	 $scope.logar = function(){
		 // Disparando ação de load
		 $scope.carregando();
		 console.log($scope.loginData);
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
			objOnesignal = $scope.getOneSignal();
			// 
		 	$http({
				method: "POST",
			    timeout:$scope.timeout,
			    data: "strLogin=" + (($scope.loginData.strCpf != undefined) ? $scope.loginData.strCpf : "") 
			    + "&strSenha=" + (($scope.loginData.strSenha != undefined) ? $scope.loginData.strSenha : "")
			    + "&onesignal="+objOnesignal.userId,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_USUARIO_LOGIN,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				// Disparando ação de load
				$scope.carregado();
				 
				if(response.data.bolRetorno == false){
					var alertPopup = $ionicPopup.alert({
						title: 'Usuário Não Encontrado',
						template: 'Seu <b>Usuário ou Senha</b> estão errados! <br /> Ou o <b>Seu Cadastro</b> ainda não foi aprovado!'
					});
					alertPopup.then(function(res) {
					});
				}else if(response.data.result != null && response.data.result != undefined){
					// Setando o login
					$scope.setLogin(response.data.result, true);
					// Redirecionando e informando
					$scope.redirecionamentoLogin(true);
				}
				 
			}, function(response) {
				console.log(response);
				// Disparando ação de load
				$scope.carregado();
				// Mensagem de erro
				$scope.falhaCarregamento(response);
			});
		 }
	 }
	 /*** FIM MÉTODO LOGIN ***/
	 
	 /*** MÉTODO SOLICITAR SENHA ***/
	 $scope.solicitarSenha = function(){
		 // Disparando ação de load
		 $scope.carregando();
		 
		 $scope.erros=false;
		// Validando campos obrigatórios
		 if(  
				$scope.loginData.email == '' || $scope.loginData.email == null){
			 	
			 	// Disparando ação de load
				$scope.carregado();
				
			 	var strMensagem = "";
			 	strMensagem += ($scope.loginData.email == '' || $scope.loginData.email == null) ? "<b>E-mail</b> é obrigatório" : "";
			 	
				var alertPopup = $ionicPopup.alert({
					title: 'Campo obrigatório!',
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
			    data: "strEmail=" + (($scope.loginData.email != undefined) ? $scope.loginData.email : ""),
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_USUARIO_ENVIAR_SENHA,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				// Disparando ação de load
				$scope.carregado();
				if(response.data.bolRetorno == false){
					var alertPopup = $ionicPopup.alert({
						title: 'Usuário Não Encontrado',
						template: 'E-mail não foi encontrado na base!'
					});
					alertPopup.then(function(res) {
					});
				}else if(response.data.result != null && response.data.result != undefined){
					$scope.loginData = {};
					var alertPopup = $ionicPopup.alert({
						title: 'Sucesso',
						template: 'Aguarde, você sera redirecionado!'
					});
					alertPopup.then(function(res) {
					});
					// Redirecionando para o inicio
					setTimeout(function(){
						// Redirecionado para o inicio
						$scope.goTo("app.login");
						alertPopup.close();
					}, 1500);
				}
			}, function(response) {
				console.log(response);
				// Disparando ação de load
				$scope.carregado();
				// Mensagem de erro
				$scope.falhaCarregamento(response);
			});
		 }
	 }
	 /*** FIM MÉTODO SOLICITAR SENHA ***/
	 $scope.configurarTopo = function(){
		 setTimeout(function(){
			 $scope.configurarConfirmacao();
		 }, 500);
	 }
});