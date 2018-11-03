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
	 }, function(response) {});
	 
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
	 }, function(response) {});
	 
	 
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
		 }, function(response) {});
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
				 Util.montarTabela('listaExames', listaUsuarios, [{ "data": "nome" , "width" : '50px'},{ "data": "dias_atraso" }]);
			}, function(response) {});
		 
	 }
	 // Default mostra a lista de usuários
	 $scope.mostarLista = true;
	 // Função para alternar entre lista e gráficos
	 $scope.mostarListaF =  function(bolMostar){
		 $scope.mostarLista = bolMostar;
		 if(bolMostar) graficoPizza();
	 }
	 
	// Default mostra a lista de usuários
	 $scope.mostarGrafico = 1;
	 // Função para alternar entre lista e gráficos
	 $scope.mostarGraficoTipo =  function(intTipo){
		 $scope.mostarGrafico = intTipo;
		 if(intTipo == 1) graficoPizza();
		 else if(intTipo == 2) graficoBarra();
	 }
});

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(graficoPizza);

function graficoPizza() {
	
	var data = google.visualization.arrayToDataTable([
	    ['Task', 'Hours per Day'],
	    ['Work',     11],
	    ['Eat',      2],
	    ['Commute',  2],
	    ['Watch TV', 2],
	    ['Sleep',    7]
	]);
	
	var options = {
	    title: 'My Daily Activities'
	};
	
	var chart = new google.visualization.PieChart(document.getElementById('graficoPizza'));
	
	chart.draw(data, options);
}

google.charts.setOnLoadCallback(graficoBarra);

function graficoBarra() {
	
	
	var data = google.visualization.arrayToDataTable([
                      ['City', '2010 Population',],
                      ['New York City, NY', 8175000],
                      ['Los Angeles, CA', 3792000],
                      ['Chicago, IL', 2695000],
                      ['Houston, TX', 2099000],
                      ['Philadelphia, PA', 1526000]
                ]);

	var options = {
                  title: 'Population of Largest U.S. Cities',
                  chartArea: {width: '50%'},
                  hAxis: {
                    title: 'Total Population',
                    minValue: 0
                  },
                  vAxis: {
                    title: 'City'
                  }
                };

	  var chart = new google.visualization.BarChart(document.getElementById('graficoBarra'));
	  
	  
      chart.draw(data, options);
      
}
