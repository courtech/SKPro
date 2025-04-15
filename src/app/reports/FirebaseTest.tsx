import React, { useState } from 'react';
import { 
  createNewBarangay, 
  createNewReport, 
  addSingleMember, 
  importMinimalMembers 
} from '@/services/firebase/examples';
import { updateReportStatus } from '@/services/firebase';
import { auth } from '@/lib/firebase';

export default function FirebaseTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [barangayId, setBarangayId] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [memberIds, setMemberIds] = useState<string[]>([]);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Create Barangay
  const handleCreateBarangay = async () => {
    resetMessages();
    setIsLoading(true);
    try {
      const barangay = await createNewBarangay(
        'New Barangay',
        'Province',
        'Municipality'
      );
      setBarangayId(barangay.id);
      setSuccess(`Barangay created with ID: ${barangay.id}`);
    } catch (err) {
      setError(`Error creating barangay: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Create Report
  const handleCreateReport = async () => {
    resetMessages();
    setIsLoading(true);
    
    if (!barangayId) {
      setError('Please create a barangay first');
      setIsLoading(false);
      return;
    }

    if (!auth.currentUser) {
      setError('You must be signed in to create a report');
      setIsLoading(false);
      return;
    }

    try {
      const report = await createNewReport(
        `Report ${new Date().toISOString()}`,
        'Q1',
        new Date().getFullYear().toString(),
        barangayId,
        auth.currentUser.uid
      );
      setReportId(report.id);
      setSuccess(`Report created with ID: ${report.id}`);
    } catch (err) {
      setError(`Error creating report: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a Member
  const handleAddMember = async () => {
    resetMessages();
    setIsLoading(true);
    
    if (!barangayId || !reportId) {
      setError('Please create a barangay and report first');
      setIsLoading(false);
      return;
    }
    
    try {
      const member = await addSingleMember(
        reportId,
        barangayId,
        `First${Date.now()}`,
        `Last${Date.now()}`,
        {}
      );
      setMemberIds(prev => [...prev, member.id]);
      setSuccess(`Member added with ID: ${member.id}`);
    } catch (err) {
      setError(`Error adding member: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk Import Members
  const handleBulkImport = async () => {
    resetMessages();
    setIsLoading(true);
    
    if (!barangayId || !reportId) {
      setError('Please create a barangay and report first');
      setIsLoading(false);
      return;
    }
    
    try {
      const ids = await importMinimalMembers(reportId, barangayId, 5);
      setMemberIds(prev => [...prev, ...ids]);
      setSuccess(`${ids.length} members imported successfully`);
    } catch (err) {
      setError(`Error importing members: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Report
  const handleSubmitReport = async () => {
    resetMessages();
    setIsLoading(true);
    
    if (!reportId) {
      setError('Please create a report first');
      setIsLoading(false);
      return;
    }
    
    try {
      await updateReportStatus(reportId, 'submitted');
      setSuccess(`Report ${reportId} submitted successfully`);
    } catch (err) {
      setError(`Error submitting report: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Firestore Test Panel</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {success}
        </div>
      )}
      
      <div className="flex flex-col space-y-2">
        <button 
          onClick={handleCreateBarangay}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          1. Create Barangay
        </button>
        
        {barangayId && (
          <div className="text-xs text-gray-600 ml-2">
            Barangay ID: {barangayId}
          </div>
        )}
        
        <button 
          onClick={handleCreateReport}
          disabled={isLoading || !barangayId}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          2. Create Report
        </button>
        
        {reportId && (
          <div className="text-xs text-gray-600 ml-2">
            Report ID: {reportId}
          </div>
        )}
        
        <button 
          onClick={handleAddMember}
          disabled={isLoading || !reportId}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          3. Add Single Member
        </button>
        
        <button 
          onClick={handleBulkImport}
          disabled={isLoading || !reportId}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          4. Bulk Import 5 Members
        </button>
        
        {memberIds.length > 0 && (
          <div className="text-xs text-gray-600 ml-2">
            Added {memberIds.length} members
          </div>
        )}
        
        <button 
          onClick={handleSubmitReport}
          disabled={isLoading || !reportId}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
        >
          5. Submit Report
        </button>
        
        {isLoading && (
          <div className="text-sm text-gray-600 animate-pulse">
            Processing...
          </div>
        )}
      </div>
    </div>
  );
} 