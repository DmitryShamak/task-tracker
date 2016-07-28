module.exports = function ($scope, $state, user) {
    $scope.authForm = {};

    if($scope.profile) {
        $state.go("board");
    }
    $scope.$on('USER_CONNECT', function () {
        $state.go("board");
    });

    $scope.signIn = function() {
        $scope.errorMessage = null;
        $scope.busy = true;
        $scope.user.signIn($scope.authForm).then(function(result) {
            $scope.busy = false;
            if(result) {
                return $state.go("board");
            }

            $scope.errorMessage = "No such user. Please check email and password.";
            $scope.safeApply($scope);
        });
    };

    $scope.signUp = function() {
        $scope.errorMessage = null;
        $scope.busy = true;
        $scope.user.signUp($scope.authForm).then(function(result) {
            $scope.busy = false;
            if(result) {
                return $state.go("board");
            }

            $scope.safeApply($scope);
        });
    };
};