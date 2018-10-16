app.controller('InicioCtrl', function ($scope, $stateParams, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    $scope.usuarioLogado(false);
    
//    setInterval(function(){
//    	console.log("Inicio");
//        console.log($scope.loginData);	
//    }, 500);
    
});