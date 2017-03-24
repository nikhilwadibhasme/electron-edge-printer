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