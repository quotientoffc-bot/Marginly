"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { GoogleGenAI } from "@google/genai";

const prisma = new PrismaClient();

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export async function saveIntegrationToken(providerId: string, token: string) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const teamMember = await prisma.team_members.findFirst({
    where: { user_id: user.id, role: "owner" },
  });

  if (!teamMember) throw new Error("You must be a team owner to save integrations.");

  const team = await prisma.teams.findUnique({ where: { id: teamMember.team_id } });
  if (!team) throw new Error("Team not found.");

  const integrations = (team.integrations as Record<string, any>) || {};
  integrations[providerId] = token;

  await prisma.teams.update({
    where: { id: team.id },
    data: { integrations },
  });

  return { success: true };
}

export async function analyzeScopeCreep(messageId: string, projectId: string) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Fetch the message and project details
  const message = await prisma.support_messages.findUnique({ where: { id: messageId } });
  const project = await prisma.projects.findUnique({ where: { id: projectId } });
  if (!message || !project) throw new Error("Message or project not found");

  // Fetch team integrations
  const teamMember = await prisma.team_members.findFirst({
    where: { user_id: user.id },
  });
  if (!teamMember) throw new Error("Not part of a team");
  
  const team = await prisma.teams.findUnique({ where: { id: teamMember.team_id } });
  const integrations = (team?.integrations as Record<string, any>) || {};
  
  const apiKey = integrations['custom-ai'];
  if (!apiKey) {
    throw new Error("No Custom AI API key configured for this workspace.");
  }

  // Initialize GenAI
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
You are an expert Project Manager and Scope Monitor.
Analyze the following client message against the original project scope.
If the client is asking for something outside the original scope, determine that it is scope creep and estimate a cost.

Project Name: ${project.name}
Original Scope/Description: ${project.description || "General software development."}
Current Budget: $${project.budget?.toString() || "0"}

Client Message: "${message.message}"

Respond strictly with a JSON object in this format:
{
  "hasCreep": boolean,
  "estimatedCost": number, // an integer representing additional cost in USD
  "explanation": "A brief explanation of why it is or isn't scope creep"
}
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    if (!response.text) throw new Error("No response from AI");
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw new Error("Failed to analyze scope creep");
  }
}
