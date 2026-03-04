import React from 'react';
import { BookOpen } from 'lucide-react';

interface Citation {
  page: string;
  content: string;
  source?: string;
}

const SourceCitations: React.FC<{ citations: Citation[] }> = ({ citations }) => {
  if (!citations.length) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3 text-slate-600">
        <BookOpen className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Grounded Sources</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {citations.map((cite, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs">
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-blue-700">Page {cite.page}</span>
              <span className="text-[10px] text-slate-400 truncate max-w-[150px]">{cite.source}</span>
            </div>
            <p className="italic text-slate-600 line-clamp-3">"{cite.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceCitations;
