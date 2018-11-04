app.controller('DetalheExamesCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 // Detalhamento do exame
	 $scope.objExame = {};
	 // ´Mostrando o carregando
	 $scope.carregando();
	 // Realizando os filtros
	 $http({
		 	method: "GET",
		    timeout:$scope.timeout,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_RECUPERAR_EXAME_ID + "?intIdExame="+$stateParams.exameId,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			 $scope.carregado();
			 if(response.data.bolRetorno == true){
				 $scope.objExame = response.data.result;
			 }else{
				 var alertPopup = $ionicPopup.alert({
					title: "Erro",
					template: "Exame Não Encontrado!"
				 });
				 alertPopup.then(function(res) { });
			 }
		}, function(response) {});
	 /******* MODAL DE DETALHE ********/
});