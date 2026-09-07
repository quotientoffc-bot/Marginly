"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

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

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  
  if (!name || !email) return { error: "Missing required fields" };

  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const { error } = await supabase
      .from('clients')
      .insert([{ name, email, status: 'Active', user_id: user.id }]);
      
    if (error) throw error;
    
    revalidatePath('/dashboard/clients');
    revalidatePath('/dashboard/projects');
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  const clientId = formData.get("client_id") as string;
  const budget = parseFloat(formData.get("budget") as string);
  
  if (!name || !clientId || isNaN(budget)) return { error: "Missing required fields" };

  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const { error } = await supabase
      .from('projects')
      .insert([{ name, client_id: clientId, budget, status: 'Active', user_id: user.id }]);
      
    if (error) throw error;
    
    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function createQuote(formData: FormData) {
  const projectId = formData.get("project_id") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const type = formData.get("type") as string;
  
  if (!projectId || isNaN(amount) || !type) return { error: "Missing required fields" };

  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const { error } = await supabase
      .from('quotes')
      .insert([{ project_id: projectId, amount, type, status: 'Pending', user_id: user.id }]);
      
    if (error) throw error;
    
    revalidatePath('/dashboard/quotes');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
