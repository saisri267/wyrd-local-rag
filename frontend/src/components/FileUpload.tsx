import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { uploadFile } from '../services/api';

const FileUpload: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [filename, setFilename] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFilename(file.name);
    setStatus('uploading');

    try {
      await uploadFile(file);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Upload className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">File Ingestion</h2>
      </div>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          status === 'uploading' ? 'bg-slate-50 border-blue-400' : 
          status === 'success' ? 'bg-green-50 border-green-400' :
          'hover:bg-slate-50 border-slate-300'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden" 
          accept=".pdf" 
        />
        
        {status === 'idle' && (
          <>
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium">Click to upload PDF context</p>
            <p className="text-xs text-slate-500 mt-1">Maximum 10MB</p>
          </>
        )}

        {status === 'uploading' && (
          <>
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
            <p className="text-sm font-medium">Processing & Chunking...</p>
            <p className="text-xs text-slate-500 mt-1">{filename}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-green-700">Indexed Successfully!</p>
            <p className="text-xs text-slate-500 mt-1">{filename}</p>
          </>
        )}

        {status === 'error' && (
          <p className="text-sm font-medium text-red-600">Failed to upload. Try again.</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
