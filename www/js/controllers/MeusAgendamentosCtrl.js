app.controller('MeusAgendamentosCtrl', function ($scope, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
	 $scope.agendamentoData = {};
	 // Disparando ação de load
	 $scope.carregando();
	 // Lista de exames
	 $scope.listaAgendamento = [];
	 $scope.agendamento_id = 0;
	 
	 /** Método que irá recuperar os exames da base **/
	 $scope.carregarAgendamentos = function(){
		// Recuperando os dados do usuário
		 $http({
				method: "GET",
			    timeout:$scope.timeout,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_AGENDAMENTO_LISTAR_USUARIO + "?intIdUsuario="+(($scope.loginData.id == undefined) ? 112 : $scope.loginData.id),
			    headers: Util.headers($scope.token)
		 }).then(function(response) {
			 	// Disparando ação de load
				$scope.carregado();
				 if(response.data.bolRetorno == true){
					 // Caso encontre o usuário
					 $scope.listaAgendamento = response.data.result;
				 }else{
					var alertPopup = $ionicPopup.alert({
						title: "Erro",
						template: "Nenhum Agendamento Cadastrado!"
					});
					alertPopup.then(function(res) { });
					}
		 }, function(response) {
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		 });
	 }
	 // Recuperando os exames
	 $scope.carregarAgendamentos();
});

