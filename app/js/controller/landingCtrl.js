module.exports = function ($scope, $state, user) {
    console.log("landing run", user);
    $scope.authorize = function() {
        $state.go("board");
    };
};