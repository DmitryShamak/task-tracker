var styles = require("./style/main.scss");
var templates = {
  navigation: require("./templates/navigation.temp"),
  history: require("./templates/history.temp")
};

(function() {
    angular.module('app', ['ui.router', 'ngResource'])
        .config(require("./js/config.js"))
        .run(function($rootScope, $state, $injector, $location) {
            $rootScope.$on('$stateChangeStart', function(event, toState) {
                $rootScope.pageTitle = toState.data.pageTitle || "Tracker";
            });
        })
        .controller('LandingCtrl', function ($scope, user) {
            console.log("landing run", user);
            $scope.say = function(msg) {
                console.info(msg);
            };
        })
        .directive('navigation', function() {
            return {
                restrict: 'A',
                template: templates.navigation
            }
        })
        .directive('history', function() {
            return {
                restrict: 'A',
                template: templates.history
            }
        })
        .factory('api', function() {
            return require("./js/helpers/api.js");
        })
        .factory('user', function() {
            return require("./js/helpers/user.js");
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

