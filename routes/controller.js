var myApp = angular.module('myApp');

myApp.controller('MsgCtrl', function ($scope, auth) {

});

myApp.controller('RootCtrl', function (auth, $scope,$http,store) {
    if(auth.isAuthenticated){
        var token = store.get('token')
        window.alert(token);
        if(token)
        {
           $http.get('/api/admin',function(req,res){

           })

        }
    }

});

myApp.controller('LoginCtrl', function (auth, $scope, $cookies, $state) {
    $scope.email = '';
    $scope.password = '';

    function onLoginSuccess() {

        $state.go('root');
        $scope.loading = false;
    }

    function onLoginFailed() {

        $scope.loading = false;
    }

    $scope.adminsubmit = function () {

        $scope.loading = true;

        auth.signin({
            sso:false,
            connection: 'Username-Password-Authentication',
            username: $scope.email,
            password: $scope.password,
        }, onLoginSuccess, onLoginFailed);
    };
});

myApp.controller('LogoutCtrl', function (auth, $scope, $state, store) {
    auth.signout();
    store.remove('profile');
    store.remove('token');

    $state.go('login');
});
