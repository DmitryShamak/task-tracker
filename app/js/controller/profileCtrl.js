module.exports = function ($scope, $state, $stateParams, user) {
    $scope.edit = $state.$current.data.edit || false;

    $scope.$on("USER_LOGGED", function(event, profile) {
        $scope.safeApply($scope);
    });

    $scope.$on('$stateChangeStart', function(event, toState) {
        $scope.edit = toState.data.edit || false;
        $scope.safeApply($scope);
    });

    $scope.changeStatus = function() {
        //todo
        var status = $scope.profile.status === "admin" ? "guest" : "admin";
        user.set({
            status: status
        }).then(function(result) {
            user.set(result);
            $scope.safeApply($scope);
        });
    };

    $scope.onSubmit = function(data) {
        //todo: Add validation
        api.board.update({key: "ticket"}, data).then(function(result) {
            $state.go("ticket", {projectId: $stateParams.projectId, ticketId: $stateParams.ticketId});
        });
    };
};