import React from "react";
import { BellRing, Mail, MessageSquare, AlertTriangle, CheckCircle, Info, Calendar } from "lucide-react";

const NotificationSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
      
      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="text-md font-medium flex items-center">
            <Mail className="h-5 w-5 mr-2 text-gray-500" />
            Email Notifications
          </h3>
          
          <div className="border border-gray-200 rounded-md divide-y">
            <div className="p-4 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">System Alerts</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Receive emails about system updates, maintenance, and important alerts
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="p-4 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">Security Notifications</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Get notified about password changes, login attempts, and security events
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="p-4 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">Task Assignments</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Get emails when you are assigned a new task or when task status changes
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="p-4 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">Report Generation</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Receive reports via email based on your schedule preferences
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* In-App Notifications */}
        <div className="space-y-4">
          <h3 className="text-md font-medium flex items-center">
            <BellRing className="h-5 w-5 mr-2 text-gray-500" />
            In-App Notifications
          </h3>
          
          <div className="border border-gray-200 rounded-md divide-y">
            <div className="p-4 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">Comments & Mentions</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Get notified when someone mentions you or comments on your activity
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="p-4 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">System Updates</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Be notified about new features, updates, and system changes
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="p-4 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">Data Changes</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Get notified when important data is updated or changed
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Notification Preferences */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Notification Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Digest Frequency
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="realtime">Real-time (Immediate)</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notification Display Duration
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Notification Types */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Notification Types</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium">Alerts</h4>
              <p className="text-xs text-gray-500 mt-1">
                Important system and security alerts
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="text-sm font-medium">Confirmations</h4>
              <p className="text-xs text-gray-500 mt-1">
                Action confirmations and completions
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                <Info className="h-5 w-5 text-yellow-600" />
              </div>
              <h4 className="text-sm font-medium">Information</h4>
              <p className="text-xs text-gray-500 mt-1">
                General updates and information
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <h4 className="text-sm font-medium">Reminders</h4>
              <p className="text-xs text-gray-500 mt-1">
                Task and event reminders
              </p>
            </div>
          </div>
        </div>
        
        {/* SMS Notifications */}
        <div className="space-y-4">
          <h3 className="text-md font-medium flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
            SMS Notifications
          </h3>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="+1 (555) 555-5555"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send a verification code to this number
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Security alerts only</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Critical system notifications</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Important task reminders</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 