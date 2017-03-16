
var electron = require('electron');
var app = electron.app;

var browser = electron.BrowserWindow;

app.on('ready', function () {
    var window = new browser({
        width: 1800, height: 1600, title: 'Trunk.Client'
    });

window.webContents.session.clearCache(function () { });
window.loadURL(<UrlToLoad>);
//window.webContents.openDevTools();

})