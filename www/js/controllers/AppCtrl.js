var isOnline = null;
	
var isOffline = null;

app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $ionicHistory, $state, $ionicLoading, $cordovaSQLite, $ionicPopup, $rootScope, $cordovaNetwork) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.versaoApp = Constantes.APP_VERSAO;
    $scope.mostrarBanco = 0;
    if(Constantes.APP_SERVICE == "http://conexaovidaimip.com.br/dev/" 
       || Constantes.APP_SERVICE == "http://conexaovidaimip.com.br/teste/"){
       $scope.banco = (Constantes.APP_SERVICE == "http://conexaovidaimip.com.br/dev/") ? "DEV": "Teste";
       $scope.mostrarBanco = 1;
    }
    
//   $scope.loginData = {"id":"112","perfil_id":"1","nome":"Karine Henrique da Silva","numero_pep":"123kb","contato":"(81) 99596-8432","sexo":"2","email":"karinehenrique23@gmail.com","login":"06662460419","cancer_id":"38","ultimo_acesso":"2018-12-09 14:09:14","strCpf":"06662460419"}

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

//    var fab = document.getElementById('fab');
//    fab.addEventListener('click', function () {
//        //location.href = 'https://twitter.com/satish_vr2011';
//        window.open('https://twitter.com/satish_vr2011', '_blank');
//    });

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    
//    setInterval(function(){
//    	var type = $cordovaNetwork.getNetwork()
//    	isOnline = $cordovaNetwork.isOnline();
//    	console.log("aqui internet")
//        console.log(type)
//        console.log(isOnline)
////        isOffline = $cordovaNetwork.isOffline();
////        console.log(isOffline)
//    }, 1500);
    
    
    document.addEventListener("deviceready", function () {

        var type = $cordovaNetwork.getNetwork()

        isOnline = $cordovaNetwork.isOnline();
        isOffline = $cordovaNetwork.isOffline();

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          var onlineState = networkState;
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          var offlineState = networkState;
        })

    }, false);
    
    
    /*********
     * CONSTANTES
     **********/
    $scope.strUrlServico   	= Constantes.APP_SERVICE;
    $scope.timeout   		= Constantes.APP_TIMEOUT;
    
    /*******
    GO HOME
    *******/
    $scope.goHome = function() {
  	  $ionicHistory.nextViewOptions({
  		  disableAnimate: true,
  		  historyRoot: true
  	  });					 
  	  $state.go('app.inicio');
    }
    /****
    GO TO
    *****/
    $scope.goTo = function(state) {
  	  $ionicHistory.nextViewOptions({
  		  disableAnimate: true,
  		  historyRoot: true
  	  });					 
  	  $state.go(state);
    }
   /***********
    CLEAR CACHE
    ***********/
    $scope.clearCache = function(state) {
  	  $ionicHistory.clearCache([state]).then(function(){$ionicHistory.clearHistory});
    }
    
    /*****************
    FUNCOES GENERICAS
    *****************/
    $scope.carregando = function(){
  	  $ionicLoading.show({
  	      content: 'Aguarde...',
  	      animation: 'fade-in',
  	      showBackdrop: true,
  	      maxWidth: 200,
  	      showDelay: 0
  	  });
    }
    
    $scope.carregado = function(){
  	  $ionicLoading.hide();
    }
    
    
    $scope.Database = new Database(Constantes.APP_DATABASE_NAME, '1', Constantes.APP_DATABASE_NAME_DISPLAY, 200000, $cordovaSQLite, true);
    
    /**
     * Método que irá iniciar o banco de dados no celular
     */
    $scope.iniciarBanco = function(){
    	$scope.Database.configureTransaction (
	    	function (tx) {
//	  			tx.executeSql("DROP TABLE IF EXISTS acoes");
//	  			tx.executeSql("DROP TABLE IF EXISTS usuario_logado");
			    tx.executeSql("CREATE TABLE IF NOT EXISTS acoes (" +
				    		  "	id integer primary key," +
				    		  "	url text," +
				    		  "	data text," +
				    		  "	enviado integer," +
				    		  "	usuario text," +
				    		  "	data_envio text" +
				    		  ")");
			    tx.executeSql("CREATE TABLE IF NOT EXISTS usuario_logado (" +
				    		  "	id integer primary key," +
				    		  "	usuario text," +
				    		  "	ativo integer," +
				    		  "	espira integer," +
				    		  "	id_usuario integer" +
				    		  ")");
			}, 
			function(error) {
				console.error("Error Database: " + error.message);
			},
			function() {
				console.log("Success Database: "+ $scope.databaseDisplay + " " + $scope.Database.db.version + " Created!");
			}
		);
    }
    // Iniciando o banco de dados
    setTimeout(function(){
    	$scope.iniciarBanco();
    	$scope.carregarUsuario();
    }, 1500);
    
    /**
     * Login Usuário
     */
    $scope.setLogin = function(loginData, atualizar){
    	// Setando o objeto 
    	$scope.loginData = loginData;
    	// Caso seja pra atualizar
    	if(atualizar){
    		// Criando a data de expiração
        	var dataExpirar = new Date();
        	dataExpirar.setDate(dataExpirar.getDate() + 30);

        	$scope.Database.update("usuario_logado", ["id_usuario"], [loginData.id], ["ativo"], [0]);
        	
        	$scope.Database.insert("usuario_logado", ["usuario", "ativo", "espira", "id_usuario"], [JSON.stringify(loginData), 1, dataExpirar.getTime(), loginData.id]);
        	
        	$scope.Database.select('usuario_logado', null, ["ativo"], [1], null, null, null, function(usuarioLogado) {
    			  console.log(usuarioLogado);
    		});	
    	}
    }
    /**
     * Caso o usuário tenha um login válido cadastrado
     */
    $scope.carregarUsuario = function(){
    	// Caso tenha um usuário logado
    	$scope.Database.select('usuario_logado', null, ["ativo"], [1], null, null, null, function(usuarioLogado) {
    		  if(usuarioLogado.length > 0){
    			  // Recuperando o usuário
    			  loginDataBanco = JSON.parse(usuarioLogado[0].usuario);
    			  if(loginDataBanco !== undefined){
    				  loginData = loginDataBanco;
    				  // Setando o login para o usuário e não deixando atualizar
    				  $scope.setLogin(loginData, false);
    				  // Redirecionando e informando
    				  $scope.redirecionamentoLogin(true);
    			  }
    		  }	
		});
    }
    
    
    $scope.usuarioLogado = function(bolLogin){
    	/**
         * Caso o usuário não esteja logado
         */
//        if(angular.equals($scope.loginData, {})) {
//        	if(!bolLogin) $scope.goTo('app.login');
//        }else{
//        	
//        	if(($scope.loginData.login != undefined || $scope.loginData.login != "")
//    		   && 
//    		   ($scope.loginData.perfil_id != undefined || $scope.loginData.perfil_id != "")){
//        		$scope.goTo('app.inicio');
//        	}
//        }
    }
    
    $scope.redirecionamentoLogin = function(redireciona){
    	if(redireciona == true || redireciona == undefined){
    		var alertPopup = $ionicPopup.alert({
    			title: 'Sucesso',
    			template: 'Aguarde, você sera redirecionado!'
    		});
    		alertPopup.then(function(res) {
    		});
    		$scope.removerConfirmacao();
    		// Redirecionado para o inicio
    		$scope.goTo("app.inicio");
    	}
    }
    
    
    $scope.getOneSignal = function(){
    	return idsOnesignal;	
    }
    
    $scope.sair = function (){
    	// Zerando o login do usuário
    	$scope.Database.update("usuario_logado", ["id_usuario"], [$scope.loginData.id], ["ativo"], [0]);
    	$scope.loginData = {};
    	loginData = null;
		$scope.configurarConfirmacao();
    	$scope.goTo('app.login');
    	$scope.configurarConfirmacao();
    }
    
    $scope.falhaCarregamento = function(erro){
    	console.log(erro.config.data); 
    	console.log(erro.config.url);
    	$scope.carregado();
    	var alertPopup = $ionicPopup.alert({
			title: 'Erro',
			template: 'Desculpe, ocorreu algum erro ao realizar essa operação!'
		});
		alertPopup.then(function(res) {
		});
    }
    
    $scope.configurarConfirmacao = function(){
    		 $(".confirmarCadastro").attr("style", "background: #62aaa2 !important");
    		 $(".disable-user-behavior").hide();
    		 $(".has-header, .pageLogin").css("top", "0px");
    }
    
    $scope.removerConfirmacao = function(){
    	 
		 setTimeout(function(){
			 $(".disable-user-behavior").show();
			 $(".confirmarCadastro").attr("style", "background: #ffffff !important");
			 $(".disable-user-behavior").show();
			 $(".confirmarCadastro").attr("style", "background: #ffffff !important");
			 $(".has-header").css("top", "44px");
    	 }, 500);
    }
});