module.exports = function ($scope, $stateParams, $state, api) {
    $scope.nextLevel = "ticket";
    $scope.edit = $state.$current.data.edit || false;
    $scope.content = [];

    $scope.$on('$stateChangeStart', function(event, toState) {
        $scope.edit = toState.data.edit || false;
        $scope.safeApply($scope);
    });

    var convertProject = function(data) {
        return {
            label: data.label,
            urlParams: {
                projectId: data.projectId,
                ticketId: data.id
            }
        };
    };

    $scope.getProject = function() {
        $scope.busy = true;
        api.board.get({key: $scope.nextLevel, detailsKey: "project", id: $stateParams.projectId, projectId: $stateParams.projectId}).then(function(data) {
            $scope.project = data.details;
            $scope.content = data.items.map(function(item, index) {
                return convertProject(item);
            });

            $scope.busy = false;
            $scope.safeApply($scope);
        });
    };

    $scope.onSubmit = function(data) {
        $state.go("project", {projectId: $stateParams.projectId});
    };

    $scope.reset = function() {
        $scope.getProject();
        $state.go("project", {projectId: $stateParams.projectId});
    };

    $scope.addNew = function() {
        $scope.busy = true;
        api.board.add({
            key: $scope.nextLevel
        }, {
            label: "new ticket",
            projectId: $stateParams.projectId,
            id: new Date().getTime(),
            data: new Date().getTime()
        }).then(function(data) {
            $scope.busy = false;
            $state.go("ticket.edit", {projectId: $stateParams.projectId, ticketId: data.id});
        });
    };

    $scope.getProject();
};