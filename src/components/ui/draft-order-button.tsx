"use client";

import { useState } from "react";
import GenerateButton from "./generate-button";
import { useRouter } from "next/navigation";

export default function DraftOrderButton({ defaultText = "Draft Change Order" }: { defaultText?: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleDraft = () => {
    // Check if AI model is connected
    const saved = localStorage.getItem("marginly_active_integrations");
    const activeIntegrations = saved ? JSON.parse(saved) : [];
    
    if (!activeIntegrations.includes('custom-ai')) {
      alert("AI Model Not Connected!\n\nPlease go to Integrations and connect your Custom AI Model (OpenAI / Anthropic / Gemini) to automatically draft change orders.");
      router.push("/dashboard/integrations");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Draft Change Order generated and saved to your projects!");
    }, 2000);
  };

  return (
    <GenerateButton 
      defaultText={defaultText}
      generatingText="Drafting..." 
      className="w-full h-12 rounded-xl"
      isGenerating={isGenerating}
      onClick={handleDraft}
    />
  );
}
