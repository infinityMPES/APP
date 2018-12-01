var totaisPorArea = [];
var totaisPorTipo = [];

app.controller('GerenciarExamesCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 
	 $scope.mostrarLista = false; // Flag para mostrar a lista
	 $scope.exameData = {}; // Objeto filtro
	 
	// Lista de áreas 
	 $scope.listaAreas = [];
	 // Buscando os perfis cadastrados na base
	 $http({
		method: "GET",
	    timeout:$scope.timeout,
	    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_LISTAR_AREAS,
	    headers: Util.headers($scope.token)
	 }).then(function(response) {
		 if(response.data.bolRetorno == true){
			 $scope.listaAreas = response.data.result;
		 }
	 }, function(response) {
		// Mensagem de erro
		$scope.falhaCarregamento(response);
	 });
	 
	 // Lista de tipo de exames
	 $scope.listaTipoExames = [];
	 $http({
		method: "GET",
	    timeout:$scope.timeout,
	    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_LISTAR_TIPOS_EXAMES,
	    headers: Util.headers($scope.token)
	 }).then(function(response) {
		 if(response.data.bolRetorno == true){
			 $scope.listaTipoExames = response.data.result;
		 }
	 }, function(response) {
		// Mensagem de erro
		$scope.falhaCarregamento(response);
	 });
	 
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
	 $scope.pesquisaExames = function(){
		 // ´Mostrando o carregando
		 $scope.carregando();
		 $scope.mostrarLista = false;
		 // Realizando os filtros
		 $http({
			 method: "POST",
			    timeout:$scope.timeout,
			    data: 'filtroBusca=' + JSON.stringify($scope.exameData),
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_FILTRAR_EXAMES,
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
				 Util.montarTabela('listaExames', listaUsuarios, [{ "data": "nome" , "width" : '50px'},{ "data": "dias_atraso" }], [[ 1, "desc"]]);
			}, function(response) {
				// Mensagem de erro
				$scope.falhaCarregamento(response);
			});
		 
		 
		 // Totais por area
		 $http({
			method: "GET",
		    timeout:$scope.timeout,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_LISTAR_TOTAIS_AREA,
		    headers: Util.headers($scope.token)
		 }).then(function(response) {
			 if(response.data.bolRetorno == true){
				 totaisPorArea = response.data.result;
			 }
		 }, function(response) {
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		 });
		 
		 // Totais por tipo de exame
		 $http({
			method: "GET",
		    timeout:$scope.timeout,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_LISTAR_TOTAIS_TIPO,
		    headers: Util.headers($scope.token)
		 }).then(function(response) {
			 if(response.data.bolRetorno == true){
				 totaisPorTipo = response.data.result;
			 }
		 }, function(response) {
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		 });
	 }
	 // Default mostra a lista de usuários
	 $scope.mostarListaTa = true;
	 // Função para alternar entre lista e gráficos
	 $scope.mostarListaF =  function(bolMostar){
		 $scope.mostarListaTa = bolMostar;
		 if(!bolMostar) graficoPizza();
	 }
	 
	// Default mostra a lista de usuários
	 $scope.mostarGrafico = 1;
	 // Função para alternar entre lista e gráficos
	 $scope.mostarGraficoTipo =  function(intTipo){
		 $scope.mostarGrafico = intTipo;
		 if(intTipo == 1) graficoPizza();
		 else if(intTipo == 2) graficoBarra();
	 }
	 // Detalhamento do exame
	 $scope.objExame = {};
	 $scope.carregarDetalhe = function(idExame){
		// ´Mostrando o carregando
		 $scope.carregando();
		 // Realizando os filtros
		 $http({
			 	method: "GET",
			    timeout:$scope.timeout,
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_RECUPERAR_EXAME_ID + "?intIdExame="+idExame,
			    headers: Util.headers($scope.token)
			})
			.then(function(response) {
				 $scope.carregado();
				 if(response.data.bolRetorno == true){
					 $scope.objExame = response.data.result;
				 }else{
					 $scope.closeConfirmar();
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
	 /******* MODAL DE DETALHE ********/
});

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(graficoPizza);

/**
 * Método que irá mostrar os exames como gráfico de pizza
 * 
 * @returns {Boolean}
 */
function graficoPizza() {
	if(totaisPorArea.length == 0) return false;
	dados = [['Area', 'Total']];
	for(var intChave = 0; intChave<totaisPorArea.length; intChave++){
		valor = totaisPorArea[intChave];
		valor[1] *= 1;  
		dados.push(valor);
	}
	console.log(dados)
	var data = google.visualization.arrayToDataTable(dados);
	var options = {
	    title: 'Totais Por Área',
        width: $(window).width() - 50,
	    'height':350,
	    'chartArea': {'width': '100%', 'height': '90%'},
	    tooltip : {trigger : "selection" },
        'legend': {fontSize: 25,bold: true}
	    
	};
	var chart = new google.visualization.PieChart(document.getElementById('pizzaPorArea'));
	chart.draw(data, options);
	
	dadosTipo = [['Tipo Exame', 'Total']];
	for(var intChave = 0; intChave<totaisPorTipo.length; intChave++){
		valor = totaisPorTipo[intChave];
		valor[1] *= 1;  
		dadosTipo.push(valor);
	}
	console.log(dadosTipo)
	var dataTipo = google.visualization.arrayToDataTable(dadosTipo);
	var options = {
	    title: 'Totais Por Tipo Exame',
	    width: $(window).width() - 50,
        'height':350,
        'chartArea': {'width': '100%', 'height': '90%'},
	    tooltip : {trigger : "selection" }
	};
	var chart = new google.visualization.PieChart(document.getElementById('pizzaPorTipo'));
	chart.draw(dataTipo, options);
}

google.charts.setOnLoadCallback(graficoBarra);

/**
 * Método que irá mostrar os exames como gráfico de barra
 * 
 * @returns {Boolean}
 */
function graficoBarra() {
	if(totaisPorArea.length == 0) return false;
	dados = [['Area', 'Total']];
	for(var intChave = 0; intChave<totaisPorArea.length; intChave++){
		valor = totaisPorArea[intChave];
		valor[1] *= 1;  
		dados.push(valor);
	}
	console.log(dados)
	var data = google.visualization.arrayToDataTable(dados);
	var options = {
	    title: 'Totais Por Área',
	    width: $(window).width() - 50,
        'height':350,
        legend: "none",
	    tooltip : {trigger : "selection" }
	};
	var chart = new google.visualization.BarChart(document.getElementById('barraPorArea'));
	chart.draw(data, options);
	
	dadosTipo = [['Tipo Exame', 'Total']];
	for(var intChave = 0; intChave<totaisPorTipo.length; intChave++){
		valor = totaisPorTipo[intChave];
		valor[1] *= 1;  
		dadosTipo.push(valor);
	}
	console.log(dadosTipo)
	var dataTipo = google.visualization.arrayToDataTable(dadosTipo);
	var options = {
	    title: 'Totais Por Tipo Exame',
	    width: $(window).width() - 50,
        'height':350,
        legend: "none",
	    tooltip : {trigger : "selection" }
	};
	var chart = new google.visualization.BarChart(document.getElementById('barraPorTipo'));
	chart.draw(dataTipo, options);
}
