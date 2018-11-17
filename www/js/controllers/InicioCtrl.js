app.controller('InicioCtrl', function ($scope, $stateParams, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    $scope.usuarioLogado(false);
    $(".has-header").css("top", "44px");
    setTimeout(function(){
    	$(".has-header").css("top", "44px");	
    }, 500);
    
});