angular.module('trelloApp',
                ['ui.router',
                 'ngMaterial',
                 'ngStorage',
                 'ngCookies']
              )
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$localStorageProvider', '$httpProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $localStorageProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.tmpl.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
      })
    
    $localStorageProvider.setKeyPrefix('trello-')
}])