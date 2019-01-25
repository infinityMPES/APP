var totaisGrafico = [];
 
app.controller('GerenciarAgendamentoCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $filter) {
	 // Verificando se o usuário está logado
	 $scope.usuarioLogado(true);
	 
	 $scope.mostrarLista = false; // Flag para mostrar a lista
	 $scope.agendamentoData = {}; // Objeto filtro
	 
	 /**
	  * M�todo que ir� formatar a data
	  */
	 $scope.formatDate = function() {
		 if($scope.agendamentoData.data_solicitada_inicio_form != undefined && $scope.agendamentoData.data_solicitada_inicio_form != "")
			 $scope.agendamentoData.data_solicitada_inicio = $filter('date')($scope.agendamentoData.data_solicitada_inicio_form, "dd/MM/yyyy");
		 
		 if($scope.agendamentoData.data_solicitada_fim_form != undefined && $scope.agendamentoData.data_solicitada_fim_form != "")
			 $scope.agendamentoData.data_solicitada_fim = $filter('date')($scope.agendamentoData.data_solicitada_fim_form, "dd/MM/yyyy");
	 }
	 
	// Lista de �reas 
	 $scope.listaAreas = [];
	 // Buscando os perfis cadastrados na base
	 $http({
		method: "GET",
	    timeout:$scope.timeout,
	    url: $scope.strUrlServico + Constantes.APP_SERVICE_EXAMES_LISTAR_AREAS + "?todos=false&agendamento",
	    headers: Util.headers($scope.token)
	 }).then(function(response) {
		 if(response.data.bolRetorno == true){
			 $scope.listaAreas = response.data.result;
		 }
	 }, function(response) {
		// Mensagem de erro
		$scope.falhaCarregamento(response);
	 });
	 
	 $scope.filtro = {};
	 
	 /**
	  * Método que irá realizar o filtro dos usu�rios
	  */
	 $scope.pesquisaExames = function(){
		 // Mostrando o carregando
		 $scope.carregando();
		 $scope.mostrarLista = false;
		 // Realizando os filtros
		 $http({
			 method: "POST",
			    timeout:$scope.timeout,
			    data: 'filtroBusca=' + JSON.stringify($scope.agendamentoData),
			    url: $scope.strUrlServico + Constantes.APP_SERVICE_AGENDAMENTO_GERENCIAR,
			    headers: Util.headers($scope.token)
		 }).then(function(response) {
				 $scope.carregado();
				 listaAgendamentp = [];
				 if(response.data.bolRetorno == true){
					 listaAgendamentp = response.data.result;
					// Mostrando a lista de usu�rios
					 $scope.mostrarLista = true;
					 // Criando a tabela
					 Util.montarTabela('listaAgendamento', listaAgendamentp, [{ "data": "nome" , "width" : '50px'},{ "data": "situacao" },{ "data": "data_solicitada_banco" }], [[ 2, "desc"]]);
				 }else{
					 listaAgendamentp = [];
					// Mostrando a lista de usu�rios
					 $scope.mostrarLista = false;
					 
					 var alertPopup = $ionicPopup.alert({
						title: 'Atenção',
						template: response.data.strMensagem
					});
					alertPopup.then(function(res) { });
				 }
				 
			}, function(response) {
				// Mensagem de erro
				$scope.falhaCarregamento(response);
		 });
		 
		 $http({
			method: "GET",
		    timeout:$scope.timeout,
		    url: $scope.strUrlServico + Constantes.APP_SERVICE_AGENDAMENTO_GRAFICO,
		    headers: Util.headers($scope.token)
		 }).then(function(response) {
			 if(response.data.bolRetorno == true){
				 totaisGrafico = response.data.result;
				 console.log(totaisGrafico);
			 }
		 }, function(response) {
			// Mensagem de erro
			$scope.falhaCarregamento(response);
		 });
	 }
	 // Default mostra a lista de usu�rios
	 $scope.mostarListaTa = true;
	 // Função para alternar entre lista e gr�ficos
	 $scope.mostarListaF =  function(bolMostar){
		 $scope.mostarListaTa = bolMostar;
		 if(!bolMostar) graficoPizzaAgendamento();
	 }
	 
	// Default mostra a lista de usu�rios
	 $scope.mostarGrafico = 1;
	 // Fun��o para alternar entre lista e gr�ficos
	 $scope.mostarGraficoTipo =  function(intTipo){
		 $scope.mostarGrafico = intTipo;
		 if(intTipo == 1) graficoPizzaAgendamento();
		 else if(intTipo == 2) graficoBarraAgendamento();
	 }
});

// Iniciando os gráficos
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(graficoPizzaAgendamento);

/**
 * Método que irá mostrar os exames como gráfico de pizza
 * 
 * @returns {Boolean}
 */
function graficoPizzaAgendamento() {
	if(totaisGrafico.length == 0) return false;
	dados = [['Area', 'Total']];
	for(var intChave = 0; intChave<totaisGrafico.arrAgendamentoPorAera.length; intChave++){
		valor = totaisGrafico.arrAgendamentoPorAera[intChave];
		valor[1] *= 1;  
		dados.push(valor);
	}
	console.log(dados)
	var data = google.visualization.arrayToDataTable(dados);
	var options = {
	    title: 'Agendamentos Por Área',
        width: $(window).width() - 50,
	    'height':350,
	    'chartArea': {'width': '100%', 'height': '90%'},
	    tooltip : {trigger : "selection" },
        'legend': {fontSize: 25,bold: true}
	    
	};
	var chart = new google.visualization.PieChart(document.getElementById('pizzaPorAreaAgendamento'));
	chart.draw(data, options);
	
	dadosTipo = [['Tipo Mês', 'Total']];
	for(var intChave = 0; intChave<totaisGrafico.arrAgendamentoPorData.length; intChave++){
		valor = totaisGrafico.arrAgendamentoPorData[intChave];
		valor[1] *= 1;  
		dadosTipo.push(valor);
	}
	console.log(dadosTipo)
	var dataTipo = google.visualization.arrayToDataTable(dadosTipo);
	var options = {
	    title: 'Agendamentos Por Mês',
	    width: $(window).width() - 50,
        'height':350,
        'chartArea': {'width': '100%', 'height': '90%'},
	    tooltip : {trigger : "selection" }
	};
	var chart = new google.visualization.PieChart(document.getElementById('pizzaPorData'));
	chart.draw(dataTipo, options);
	
	dadosTipo = [['Usuário', 'Total']];
	for(var intChave = 0; intChave<totaisGrafico.arrAgendamentoPorUsuario.length; intChave++){
		valor = totaisGrafico.arrAgendamentoPorUsuario[intChave];
		valor[1] *= 1;  
		dadosTipo.push(valor);
	}
	console.log(dadosTipo)
	var dataTipo = google.visualization.arrayToDataTable(dadosTipo);
	var options = {
	    title: 'Agendamentos Por Usuário',
	    width: $(window).width() - 50,
        'height':350,
        'chartArea': {'width': '100%', 'height': '90%'},
	    tooltip : {trigger : "selection" }
	};
	var chart = new google.visualization.PieChart(document.getElementById('pizzaPorUsuario'));
	chart.draw(dataTipo, options);
}

google.charts.setOnLoadCallback(graficoBarraAgendamento);

/**
 * Método que irá mostrar os exames como gráfico de barra
 * 
 * @returns {Boolean}
 */
function graficoBarraAgendamento() {
	
	if(totaisGrafico.length == 0) return false;
	dados = [['Area', 'Total']];
	for(var intChave = 0; intChave<totaisGrafico.arrAgendamentoPorAera.length; intChave++){
		valor = totaisGrafico.arrAgendamentoPorAera[intChave];
		valor[1] *= 1;  
		dados.push(valor);
	}
	var data = google.visualization.arrayToDataTable(dados);
	var options = {
	    title: 'Agendamentos Por Área',
        width: $(window).width() - 50,
	    'height':350,
	    'chartArea': {'width': '100%', 'height': '90%'},
	    tooltip : {trigger : "selection" },
        'legend': {fontSize: 25,bold: true}
	    
	};
	var chart = new google.visualization.BarChart(document.getElementById('barraPorAreaAgendamento'));
	chart.draw(data, options);
	
	dadosTipo = [['Tipo Mês', 'Total']];
	for(var intChave = 0; intChave<totaisGrafico.arrAgendamentoPorData.length; intChave++){
		valor = totaisGrafico.arrAgendamentoPorData[intChave];
		valor[1] *= 1;  
		dadosTipo.push(valor);
	}
	console.log(dadosTipo)
	var dataTipo = google.visualization.arrayToDataTable(dadosTipo);
	var options = {
	    title: 'Agendamentos Por Mês',
	    width: $(window).width() - 50,
        'height':350,
        'chartArea': {'width': '100%', 'height': '90%'},
	    tooltip : {trigger : "selection" }
	};
	var chart = new google.visualization.BarChart(document.getElementById('barraPorData'));
	chart.draw(dataTipo, options);
	
	dadosTipo = [['Usuário', 'Total']];
	for(var intChave = 0; intChave<totaisGrafico.arrAgendamentoPorUsuario.length; intChave++){
		valor = totaisGrafico.arrAgendamentoPorUsuario[intChave];
		valor[1] *= 1;  
		dadosTipo.push(valor);
	}
	console.log(dadosTipo)
	var dataTipo = google.visualization.arrayToDataTable(dadosTipo);
	var options = {
	    title: 'Agendamentos Por Usuário',
	    width: $(window).width() - 50,
        'height':350,
        'chartArea': {'width': '100%', 'height': '90%'},
	    tooltip : {trigger : "selection" }
	};
	var chart = new google.visualization.BarChart(document.getElementById('barraPorUsuario'));
	chart.draw(dataTipo, options);
}
