PrintersAPI.getDefaultPrinter(null, function (error, result) {
	if (error) throw error;
	console.log(result );
});

PrintersAPI.getPrinters(null, function (error, result) {
	if (error) throw error;
	console.log(result );
});

var printerInfo = {
   printerName:'Canon iR3235/iR3245 PCL6',
   fileName:'C:\\Users\\wadibnik\\Desktop\\Client\\files\\tst.pdf',
   isFileToOpen:false
};

PrintersAPI.printFile(printerInfo, function (error, result) {
    if (error) throw error;
    console.log(result );
});
