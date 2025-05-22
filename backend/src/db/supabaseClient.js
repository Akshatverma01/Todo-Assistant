import {createClient} from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);

export const supabase = createClient("https://aawsgbyourbbwaztnqru.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhd3NnYnlvdXJiYndhenRucXJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzkxMzg4MSwiZXhwIjoyMDYzNDg5ODgxfQ.ymtMENDnpoSSDa1PZA15-_WB9SbSgvWF6TtO9w-wlJE");
