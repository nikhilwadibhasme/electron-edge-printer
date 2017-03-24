
> Node Module for implementing printer functionality using electron-edge

### Features:

* compatible with electron : "1.4.13";
* compatible with electron-edge : "^6.5.3",
* compatible with node v6.10.0
* `getPrinters()` to enumerate all installed printers;
* `getDefaultPrinter` to get Default Printer assigned to machine;
* `printFile(FileName,printerName)` Print the specified file to the provided Printer
* `getSupportedPageSizesforPrinter(printerName)` to get Supported Page Sizes for provided Printer
* `getSupportedPageOrientationsforPrinter(printerName)` to get Supported Orientations for provided Printer
* `getAvailableTraysforPrinter(printerName)` to get Available Trays for provided Printer
* `setPageSizeforPrinter(printerName,pageSizeName)` to Set given Page Size for provided Printer
* `setPageOrientationforPrinter(printerName,pageOrientation)` to Set given page Orientation for provided Printer
* `setTrayforPrinter(printerName,TrayName)` to Set given Tray for provided Printer **(Note:- This method need to be tested)**


## Install

```
$ npm install electron-edge-printer
```
## Setup

```
Inside Client.js
Set <UrlToLoad> to web page path in 
window.loadURL(<UrlToLoad>);

$ cd Examples\Client\code\

$ npm install 

$ bower install 

$ npm start 

```
### How to use:

Sample Web Page Using Angular 1.5 and electron-edge-printer

See [example](https://github.com/nikhilwadibhasme/electron-edge-printer/tree/master/Examples/Client)

## License

MIT © [Nikhil Wadibhasme](https://www.npmjs.com/package/electron-edge-printer)
