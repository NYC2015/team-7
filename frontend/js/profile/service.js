'use strict';

var profileService = angular.module('plus.profile');

profileService.service('profileService', function() {
    var service = {};

    service.visibleName = function(viewer, viewed) {
        if(viewer.id === viewed.id)
            return viewed.name;
        if(!viewed['is_anonymous'])
            return viewed.name;
        if(viewed['reveal_to_others'] && viewer.diseases === viewed.diseases)
            return viewed.name;
        return viewed.pseudonym;
    };

    return service;
});
