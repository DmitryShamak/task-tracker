module.exports = function(template) {
    return function() {
        return {
            restrict: 'A',
            template: template,
            link: function(scope, $stateParams, user) {
                //console.log("history", $stateParams, user);
            }
        }
    }
};