import React from 'react';
import { Layers, Database, Cpu, Search } from 'lucide-react';

const EngineeringDecisions: React.FC = () => {
  const decisions = [
    {
      title: "Chunking Strategy",
      icon: <Layers className="text-blue-500" />,
      text: "We chose RecursiveCharacterTextSplitter with a chunk size of around 400–500 characters and a small overlap between chunks. This size roughly represents one paragraph of text, which provides enough context for the language model while still keeping the chunks small enough for accurate retrieval. The overlap helps prevent important sentences from being cut off between chunks."
    },
    {
      title: "Vector DB: Qdrant",
      icon: <Database className="text-purple-500" />,
      text: "The system uses Qdrant as the vector database. Qdrant was chosen because it works well for similarity search and can run locally without needing cloud services. It also allows us to store metadata such as page numbers, which helps the system show where the answer came from in the document."
    },
    {
      title: "Embedding Model",
      icon: <Search className="text-yellow-500" />,
      text: "For embeddings, BAAI/bge-small-en was used. This model works well for semantic search and runs efficiently on a local machine. It helps the system understand the meaning of questions and match them with the most relevant parts of the document."
    },
    {
      title: "Local LLM: Ollama (phi3)",
      icon: <Cpu className="text-green-500" />,
      text: "The final answer is generated using phi3 through Ollama. Running the model locally avoids API costs and allows the system to work offline. Phi3 is lightweight but still capable of generating good answers. The prompt is designed so the model answers only using the information retrieved from the document."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Engineering Decisions</h1>
      <p className="text-slate-600 mb-10">Architectural breakdown of the AI RAG system.</p>

      <div className="grid gap-6">
        {decisions.map((item, i) => (
          <div key={i} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                {item.icon}
              </div>
              <h2 className="text-xl font-bold">{item.title}</h2>
            </div>
            <p className="text-slate-600 leading-relaxed leading-7">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineeringDecisions;
