app.controller('LoginCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate) {
	// Verificando se o usuário está logado
	$scope.usuarioLogado(true);
	
	 $ionicSideMenuDelegate.canDragContent(false)

});