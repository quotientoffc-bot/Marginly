"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";

interface Field {
  name: string;
  label: string;
  type: string;
  options?: { label: string, value: string }[];
}

interface CreateFormProps {
  title: string;
  buttonLabel: string;
  action: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  fields: Field[];
}

export default function CreateForm({ title, buttonLabel, action, fields }: CreateFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const res = await action(formData);
    if (res.error) {
      setError(res.error);
    } else {
      setIsOpen(false);
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-white">{title}</h2>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className="text-xs font-medium text-white/60 tracking-wider uppercase">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select 
                      name={field.name}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white appearance-none focus:outline-none focus:border-purple-500"
                    >
                      <option value="" disabled selected>Select an option</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type={field.type}
                      name={field.name}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
              
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black font-medium py-3 rounded-xl mt-6 hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
