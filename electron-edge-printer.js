
var edge = require('electron-edge');

var PrintersAPI={};

PrintersAPI.getDefaultPrinter= edge.func(function()
{/*
	using System.Diagnostics;
	using System.Threading.Tasks;
 	using System.Collections.Generic;
	
	#r "System.Drawing.dll"
	using System.Drawing.Printing;	
	
	#r "System.Drawing.dll"
	using System.Drawing;	
	
  public class Startup
    {
        public async Task<object> Invoke(dynamic input)
        {        
		 PrinterSettings printerSettings = new System.Drawing.Printing.PrinterSettings();
         return printerSettings.PrinterName;
        }
    }

*/});
 

PrintersAPI.getPrinters=edge.func(function()
{/*
	using System.Diagnostics;
	using System.Threading.Tasks;
 	using System.Collections.Generic;
	
	#r "System.Drawing.dll"
	using System.Drawing.Printing;	
	
	#r "System.Drawing.dll"
	using System.Drawing;	
	
	
  public class Startup
    {
        public async Task<object> Invoke(dynamic input)
        {
			List<string> printers = new List<string>();
	
			foreach (string printname in System.Drawing.Printing.PrinterSettings.InstalledPrinters)
			{
				printers.Add(printname);
			}   
			return printers;			
        }
	}

*/});


PrintersAPI.printFile = edge.func(function () {/*
	using System;
	using System.Diagnostics;
	using System.Threading.Tasks;
 	using System.Collections.Generic;
	
	#r "System.Drawing.dll"
	using System.Drawing.Printing;	
	
	#r "System.Drawing.dll"
	using System.Drawing;	
	
    async (dynamic input) => 
	{
				
			try
				{
					var fileProcess = new Process();
					
					if((bool)input.isFileToOpen)
					{
						fileProcess.StartInfo = new ProcessStartInfo()
						{
							UseShellExecute = true,
							FileName = (string)input.fileName
						};
						fileProcess.Start();
					}
				
					
					PrintDocument pdoc = new PrintDocument();
					pdoc.DefaultPageSettings.PrinterSettings.PrinterName = (string)input.printerName;
						
						
					//pdoc.DefaultPageSettings.Landscape = true;
					//pdoc.DefaultPageSettings.PaperSize = new PaperSize("custom", 104, 140);
         
					 using (Process process = new Process())
					{
						
						//	process.StartInfo.FileName = (string)input.fileName;
						//	process.StartInfo.UseShellExecute = true;
						//	process.StartInfo.CreateNoWindow = true;
						//	process.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
						//	process.StartInfo.Arguments = "\"" + (string)input.printerName + "\""; 
						//	process.StartInfo.Verb = "print";
						//	process.Start();
						//	if (!process.HasExited)
						//		process.WaitForExit(5000);
						//	process.EnableRaisingEvents = true;
					
					}
					    ProcessStartInfo gsProcessInfo;
						Process gsProcess;
						gsProcessInfo = new ProcessStartInfo();
						gsProcessInfo.Verb = "PrintTo";
						gsProcessInfo.WindowStyle = ProcessWindowStyle.Hidden;
						gsProcessInfo.FileName = (string)input.fileName;
						gsProcessInfo.Arguments = "\"" + (string)input.printerName + "\"";
						gsProcess = Process.Start(gsProcessInfo);
						if (gsProcess.HasExited == false)
						{
							gsProcess.WaitForExit(5000);
							//gsProcess.Kill();
						}
						gsProcess.EnableRaisingEvents = true;
			
						gsProcess.Close();
					
					
					if((bool)input.isFileToOpen)
					{
						fileProcess.CloseMainWindow();
						// Free resources associated with process.
						fileProcess.Close();
					}
				}
			catch(Exception exception)
				{
					return exception;
				}
			
			return "success"+(string)input.printerName+(string)input.fileName;
    }
*/});


module.exports= PrintersAPI;


