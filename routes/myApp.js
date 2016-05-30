var myApp = angular.module('myApp', [
    'ngCookies', 'auth0', 'ui.router', 'angular-jwt', 'angular-storage'
]);

myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider,
                      authProvider, $locationProvider, jwtInterceptorProvider) {

    // For any unmatched url, redirect to /login
    $urlRouterProvider.otherwise('/home');

    // Now set up the states
    $stateProvider
        .state('logout', {
            url: '/logout',
            templateUrl: 'views/logout.html',
            controller: 'LogoutCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('root', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'RootCtrl',
            data: {
                requiresLogin: true
            }
        });


    authProvider.init({
        domain: 'mahesh12.auth0.com',
        clientID: 'tT8knUJcg3m2amqT0FEaHBkbjFKCEOEI',
        loginState: 'login'
    });
    authProvider.on('loginSuccess',function($state,profilePromise,idToken,store){
        console.log("login Success");
        profilePromise.then(function(profile){
            store.set('profile',profile);
            store.set('token',idToken);
        });
        $state.go('root');
    });

    //Called when login fails
    authProvider.on('loginFailure', function() {
        console.log("Error logging in");
        $state.go('/home');
    });
    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');
}).run(function(auth){
auth.hookEvents();
});

