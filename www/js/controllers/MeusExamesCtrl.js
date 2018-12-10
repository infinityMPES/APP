app.controller('MeusExamesCtrl', function ($scope, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $filter) {
	 // Verificando se o usuário está logado
	 $scope.exameData = {};
	 // Disparando ação de load
	 $scope.carregando();
	 // Lista de exames
	 $scope.listaExames = [];
	 $scope.exame_id = 0;
	 
	 /**
	  * Método que irá formatar a data
	  */
	 $scope.formatDate = function() {
		 console.log("oi");
		 $scope.exameData.data_recebimento = $filter('date')($scope.exameData.data_recebimento_form, "dd/MM/yyyy");
	 }
	 
	 /** Método que irá recuperar os exames da base **/
	 $scope.carregarExames = function(){
		// Recuperando os dados do usuário
		 $http({
				method: "GET",
			    timeout:$scope.timeout,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_LISTAR_EXAMES_USUARIO + "?intIdUsuario="+$scope.loginData.id,
			    headers: Util.headers($scope.token)
		 }).then(function(response) {
			 	// Disparando ação de load
				$scope.carregado();
				 if(response.data.bolRetorno == true){
					 // Caso encontre o usuário
					 $scope.listaExames = response.data.result;
				 }else{
					var alertPopup = $ionicPopup.alert({
						title: "Erro",
						template: "Nenhum Exame Cadastrado!"
					});
					alertPopup.then(function(res) { });
					}
		 }, function(response) {
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		 });
	 }
	 // Recuperando os exames
	 $scope.carregarExames();
	 
	 /*** MÉTODO DE SALVAR OS DADOS ****/
	 $scope.salvar = function(){
		// Disparando ação de load
		$scope.carregando();
		// Postando para URL
	 	$http({
			method: "POST",
		    timeout:$scope.timeout,
		    data: 'dadosExame=' + JSON.stringify($scope.exameData) + "&intIdUsuario=" + $scope.loginData.id + "&intIdExame=" + $scope.exame_id,
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
	 /** CONFIRMAR RECEBIMENTO **/
	 /** **/
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
		 $scope.exame_id = id;
		 $scope.confirmarCadastro();
	 }
});

