module.exports = function(template) {
    return function(participant) {
        return {
            restrict: 'A',
            template: template,
            link: function(scope, element, attr) {
                scope.users = null;
                scope.searchResult = null;

                scope.get = function() {
                    scope.busy = true;

                    participant.get({
                        id: attr.id,
                        target: attr.target
                    }).then(function(users) {
                        scope.users = users;

                        scope.busy = false;
                        scope.safeApply(scope);
                    });
                };

                scope.search = function(query) {
                    scope.busy = true;

                    return participant.search(query).then(function(result) {
                        scope.searchResult = result;
                        scope.busy = false;

                        scope.safeApply(scope);
                    });
                };

                scope.get();
            }
        }
    }
};