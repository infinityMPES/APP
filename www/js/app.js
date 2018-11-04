// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material']);
//Essa vari�vel ir� conter as informa��es necess�rias dos ids do app no onesignal
var idsOnesignal = {};

app.run(function ($rootScope, $compile, $state, $ionicPlatform, $ionicHistory, $ionicPopup, $http) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        
        if(!ionic.Platform.is('browser')) {
        	 var notificationOpenedCallback = function(jsonData) {
        	    console.log('Alberto - notificationOpenedCallback: ' + JSON.stringify(jsonData));
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
	    url: '/meus-exames',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/meus-exames.html',
	        controller: 'MeusExamesCtrl'
	      }
	    }
	})
	
	.state('app.acompanhar-exames', {
	    url: '/acompanhar-exames',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/gerenciar-exames.html',
	        controller: 'GerenciarExamesCtrl'
	      }
	    }
	})
	
	.state('app.detalhe-exame', {
	    url: '/detalhe-exame/:exameId',
	    views: {
	      'menuContent': {
	        templateUrl: 'templates/detalhe-exame.html',
	        controller: 'DetalheExamesCtrl'
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
