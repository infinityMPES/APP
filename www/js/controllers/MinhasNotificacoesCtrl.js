app.controller('MinhasNotificacoesCtrl', function ($scope, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $state, $ionicScrollDelegate) {
	 // Disparando ação de load
	 $scope.carregando();
	 // Lista de exames
	 $scope.listaNotificacoes = [];
	 
	 $scope.scrollMainToTop = function() {
		 console.log("aqui");
		    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
	 };
	  
	 $scope.doRefresh = function() {
		  $scope.carregarNotificacoes();
     };
	 
	 /** Método que irá recuperar os exames da base **/
	 $scope.carregarNotificacoes = function(){
		// Recuperando os dados do usuário
		 $http({
				method: "GET",
			    timeout:$scope.timeout,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_NOTIFICACOES_LISTAR_USUARIO + "?intIdUsuario="+(($scope.loginData.id == undefined) ? 1 : $scope.loginData.id),
			    headers: Util.headers($scope.token)
		 }).then(function(response) {
			 $scope.$broadcast('scroll.refreshComplete');
			 	// Disparando ação de load
				$scope.carregado();
				 if(response.data.bolRetorno == true){
					 // Caso encontre o usuário
					 $scope.listaNotificacoes = response.data.result;
					 $scope.setarLidas();
				 }else{
					var alertPopup = $ionicPopup.alert({
						title: "Erro",
						template: "Nenhuma notificação Cadastrado!"
					});
					alertPopup.then(function(res) { });
				}
		 }, function(response) {
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		 });
	 }
	 // Recuperando os notificações
	 $scope.carregarNotificacoes();
	 
	 $scope.clickLink = function(notificacao){
		if(notificacao.total > 0)
			$state.go("app.thread-notificacao", { notificacaoId : notificacao.id});
     };
	 
	 /** Método que irá recuperar os exames da base **/
	 $scope.setarLidas = function(){
		// Recuperando os dados do usuário
		 $http({
				method: "POST",
			    timeout:$scope.timeout,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_NOTIFICACOES_SETAR_LIDA + "?intIdUsuario="+(($scope.loginData.id == undefined) ? 1 : $scope.loginData.id),
			    headers: Util.headers($scope.token)
		 }).then(function(response) {
		 }, function(response) { });
	 }
});