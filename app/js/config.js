module.exports = function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    jQuery.ajaxSetup({cache: true});
    var templates = {
        landing: require("../html/landing.html"),
        board: require("../html/board.html"),
        project: require("../html/project.html"),
        ticket: require("../html/ticket.html"),
        profile: require("../html/profile.html")
    };

    $stateProvider
        .state('landing', {
            url: "/",
            template: templates.landing,
            data: {
                pageTitle: 'Landing'
            },
            controller: "LandingCtrl"
        })
        .state('board', {
            url: "/board",
            template: templates.board,
            data: {
                pageTitle: 'Board',
                navigation: true,
                footer: false,
                level: 0
            },
            controller: "BoardCtrl"
        })
        .state('project', {
            url: "/board/:projectId",
            template: templates.project,
            data: {
                pageTitle: 'Project',
                navigation: true,
                footer: false,
                level: 1
            },
            controller: "ProjectCtrl"
        })
        .state('project.edit', {
            url: "/edit",
            template: templates.project,
            data: {
                pageTitle: 'Project',
                navigation: true,
                edit: true,
                footer: false,
                level: 1
            },
            controller: "ProjectCtrl"
        })
        .state('ticket', {
            url: "/board/:projectId/:ticketId",
            template: templates.ticket,
            data: {
                pageTitle: 'Ticket',
                navigation: true,
                footer: false,
                level: 1
            },
            controller: "TicketCtrl"
        })
        .state('ticket.edit', {
            url: "/edit",
            template: templates.ticket,
            data: {
                pageTitle: 'Ticket',
                edit: true,
                navigation: true,
                footer: false,
                level: 1
            },
            controller: "TicketCtrl"
        })
        .state('profile', {
            url: "/profile",
            template: templates.profile,
            data: {
                pageTitle: 'Profile',
                edit: false,
                navigation: true,
                footer: false,
                level: 1
            },
            controller: "ProfileCtrl"
        });
};