app.controller('DetalheAgendamentoCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $filter) {
	 // Verificando se o usu�rio est� logado
	 $scope.usuarioLogado(true);
	 // Detalhamento do exame
	 $scope.objAgendamento = {};
	 $scope.agendamentoData = {};
	 
	 /**
	  * Método que irá formatar a data
	  */
	 $scope.formatDate = function() {
		 $scope.agendamentoData.data_confirmada = $filter('date')($scope.agendamentoData.data_confirmada_form, "dd/MM/yyyy");
	 }
	 
	 // Mostrando o carregando
	 $scope.carregando();
	 $scope.carregarDetalhe = function(){
		// Realizando os filtros
	 	$http({
		 	method: "GET",
		    timeout:$scope.timeout,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_AGENDAMENTO_DETALHE + "?intIdConsulta="+$stateParams.agendamentoId,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			 $scope.carregado();
			 if(response.data.bolRetorno == true){
				 $scope.objAgendamento = response.data.result;
			 }else{
				 var alertPopup = $ionicPopup.alert({
					title: "Erro",
					template: "Agendamento Não Encontrado!"
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
		 console.log($scope.objAgendamento.id)
		// Disparando ação de load
		$scope.carregando();
		// Postando para URL
	 	$http({
			method: "POST",
		    timeout:$scope.timeout,
		    data: 'dadosAgendamento=' + JSON.stringify($scope.agendamentoData) + "&intIdUsuario=" + $scope.loginData.id + "&intIdConsulta=" + $stateParams.agendamentoId,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_AGENDAMENTO_CONFIRMAR,
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
				$scope.carregarDetalhe();
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
	 $scope.selecionarAgendamento = function(){
		 if(confirm("Deseja ser responsável por esse agendamento?")){
			 console.log("oi");
			 // Mostrando o carregando
			 $scope.carregando();
			 $http({
					method: "POST",
				    timeout:$scope.timeout,
				    data: "intIdUsuario=" + $scope.loginData.id + "&intIdAgendamento="+ $scope.objAgendamento.id,
				    url: $scope.strUrlServico + Constantes.APP_SERVICE_AGENDAMENTO_RESPONSAVEL,
				    headers: Util.headers($scope.token)
				})
				.then(function(response) {
					// Disparando ação de load
					$scope.carregado();
					bolRetorno = false;
					mensagem   = "";
					if(response.data.bolRetorno == true){
						bolRetorno = true;
						mensagem = "Você é responsável por marcar essa consulta!";
					}else{
						mensagem = response.data.strMensagem;
					}
					var alertPopup = $ionicPopup.alert({
						title: (bolRetorno) ? 'Sucesso' : "Erro",
						template: mensagem
					});
					alertPopup.then(function(res) { });
					if(bolRetorno){
						$scope.carregarDetalhe();
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
	 /**
	  * Método que irá recusar o agendamento
	  */
	 $scope.recusarAgendamento = function(){
		 if(confirm("Deseja recusar esse agendamento?")){
			 console.log("oi");
			 // Mostrando o carregando
			 $scope.carregando();
			 $http({
					method: "POST",
				    timeout:$scope.timeout,
				    data: "intIdUsuario=" + $scope.loginData.id + "&intIdAgendamento="+ $scope.objAgendamento.id,
				    url: $scope.strUrlServico + Constantes.APP_SERVICE_AGENDAMENTO_RECUSAR,
				    headers: Util.headers($scope.token)
				})
				.then(function(response) {
					// Disparando ação de load
					$scope.carregado();
					bolRetorno = false;
					mensagem   = "";
					if(response.data.bolRetorno == true){
						bolRetorno = true;
						mensagem = "Agendamento recusado!";
					}else{
						mensagem = response.data.strMensagem;
					}
					var alertPopup = $ionicPopup.alert({
						title: (bolRetorno) ? 'Sucesso' : "Erro",
						template: mensagem
					});
					alertPopup.then(function(res) { });
					if(bolRetorno){
						$scope.carregarDetalhe();
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
	 
	 $ionicModal.fromTemplateUrl('templates/marcar-consulta.html', {
		 scope: $scope
	 }).then(function(modal) {
		 $scope.modal = modal;
	 });
	 
	 $scope.closeConfirmar = function() {
		 $scope.modal.hide();
		 $scope.removerConfirmacao();
	 };
	  
	 $scope.confirmarMarcarConculta = function() {
		 $scope.modal.show();
		 $scope.configurarConfirmacao();
	 };
	 
	 $scope.marcarAgendamento = function(id){
		 $scope.confirmarMarcarConculta();
	 }
});