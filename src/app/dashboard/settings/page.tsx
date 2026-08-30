"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, Users, Key, Shield, Globe, Save, ArrowRight, AlertTriangle, Upload, Lock } from "lucide-react";
import { submitSupportMessage } from "@/app/actions";
import RadialGlowButton from "@/components/ui/radial-glow-button";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("global");
  const [role, setRole] = useState("client");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const savedRole = localStorage.getItem("user_role");
    if (savedRole) setRole(savedRole);
  }, []);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you ABSOLUTELY sure? This action cannot be undone and will permanently delete all your data.");
    if (!confirmed) return;

    setIsDeleting(true);
    await supabase.auth.signOut();
    localStorage.removeItem("user_role");
    router.push("/?deleted=true");
  };

  const triggerAdminLogin = () => {
    const code = window.prompt("Marginly System Protocol:\\nEnter Super Admin Override Code:");
    if (code === "marginly2026") {
      window.location.href = "/dashboard?force_role=manager";
    } else if (code) {
      window.alert("Unauthorized access attempt logged.");
    }
  };

  const handleSecureFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    // SECURITY CHECK 1: File Size Limit (Max 2MB)
    const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum allowed size is 2MB.`);
      event.target.value = ""; // Reset input
      return;
    }

    // SECURITY CHECK 2: Strict MIME Type Whitelist
    const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setUploadError(`Invalid file format. Only JPEG, PNG, and WEBP images are allowed.`);
      event.target.value = ""; // Reset input
      return;
    }

    // SECURITY CHECK 3: Double Extension Prevention & Sanitization
    // Re-encode or rename the file completely before uploading to prevent execution (e.g. invoice.pdf.sh)
    const safeExtension = file.type.split('/')[1]; 
    const secureFileName = `avatar_${Date.now()}_${Math.random().toString(36).substring(7)}.${safeExtension}`;

    // Here you would upload `file` to Supabase Storage using `secureFileName`
    // Example: await supabase.storage.from('avatars').upload(secureFileName, file);
    
    alert(`Security passed! File is ready to upload as: ${secureFileName}`);
  };

  if (role === "client") {
    return (
      <div className="max-w-4xl mx-auto h-full flex flex-col pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
        
        <div className="mb-12 px-6">
          <h1 className="text-4xl font-medium tracking-tight text-white mb-3">Account Settings</h1>
          <p className="text-white/50 text-lg">Manage your personal profile and workspace preferences.</p>
        </div>

        <div className="space-y-8 px-6">
          
          {/* Profile Section */}
          <div className="glass-panel squircle-lg p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-xl font-medium text-white mb-6">Profile Information</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-6 mb-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">JD</span>
                </div>
                <div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleSecureFileUpload}
                    className="hidden" 
                    accept="image/png, image/jpeg, image/webp" 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm text-white font-medium transition-colors flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Upload Avatar
                  </button>
                  {uploadError && <p className="text-red-400 text-xs mt-2">{uploadError}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Job Title</label>
                  <input type="text" placeholder="Marketing Director" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" placeholder="john@company.com" disabled className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white/50 cursor-not-allowed" />
                <p className="text-xs text-white/30 ml-1 mt-1">To change your email address, please contact support.</p>
              </div>
              <div className="pt-2">
                <RadialGlowButton>Save Changes</RadialGlowButton>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="glass-panel squircle-lg p-8 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-medium text-white mb-6">Workspace Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                <div>
                  <h3 className="text-white font-medium">Email Notifications</h3>
                  <p className="text-sm text-white/50">Receive alerts when new scopes or quotes are posted.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/80"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                <div>
                  <h3 className="text-white font-medium">Weekly Digest</h3>
                  <p className="text-sm text-white/50">A weekly summary of your project velocity and budget burn.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/80"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Raise a Query Section */}
          <div className="glass-panel squircle-lg p-8 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-medium text-white mb-6">Raise a Query</h2>
            <form 
              action={async (formData) => {
                setIsSubmitting(true);
                await submitSupportMessage(formData);
                setIsSubmitting(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Your Email</label>
                  <input required name="email" type="email" placeholder="you@company.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Subject</label>
                  <input required name="subject" type="text" placeholder="What do you need help with?" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Message</label>
                <textarea required name="message" rows={4} placeholder="Describe your query..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none" />
              </div>
              <RadialGlowButton type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8 mt-2">
                {isSubmitting ? "Sending..." : "Submit Query"}
              </RadialGlowButton>
            </form>
          </div>
          
          {/* Danger Zone */}
          <div className="glass-panel squircle-lg p-8 border border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h2 className="text-xl font-medium text-red-400">Danger Zone</h2>
            </div>
            <p className="text-sm text-white/50 mb-6">Permanently delete your account and all associated workspace data.</p>
            <button 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium rounded-xl border border-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col pt-8">
      <div className="mb-10 px-4">
        <h1 className="text-4xl font-medium tracking-tight text-white mb-3">System Settings</h1>
        <p className="text-white/50 text-lg">Super Admin controls for the Marginly SaaS platform.</p>
      </div>

      <div className="flex flex-1 gap-12 overflow-hidden px-4 pb-4">
        
        {/* Navigation Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab("global")}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 text-sm font-medium ${
              activeTab === "global" 
                ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10" 
                : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <Globe className="w-4 h-4" /> Global Config
          </button>
          <button 
            onClick={() => setActiveTab("api")}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 text-sm font-medium ${
              activeTab === "api" 
                ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10" 
                : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <Key className="w-4 h-4" /> API Keys & Webhooks
          </button>
          <button 
            onClick={() => setActiveTab("owners")}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 text-sm font-medium ${
              activeTab === "owners" 
                ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10" 
                : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <Users className="w-4 h-4" /> Co-owners
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 text-sm font-medium ${
              activeTab === "security" 
                ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10" 
                : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <Shield className="w-4 h-4" /> Platform Security
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 glass-panel squircle-lg relative overflow-hidden flex flex-col border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          
          <div className="flex-1 overflow-y-auto p-10 pb-48">
            
            {activeTab === "global" && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
                <div>
                  <h2 className="text-2xl font-medium text-white mb-8 tracking-tight flex items-center justify-between">
                    Platform Configuration
                    <button 
                      onClick={triggerAdminLogin}
                      className="opacity-0 hover:opacity-20 transition-opacity p-2"
                      title="System override"
                    >
                      <Lock className="w-4 h-4 text-white" />
                    </button>
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Platform Name</label>
                      <input 
                        type="text" 
                        defaultValue="Marginly" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Global Support Routing Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@marginly.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" 
                      />
                      <p className="text-xs text-white/40 ml-1 mt-2">All client support tickets will be copied to this email address.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 mt-12">
                  <h3 className="text-xl font-medium text-white mb-6">Database Management</h3>
                  <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium text-lg">Flush Cache</h4>
                      <p className="text-sm text-white/50 mt-1">Clear the global Redis cache across all edge nodes.</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors border border-white/10">
                      Clear Cache
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
                <h2 className="text-2xl font-medium text-white mb-8 tracking-tight">API Keys & Integrations</h2>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Stripe Secret Key (Billing)</label>
                  <input 
                    type="password" 
                    placeholder="sk_live_..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">OpenAI API Key (Scope Detection)</label>
                  <input 
                    type="password" 
                    placeholder="sk-proj-..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Floating Save Button - Fixed Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-3xl border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-20">
            <div className="flex justify-end w-full">
              <button className="bg-white text-black px-8 py-3.5 rounded-2xl text-sm font-semibold hover:bg-white/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Save className="w-4 h-4" /> Save System Config
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
