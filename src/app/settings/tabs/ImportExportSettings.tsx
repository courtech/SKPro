import React from "react";
import { Upload, Download, FileType, Clock, ArrowRight, ArrowDown } from "lucide-react";

const ImportExportSettings = () => {
  // Mock history data
  const importHistory = [
    { id: 1, filename: "users_data.csv", date: "2023-05-15", status: "Completed", records: 156 },
    { id: 2, filename: "product_catalog.xlsx", date: "2023-04-22", status: "Completed", records: 2450 },
    { id: 3, filename: "customer_orders.csv", date: "2023-03-10", status: "Failed", records: 0 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Import & Export</h2>
      
      <div className="space-y-8">
        {/* Import Section */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Import Data</h3>
          
          <div className="border border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
            <div className="text-center space-y-3">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  Drag and drop files here, or click to select files
                </p>
                <p className="text-xs text-gray-500">
                  Supports CSV, Excel, JSON formats (Max size: 50MB)
                </p>
              </div>
              <button className="px-4 py-2 bg-[#0B51A6] text-white rounded-md text-sm inline-flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Select Files
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <FileType className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">File Options</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Configure file headers and delimiters for the import
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Field Mapping</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Map imported fields to system fields
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <ArrowDown className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Data Validation</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Set rules to validate imported data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Export Section */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Export Data</h3>
          
          <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Export Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="all">All Data</option>
                <option value="users">Users</option>
                <option value="products">Products</option>
                <option value="orders">Orders</option>
                <option value="analytics">Analytics</option>
                <option value="custom">Custom Query</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File Format
              </label>
              <div className="flex flex-wrap gap-2">
                <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="file-format" className="h-4 w-4 text-blue-600 mr-2" defaultChecked />
                  <span className="text-sm">CSV</span>
                </label>
                <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="file-format" className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm">Excel</span>
                </label>
                <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="file-format" className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm">JSON</span>
                </label>
                <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="file-format" className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm">XML</span>
                </label>
              </div>
            </div>
            
            <div className="pt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Include column headers</span>
              </label>
            </div>
            
            <div className="pt-4">
              <button className="px-4 py-2 bg-[#0B51A6] text-white rounded-md text-sm inline-flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>
        
        {/* Import History */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Import History</h3>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Records
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {importHistory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.filename}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {item.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.records.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-right">
            <button className="text-sm text-blue-600">
              View Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportSettings; 