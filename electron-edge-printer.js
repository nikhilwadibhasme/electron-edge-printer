
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
			
			return "success";
    }
*/});


PrintersAPI.getSupportedPageSizesforPrinter=edge.func(function()
{/*
	using System.Diagnostics;
	using System.Threading.Tasks;
 	using System.Collections.Generic;
	using System.Collections;
		
	#r "System.Drawing.dll"
	using System.Drawing.Printing;	
	
	#r "System.Drawing.dll"
	using System.Drawing;	
	
	#r "ReachFramework.dll"
		
	#r "System.Printing.dll"
	using System.Printing;	
	
  public class Startup
    {
        public async Task<object> Invoke(dynamic input)
        {
		    List<PageMediaSize> availablePaperSizes = new List<PageMediaSize>();

            Startup s = new Startup();
            foreach (PrintQueue printQueue in s.GetPrintQueues())
            {
				if(printQueue.FullName.Equals(input))
				{
					var pCapability = printQueue.GetPrintCapabilities();
					foreach (PageMediaSize paperSize in pCapability.PageMediaSizeCapability)
					{
						availablePaperSizes.Add(paperSize);
					}
					break;
				}
            }

            return availablePaperSizes;	
        }
		
		 private IEnumerable GetPrintQueues()
        {
            PrintServer printServer = new PrintServer();

            PrintQueueCollection printQueues
              = printServer.GetPrintQueues(new[]
            {
				EnumeratedPrintQueueTypes.Local,
				EnumeratedPrintQueueTypes.Connections
            });

            return printQueues;
        }
	}

*/});

PrintersAPI.getSupportedPageOrientationsforPrinter=edge.func(function()
{/*
	using System.Diagnostics;
	using System.Threading.Tasks;
 	using System.Collections.Generic;
	using System.Collections;
		
	#r "System.Drawing.dll"
	using System.Drawing.Printing;	
	
	#r "System.Drawing.dll"
	using System.Drawing;	
	
	#r "ReachFramework.dll"
		
	#r "System.Printing.dll"
	using System.Printing;	
	
  public class Startup
    {
        public async Task<object> Invoke(dynamic input)
        {
		     List<PageOrientation> availablePageOrientations = new List<PageOrientation>();

            Startup s = new Startup();
            foreach (PrintQueue printQueue in s.GetPrintQueues())
            {
                if (printQueue.FullName.Equals(input))
                {
                    var pCapability = printQueue.GetPrintCapabilities();
                    foreach (PageOrientation pageOrientation in pCapability.PageOrientationCapability)
                    {
                        availablePageOrientations.Add(pageOrientation);
                    }
                    break;
                }
            }

            return availablePageOrientations;	
        }
		
		 private IEnumerable GetPrintQueues()
        {
            PrintServer printServer = new PrintServer();

            PrintQueueCollection printQueues
              = printServer.GetPrintQueues(new[]
            {
				EnumeratedPrintQueueTypes.Local,
				EnumeratedPrintQueueTypes.Connections
            });

            return printQueues;
        }
	}

*/});

PrintersAPI.getAvailableTraysforPrinter=edge.func(function()
{/*
	using System.Diagnostics;
	using System.Threading.Tasks;
 	using System.Collections.Generic;
	using System.Collections;
	using System.IO;
	
	#r "System.Xml.dll"
	using System.Xml;
		
	#r "System.Drawing.dll"
	using System.Drawing.Printing;	
	
	#r "System.Drawing.dll"
	using System.Drawing;	
	
	#r "ReachFramework.dll"
		
	#r "System.Printing.dll"
	using System.Printing;	
	
  public class Startup
    {
        public async Task<object> Invoke(dynamic input)
        {
			  Startup s = new Startup();
		      return s.GetInputBins(input);
        }
		
		 public Dictionary<string, string> GetInputBins(string printerName)
        {
            Dictionary<string, string> inputBins = new Dictionary<string, string>();

            Startup s = new Startup();
            foreach (PrintQueue printQueue in s.GetPrintQueues())
            {
                if (printQueue.FullName.Equals((printerName)))
                {
                    // get PrintCapabilities of the printer
                    MemoryStream printerCapXmlStream = printQueue.GetPrintCapabilitiesAsXml();

                    // read the JobInputBins out of the PrintCapabilities
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.Load(printerCapXmlStream);

                    // create NamespaceManager and add PrintSchemaFrameWork-Namespace (should be on DocumentElement of the PrintTicket)
                    // Prefix: psf  NameSpace: xmlDoc.DocumentElement.NamespaceURI = "http://schemas.microsoft.com/windows/2003/08/printing/printschemaframework"
                    XmlNamespaceManager manager = new XmlNamespaceManager(xmlDoc.NameTable);
                    manager.AddNamespace(xmlDoc.DocumentElement.Prefix, xmlDoc.DocumentElement.NamespaceURI);

                    // and select all nodes of the bins
                    //XmlNodeList nodeList = xmlDoc.SelectNodes("//psf:Feature[@name='psk:JobInputBin']/psfSurpriseption", manager);
                    XmlNodeList nodeList = xmlDoc.SelectNodes("//psf:Feature[@name='psk:JobInputBin']/psf:Option/psf:Property", manager);
                    //psf:Feature[@name='psk:PageMediaSize']/psf:Option/psf:Property

                    // fill Dictionary with the bin-names and values
                    foreach (XmlNode node in nodeList)
                    {
                        inputBins.Add(node.LastChild.InnerText, node.Attributes["name"].Value);
                    }

                    return inputBins;

                }
            }

            return null;
        }
		
		 private IEnumerable GetPrintQueues()
        {
            PrintServer printServer = new PrintServer();

            PrintQueueCollection printQueues
              = printServer.GetPrintQueues(new[]
            {
				EnumeratedPrintQueueTypes.Local,
				EnumeratedPrintQueueTypes.Connections
            });

            return printQueues;
        }
	}

*/});

PrintersAPI.setPageSizeforPrinter=edge.func(function()
{/*
	using System.Diagnostics;
	using System.Threading.Tasks;
 	using System.Collections.Generic;
	using System.Collections;
		
	#r "System.Drawing.dll"
	using System.Drawing.Printing;	
	
	#r "System.Drawing.dll"
	using System.Drawing;	
	
	#r "ReachFramework.dll"
		
	#r "System.Printing.dll"
	using System.Printing;	
	
  public class Startup
    {
        public async Task<object> Invoke(dynamic input)
        {
					Startup s = new Startup();
         
                    foreach (PrintQueue printQueue in s.GetPrintQueues())
					{
						if (printQueue.FullName.Equals((string)input.printerName))
						{
							return s.setPageSizeforPrinter(printQueue, (string)input.pageSizeName);
						}
					}
        
				return "error";
        }
		
		 private IEnumerable GetPrintQueues()
        {
            PrintServer printServer = new PrintServer();

            PrintQueueCollection printQueues
              = printServer.GetPrintQueues(new[]
            {
				EnumeratedPrintQueueTypes.Local,
				EnumeratedPrintQueueTypes.Connections
            });

            return printQueues;
        }
		
		  private string setPageSizeforPrinter(PrintQueue queue, string pageMediaSizeName)
        {
            PrintCapabilities printcap = queue.GetPrintCapabilities();

            PageMediaSize pageMediaSizeToSet = null;
            foreach (PageMediaSize pageMediaSize in printcap.PageMediaSizeCapability)
            {
                if (string.Equals(pageMediaSize.PageMediaSizeName.ToString(), pageMediaSizeName))
                {
                    pageMediaSizeToSet = pageMediaSize;
                }
            }

            PrintTicket deltaTicket = new PrintTicket();
            deltaTicket.PageMediaSize = pageMediaSizeToSet;

            ValidationResult result = queue.MergeAndValidatePrintTicket(queue.UserPrintTicket, deltaTicket);

            if (string.Equals(result.ValidatedPrintTicket.PageMediaSize.PageMediaSizeName.ToString(), pageMediaSizeName))
            {
                queue.UserPrintTicket = result.ValidatedPrintTicket;
                queue.Commit();
                return "Success";
            }
            else
            {
                return "error";
            }

        }
	}

*/});

PrintersAPI.setPageOrientationforPrinter=edge.func(function()
{/*
	using System.Diagnostics;
	using System.Threading.Tasks;
 	using System.Collections.Generic;
	using System.Collections;
		
	#r "System.Drawing.dll"
	using System.Drawing.Printing;	
	
	#r "System.Drawing.dll"
	using System.Drawing;	
	
	#r "ReachFramework.dll"
		
	#r "System.Printing.dll"
	using System.Printing;	
	
  public class Startup
    {
		 public async Task<object> Invoke(dynamic input)
        {
					Startup s = new Startup();
         
                    foreach (PrintQueue printQueue in s.GetPrintQueues())
					{
						if (printQueue.FullName.Equals((string)input.printerName))
						{
							return s.setPageOrientationforPrinter(printQueue, (string)input.pageOrientation);
						}
					}
        
				return "error";
        }
        
		
		 private IEnumerable GetPrintQueues()
        {
            PrintServer printServer = new PrintServer();

            PrintQueueCollection printQueues
              = printServer.GetPrintQueues(new[]
            {
				EnumeratedPrintQueueTypes.Local,
				EnumeratedPrintQueueTypes.Connections
            });

            return printQueues;
        }
		
		  private string setPageOrientationforPrinter(PrintQueue queue, string pageOrientation)
        {
           PrintCapabilities printcap = queue.GetPrintCapabilities();
		   PrintTicket deltaTicket = new PrintTicket();
           PageOrientation pOrientation;
		   System.Enum.TryParse(pageOrientation, out pOrientation);
		  
           if (printcap.PageOrientationCapability.Contains(pOrientation))
           {
               deltaTicket.PageOrientation = pOrientation;
           }
     
           ValidationResult result = queue.MergeAndValidatePrintTicket(queue.UserPrintTicket, deltaTicket);
        
           if (result.ValidatedPrintTicket.PageOrientation== pOrientation)
           {
               queue.UserPrintTicket = result.ValidatedPrintTicket;
               queue.Commit();
               return "Success";
           }
           else
           {
               return "error";
           }

        }
	}

*/});


module.exports= PrintersAPI;


