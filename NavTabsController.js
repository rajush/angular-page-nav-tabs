'use strict';

app.controller("NavTabsController", ['$scope','$state', function($scope,$state){

    $scope.goto = function(tab, location){

        var url,
            template = 'main.';

        switch(location){

            case 'AreaManagement':
                switch(tab){
                    case 'Area Management':
                        url = template + 'areaManagement.main';
                        break;
                    case 'Add Area':
                        url = template + 'areaManagement.addArea';
                        break;
                    case 'Edit Area':
                        url = template + 'areaManagement.editArea';
                        break;
                }
                break;

            case 'Dashboard':
                switch(tab){
                    case 'Dashboard':
                        url = template + 'dashboard.main';
                        break;
                    case 'Control Desk':
                        url = template + 'dashboard.controlDesk';
                        break;
                    case 'Area':
                        url = template + 'dashboard.area';
                        break;
                }
                break;

        }
        $state.go(url);
    }

}]);
