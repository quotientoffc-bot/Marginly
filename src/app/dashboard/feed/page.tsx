"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle2, User, Hash, Search, Bell } from "lucide-react";

export default function TeamFeedPage() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Marginly Bot", time: "10:00 AM", type: "system", content: "New client project created: 'Acme Corp Redesign'." },
    { id: 2, user: "Sarah Jenkins", time: "10:05 AM", type: "user", content: "I'll take the lead on the Acme scoping call." },
    { id: 3, user: "Marginly Bot", time: "10:15 AM", type: "system", content: "Scope creep detected in Acme Corp communications. Drafted Change Order." },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Review Acme Change Order", assignee: null },
    { id: 2, title: "Send Weekly Digest to Client", assignee: "Alex Rivera" },
    { id: 3, title: "Onboard new designer", assignee: null },
  ]);

  const claimTask = (taskId: number) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, assignee: "You" } : t));
    
    // Auto-broadcast to Slack feed
    const claimedTask = tasks.find(t => t.id === taskId);
    setMessages([...messages, {
      id: Date.now(),
      user: "Marginly Bot",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "system",
      content: `✅ You claimed task: '${claimedTask?.title}'`
    }]);
  };

  return (
    <div className="max-w-6xl mx-auto h-[80vh] flex flex-col pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6 flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-400" />
            Team HQ
          </h1>
          <p className="text-white/50">Your connected Slack channel and open jobs.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Slack Feed Mock UI */}
        <div className="flex-[2] glass-panel squircle-lg border border-white/10 flex flex-col overflow-hidden bg-[#1A1D21] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-white/50" />
              <span className="font-bold text-white">marginly-alerts</span>
            </div>
            <div className="flex gap-4">
              <Search className="w-4 h-4 text-white/50 cursor-pointer hover:text-white" />
              <Bell className="w-4 h-4 text-white/50 cursor-pointer hover:text-white" />
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${msg.type === 'system' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
                  {msg.type === 'system' ? <MessageSquare className="w-5 h-5 text-purple-400" /> : <User className="w-5 h-5 text-blue-400" />}
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-white">{msg.user}</span>
                    <span className="text-xs text-white/40">{msg.time}</span>
                    {msg.type === 'system' && <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded uppercase tracking-wider">APP</span>}
                  </div>
                  <p className="text-white/80">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-black/20 border-t border-white/5">
            <div className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white/40 text-sm flex items-center gap-2">
              Message #marginly-alerts...
            </div>
          </div>
        </div>

        {/* Task Board */}
        <div className="flex-[1] glass-panel squircle-lg border border-white/10 flex flex-col overflow-hidden bg-black/40">
          <div className="px-6 py-4 border-b border-white/5 bg-black/20">
            <h3 className="font-medium text-white">Open Jobs</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="bg-white/5 border border-white/10 p-4 rounded-xl relative group">
                <h4 className="text-white font-medium mb-3 pr-6">{task.title}</h4>
                
                {task.assignee ? (
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <User className="w-4 h-4" />
                    Claimed by {task.assignee}
                  </div>
                ) : (
                  <button 
                    onClick={() => claimTask(task.id)}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Claim Job
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
