var styles = require("./style/main.scss");
var templates = {
    navigation: require("./templates/navigation.temp"),
    history: require("./templates/history.temp"),
    comments: require("./templates/comments.temp"),
    pending: require("./templates/pending.temp")
};

var User = require("./js/helpers/user.js");

(function() {
    angular.module('app', ['ui.router', 'ngResource'])
        .config(require("./js/config.js"))
        .run(function($rootScope, $state, $injector, $location, user) {
            $rootScope.safeApply = function(scope) {
                if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                    scope.$apply();
                }
            };

            $rootScope.profile = null;

            $rootScope.checkProfile = function() {
                if(!$rootScope.profile) {
                    user.refresh().then(function(result) {
                        if(result) {
                            $rootScope.profile = result;
                            $rootScope.$broadcast('USER_CONNECT');
                        }
                    });
                }
            };

            $rootScope.$on('$stateChangeStart', function(event, toState) {
                $rootScope.pageTitle = toState.data.pageTitle || "Tracker";

                $rootScope.showNavigation = toState.data.navigation || false;
                $rootScope.showFooter = toState.data.footer || false;

                $rootScope.checkProfile();
            });
        })
        .controller('LandingCtrl', require("./js/controller/landingCtrl.js"))
        .controller('BoardCtrl', require("./js/controller/boardCtrl.js"))
        .controller('ProjectCtrl', require("./js/controller/projectCtrl.js"))
        .controller('TicketCtrl', require("./js/controller/ticketCtrl.js"))
        .directive('navigation', function() {
            return {
                restrict: 'A',
                template: templates.navigation,
                controller: function($scope, $state) {
                    $scope.signOut = function() {
                        $scope.user.signOut();
                        $state.go("landing");
                    }
                }
            }
        })

        .directive('pending', require("./js/directive/pending.js")(templates.pending))
        .directive('history', require("./js/directive/history.js")(templates.history))
        .directive('comments', require("./js/directive/comments.js")(templates.comments))

        .factory('api', function() {
            return require("./js/helpers/api.js");
        })
        .factory('user', function(api) {
            if(!User.api) {
                User.api = api.user;
            }

            return User;
        })
        .factory('project', function() {
            return require("./js/helpers/project.js");
        })
        .factory('task', function() {
            return require("./js/helpers/task.js");
        })
        .factory('comment', function() {
            return require("./js/helpers/comment.js");
        })
        .factory('status', function() {
            return require("./js/helpers/status.js");
        });
})();

