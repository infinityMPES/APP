app.controller('GerenciarNotificacoesCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usu�rio est� logado
	 $scope.usuarioLogado(true);
	 
	 $scope.mostrarLista = false; // Flag para mostrar a lista
	 $scope.notificacaoData = {}; // Objeto filtro
	 
	 $scope.listaIdade = [];
	 
	 for(var inicio = 1; inicio<=100; inicio++){
		 $scope.listaIdade.push(inicio);
	 }
	 
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
	  * M�todo que ir� realizar o filtro dos usu�rios
	  */
	 $scope.pesquisaNotificacao = function(){
		 // �Mostrando o carregando
		 $scope.carregando();
		 $scope.mostrarLista = false;
		 // Realizando os filtros
		 $http({
			 method: "POST",
			    timeout:$scope.timeout,
			    data: 'dadosNotificacao=' + JSON.stringify($scope.notificacaoData),
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_NOTIFICACOES_BUSCAR_TOTAL,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				 $scope.carregado();
				 if(response.data.bolRetorno == true){
					 $scope.notificacaoData.total = response.data.result[0].total;
					 console.log($scope.notificacaoData.total)
					 $scope.confirmarCadastro();
				 }
			}, function(response) {
				// Mensagem de erro
				$scope.falhaCarregamento(response);
		  });
		 
	 }
	 
	 /** MODAL DE CONFIMAÇÃO **/
	 $ionicModal.fromTemplateUrl('templates/cadastrar-notificacao.html', {
		 scope: $scope
	 }).then(function(modal) {
		 $scope.modal = modal;
	 });
	 
	 $scope.closeConfirmar = function() {
		 $scope.modal.hide();
		 $(".disable-user-behavior").show();
		 $(".has-header").css("top", "44px");
		 $(".confirmarCadastro").attr("style", "background: #ffffff !important");
	 };
	  
	 $scope.confirmarCadastro = function() {
		 $scope.modal.show();
		 $(".confirmarCadastro").attr("style", "background: #62aaa2 !important");
		 $(".disable-user-behavior").hide();
		 $(".has-header").css("top", "0px");
	 };
	 
	 $scope.enviarNotificacao = function(){
		 // Mostrando o carregando
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

