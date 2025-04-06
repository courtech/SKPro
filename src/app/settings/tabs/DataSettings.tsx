import React from "react";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

const DataSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Data Configuration</h2>
      
      <div className="space-y-6">
        {/* Database Connection */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Database Connection</h3>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Connected</span>
              </div>
              <button className="text-sm text-blue-600 flex items-center">
                <RefreshCw className="h-4 w-4 mr-1" />
                Test Connection
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Database Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="mysql">MySQL</option>
                  <option value="postgres">PostgreSQL</option>
                  <option value="mssql">SQL Server</option>
                  <option value="mongodb">MongoDB</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Host
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="localhost"
                  value="db.example.com"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Port
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="3306"
                  value="3306"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Database Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="mydb"
                  value="skpro_production"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="username"
                  value="db_user"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value="********"
                  readOnly
                />
              </div>
            </div>
            
            <div className="mt-4">
              <button className="px-4 py-2 bg-[#0B51A6] text-white rounded-md text-sm">
                Update Connection
              </button>
            </div>
          </div>
        </div>
        
        {/* Data Synchronization */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Data Synchronization</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div>
                <h4 className="font-medium">Auto Synchronization</h4>
                <p className="text-sm text-gray-500">Automatically sync data between systems</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Sync Frequency</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Last sync: 15 minutes ago</span>
                  <button className="text-blue-600">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
                <option value="60">Every hour</option>
                <option value="360">Every 6 hours</option>
                <option value="720">Every 12 hours</option>
                <option value="1440">Every day</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Data Retention */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Data Retention</h3>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logs Retention Period
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Analytics Data Retention
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                  <option value="730">2 years</option>
                  <option value="forever">Forever</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input
                  id="auto-archive"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="auto-archive" className="text-sm text-gray-700">
                  Automatically archive old data before deletion
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center p-4 border border-gray-200 rounded-md bg-yellow-50">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-sm text-yellow-700">
              Changing retention settings will affect future data processing. Data that exceeds the retention period may be automatically deleted.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSettings; 