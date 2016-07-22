module.exports = function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    //jQuery.ajaxSetup({cache: true});

    $stateProvider
        .state('landing', {
            url: "/",
            template: "<h1>Landing</h1>",
            data: {
                pageTitle: 'Landing'
            },
            controller: "LandingCtrl"
        })
        .state('projects', {
            url: "/projects",
            template: "<h1>Projects</h1>",
            data: {
                pageTitle: 'Projects'
            },
            controller: "LandingCtrl"
        });
};