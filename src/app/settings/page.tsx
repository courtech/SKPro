"use client";

import React, { useState } from "react";
import { Building, Lock, Save, RefreshCw } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// Simplified tab components
import OrganizationSettings from "./tabs/OrganizationSettings";
import SecuritySettings from "./tabs/SecuritySettings";

// Tab interface and data
interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("organization");
  const [isSaving, setIsSaving] = useState(false);

  // Define tabs with their content components
  const tabs: Tab[] = [
    {
      id: "organization",
      label: "Organization/Barangay Info",
      icon: <Building className="h-5 w-5" />,
      component: <OrganizationSettings />
    },
    {
      id: "security",
      label: "Security Settings",
      icon: <Lock className="h-5 w-5" />,
      component: <SecuritySettings />
    }
  ];
  
  // Get the current active tab content
  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.component;

  // Mock function to simulate saving settings
  const handleSaveSettings = () => {
    setIsSaving(true);
    // In a real app, you would save the settings to your backend here
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      {/* Main Content */}
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B51A6]">Settings</h1>
            <p className="text-sm text-gray-600 mt-1">Configure your SKPro application settings</p>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className={`inline-flex items-center px-4 py-2 ${isSaving ? 'bg-gray-400' : 'bg-[#E1362C] hover:bg-red-500'} text-white rounded-md transition-colors font-medium text-sm`}
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar/Tabs */}
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-2">
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center w-full px-4 py-3 rounded-md text-left font-medium ${
                        activeTab === tab.id
                          ? 'bg-[#0B51A6]/10 text-[#0B51A6] border-l-4 border-[#0B51A6]'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
              {activeTabContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 