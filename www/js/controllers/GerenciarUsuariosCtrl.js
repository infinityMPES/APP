app.controller('GerenciarUsuariosCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 
	 $scope.mostrarLista = false;
	 $scope.filtro = {};
	 $scope.listaPerfis = [];
	 $scope.listaUsuarios = [];
	 
	 // carregando a lista de perfis
	 setTimeout(function(){
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
	 }, 1500);
	 
	 /**
	  * Método que irá realizar o filtro dos usuários
	  */
	 $scope.pesquisaUsuarios = function(){
		 // ´Mostrando o carregando
		 $scope.carregando();
		 $scope.mostrarLista = false;
		// Validando os campos 
		 var errosValidacao = validarFiltro($scope.filtro);
		 // Caso haja algum erro
		 if(errosValidacao.bolErros){
		 	// Disparando ação de load
			$scope.carregado();
			// Abrindo dialog com erros
			var alertPopup = $ionicPopup.alert({
				title: 'Campo obrigatórios',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			return false;
		 }else{
			 $http({
				 method: "POST",
				    timeout:$scope.timeout,
				    data: 'filtroBusca=' + JSON.stringify($scope.filtro),
				    url: $scope.strUrlServico + Constantes.APP_SERVICE_PESQUISAR_USUARIOS,
				    headers: Util.headers($scope.token)
				})
				.then(function(response) {
					 $scope.carregado();
					 listaUsuarios = [];
					 if(response.data.bolRetorno == true){
						 listaUsuarios = response.data.result;
					 }
 					 // Mostrando a lista de usuários
					 $scope.mostrarLista = true;
					 // Criando a tabela
					 Util.montarTabela('listaUsuarios', listaUsuarios, [{ "data": "login" },{ "data": "nome" },{ "data": "id" }]);
				}, function(response) {
					// Mensagem de erro
					$scope.falhaCarregamento(response);
				});
		 }
		 
	 }
	 
	 /*** MÉTODO DE FAZER CADASTRAR ****/
	 $scope.cadastrar = function(){
		 // Disparando ação de load
		 $scope.carregando();
		 // Validando os campos 
		 var errosValidacao = validarCadastroPaciente($scope.loginData);
		 // Caso haja algum erro
		 if(errosValidacao.bolErros){
		 	// Disparando ação de load
			$scope.carregado();
			// Abrindo dialog com erros
			var alertPopup = $ionicPopup.alert({
				title: 'Campo obrigatórios',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			return false;
		 }else{
			 objOnesignal = $scope.getOneSignal();
			 $scope.loginData.onesignal = objOnesignal.userId; 
			// Postando para URL
		 	$http({
				method: "POST",
			    timeout:$scope.timeout,
			    data: 'dadosPaciente=' + JSON.stringify($scope.loginData) + "&onesignal="+objOnesignal.userId,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_CADASTRAR_PACIENTE,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				// Disparando ação de load
				$scope.carregado();
				bolRetorno = false;
				mensagem   = "";
				if(response.data.bolRetorno == true){
					bolRetorno = true;
					mensagem = "<b>Cadastro Realizado com sucesso!</b> <br> Aguarde seu capastro ser aprovado para utilizar o Conexão Vida!";
				}else{
					mensagem = response.data.strMensagem;
				}
				
				var alertPopup = $ionicPopup.alert({
					title: (bolRetorno) ? 'Sucesso' : "Erro",
					template: mensagem
				});
				alertPopup.then(function(res) { });
				// Redirecionando para o inicio
				setTimeout(function(){
					// Redirecionado para o inicio
					if(bolRetorno){
						$scope.closeConfirmar();
						$scope.goTo("app.login");
					}
				}, 1500);
			}, function(response) {
				console.log(response);
				// Disparando ação de load
				$scope.carregado();
				// Mensagem de erro
				$scope.falhaCarregamento(response);
			});
		 }
	 }
	 /*** FIM MÉTODO CADASTRAR ***/
	 /** **/
	 $ionicModal.fromTemplateUrl('templates/cadastrar-paciente-confirmacao.html', {
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
	 
	 /**  **/
	 /*** MÉTODO DE FAZER VALIDAÇÕES DO CADASTRO ****/
	 $scope.validarCadastro = function(){
		 // Validando os campos 
		 var errosValidacao = validarCadastroPaciente($scope.loginData);
		 // Caso haja algum erro
		 if(errosValidacao.bolErros){
		 	// Disparando ação de load
			$scope.carregado();
			// Abrindo dialog com erros
			var alertPopup = $ionicPopup.alert({
				title: 'Campo obrigatórios',
				template: errosValidacao.strMensagem
			});
			alertPopup.then(function(res) { });
			return false;
		 }
		 // Validando cpf e email
		 $scope.validarEmailCPF();
	 }
	 // Método que irá validar o email e o cpf
	 $scope.validarEmailCPF = function(){
		// Disparando ação de load
		$scope.carregando();
		// Postando para URL
		$http({
			method: "POST",
		    timeout:$scope.timeout,
		    data: "strEmail=" + (($scope.loginData.email != undefined || $scope.loginData.email != "") ? $scope.loginData.email : "") +
		    	  "&strCPF=" + (($scope.loginData.cpf != undefined || $scope.loginData.cpf != "") ? $scope.loginData.cpf : ""),
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_VALIDAR_CADASTRO,
		    headers: Util.headers($scope.token)
		})
		.then(function(response) {
			// Disparando ação de load
			$scope.carregado();
			 // Validando caso haja um CPF ou Email cadastrado
			if(response.data.bolRetorno == false){
				var alertPopup = $ionicPopup.alert({
					title: 'Validação',
					template: response.data.strMensagem
				});
				alertPopup.then(function(res) {
				});
			}else // Abrindo a tela de confirmação
				$scope.abrirConfirmacao();
		}, function(response) {
			// Disparando ação de load
			$scope.carregado();
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		});
	 }
	 // Abrindo a tela de confirmarção de cadastro
	 $scope.abrirConfirmacao = function(){
		// Caso não tenha nenhum problema
		 $scope.confirmarCadastro();
	 }
	 /*** FIM DA VALIDAÇÃO ***/
});

/**
 * Método que irá validar o filtro
 */
function validarFiltro(loginData){
	
	bolErros = false;
	strMensagem = "";
	
	if(loginData.cpf != "" && loginData.cpf != undefined && !Util.validaCPF(loginData.cpf)) {
		bolErros = true;
		strMensagem += "<b>CPF</b> inválido! <br />";
	}
	
	if(loginData.perfil_id == "" || loginData.perfil_id == undefined){
		bolErros = true;
		strMensagem += "<b>Perfil</b> é obrigatório!  <br />";
	}
	return {strMensagem : strMensagem, bolErros : bolErros};
}