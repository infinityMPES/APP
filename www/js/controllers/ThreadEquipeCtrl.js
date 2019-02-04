app.controller('ThreadEquipeCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $state) {
    // Verificando se o usuário está logado
    $scope.usuarioLogado(true);
    // Detalhamento da notificação
    $scope.objNotificacao = {};
    // Mostrando o carregando
    $scope.carregando();
    // Realizando os filtros
    $scope.carregarNotificacoes = function(){
    	$http({
            method: "GET",
            timeout: $scope.timeout,
            url: $scope.strUrlServico + Constantes.APP_SERVICE_NOTIFICACOES_POR_ID + "?intIdNotificacao=" + $stateParams.notificacaoId,
            headers: Util.headers($scope.token)
        })
        .then(function (response) {
            $scope.carregado();
            $scope.$broadcast('scroll.refreshComplete');
            if (response.data.bolRetorno == true) {
                $scope.objNotificacao = response.data.result;
                $scope.notificacaoData.pep = response.data.result.numero_pep;
				$scope.notificacaoData.total = 1;
				$scope.notificacaoData.resposta_paciente = 1;
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: "Erro",
                    template: "Notificação Não Encontrada!"
                });
                alertPopup.then(function (res) { });
            }
            console.log($scope.objNotificacao)
        }, function (response) {
            // Mensagem de erro
            $scope.falhaCarregamento(response);
        });
    }
    
    $scope.carregarNotificacoes();
    $scope.doRefresh = function() {
		  $scope.carregarNotificacoes();
   };
});