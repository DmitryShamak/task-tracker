module.exports = function ($scope, $state) {
    $scope.authForm = {};

    $scope.busy = true;
    $scope.user.refresh().then(function(result) {
        $scope.busy = false;
        if(result) {
            $state.go("board");
        }
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
            $scope.$digest();
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

            $scope.$digest();
        });
    };
};