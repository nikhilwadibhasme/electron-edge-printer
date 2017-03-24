/// <reference path="../../code/node_modules/definitely-typed-angular/angular.d.ts" />

module app {
    'use strict'

    export interface IPrinterFileInfo {
        PrinterName: string;
        filePath: string;
    }

    export interface IQuestion {
        QuestionId: number;
        QuestionDescription: string;
        Rating: number;
        Feedback: string;
    }

    export interface IFeedbackDetails {
        Questions: IQuestion[];
        Pname: string;
        Sname: string;
        Cname: string;
    }

    export class printersCtrl {

        printers: String[];
        printerFileInfo: any;
        rate: number;
        max: number;
        isReadonly: boolean;
        //hoveringOver: (value: string) => void;
        //fetchQuestions: () => void;
        courseName: string;
        ParticipantName: string;
        SupervisorName: string;
        TrainerName: string;
        DateOfCourse: string;
        ParticipantEmail: string;
        DateOfFeedback: Date;
        questions: IQuestion[];
        feedback: IFeedbackDetails;
        filePath: string;
        fileStatus: string;
        defaultPrinter: string;
      //  printers: any;

        constructor(public scope: ng.IScope, public printersService: app.services.printersService, location: ng.ILocationService, filter: ng.IFilterService) {

          var _this = this;
            
          this.fetchPrinters();

          this.fetchDefaultPrinter();


          var edgeprinter = require('electron-edge-printer');
          edgeprinter.getSupportedPageSizesforPrinter('\\\\CSPUDCA01\\EPSON L550 Series', function (error, result) {
              if (error) throw error;
              var lstpageSizes = result;
              console.log('available page sizes:-');
              console.log(lstpageSizes);
          });

          edgeprinter.getSupportedPageOrientationsforPrinter('Canon iR3235/iR3245 PCL6', function (error, result) {
              if (error) throw error;
              var lstpageOrientation = result;
              console.log('available page Orientation:-');
              console.log(lstpageOrientation);
          });


          var PageSizeInfo = {
              printerName: 'Canon iR3235/iR3245 PCL6',
              pageSizeName: 'ISOA3'
          };
          edgeprinter.setPageSizeforPrinter(PageSizeInfo, function (error, result) {
              if (error) throw error;
              console.log(result);
          });

          var PageOrientationInfo = {
              printerName: 'Canon iR3235/iR3245 PCL6',
              pageOrientation: 'Portrait'
          };
          edgeprinter.setPageOrientationforPrinter(PageOrientationInfo, function (error, result) {
              if (error) throw error;
              console.log(result);
          });

        
          edgeprinter.getAvailableTraysforPrinter('Canon iR3235/iR3245 PCL6', function (error, result) {
              if (error) throw error;
              console.log('Available Trays for Printer:-');
              console.log(result);
          });

          var PageTrayInfo = {
              printerName: 'Canon iR3235/iR3245 PCL6',
              TrayName: 'ns0000:ManualFeed'
          };

          edgeprinter.setTrayforPrinter(PageTrayInfo, function (error, result) {
              if (error) throw error;
              console.log("Page Tray Set "+result);
          });

        
          edgeprinter.getSupportedOutPutColorsforPrinter('\\\\cspudca01\\PU_HP_LaserJet_4250_PCL6', function (error, result) {
              if (error) throw error;
              console.log('Available Output Colors for Printer:-');
              console.log(result);
          });

          var OutputColorInfo = {
              printerName: '\\\\cspudca01\\PU_HP_LaserJet_4250_PCL6',
              OutPutColor: 'Grayscale'
          };

          edgeprinter.setOutPutColorforPrinter(OutputColorInfo, function (error, result) {
              if (error) throw error;
              console.log("Output color set " + result);
          });
            
        }

        hoveringOver(value: string): void {
        };

        

        fetchDefaultPrinter(): void {
            var _this = this;
            
            var edgeprinter = require('electron-edge-printer');

            //fetching default printer
            edgeprinter.getDefaultPrinter(null, function (error, result) {
                if (error) throw error;
                _this.defaultPrinter = result;
            });

           

        };

        fetchPrinters(): void {

            var _this = this;
            
            var edgeprinter = require('electron-edge-printer');

            //fetching list of printers
             edgeprinter.getPrinters(null, function (error, result) {
                if (error) throw error;
                _this.printers= result;
            });    
        };

        Sendfile(PrinterName): void {
            var _this = this;

            var printerInfo = {
                printerName: PrinterName,
                fileName: _this.filePath,
                isFileToOpen: false
            };

            var edgeprinter = require('electron-edge-printer');

            return edgeprinter.printFile(printerInfo, function (error, result) {
                if (error) throw error;
                _this.fileStatus = result;
            });     

        };

        public static $inject = ['$scope', 'printersService', '$location', '$filter'];


    }

    angular.module('app').controller('printersCtrl', printersCtrl);
}