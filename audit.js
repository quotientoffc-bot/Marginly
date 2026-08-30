const { Client } = require('pg');

async function runAudit() {
  const connectionString = "postgresql://postgres:tXDf_8rm_%23znF7c@db.asrhhfcnjcniylxyxdwr.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Connected successfully!");
    
    // 1. Get all public tables and their RLS status
    console.log("\n--- PUBLIC TABLES & RLS STATUS ---");
    const rlsQuery = `
      SELECT c.relname AS tablename, c.relrowsecurity AS rls_enabled
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relkind = 'r';
    `;
    const rlsRes = await client.query(rlsQuery);
    console.table(rlsRes.rows);

    // 2. Get all columns to check for sensitive data
    console.log("\n--- COLUMNS IN PUBLIC TABLES ---");
    const colQuery = `
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `;
    const colRes = await client.query(colQuery);
    const tables = {};
    for (const row of colRes.rows) {
      if (!tables[row.table_name]) tables[row.table_name] = [];
      tables[row.table_name].push(row.column_name);
    }
    console.log(tables);
    
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

runAudit();
