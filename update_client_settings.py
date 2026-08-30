import re

with open('src/app/dashboard/settings/page.tsx', 'r') as f:
    content = f.read()

client_block_start = content.find('if (role === "client") {')
client_block_end = content.find('return (', content.find('}', client_block_start)) # find the start of the manager return

new_client_block = """if (role === "client") {
    return (
      <div className="max-w-4xl mx-auto h-full flex flex-col pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
        <div className="mb-8 px-4">
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Settings</h1>
          <p className="text-white/50 text-sm">Manage your personal profile and workspace preferences.</p>
        </div>

        <div className="space-y-8 px-4">
          {/* Profile Section */}
          <div className="glass-panel squircle-lg p-8 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-medium text-white mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6 mb-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">JD</span>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm text-white font-medium transition-colors">
                  Upload Avatar
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-widest ml-1">Job Title</label>
                  <input type="text" defaultValue="Creative Director" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all" />
                </div>
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
          <div className="glass-panel squircle-lg p-8 border border-red-500/20 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-medium text-red-400 mb-2">Danger Zone</h2>
            <p className="text-sm text-white/50 mb-6">Permanently delete your account and all associated workspace data.</p>
            <button className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium rounded-xl border border-red-500/20 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  """

new_content = content[:client_block_start] + new_client_block + content[client_block_end:]

with open('src/app/dashboard/settings/page.tsx', 'w') as f:
    f.write(new_content)
