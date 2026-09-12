import re

with open('src/app/actions/ai.ts', 'r') as f:
    content = f.read()

# Fix saveIntegrationToken to not throw
old_save = """export async function saveIntegrationToken(providerId: string, token: string) {
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
}"""

new_save = """export async function saveIntegrationToken(providerId: string, token: string) {
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

content = content.replace(old_save, new_save)

with open('src/app/actions/ai.ts', 'w') as f:
    f.write(content)
