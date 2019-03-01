app.controller('GerenciarNotificacoesCtrl', function ($scope, $stateParams, ionicMaterialInk, $http, $ionicSideMenuDelegate, $ionicPopup, $ionicModal) {
    // Verificando se o usu�rio est� logado
    $scope.usuarioLogado(true);

    $scope.mostrarLista = false; // Flag para mostrar a lista

    $scope.listaIdade = [];

    for (var inicio = 1; inicio <= 100; inicio++) {
        $scope.listaIdade.push(inicio);
    }

    // Lista de perfis do sistema
    $scope.listaPerfis = [];
    // Buscando os perfis cadastrados na base
    $http({
        method: "GET",
        timeout: $scope.timeout,
        url: $scope.strUrlServico + Constantes.APP_SERVICE_LISTAR_PERFIS,
        headers: Util.headers($scope.token)
    }).then(function (response) {
        if (response.data.bolRetorno == true) {
            $scope.listaPerfis = response.data.result;
        }
    }, function (response) {
        // Mensagem de erro
        $scope.falhaCarregamento(response);
    });
    $scope.listaCancer = [];
    $http({
        method: "GET",
        timeout: $scope.timeout,
        url: $scope.strUrlServico + Constantes.APP_SERVICE_LISTAR_CANCER,
        headers: Util.headers($scope.token)
    }).then(function (response) {
        if (response.data.bolRetorno == true) {
            $scope.listaCancer = response.data.result;
        }
    }, function (response) {
        // Mensagem de erro
        $scope.falhaCarregamento(response);
    });

    /**
     * M�todo que ir� realizar o filtro dos usu�rios
     */
    $scope.pesquisaNotificacao = function () {
        // �Mostrando o carregando
        $scope.carregando();
        // Realizando os filtros
        $http({
            method: "POST",
            timeout: $scope.timeout,
            data: 'dadosNotificacao=' + JSON.stringify($scope.notificacaoData),
            url: $scope.strUrlServico + Constantes.APP_SERVICE_NOTIFICACOES_BUSCAR_TOTAL,
            headers: Util.headers($scope.token)
        })
                .then(function (response) {
                    $scope.carregado();
                    if (response.data.bolRetorno == true) {
                        $scope.notificacaoData.total = response.data.result[0].total;
                        console.log($scope.notificacaoData.total)
                        $scope.confirmarCadastroNotificacao($scope.notificacaoData.total);
                        $scope.notificacaoData.titulo = "";
                        $scope.notificacaoData.corpo = "";
                    }
                }, function (response) {
                    // Mensagem de erro
                    $scope.falhaCarregamento(response);
                }
                );

    }

    /****** filtrar notificações enviadas ****/
    $scope.mostrarLista = 1;
    $scope.mostrarBusca = function (status) {
        $scope.mostrarLista = status;
        console.log($scope.mostrarLista)
    }
    $scope.listaNotificacoes = [];
    $scope.buscarNotificacao = function () {
        // Mostrando o carregando
        $scope.carregando();
        // Realizando os filtros
        $http({
            method: "POST",
            timeout: $scope.timeout,
            data: 'filtroBusca=' + JSON.stringify($scope.notificacaoData),
            url: $scope.strUrlServico + Constantes.APP_SERVICE_NOTIFICACOES_FILTRAR,
            headers: Util.headers($scope.token)
        })
        .then(function (response) {
            $scope.carregado();
            $scope.mostrarListaBusca = true;
            if (response.data.bolRetorno == true) {
                $scope.listaNotificacoes = response.data.result;
            }
            // Criando a tabela
            Util.montarTabela('listaNotificacoes', $scope.listaNotificacoes, [{"data": "data_envio"}, {"data": "titulo"}, {"data": "total"}], [ 0, "desc" ]);
        }, function (response) {
            // Mensagem de erro
            $scope.falhaCarregamento(response);
        });

    }

    $scope.mostarDetalhe = function (chave) {
        console.log($scope.listaNotificacoes[chave]);
    }
    /******* MODAL DE DETALHE ********/
    $scope.notificacaoDataResposta = {};
    $scope.listaNotificacoesResposta = [];
    $scope.buscarNotificacaoResposta = function () {
        // Mostrando o carregando
        $scope.carregando();
        // Realizando os filtros
        $http({
            method: "POST",
            timeout: $scope.timeout,
            data: 'filtroBusca=' + JSON.stringify($scope.notificacaoDataResposta),
            url: $scope.strUrlServico + Constantes.APP_SERVICE_NOTIFICACOES_FILTRAR_RESPOSTAS,
            headers: Util.headers($scope.token)
        })
        .then(function (response) {
            $scope.carregado();
            if (response.data.bolRetorno == true) {
                $scope.listaNotificacoesResposta = response.data.result;
            }
            // Criando a tabela
            Util.montarTabela('listaNotificacoesRecebidas', $scope.listaNotificacoesResposta, [{"data": "paciente"}, {"data": "data_envio"}, {"data": "titulo"}], [1, "desc" ]);
        }, function (response) {
            // Mensagem de erro
            $scope.falhaCarregamento(response);
        });

    }

    $scope.mostarDetalhe = function (chave) {
        console.log($scope.listaNotificacoes[chave]);
    }
    /******* MODAL DE DETALHE ********/
});

