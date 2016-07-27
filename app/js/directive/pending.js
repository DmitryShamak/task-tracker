module.exports = function(template) {
    return function() {
        return {
            restrict: 'A',
            template: template
        }
    }
};