import React from 'react';
import { Mail, ArrowRight, CheckCircle2, Bot, Users } from 'lucide-react';

const SupportInbox: React.FC = () => {
  const steps = [
    { step: "Intake", desc: "Customer questions are collected automatically from sources such as email inboxes or web forms." },
    { step: "Intelligent Classification", desc: "The system analyzes the message and identifies the type of request." },
    { step: "RAG Retrieval", desc: "Similarity search against company knowledge baseRelevant information is retrieved from company documents using similarity search. (PDF docs, FAQs)." },
    { step: "Drafting", desc: "The language model generates a response draft using the retrieved information." },
    { step: "Human-in-the-Loop", desc: "If the system is not confident, the response is reviewed by a human agent." },
    { step: "Self-Correction", desc: "Human corrections can be added back to the system to improve future responses." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-blue-600 rounded-3xl p-12 text-white mb-12 overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4">Support Inbox Automation</h1>
          <p className="text-blue-100 text-lg max-w-xl">
            A blueprint for scaling customer service with RAG-powered automated drafts and classification.
          </p>
        </div>
        <Mail className="absolute -right-16 -bottom-16 w-64 h-64 text-blue-500 opacity-20 rotate-12" />
      </div>

      <div className="grid gap-4 mb-16">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="text-green-500 w-5 h-5" />
          The Workflow Pipeline
        </h2>
        {steps.map((item, idx) => (
          <div key={idx} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-xl items-start">
            <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              {idx + 1}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{item.step}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <Bot className="w-8 h-8 text-blue-600 mb-4" />
          <h4 className="font-bold mb-2">Automated Agent</h4>
          <p className="text-sm text-slate-600">Handles 80% of routine queries with 95% accuracy using RAG grounding.</p>
        </div>
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <Users className="w-8 h-8 text-blue-600 mb-4" />
          <h4 className="font-bold mb-2">Human Reviewers</h4>
          <p className="text-sm text-slate-600">Focus on complex emotional or high-priority edge cases identified by AI.</p>
        </div>
      </div>
    </div>
  );
};

export default SupportInbox;
