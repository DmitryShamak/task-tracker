module.exports = function(template) {
    return function(api) {
        return {
            restrict: 'A',
            template: template,
            scope: {
                invite: "=",
                id: "@",
                target: "@"
            },
            link: function(scope, element, attr) {
                scope.users = null;
                scope.searchResult = null;
                scope.inviteForm = {};

                scope.get = function() {
                    scope.busy = true;

                    api.member.get({
                        id: scope.id,
                        target: scope.target
                    }).then(function(users) {
                        scope.users = users;

                        scope.busy = false;
                        scope.$root.safeApply(scope);
                    });
                };

                scope.inviteToProject = function(user, id) {
                    api.member.add({
                        user: user,
                        id: id
                    }).then(function(result) {
                        scope.inviteForm = {};

                        scope.$root.safeApply(scope);
                    });
                };

                scope.search = function(query) {
                    scope.busy = true;

                    return api.member.get(query).then(function(result) {
                        scope.searchResult = result;
                        scope.busy = false;

                        scope.$root.safeApply(scope);
                    });
                };

                scope.get();
            }
        }
    }
};