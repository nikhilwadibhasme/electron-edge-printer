/// <reference path="../../code/node_modules/definitely-typed-angular/angular.d.ts" />
var app;
(function (app) {
    var services;
    (function (services) {
        var printersService = (function () {
            function printersService($http, $q) {
                this.$http = $http;
                this.$q = $q;
                this.serverPath = "http://localhost:3000/api/";
                this.$httpService = $http;
                this.$qService = $q;
            }
            printersService.prototype.Post = function (data) {
                var deferred = this.$qService.defer();
                this.$httpService.post(this.serverPath + 'printers/printFile', data).then(function (response) {
                    deferred.resolve(response.statusText);
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            };
            printersService.prototype.get = function (api) {
                var deferred = this.$qService.defer();
                this.$httpService.get(this.serverPath + api).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            };
            printersService.$inject = ['$http', '$q'];
            return printersService;
        }());
        services.printersService = printersService;
        angular.module("app").service("printersService", printersService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
