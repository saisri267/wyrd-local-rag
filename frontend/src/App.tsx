import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import EngineeringDecisions from './pages/EngineeringDecisions';
import SupportInbox from './pages/SupportInbox';
import { BrainCircuit, MessageSquare, Info, LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2">
                <BrainCircuit className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl tracking-tight">Sys Core</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <NavBtn to="/" icon={<MessageSquare className="w-4 h-4" />} label="RAGChat" />
                <NavBtn to="/support-inbox" icon={<LayoutDashboard className="w-4 h-4" />} label="Inbox Support" />
                <NavBtn to="/decisions" icon={<Info className="w-4 h-4" />} label="Engineering" />
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/decisions" element={<EngineeringDecisions />} />
            <Route path="/support-inbox" element={<SupportInbox />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            © 2026 AI Engineer – Trial By Fire Submission. Duggempudi Sai Sri
          </div>
        </footer>
      </div>
    </Router>
  );
};

const NavBtn: React.FC<{ to: string, label: string, icon: React.ReactNode }> = ({ to, label, icon }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `
      flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm font-medium
      ${isActive ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}
    `}
  >
    {icon}
    {label}
  </NavLink>
);

export default App;
