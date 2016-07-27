module.exports = function ($scope, $state, $stateParams, api) {
    $scope.projectId = $stateParams.projectId;
    $scope.edit = $state.$current.data.edit || false;

    $scope.$on('$stateChangeStart', function(event, toState) {
        $scope.edit = toState.data.edit || false;
        $scope.$digest();
    });

    $scope.getTicket = function() {
        return api.board.getTicket({key: "ticket", projectId: $stateParams.projectId, id: $stateParams.ticketId});
    };

    $scope.ticket = null;
    $scope.busy = true;

    $scope.resetTicket = function() {
        $scope.busy = true;
        $scope.getTicket().then(function(data) {
            $scope.ticket = data;

            $scope.busy = false;
            $state.go("ticket", {projectId: $stateParams.projectId, ticketId: $stateParams.ticketId});
        });
    };

    $scope.onSubmit = function(data) {
        //todo: Add validation
        api.board.update({key: "ticket"}, data).then(function(result) {
            $state.go("ticket", {projectId: $stateParams.projectId, ticketId: $stateParams.ticketId});
        });
    };

    $scope.getTicket().then(function(data) {
        $scope.ticket = data;

        $scope.busy = false;
        $scope.$digest();
    });
};