import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface StepSixProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const StepSix: React.FC<StepSixProps> = ({ formData, setFormData }) => {
  const signatureRef = useRef<SignatureCanvas>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [signatureExists, setSignatureExists] = useState(!!formData.signature);
  const [signatureMethod, setSignatureMethod] = useState<'draw' | 'upload'>('draw');

  const handleClear = () => {
    if (signatureRef.current && signatureMethod === 'draw') {
      signatureRef.current.clear();
    }
    setSignatureExists(false);
    setFormData({
      ...formData,
      signature: null
    });
  };

  const handleSave = () => {
    if (signatureRef.current && signatureMethod === 'draw') {
      const signatureData = signatureRef.current.toDataURL('image/png');
      setFormData({
        ...formData,
        signature: signatureData
      });
      setSignatureExists(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is PNG or JPEG
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Please upload PNG or JPEG files only');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const signatureData = event.target.result as string;
        setFormData({
          ...formData,
          signature: signatureData
        });
        setSignatureExists(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">Digital Signature</h2>
      <p className="text-sm text-gray-700 mb-6">
        Please sign below to certify that the information provided is true and accurate to the best of your knowledge.
      </p>
      
      <div className="space-y-4">
        {/* Signature Method Selection */}
        <div className="flex space-x-4 mb-4">
          <button 
            type="button"
            onClick={() => setSignatureMethod('draw')}
            className={`px-4 py-2 text-sm rounded-md ${signatureMethod === 'draw' ? 'bg-[#0B51A6] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Draw Signature
          </button>
          <button 
            type="button"
            onClick={() => setSignatureMethod('upload')}
            className={`px-4 py-2 text-sm rounded-md ${signatureMethod === 'upload' ? 'bg-[#0B51A6] text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Upload Signature
          </button>
        </div>
        
        {/* Signature Canvas or Upload Area */}
        <div className="border border-gray-300 rounded-md p-1 bg-white">
          {formData.signature ? (
            <img 
              src={formData.signature} 
              alt="Digital Signature" 
              className="w-full h-[200px] object-contain"
            />
          ) : signatureMethod === 'draw' ? (
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                className: 'w-full h-[200px] border border-dashed border-gray-300 rounded-md cursor-pointer',
              }}
              onEnd={() => setSignatureExists(true)}
            />
          ) : (
            <div 
              className="w-full h-[200px] border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer"
              onClick={triggerFileInput}
            >
              <p className="text-gray-500 text-center mb-2">Click to upload a signature image</p>
              <p className="text-gray-400 text-sm">(PNG or JPEG only)</p>
              <input 
                type="file"
                ref={fileInputRef}
                accept=".png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className={`px-4 py-2 text-sm rounded-md ${signatureExists ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!signatureExists}
          >
            Clear Signature
          </button>
          
          {signatureMethod === 'draw' && !formData.signature && (
            <button
              type="button"
              onClick={handleSave}
              className={`px-4 py-2 text-sm rounded-md ${signatureExists ? 'bg-[#0B51A6] text-white hover:bg-[#094388]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              disabled={!signatureExists}
            >
              Save Signature
            </button>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-700">
            By signing above, I certify that I have given true, accurate, current, and complete information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepSix; 