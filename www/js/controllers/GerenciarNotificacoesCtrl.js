app.controller('GerenciarNotificacoesCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 
	 $scope.mostrarLista = false; // Flag para mostrar a lista
	 $scope.notificacaoData = {}; // Objeto filtro
	 
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
	 
	 /**
	  * Método que irá realizar o filtro dos usuários
	  */
	 $scope.pesquisaNotificacao = function(){
		 // ´Mostrando o carregando
		 $scope.carregando();
		 $scope.mostrarLista = false;
		 // Realizando os filtros
		 $http({
			 method: "POST",
			    timeout:$scope.timeout,
			    data: 'dadosNotificacao=' + JSON.stringify($scope.notificacaoData),
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_FILTRAR_EXAMES,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				 $scope.carregado();
				 if(response.data.bolRetorno == true){
					 $scope.notificacaoData.total = response.data.result.total;
				 }
			}, function(response) {
				// Mensagem de erro
				$scope.falhaCarregamento(response);
		  });
		 
	 }
	 
	 $scope.enviarNotificacao = function(){
		 // ´Mostrando o carregando
		 $scope.carregando();
		 $scope.mostrarLista = false;
		 // Realizando os filtros
		 $http({
			 method: "POST",
			    timeout:$scope.timeout,
			    data: 'dadosNotificacao=' + JSON.stringify($scope.notificacaoData),
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_NOTIFICACOES_CADASTRAR,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				 $scope.carregado();
			}, function(response) {
				// Mensagem de erro
				$scope.falhaCarregamento(response);
		  });
		 
	 }
	 
	 /******* MODAL DE DETALHE ********/
});

