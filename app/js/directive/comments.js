module.exports = function(template) {
    return function() {
        return {
            restrict: 'A',
            template: template,
            link: function(scope, element, attr) {
                scope.ticketId = attr.ticketId;

                scope.busy = true;
                scope.safeApply(scope);
            }
        }
    }
};