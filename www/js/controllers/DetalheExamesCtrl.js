app.controller('DetalheExamesCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usu�rio est� logado
	 $scope.usuarioLogado(true);
	 // Detalhamento do exame
	 $scope.objExame = {};
	 $scope.exameData = {};
	 // �Mostrando o carregando
	 $scope.carregando();
	 $scope.carregarDetalhe = function(){
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
		}, function(response) {
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		});
	 }
	 $scope.carregarDetalhe();
	 /******* MODAL DE DETALHE ********/
	 /*** MÉTODO DE SALVAR OS DADOS ****/
	 $scope.salvar = function(){
		 console.log($scope.objExame.id)
		// Disparando ação de load
		$scope.carregando();
		// Postando para URL
	 	$http({
			method: "POST",
		    timeout:$scope.timeout,
		    data: 'dadosExame=' + JSON.stringify($scope.exameData) + "&intIdUsuario=" + $scope.loginData.id + "&intIdExame=" + $scope.objExame.id,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_CONFIRMAR_RECEBIMENTO,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			// Disparando ação de load
			$scope.carregado();
			bolRetorno = false;
			mensagem   = "";
			if(response.data.bolRetorno == true){
				bolRetorno = true;
				mensagem = "Confirmação Realizada Com Sucesso!";
				$scope.closeConfirmar();
				$scope.carregarDetalhe();
			}else{
				mensagem = response.data.strMensagem;
			}
			
			var alertPopup = $ionicPopup.alert({
				title: (bolRetorno) ? 'Sucesso' : "Erro",
				template: mensagem
			});
			alertPopup.then(function(res) { });
			if(bolRetorno){
				$scope.carregarExames();
				$scope.closeConfirmar();
			}
		}, function(response) {
			console.log(response);
			// Disparando ação de load
			$scope.carregado();
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		});
	 }
	 /*** FIM MÉTODO SALVAR OS DADOS ***/
	 $ionicModal.fromTemplateUrl('templates/recebimento-exame.html', {
		 scope: $scope
	 }).then(function(modal) {
		 $scope.modal = modal;
	 });
	 
	 $scope.closeConfirmar = function() {
		 $scope.modal.hide();
		 $scope.removerConfirmacao();
	 };
	  
	 $scope.confirmarCadastro = function() {
		 $scope.modal.show();
		 $scope.configurarConfirmacao();
	 };
	 
	 $scope.confirmarRecebimento = function(id){
		 $scope.confirmarCadastro();
	 }
});