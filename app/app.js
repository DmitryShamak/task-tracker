var styles = require("./style/main.scss");
var templates = {
    navigation: require("./templates/navigation.temp"),
    history: require("./templates/history.temp"),
    comments: require("./templates/comments.temp"),
    participant: require("./templates/participant.temp"),
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

            $rootScope.signOut = function() {
                user.signOut();
                $rootScope.profile = null;
                $rootScope.anonymous = true;

                $state.go("landing");
            };

            $rootScope.checkProfile = function() {
                if(!$rootScope.profile) {
                    if($rootScope.anonymous) {
                        return;
                    }
                    user.refresh().then(function(result) {
                        if(result) {
                            $rootScope.profile = result;
                            return $rootScope.$broadcast('USER_LOGGED', $rootScope.profile);
                        }

                        $rootScope.anonymous = true;
                        $state.go("landing");
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
        .controller('ProfileCtrl', require("./js/controller/profileCtrl.js"))

        .directive('navigation', function() {
            return {
                restrict: 'A',
                template: templates.navigation,
                controller: function($scope, $state, user) {
                    $scope.$on("USER_LOGGED", function(event, profile) {
                        $scope.safeApply($scope);
                    });
                }
            }
        })

        .directive('pending', require("./js/directive/pending.js")(templates.pending))
        .directive('history', require("./js/directive/history.js")(templates.history))
        .directive('comments', require("./js/directive/comments.js")(templates.comments))
        .directive('participants', require("./js/directive/participants.js")(templates.participant))

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

