﻿// Login do Usuário
var loginData = {};

app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $ionicHistory, $state, $ionicLoading) {
    // Form data for the login modal
    $scope.loginData = loginData;
    $scope.versaoApp = Constantes.APP_VERSAO;
    $scope.mostrarBanco = 0;
    if(Constantes.APP_SERVICE == "http://conexaovidaimip.com.br/dev/" 
       || Constantes.APP_SERVICE == "http://conexaovidaimip.com.br/teste/"){
       $scope.banco = (Constantes.APP_SERVICE == "http://conexaovidaimip.com.br/dev/") ? "DEV": "Teste";
       $scope.mostrarBanco = 1;
    }

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
    
    /**
     * Login Usuário
     */
    $scope.setLogin = function(loginData){
    	$scope.loginData = loginData;
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
    
    $scope.getOneSignal = function(){
    	return idsOnesignal;	
    }
    
    $scope.sair = function (){
    	$scope.loginData = {};
    	$scope.goTo('app.login');
    	$scope.configurarConfirmacao();
    }
    
    $scope.falhaCarregamento = function(erro){
    	console.log(erro);
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