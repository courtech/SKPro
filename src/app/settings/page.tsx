"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Settings, 
  User, 
  Building, 
  Database, 
  FileText, 
  Bell, 
  Lock,
  Save,
  RefreshCw,
  Upload,
  HelpCircle,
  ChevronRight,
  X
} from "lucide-react";

// Tab content components
import OrganizationSettings from "./tabs/OrganizationSettings";
import UserManagementSettings from "./tabs/UserManagementSettings";
import DataSettings from "./tabs/DataSettings";
import ImportExportSettings from "./tabs/ImportExportSettings";
import NotificationSettings from "./tabs/NotificationSettings";
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
      label: "Organization & Branding",
      icon: <Building className="h-5 w-5" />,
      component: <OrganizationSettings />
    },
    {
      id: "users",
      label: "User Management",
      icon: <User className="h-5 w-5" />,
      component: <UserManagementSettings />
    },
    {
      id: "data",
      label: "Data Configuration",
      icon: <Database className="h-5 w-5" />,
      component: <DataSettings />
    },
    {
      id: "import-export",
      label: "Import & Export",
      icon: <FileText className="h-5 w-5" />,
      component: <ImportExportSettings />
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      component: <NotificationSettings />
    },
    {
      id: "security",
      label: "Security & Audit",
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
      // Show success notification or feedback
      alert("Settings saved successfully!");
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 py-4 sm:py-6 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B51A6]">Settings</h1>
            <p className="text-sm text-gray-600 mt-1">Configure your SKPro application settings</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className={`inline-flex items-center px-4 py-2 ${isSaving ? 'bg-gray-400' : 'bg-[#FEC425] hover:bg-yellow-500'} text-white rounded-md transition-colors font-medium text-sm`}
            >
              {isSaving ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isSaving ? "Saving..." : "Save All Settings"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 sm:p-6">
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
                      {activeTab === tab.id && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  </li>
                ))}
                
                {/* Help & Support Link */}
                <li>
                  <Link
                    href="/help"
                    className="flex items-center w-full px-4 py-3 rounded-md text-left font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <span className="mr-3">
                      <HelpCircle className="h-5 w-5" />
                    </span>
                    <span>Help & Support</span>
                  </Link>
                </li>
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