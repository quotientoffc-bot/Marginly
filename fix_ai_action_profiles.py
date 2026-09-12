import re

with open('src/app/actions/ai.ts', 'r') as f:
    content = f.read()

# Replace saveIntegrationToken logic
old_save = """export async function saveIntegrationToken(providerId: string, token: string) {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const teamMember = await prisma.team_members.findFirst({
      where: { user_id: user.id, role: "owner" },
    });

    if (!teamMember) return { error: "You must be a team owner to save integrations." };

    const team = await prisma.teams.findUnique({ where: { id: teamMember.team_id } });
    if (!team) return { error: "Team not found." };

    const integrations = (team.integrations as Record<string, any>) || {};
    integrations[providerId] = token;

    await prisma.teams.update({
      where: { id: team.id },
      data: { integrations },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to save integration token:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}"""

new_save = """export async function saveIntegrationToken(providerId: string, token: string) {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const profile = await prisma.profiles.findUnique({ where: { id: user.id } });
    if (!profile) return { error: "User profile not found." };

    const integrations = (profile.integrations as Record<string, any>) || {};
    integrations[providerId] = token;

    await prisma.profiles.update({
      where: { id: user.id },
      data: { integrations },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to save integration token:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}"""

content = content.replace(old_save, new_save)


old_analyze = """  // Fetch team integrations
  const teamMember = await prisma.team_members.findFirst({
    where: { user_id: user.id },
  });
  if (!teamMember) throw new Error("Not part of a team");
  
  const team = await prisma.teams.findUnique({ where: { id: teamMember.team_id } });
  const integrations = (team?.integrations as Record<string, any>) || {};"""

new_analyze = """  // Fetch user integrations
  const profile = await prisma.profiles.findUnique({ where: { id: user.id } });
  if (!profile) throw new Error("User profile not found");
  
  const integrations = (profile.integrations as Record<string, any>) || {};"""

content = content.replace(old_analyze, new_analyze)

with open('src/app/actions/ai.ts', 'w') as f:
    f.write(content)
