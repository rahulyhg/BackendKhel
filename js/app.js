// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ngRoute',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(
    function($routeProvider, uiSelectConfig) {

        //        uiSelectConfig.theme = 'bootstrap';
        //        uiSelectConfig.resetSearchInput = true;
        //        uiSelectConfig.appendToBody = true;


        $routeProvider.
        when('/login', {
            templateUrl: 'views/template.html',
            controller: 'login'
        }).
        when('/home', {
            templateUrl: 'views/template.html',
            controller: 'home'
        }).
        when('/user', {
                templateUrl: 'views/template.html',
                controller: 'UserCtrl'
            }).when('/createuser', {
                templateUrl: 'views/template.html',
                controller: 'createUserCtrl'
            }).when('/edituser/:id', {
                templateUrl: 'views/template.html',
                controller: 'editUserCtrl'
            }).when('/team', {
                templateUrl: 'views/template.html',
                controller: 'TeamCtrl'
            }).when('/createteam', {
                templateUrl: 'views/template.html',
                controller: 'createTeamCtrl'
            }).when('/editteam/:id', {
                templateUrl: 'views/template.html',
                controller: 'editTeamCtrl'
            }).when('/slider', {
                templateUrl: 'views/template.html',
                controller: 'SliderCtrl'
            }).when('/createslider', {
                templateUrl: 'views/template.html',
                controller: 'createSliderCtrl'
            }).when('/editslider/:id', {
                templateUrl: 'views/template.html',
                controller: 'editSliderCtrl'
            }).when('/schedule', {
                templateUrl: 'views/template.html',
                controller: 'ScheduleCtrl'
            }).when('/createschedule', {
                templateUrl: 'views/template.html',
                controller: 'createScheduleCtrl'
            }).when('/editschedule/:id', {
                templateUrl: 'views/template.html',
                controller: 'editScheduleCtrl'
            }).when('/folder', {
                templateUrl: 'views/template.html',
                controller: 'FolderCtrl'
            }).when('/createfolder', {
                templateUrl: 'views/template.html',
                controller: 'createFolderCtrl'
            }).when('/editfolder/:id', {
                templateUrl: 'views/template.html',
                controller: 'editFolderCtrl'
            }).when('/notification', {
                templateUrl: 'views/template.html',
                controller: 'NotificationCtrl'
            }).when('/createnotification', {
                templateUrl: 'views/template.html',
                controller: 'createNotificationCtrl'
            }).when('/editnotification/:id', {
                templateUrl: 'views/template.html',
                controller: 'editNotificationCtrl'
            }).when('/sponsors', {
                templateUrl: 'views/template.html',
                controller: 'SponsorsCtrl'
            }).when('/createsponsors', {
                templateUrl: 'views/template.html',
                controller: 'createSponsorsCtrl'
            }).when('/editsponsors/:id', {
                templateUrl: 'views/template.html',
                controller: 'editSponsorsCtrl'
            }).when('/winner', {
                templateUrl: 'views/template.html',
                controller: 'WinnerCtrl'
            }).when('/createwinner', {
                templateUrl: 'views/template.html',
                controller: 'createWinnerCtrl'
            }).when('/editwinner/:id', {
                templateUrl: 'views/template.html',
                controller: 'editWinnerCtrl'
            }).when('/agegrp', {
                templateUrl: 'views/template.html',
                controller: 'AgegrpCtrl'
            }).when('/createagegrp', {
                templateUrl: 'views/template.html',
                controller: 'createAgegrpCtrl'
            }).when('/editagegrp/:id', {
                templateUrl: 'views/template.html',
                controller: 'editAgegrpCtrl'
            }).when('/videogallery', {
                templateUrl: 'views/template.html',
                controller: 'VideogalleryCtrl'
            }).when('/createvideogallery', {
                templateUrl: 'views/template.html',
                controller: 'createVideogalleryCtrl'
            }).when('/editvideogallery/:id', {
                templateUrl: 'views/template.html',
                controller: 'editVideogalleryCtrl'
            }).when('/version', {
                templateUrl: 'views/template.html',
                controller: 'VersionCtrl'
            }). //Add New Path

        otherwise({
            redirectTo: '/login'
        });
    });
firstapp.filter('uploadpath', function() {
    return function(input) {
        return adminurl + "uploadfile/resize?file=" + input;
    };
});

firstapp.directive('array', function() {
    return {
        restrict: 'EA',
        scope: {
            GalleryStructure: "=objval",
            EditVal: "=editval",
            ModelObj: "=modelobj"
        },
        replace: false,
        templateUrl: "views/directive/array.html",
        link: function($scope, element, attr) {
            var GalleryStructure = $scope.GalleryStructure;
            var EditVal = $scope.EditVal;
            $scope.label = attr.label;
            $scope.GalleryStrucObj = {};
            $scope.GalleryStrucObj.keyOf = [];
            $scope.keyOfArr = _.pluck(GalleryStructure, "name");
            _.each($scope.keyOfArr, function(n) {
                $scope.GalleryStrucObj.keyOf.push(_.camelCase(n).toLowerCase());
            });
            $scope.GalleryStrucObj.structure = GalleryStructure;
            $scope.GalleryStrucObj.valuesOf = [];
            $scope.GalleryStrucObj.valuesOf = EditVal;
            $scope.GalleryStrucObj.nullObj = {};
            _.each($scope.GalleryStrucObj.keyOf, function(n, key) {
                $scope.GalleryStrucObj.nullObj[n] = "";
            });
            $scope.GalleryStrucObj.add = function() {
                $scope.GalleryStrucObj.valuesOf.push(_.clone($scope.GalleryStrucObj.nullObj, true));
            };
            $scope.GalleryStrucObj.remove = function(obj) {
                var objkey = _.remove($scope.GalleryStrucObj.valuesOf, obj);
            };
            $scope.EditVal = $scope.GalleryStrucObj.valuesOf;
        }
    }
});

firstapp.directive('createovalidation', function() {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attr) {
            $element = $(element);
            var validation = $scope[attr.createovalidation].structure[attr.objkey].validation;
            _.each(validation, function(n) {
                var m = n.split("=");
                if (!m[1]) {
                    m[1] = "";
                }
                $element.attr(m[0], m[1]);
            });
        }
    }
});


firstapp.directive('capitalizeFirst', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                var capitalized = inputValue.charAt(0).toUpperCase() +
                    inputValue.substring(1);
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
    };
});

firstapp.filter('touppercase', function() {
    return function(input) {
        var firstletter = input.substr(0, 1);
        var remaining = input.substr(1);
        return firstletter.toUpperCase() + remaining;
    };
});

firstapp.filter('rmext', function() {
    return function(input) {
        if (input) {
            var split = input.split('.');
            return split[0];
        } else {
            return input;
        }
    };
});
