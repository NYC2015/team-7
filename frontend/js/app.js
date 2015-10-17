angular.module("plus", ["ui.router",
    "plus.community",
    "plus.chat",
    "plus.learn",
    "plus.profile",
    "plus.header",
    "ui.bootstrap",
    "plus.registration",
    "plus.login",
]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/community");

    $stateProvider
        .state('login', {
            url: "/login",
            controller: "loginCtrl",
            templateUrl: "js/login/login.html"
        })
        .state('register', {
            url: "/register",
            controller: "registerCtrl",
            templateUrl: "js/register/register.html"
        })
        .state('community', {
            url: "/community",
            controller: "communityCtrl",
            templateUrl: "js/community/community.html"
        })
        .state('chat', {
            url: "/chat",
            controller: "chatCtrl",
            templateUrl: "js/chat/chat.html"
        })
        .state('learn', {
            url: "/learn",
            controller: "learnCtrl",
            templateUrl: "js/learn/learn.html"
        })
        .state('profile', {
            url: "/profile",
            controller: "profileCtrl",
            templateUrl: "js/profile/profile.html"
        });
});
