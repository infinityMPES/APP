// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material', '720kb.datepicker', 'ngCordova']);
//Essa vari�vel ir� conter as informa��es necess�rias dos ids do app no onesignal
var idsOnesignal = {};
var db = null;
var jsonDataParametro = {};
//Login do Usuário
var loginData = null;

app.run(function ($rootScope, $compile, $state, $ionicPlatform, $ionicHistory, $ionicPopup, $http, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        
        var limparIntervalo = function (intervalo) {
            clearInterval(intervalo);
        };
        
        var intervalo;
        
        if(!ionic.Platform.is('browser')) {
        		
        	  screen.orientation.lock('portrait');
        	
        	  var notificationOpenedCallback = function(jsonData) {
        		jsonDataParametro = jsonData;
          	    console.log('Alberto - notificationOpenedCallback: ' + JSON.stringify(jsonData));
          	    if(jsonData.notification.payload.additionalData.acao != undefined){
          	    	console.log(jsonData.notification.payload.additionalData);
          	    	if(loginData != null){
	  	    			if(jsonData.notification.payload.additionalData.parametros != undefined){
	          	    		$state.go(jsonData.notification.payload.additionalData.acao, jsonData.notification.payload.additionalData.parametros);
	          	    	}else{
	          	    		$state.go(jsonData.notification.payload.additionalData.acao);
	          	    	}
	  	    		 }else{
	  	    			 // iniciando os intervalos
	           	    	 intervalo = setInterval(function(){
	           	    		 // caso o usuário tenha sido informado
	           	    		 if(jsonDataParametro != null){
	           	    			if(jsonDataParametro.notification.payload.additionalData.parametros != undefined){
	                   	    		$state.go(jsonDataParametro.notification.payload.additionalData.acao, jsonDataParametro.notification.payload.additionalData.parametros);
	                   	    	}else{
	                   	    		$state.go(jsonDataParametro.notification.payload.additionalData.acao);
	                   	    	}
	           	    			limparIntervalo(intervalo);
	           	    		 }else{
	           	    			console.log(loginData);
	           	    		 }
	           	        }, 500);
	  	    		 }
          	    }
          	  };

        	  window.plugins.OneSignal
        	    .startInit(Constantes.APP_ID)
        	    .handleNotificationOpened(notificationOpenedCallback)
        	    .endInit();
        	  
        	  window.plugins.OneSignal.getIds(function(ids) {
        		  // Setando os id do one signal numa vari�vel global
        		  idsOnesignal = ids;
        		  console.log("Ids Onesignal: " + JSON.stringify(ids));
//        		  var notificationObj = { contents: {en: "message body"},
//        		                          include_player_ids: [ids.userId]};
//        		  window.plugins.OneSignal.postNotification(notificationObj,
//        		    function(successResponse) {
//        		      console.log("Notification Post Success:", successResponse);
//        		    },
//        		    function (failedResponse) {
//        		      console.log("Notification Post Failed: ", failedResponse);
//        		      alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
//        		    }
//        		  );
        		});
    	} else {
    		Notification.shcedule = function(id, title, text, config) {}		
    	}
    });
})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    
    .state('app.esqueci-senha', {
        url: '/esqueci-senha',
        views: {
            'menuContent': {
                templateUrl: 'templates/esqueci-senha.html',
                controller: 'LoginCtrl'
            }
        }
    })
    
    .state('app.cadastar-paciente', {
        url: '/cadastar-paciente',
        views: {
            'menuContent': {
                templateUrl: 'templates/cadastrar-paciente.html',
                controller: 'CadastroPacienteCtrl'
            }
        }
    })
    
    .state('app.inicio', {
        url: '/inicio',
        views: {
            'menuContent': {
                templateUrl: 'templates/inicio.html',
                controller: 'InicioCtrl'
            }
        }
    })
    
    .state('app.gerenciar-usuario', {
            url: '/gerenciar-usuario',
            views: {
                'menuContent': {
                    templateUrl: 'templates/gerenciar-usuarios.html',
                    controller: 'GerenciarUsuariosCtrl'
                }
            }
    })
    
    .state('app.editar-usuario', {
    	cache: false,
	    url: '/editar-usuario/:usuarioId',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/editar-usuario.html',
	        controller: 'EditarUsuariosCtrl'
	      }
	    }
	})
    
    .state('app.cadastrar-usuario', {
    	
	    url: '/cadastrar-usuario',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/cadastrar-usuario.html',
	        controller: 'CadastroUsuariosCtrl'
	      }
	    }
	})
	
	.state('app.cadastrar-exames', {
	    url: '/cadastrar-exames',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/cadastrar-exames.html',
	        controller: 'CadastroExamesCtrl'
	      }
	    }
	})
	
	.state('app.meus-exames', {
		cache: false,
	    url: '/meus-exames',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/meus-exames.html',
	        controller: 'MeusExamesCtrl'
	      }
	    }
	})
	
	.state('app.acompanhar-exames', {
		cache: false,
	    url: '/acompanhar-exames',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/gerenciar-exames.html',
	        controller: 'GerenciarExamesCtrl'
	      }
	    }
	})
	
	.state('app.detalhe-exame', {
		cache: false,
	    url: '/detalhe-exame/:exameId',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/detalhe-exame.html',
	        controller: 'DetalheExamesCtrl'
	      }
	    }
	})
	
	.state('app.minhas-notificacoes', {
		cache: false,
	    url: '/minhas-notificacoes',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/minhas-notificacoes.html',
	        controller: 'MinhasNotificacoesCtrl'
	      }
	    }
	})
	
	.state('app.gerenciar-notificacoes', {
	    url: '/gerenciar-notificacoes',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/gerenciar-notificacoes.html',
	        controller: 'GerenciarNotificacoesCtrl'
	      }
	    }
	})
        
    .state('app.detalhe-notificacao', {
    	cache: false,
	    url: '/detalhe-notificacao/:notificacaoId',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/detalhe-notificacao.html',
	        controller: 'DetalheNotificacoesCtrl'
	      }
	    }
	})
	
	.state('app.cadastrar-agendamento', {
	    url: '/cadastrar-agendamento',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/cadastrar-agendamento.html',
	        controller: 'CadastroAgendamentoCtrl'
	      }
	    }
	})
	
	.state('app.meus-agendamentos', {
		cache: false,
	    url: '/meus-agendamentos',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/meus-agendamentos.html',
	        controller: 'MeusAgendamentosCtrl'
	      }
	    }
	})
	
	.state('app.gerenciar-agendamento', {
	    url: '/gerenciar-agendamento',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/gerenciar-agendamento.html',
	        controller: 'GerenciarAgendamentoCtrl'
	      }
	    }
	})
	
	.state('app.detalhe-agendamento', {
		cache: false,
	    url: '/detalhe-agendamento/:agendamentoId',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/detalhe-agendamento.html',
	        controller: 'DetalheAgendamentoCtrl'
	      }
	    }
	})
	
	.state('app.thread-notificacao', {
    	cache: false,
        url: '/thread-notificacao/:notificacaoId',
    	views: {
  	      'menuContent': {
  	        templateUrl: 'templates/thread-notificacao.html',
  	        controller: 'ThreadCtrl'
  	      }
  	    }
    })
    
    .state('app.thread-notificacao-equipe', {
    	cache: false,
        url: '/thread-notificacao-equipe/:notificacaoId',
    	views: {
  	      'menuContent': {
  	        templateUrl: 'templates/thread-notificacao-equipe.html',
  	        controller: 'ThreadEquipeCtrl'
  	      }
  	    }
    })
	
	.state('app.servicos-imip', {
	    url: '/servicos-imip',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/servicos-imip.html',
	        controller: 'ServicosImipCtrl'
	      }
	    }
	})
	
    
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    
    

    .state('app.lists', {
            url: '/lists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/lists.html',
                    controller: 'ListsCtrl'
                }
            }
        })

    .state('app.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('app.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
