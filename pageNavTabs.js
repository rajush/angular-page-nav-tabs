'use strict';

app.directive("pageNavTabs", [function(){
    return{
        restrict: 'E, A',
        template:
            '<div class="row breadNav">'+
                '<div class="col-md-12">'+
                    '<small>'+
                        '<ol class="breadcrumb">'+
                            '<i class="fa fa-fw fa-home"></i>'+
                            '<li ng-repeat="tab in navtabs" ><a ng-click="goto(tab, location)">{{tab}}</a></li>'+
                        '</ol>'+
                    '</small>'+
                '</div>'+
            '</div>',
        controller: 'NavTabsController',
        scope:{
            navtabs: '=',
            location: '@'
        },
        link: function (scope, element) {
            element.on('mouseenter', function() {
                element.css('cursor','pointer');
            });
            element.on('mouseleave', function() {
                element.css('cursor','initial');
            });
        }
    }
}]);

app.factory("PageNavTabsService", ['$cookieStore', function($cookieStore){

    var navtabs = $cookieStore.get('navtabs') || {},

    setTab = function(tabObj){

        var _id =  Object.getOwnPropertyNames(tabObj),
            id = parseInt(_id);

        try {
            if (isNaN(id)) {
                throw new TypeError('Expecting an object property to be an integer');
            };

            var navtabsKeys, navtabsLength, keyIndex;

            if (tabObj[id] != undefined) {
                navtabs[id] = tabObj[id];
                navtabsKeys = Object.keys(navtabs);
                navtabsLength = navtabsKeys.length;
                if (id === 1 && navtabsLength > 1){
                    var i, x;
                    for(i = 1; i < navtabsLength; i++){
                        x = i + 1;
                        delete navtabs[x];
                    }
                }else{
                    $cookieStore.put("navtabs", navtabs);
                    keyIndex = navtabsKeys.indexOf(_id[0]);

                    var _key = keyIndex + 1,
                        i, x;
                    for(i = _key; i < navtabsLength; i++){
                        x = i + 1;
                        delete navtabs[x];
                    }
                }
            };
        }
        catch (e) {
            console.error(e.stack);
        }
    },

    getTabs = function(){
        return navtabs;
    },
    clearTabs = function(){
        $cookieStore.remove('navtabs');
    }

    return{
        setTab: setTab,
        getTabs: getTabs,
        clearTabs: clearTabs
    }
}]);
