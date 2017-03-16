/// <reference path="../../code/node_modules/definitely-typed-angular/angular.d.ts" />

module app.services {

    export class printersService {
        $httpService: ng.IHttpService;
        $qService: ng.IQService;
        serverPath: string = "http://localhost:3000/api/";
      // serverPath: string = "http://10.35.34.11/TSurvey/api/";
      //var url = "http://10.35.34.11/TSurvey/api/";


        public static $inject = ['$http','$q'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
            this.$httpService = $http;
            this.$qService = $q;
        }

        Post(data: any) {
            var deferred = this.$qService.defer();
            this.$httpService.post(this.serverPath + 'printers/printFile', data).then(response => {
                deferred.resolve(response.statusText);
            }).catch(reason => {
                deferred.reject(reason);
            });
            return deferred.promise;
        }
        get(api: string) {
            var deferred = this.$qService.defer();
            this.$httpService.get(this.serverPath + api).then(response => {
                deferred.resolve(response.data);
            }).catch(reason => {
                deferred.reject(reason);
            });
            return deferred.promise;
        }

    }

    angular.module("app").service("printersService", printersService);

}