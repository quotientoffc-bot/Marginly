import re

with open('src/app/onboarding/page.tsx', 'r') as f:
    content = f.read()

# Import the new action
import_str = 'import { createClient } from "@/lib/supabase-client";'
new_import_str = 'import { createClient } from "@/lib/supabase-client";\nimport { checkTeamPasswordUnique } from "@/app/actions";'

if "checkTeamPasswordUnique" not in content:
    content = content.replace(import_str, new_import_str)

# Add the uniqueness check to handleCreateTeam
handle_old = """  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Authentication required.");

      // Insert Team"""

handle_new = """  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Authentication required.");

      // 1. Verify password uniqueness first
      const checkResult = await checkTeamPasswordUnique(teamPassword);
      if (checkResult.error) {
        throw new Error("Failed to verify invite code uniqueness.");
      }
      if (!checkResult.unique) {
        throw new Error("This invite code is already taken by another workspace. Please choose a different, more secure code.");
      }

      // Insert Team"""

content = content.replace(handle_old, handle_new)

with open('src/app/onboarding/page.tsx', 'w') as f:
    f.write(content)
