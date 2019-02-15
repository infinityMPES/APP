app.controller('CadastroAgendamentoCtrl', function ($scope, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal,$filter) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 
	 $scope.agendamentoData = {};
	 
	 var dataAtual = new Date();
	 $scope.dataAtual 	= dataAtual.getFullYear() + "-" + (dataAtual.getMonth() + 1) + "-" + dataAtual.getDate();
	 dataLimite 		= new Date(dataAtual.getFullYear(), (dataAtual.getMonth() +2), dataAtual.getDate());
	 $scope.dataLimite  = dataLimite.getFullYear() + "-" + (dataLimite.getMonth() + 1) + "-" + dataLimite.getDate();
	 
	 /**
	  * Método que irá formatar a data
	  */
	 $scope.formatDate = function() {
	     $scope.agendamentoData.data_solicitada = $filter('date')($scope.agendamentoData.data_solicitada_form, "dd/MM/yyyy");
	 }
	 
	 // Lista de áreas 
	 $scope.listaAreas = [];
	 // Buscando os perfis cadastrados na base
	 $http({
		method: "GET",
	    timeout:$scope.timeout,
	    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_LISTAR_AREAS + "?todos=false&agendamento",
	    headers: Util.headers($scope.token)
	 }).then(function(response) {
		 console.log($scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_LISTAR_AREAS + "?todos=false&agendamento");
		 if(response.data.bolRetorno == true){
			 $scope.listaAreas = response.data.result;
		 }
	 }, function(response) {
		 	// Mensagem de erro
			$scope.falhaCarregamento(response);
	 });
	 
	 /** MODAL DE CONFIMAÇÃO **/
	 $ionicModal.fromTemplateUrl('templates/cadastrar-agendamento-confirmacao.html', {
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

	 /*** MÉTODO DE SALVAR OS DADOS ****/
	 $scope.salvar = function(){
		
		// Disparando ação de load
		$scope.carregando();
		$scope.agendamentoData.descricao = $scope.agendamentoData.descricao.replace(/[#,$,%,¨,&,*,+,-,']/gi, '');
		// Postando para URL
	 	$http({
			method: "POST",
		    timeout:$scope.timeout,
		    data: 'dadosAgendamento=' + JSON.stringify($scope.agendamentoData) + "&usuario_id="+$scope.loginData.id,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_AGENDAMENTO_CADASTRAR ,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			// Disparando ação de load
			$scope.carregado();
			bolRetorno = false;
			mensagem   = "";
			if(response.data.bolRetorno == true){
				bolRetorno = true;
				mensagem = "Cadastro Realizado Com Sucesso!";
			}else{
				mensagem = response.data.strMensagem;
			}
			
			var alertPopup = $ionicPopup.alert({
				title: (bolRetorno) ? 'Sucesso' : "Erro",
				template: mensagem
			});
			alertPopup.then(function(res) { });
			$scope.closeConfirmar();
			// Redirecionando para o inicio
			setTimeout(function(){
				// Redirecionado para o inicio
				if(bolRetorno){
					$scope.agendamentoData = {};
				}
			}, 1500);
		}, function(response) {
			console.log(response);
			// Disparando ação de load
			$scope.carregado();
			
			// Mensagem de erro
			$scope.falhaCarregamento(response, true);
		});
	 }
	 /*** FIM MÉTODO SALVAR OS DADOS ***/
	 /** MÉTODO PARA VALIDAR AS INFORMAÇOES **/
	 $scope.validar = function(){
		 // Validando os campos 
		 var errosValidacao =  Util.validarCamposAgendamento($scope.agendamentoData);
	   	 // Caso haja algum erro
		 if(errosValidacao.bolErros){
		 	// Disparando ação de load
			$scope.carregado();
			// Abrindo dialog com erros
			var alertPopup = $ionicPopup.alert({
				title: 'Campo(s) obrigatório(s)',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			return false;
		 }
		 // Abrindo a tela de confirmação
		 $scope.confirmarCadastro();
	 }
	 /** FIM MÉTODO PARA VALIDAR AS INFORMAÇOES **/
});

