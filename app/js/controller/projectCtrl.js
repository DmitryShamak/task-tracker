module.exports = function ($scope, $stateParams, api) {
    $scope.nextLevel = "ticket";

    var convertProject = function(data) {
        return {
            label: data.label,
            urlParams: {
                projectId: data.projectId,
                ticketId: data.id
            }
        };
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
            $scope.content.push(convertProject(data));

            $scope.busy = false;
            $scope.safeApply($scope);
        });
    };
    $scope.content = [];
    $scope.busy = true;

    api.board.get({key: $scope.nextLevel, projectId: $stateParams.projectId}).then(function(data) {
        $scope.content = data.map(function(item, index) {
            return convertProject(item);
        });

        $scope.busy = false;
        $scope.safeApply($scope);
    });
};