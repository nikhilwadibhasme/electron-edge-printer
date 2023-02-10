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
            var edgeprinter = require('electron-edge-printer');
            edgeprinter.getSupportedPageSizesforPrinter('<PrinterPath>', function (error, result) {
                if (error)
                    throw error;
                var lstpageSizes = result;
                console.log('available page sizes:-');
                console.log(lstpageSizes);
            });
            edgeprinter.getSupportedPageOrientationsforPrinter('<PrinterPath>', function (error, result) {
                if (error)
                    throw error;
                var lstpageOrientation = result;
                console.log('available page Orientation:-');
                console.log(lstpageOrientation);
            });
            var PageSizeInfo = {
                printerName: '<PrinterPath>',
                pageSizeName: 'ISOA3'
            };
            edgeprinter.setPageSizeforPrinter(PageSizeInfo, function (error, result) {
                if (error)
                    throw error;
                console.log(result);
            });
            var PageOrientationInfo = {
                printerName: '<PrinterPath>',
                pageOrientation: 'Portrait'
            };
            edgeprinter.setPageOrientationforPrinter(PageOrientationInfo, function (error, result) {
                if (error)
                    throw error;
                console.log(result);
            });
            edgeprinter.getAvailableTraysforPrinter('<PrinterPath>', function (error, result) {
                if (error)
                    throw error;
                console.log('Available Trays for Printer:-');
                console.log(result);
            });
            var PageTrayInfo = {
                printerName: '<PrinterPath>',
                TrayName: 'ns0000:ManualFeed'
            };
            edgeprinter.setTrayforPrinter(PageTrayInfo, function (error, result) {
                if (error)
                    throw error;
                console.log("Page Tray Set " + result);
            });
            edgeprinter.getSupportedOutPutColorsforPrinter('<PrinterPath>', function (error, result) {
                if (error)
                    throw error;
                console.log('Available Output Colors for Printer:-');
                console.log(result);
            });
            var OutputColorInfo = {
                printerName: '<PrinterPath>',
                OutPutColor: 'Grayscale'
            };
            edgeprinter.setOutPutColorforPrinter(OutputColorInfo, function (error, result) {
                if (error)
                    throw error;
                console.log("Output color set " + result);
            });
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
