angular.module("plus", ["ui.router",
    "plus.community",
    "plus.chat",
    "plus.learn",
    "plus.profile",
    "plus.header"
]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/community");

    $stateProvider
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
