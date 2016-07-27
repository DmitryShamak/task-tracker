module.exports = function ($scope, $stateParams, api) {
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
            $scope.content.push(convertProject(data));
            $scope.busy = false;
            $scope.$digest();
        });
    };
    $scope.content = [];
    $scope.busy = true;

    api.board.get({key: "project"}).then(function(data) {
        $scope.content = data.map(function(item, index) {
            return convertProject(item);
        });

        $scope.busy = false;
        $scope.$digest();
    });
};