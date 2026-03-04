import React from 'react';
import FileUpload from '../components/FileUpload';
import ChatBox from '../components/ChatBox';
import { Shield, Zap, Search } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Local Grounded RAG 
          <span className="text-blue-600"> Assistant</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Private, local-first retrieval system that guarantees AI answers are 
          backed by your documents—not hallucinations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <FileUpload />
          
          <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              Privacy Protocol
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All data stays on the local machine, with vectors stored in the local Qdrant database and responses generated using the phi3 model through Ollama.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="text-center p-2 bg-slate-800 rounded border border-slate-700">
                <p className="text-[10px] text-slate-500 uppercase">Latency</p>
                <p className="text-sm font-mono">&lt; 200ms</p>
              </div>
              <div className="text-center p-2 bg-slate-800 rounded border border-slate-700">
                <p className="text-[10px] text-slate-500 uppercase">LLM</p>
                <p className="text-sm font-mono">phi3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ChatBox />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6">
          <Zap className="w-8 h-8 text-yellow-500 mb-4" />
          <h4 className="font-bold mb-2">High Efficiency</h4>
          <p className="text-sm text-slate-600">Recursive character splitting optimized for small semantic chunks to improve retrieval accuracy.</p>
        </div>
        <div className="p-6">
          <Search className="w-8 h-8 text-blue-500 mb-4" />
          <h4 className="font-bold mb-2">Vector Search</h4>
          <p className="text-sm text-slate-600">BAAI/bge-small-en embedding model is for efficient and accurate similarity matching.</p>
        </div>
        <div className="p-6">
          <Shield className="w-8 h-8 text-green-500 mb-4" />
          <h4 className="font-bold mb-2">Grounded Facts</h4>
          <p className="text-sm text-slate-600">Strict prompts ensure answers are generated only from the provided document context.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
