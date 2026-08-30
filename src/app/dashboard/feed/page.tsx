"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CheckCircle2, User, Hash, Search, Bell } from "lucide-react";
import { createClient } from "@/lib/supabase-client";

export default function TeamFeedPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Get user's team
        const { data: teamMember } = await supabase
          .from('team_members')
          .select('team_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (teamMember) {
          setTeamId(teamMember.team_id);
          
          // Load Tasks
          const { data: fetchedTasks } = await supabase
            .from('tasks')
            .select('*')
            .eq('team_id', teamMember.team_id)
            .order('created_at', { ascending: false });
            
          setTasks(fetchedTasks || []);

          // Load Messages
          const { data: fetchedMessages } = await supabase
            .from('feed_messages')
            .select('*')
            .eq('team_id', teamMember.team_id)
            .order('created_at', { ascending: true });
            
          setMessages(fetchedMessages || []);
        }
      }
      setLoading(false);
    }
    
    loadData();

    // Subscribe to realtime updates
    const channel = supabase.channel('feed_updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'feed_messages' }, payload => {
        setMessages(current => [...current, payload.new]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, payload => {
        setTasks(current => current.map(t => t.id === payload.new.id ? payload.new : t));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, payload => {
        setTasks(current => [payload.new, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const claimTask = async (taskId: string, title: string) => {
    if (!user || !teamId) return;

    // Update Task
    await supabase
      .from('tasks')
      .update({ status: 'claimed', assignee_id: user.id })
      .eq('id', taskId);
      
    // Broadcast message
    await supabase
      .from('feed_messages')
      .insert({
        team_id: teamId,
        user_id: user.id,
        sender_name: "Marginly Bot",
        type: "system",
        content: `✅ Job Claimed: A team member just claimed '${title}'`
      });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !teamId) return;

    const content = newMessage;
    setNewMessage("");

    await supabase
      .from('feed_messages')
      .insert({
        team_id: teamId,
        user_id: user.id,
        sender_name: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
        type: "user",
        content: content
      });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center -mt-20">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-[80vh] flex flex-col pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6 flex justify-between items-end px-2">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-400" />
            Team HQ
          </h1>
          <p className="text-white/50">Your connected real-time channel and open jobs.</p>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Slack Feed UI */}
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
            {messages.length === 0 ? (
              <div className="text-center text-white/40 pt-10">No messages yet. Say hello!</div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${msg.type === 'system' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
                    {msg.type === 'system' ? <MessageSquare className="w-5 h-5 text-purple-400" /> : <User className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-white">{msg.sender_name}</span>
                      <span className="text-xs text-white/40">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {msg.type === 'system' && <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded uppercase tracking-wider">APP</span>}
                    </div>
                    <p className="text-white/80">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={sendMessage} className="p-4 bg-black/20 border-t border-white/5">
            <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message #marginly-alerts..."
              className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-white/20 transition-colors"
            />
          </form>
        </div>

        {/* Task Board */}
        <div className="flex-[1] glass-panel squircle-lg border border-white/10 flex flex-col overflow-hidden bg-black/40">
          <div className="px-6 py-4 border-b border-white/5 bg-black/20">
            <h3 className="font-medium text-white">Open Jobs</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center text-white/40 pt-10 text-sm">No open jobs right now.</div>
            ) : (
              tasks.map(task => (
                <div key={task.id} className="bg-white/5 border border-white/10 p-4 rounded-xl relative group">
                  <h4 className="text-white font-medium mb-3 pr-6">{task.title}</h4>
                  
                  {task.status === 'claimed' ? (
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <User className="w-4 h-4" />
                      Claimed
                    </div>
                  ) : (
                    <button 
                      onClick={() => claimTask(task.id, task.title)}
                      className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Claim Job
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
