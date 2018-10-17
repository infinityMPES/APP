// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material']);

app.run(function ($ionicPlatform) {
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
    		Notification.shcedule = function(id, title, text, config) {
    			var message 	  	   = {};
    			message.id 	  	  	   = id;    // Um id exclusivo da notificação, melhor usar um valor numérico
    			message.title     	   = title; // O título da mensagem
    			message.text	  	   = text;  // A mensagem
    			if(config == null) {
    				message.at		   = null;  // Quando mostrar a notificacão
    				message.every 	   = null;  // A cada 'minuto', 'hora', 'dia', 'semana', 'mes', 'ano'
    				message.badge 	   = null;  // Exibe um número no ícone da aplicação
    				message.sound	   = null;  // O Som a ser reproduzido ao receber a mensagem
    				message.ongoing    = false; // Impedir limpar a notificação (apenas Android)		
    				message.autoClear  = false; // A notificação é cancelada quando o usuário clicar
    			} else {
    				for(var x in config) {
    					message[x] = config[x]; 
    				}
    			}
    			cordova.plugins.notification.local.schedule(message);
    		}
    		Notification.on = function(typeTrigger, callback) {
    			cordova.plugins.notification.local.on(typeTrigger, function (notification, state) {
    				callback(notification, state);
    			});
    		};
    		Notification.notificationOpenedHandle = function(json) {

    		    $state.go('app.inicio');
    		}
    		window.plugins.OneSignal.startInit(Constantes.APP_ID).handleNotificationOpened(Notification.notificationOpenedHandle).endInit();
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
