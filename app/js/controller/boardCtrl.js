module.exports = function ($scope, $stateParams, $state,  api) {
    $scope.nextLevel = "project";
    var convertProject = function(data) {
        return {
            label: data.label,
            urlParams: {
                projectId: data.id
            }
        };
    };

    $scope.addNew = function() {
        $scope.busy = true;
        api.board.add({
            key: $scope.nextLevel
        }, {
            label: "new project",
            id: new Date().getTime(),
            data: new Date().getTime()
        }).then(function(data) {
            $scope.busy = false;
            $state.go("project.edit", {projectId: data.id});
        });
    };
    $scope.content = [];
    $scope.busy = true;

    api.board.get({key: "project"}).then(function(data) {
        $scope.content = data.items.map(function(item, index) {
            return convertProject(item);
        });

        $scope.busy = false;
        $scope.safeApply($scope);
    });
};