/// <reference path="../../code/node_modules/definitely-typed-angular/angular.d.ts" />
var app;
(function (app) {
    'use strict';
    var printersCtrl = (function () {
        //  printers: any;
        function printersCtrl(scope, printersService, location, filter) {
            this.scope = scope;
            this.printersService = printersService;
            var _this = this;
            this.fetchPrinters();
            this.fetchDefaultPrinter();
        }
        printersCtrl.prototype.hoveringOver = function (value) {
        };
        ;
        printersCtrl.prototype.fetchDefaultPrinter = function () {
            var _this = this;
            var edgeprinter = require('electron-edge-printer');
            //fetching default printer
            edgeprinter.getDefaultPrinter(null, function (error, result) {
                if (error)
                    throw error;
                _this.defaultPrinter = result;
            });
        };
        ;
        printersCtrl.prototype.fetchPrinters = function () {
            var _this = this;
            var edgeprinter = require('electron-edge-printer');
            //fetching list of printers
            edgeprinter.getPrinters(null, function (error, result) {
                if (error)
                    throw error;
                _this.printers = result;
            });
        };
        ;
        printersCtrl.prototype.Sendfile = function (PrinterName) {
            var _this = this;
            var printerInfo = {
                printerName: PrinterName,
                fileName: _this.filePath,
                isFileToOpen: false
            };
            var edgeprinter = require('electron-edge-printer');
            return edgeprinter.printFile(printerInfo, function (error, result) {
                if (error)
                    throw error;
                _this.fileStatus = result;
            });
        };
        ;
        printersCtrl.$inject = ['$scope', 'printersService', '$location', '$filter'];
        return printersCtrl;
    }());
    app.printersCtrl = printersCtrl;
    angular.module('app').controller('printersCtrl', printersCtrl);
})(app || (app = {}));
