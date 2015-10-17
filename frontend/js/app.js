angular.module("plus", [
    "ui.router",
    "plus.community",
    "plus.chat",
    "plus.learn",
    "plus.profile"
]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/community");

    $stateProvider
    .state('community', {
        url: "/community",
        templateUrl: "js/community/community.html",
    })
    .state('chat', {
        url: "/chat",
        templateUrl: "js/chat/chat.html",
    })
    .state('learn', {
        url: "/learn",
        templateUrl: "js/learn/learn.html",
    })
    .state('profile', {
        url: "/profile",
        templateUrl: "js/profile/profile.html",
    });
});
