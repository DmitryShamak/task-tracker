module.exports = function ($scope, $state, $stateParams, api) {
    $scope.projectId = $stateParams.projectId;
    $scope.ticketId = $stateParams.ticketId;
    $scope.edit = $state.$current.data.edit || false;

    $scope.$on('$stateChangeStart', function(event, toState) {
        $scope.edit = toState.data.edit || false;
        $scope.$digest();
    });

    var convertTicket = function(data) {
        return {
            label: data.label,
            urlParams: {
                projectId: data.projectId,
                ticketId: data.id
            }
        };
    };

    $scope.getTicket = function() {
        return api.getTicket({key: "ticket", projectId: $stateParams.projectId, id: $stateParams.ticketId});
    };

    $scope.ticket = null;
    $scope.busy = true;

    $scope.resetTicket = function() {
        $scope.busy = true;
        $scope.getTicket().then(function(data) {
            $scope.ticket = convertTicket(data);

            $scope.busy = false;
            $state.go("ticket", {projectId: $scope.projectId, ticketId: $scope.ticketId});
        });
    };

    $scope.onSubmit = function(data) {
        //todo: Add validation
        api.update({key: "ticket"}, data).then(function(result) {
            $state.go("ticket", {projectId: $scope.projectId, ticketId: $scope.ticketId});
        });
    };

    $scope.getTicket().then(function(data) {
        $scope.ticket = convertTicket(data);

        $scope.busy = false;
        $scope.$digest();
    });
};